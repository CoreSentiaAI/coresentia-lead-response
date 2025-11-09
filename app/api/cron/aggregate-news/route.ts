/**
 * Vercel Cron Job: Aggregate AI News and Publish Blog Posts
 *
 * Runs every 6 hours:
 * - Scrapes TechCrunch, The Verge, VentureBeat
 * - Fetches Reddit AI posts
 * - Fetches Product Hunt AI products
 * - Deduplicates and filters
 * - Generates blog posts with Claude
 * - Auto-publishes to /blog
 *
 * Endpoint: /api/cron/aggregate-news
 * Schedule: Every 6 hours (defined in vercel.json)
 */

import { NextResponse } from 'next/server'
import { aggregateAllNews } from '@/lib/news-scrapers'
import { processNewsArticles } from '@/lib/news-processor'

export const maxDuration = 300 // 5 minutes timeout (Vercel limit)
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // Verify request is from Vercel Cron or has valid auth token
    const authHeader = request.headers.get('Authorization')
    const cronSecret = process.env.CRON_SECRET
    const isVercelCron = request.headers.get('User-Agent')?.includes('vercel-cron')

    // Debug logging
    console.log('🔍 Auth Debug:', {
      authHeader,
      cronSecret: cronSecret ? '***SET***' : undefined,
      userAgent: request.headers.get('User-Agent'),
      isVercelCron,
    })

    // Allow Vercel Cron or valid Bearer token
    const isAuthorized = isVercelCron || (authHeader && cronSecret && authHeader === `Bearer ${cronSecret}`)

    if (!isAuthorized) {
      console.error('❌ Unauthorized cron request')
      return NextResponse.json(
        { error: 'Unauthorized', debug: { hasAuthHeader: !!authHeader, hasCronSecret: !!cronSecret, isVercelCron } },
        { status: 401 }
      )
    }

    console.log('🚀 Cron job started:', new Date().toISOString())

    // Step 1: Aggregate news from all sources
    const articles = await aggregateAllNews()

    if (articles.length === 0) {
      console.log('⚠️  No articles found')
      return NextResponse.json({
        success: true,
        message: 'No articles found',
        stats: {
          scraped: 0,
          processed: 0,
          published: 0,
          duplicates: 0,
          errors: 0,
        },
      })
    }

    // Step 2: Process articles (dedupe, filter, generate blog posts, publish)
    const stats = await processNewsArticles(articles)

    console.log('✅ Cron job completed:', new Date().toISOString())

    return NextResponse.json({
      success: true,
      message: `Published ${stats.published} new blog posts`,
      stats: {
        scraped: articles.length,
        ...stats,
      },
    })
  } catch (error) {
    console.error('❌ Cron job error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Allow manual trigger via POST (for testing)
export async function POST(request: Request) {
  console.log('🧪 Manual trigger initiated')
  return GET(request)
}
