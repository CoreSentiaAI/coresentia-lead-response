/**
 * News Processing Pipeline
 * Deduplicates, filters, generates blog posts, and publishes
 */

import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { ScrapedArticle } from './news-scrapers'

// Lazy initialization to avoid build-time errors
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
}

function getAnthropic() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  })
}

/**
 * Check if article already exists in database
 */
async function isArticleDuplicate(article: ScrapedArticle): Promise<boolean> {
  const supabase = getSupabase()

  // Check by URL
  const { data: urlMatch } = const supabase = getSupabase(); await supabase
    .from('news_articles')
    .select('id')
    .eq('url', article.url)
    .single()

  if (urlMatch) {
    return true
  }

  // Check by content hash (similar articles)
  const { data: hashMatch } = const supabase = getSupabase(); await supabase
    .from('news_articles')
    .select('id')
    .eq('content_hash', article.content_hash)
    .single()

  return !!hashMatch
}

/**
 * Filter articles for quality and recency
 */
function filterArticles(articles: ScrapedArticle[]): ScrapedArticle[] {
  const now = Date.now()
  const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000

  return articles.filter(article => {
    // Must be from last 48 hours
    if (article.published_at.getTime() < twoDaysAgo) {
      return false
    }

    // Must have decent title length
    if (article.title.length < 20) {
      return false
    }

    // Filter out obvious spam keywords
    const spamKeywords = ['clickbait', 'you won\'t believe', 'one weird trick']
    const titleLower = article.title.toLowerCase()
    if (spamKeywords.some(spam => titleLower.includes(spam))) {
      return false
    }

    return true
  })
}

/**
 * Score articles for importance (higher = more important)
 */
function scoreArticles(articles: ScrapedArticle[]): ScrapedArticle[] {
  return articles.map(article => {
    let score = article.score || 0

    // Boost based on source credibility
    if (article.source === 'techcrunch') score += 10
    if (article.source === 'theverge') score += 8
    if (article.source === 'venturebeat') score += 7
    if (article.source === 'reddit' && article.score! > 100) score += 5
    if (article.source === 'producthunt' && article.score! > 200) score += 5

    // Boost for important keywords in title
    const importantKeywords = [
      'openai', 'anthropic', 'google', 'microsoft',
      'breakthrough', 'launches', 'announces', 'releases',
      'gpt', 'claude', 'gemini', 'copilot',
      'autonomous', 'agi', 'robotics'
    ]
    const titleLower = article.title.toLowerCase()
    importantKeywords.forEach(keyword => {
      if (titleLower.includes(keyword)) score += 3
    })

    return { ...article, score }
  })
}

/**
 * Generate blog post from article using Claude
 */
async function generateBlogPost(article: ScrapedArticle): Promise<{
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
}> {
  const prompt = `You are a tech journalist writing for CoreSentia's blog. CoreSentia provides AI receptionist services for Australian small businesses.

Your task: Turn this AI news article into a blog post for CoreSentia's audience.

**Original Article:**
Title: ${article.title}
Source: ${article.source}
Excerpt: ${article.excerpt}
URL: ${article.url}

**Your blog post should:**
1. Summarize the news in 2-3 paragraphs (300-400 words)
2. Explain why this matters for small business owners
3. Connect it back to AI automation and customer service when relevant
4. Use clear, accessible language (avoid jargon)
5. Be engaging and conversational
6. Include a CoreSentia perspective: "What does this mean for Australian businesses?"

**Format your response as JSON:**
{
  "title": "Catchy blog post title (different from original)",
  "excerpt": "One-sentence summary (150 chars max)",
  "content": "Full blog post in markdown format",
  "category": "news" or "product-update" or "guide",
  "tags": ["ai", "relevant", "tags"]
}

Write the blog post now:`

  const anthropic = getAnthropic(); const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: prompt,
    }],
  })

  const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

  // Parse JSON response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Failed to parse blog post JSON from Claude')
  }

  const blogPost = JSON.parse(jsonMatch[0])

  return {
    title: blogPost.title,
    content: blogPost.content,
    excerpt: blogPost.excerpt,
    category: blogPost.category || 'news',
    tags: blogPost.tags || ['ai', 'news'],
  }
}

/**
 * Publish blog post to database
 */
async function publishBlogPost(
  article: ScrapedArticle,
  blogPost: {
    title: string
    content: string
    excerpt: string
    category: string
    tags: string[]
  }
) {
  // Generate slug from title
  const slug = blogPost.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)

  // Insert blog post
  const { data: post, error: postError } = const supabase = getSupabase(); await supabase
    .from('blog_posts')
    .insert({
      title: blogPost.title,
      slug,
      content: blogPost.content,
      excerpt: blogPost.excerpt,
      category: blogPost.category,
      tags: blogPost.tags,
      author: 'CoreSentia',
      source_url: article.url,
      source_name: article.source,
      status: 'published',
      published_at: new Date().toISOString(),
      meta_description: blogPost.excerpt,
    })
    .select()
    .single()

  if (postError) {
    throw new Error(`Failed to publish blog post: ${postError.message}`)
  }

  return post
}

/**
 * Save article to news_articles table
 */
async function saveArticle(article: ScrapedArticle, blogPostId?: string) {
  const { error } = const supabase = getSupabase(); await supabase
    .from('news_articles')
    .insert({
      title: article.title,
      url: article.url,
      excerpt: article.excerpt,
      source: article.source,
      published_at: article.published_at.toISOString(),
      content_hash: article.content_hash,
      score: article.score || 0,
      processed: !!blogPostId,
      blog_post_id: blogPostId || null,
    })

  if (error) {
    console.error('Error saving article:', error)
  }
}

/**
 * Main processing pipeline
 */
export async function processNewsArticles(articles: ScrapedArticle[]): Promise<{
  processed: number
  published: number
  duplicates: number
  errors: number
}> {
  console.log(`📰 Processing ${articles.length} articles...`)

  // Filter for quality and recency
  const filtered = filterArticles(articles)
  console.log(`✅ Filtered to ${filtered.length} quality articles`)

  // Score and sort by importance
  const scored = scoreArticles(filtered)
  scored.sort((a, b) => b.score! - a.score!)

  // Take top 10 most important
  const topArticles = scored.slice(0, 10)
  console.log(`🎯 Selected top ${topArticles.length} articles for processing`)

  let processed = 0
  let published = 0
  let duplicates = 0
  let errors = 0

  for (const article of topArticles) {
    try {
      // Check for duplicates
      const isDuplicate = await isArticleDuplicate(article)
      if (isDuplicate) {
        console.log(`⏭️  Skipping duplicate: ${article.title}`)
        duplicates++
        continue
      }

      console.log(`📝 Generating blog post for: ${article.title}`)

      // Generate blog post
      const blogPost = await generateBlogPost(article)

      // Publish to blog
      const post = await publishBlogPost(article, blogPost)
      console.log(`✅ Published: ${post.title} (slug: ${post.slug})`)

      // Save article to database
      await saveArticle(article, post.id)

      processed++
      published++

      // Rate limit: wait 2 seconds between Claude API calls
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error(`❌ Error processing article "${article.title}":`, error)
      errors++

      // Save article anyway (without blog post)
      await saveArticle(article)
    }
  }

  console.log(`📊 Processing complete:`)
  console.log(`   - Processed: ${processed}`)
  console.log(`   - Published: ${published}`)
  console.log(`   - Duplicates: ${duplicates}`)
  console.log(`   - Errors: ${errors}`)

  return { processed, published, duplicates, errors }
}
