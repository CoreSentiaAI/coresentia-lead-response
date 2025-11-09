/**
 * Web scrapers for AI news sources
 * Extracts articles from TechCrunch, The Verge, VentureBeat
 */

import * as cheerio from 'cheerio'
import crypto from 'crypto'

export interface ScrapedArticle {
  title: string
  url: string
  excerpt: string
  content?: string
  source: string
  published_at: Date
  content_hash: string
  score?: number
}

/**
 * Generate MD5 hash for deduplication
 */
function generateContentHash(title: string, excerpt: string): string {
  return crypto
    .createHash('md5')
    .update(title + excerpt)
    .digest('hex')
}

/**
 * Scrape TechCrunch AI section
 * URL: https://techcrunch.com/category/artificial-intelligence/
 */
export async function scrapeTechCrunch(): Promise<ScrapedArticle[]> {
  try {
    const response = await fetch('https://techcrunch.com/category/artificial-intelligence/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      console.error('TechCrunch fetch failed:', response.status)
      return []
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const articles: ScrapedArticle[] = []

    // TechCrunch uses article.post-block structure
    $('article.post-block').each((i, elem) => {
      try {
        const $article = $(elem)
        const title = $article.find('.post-block__title a').text().trim()
        const url = $article.find('.post-block__title a').attr('href') || ''
        const excerpt = $article.find('.post-block__content').text().trim()
        const dateStr = $article.find('time').attr('datetime')

        if (title && url && excerpt) {
          articles.push({
            title,
            url,
            excerpt,
            source: 'techcrunch',
            published_at: dateStr ? new Date(dateStr) : new Date(),
            content_hash: generateContentHash(title, excerpt),
          })
        }
      } catch (err) {
        console.error('Error parsing TechCrunch article:', err)
      }
    })

    console.log(`✅ TechCrunch: Scraped ${articles.length} articles`)
    return articles
  } catch (error) {
    console.error('TechCrunch scraper error:', error)
    return []
  }
}

/**
 * Scrape The Verge AI section
 * URL: https://www.theverge.com/ai-artificial-intelligence
 */
export async function scrapeTheVerge(): Promise<ScrapedArticle[]> {
  try {
    const response = await fetch('https://www.theverge.com/ai-artificial-intelligence', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      console.error('The Verge fetch failed:', response.status)
      return []
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const articles: ScrapedArticle[] = []

    // The Verge uses various article containers
    $('article, div[data-analytics-placement="river"]').each((i, elem) => {
      try {
        const $article = $(elem)
        const $link = $article.find('a[href*="/2024/"], a[href*="/2025/"]').first()
        const title = $link.find('h2, h3').text().trim() || $link.attr('aria-label')?.trim() || ''
        const url = $link.attr('href') || ''
        const excerpt = $article.find('p').first().text().trim()

        if (title && url && url.includes('theverge.com')) {
          const fullUrl = url.startsWith('http') ? url : `https://www.theverge.com${url}`

          articles.push({
            title,
            url: fullUrl,
            excerpt: excerpt || title.substring(0, 200),
            source: 'theverge',
            published_at: new Date(), // The Verge doesn't easily expose dates in listings
            content_hash: generateContentHash(title, excerpt || title),
          })
        }
      } catch (err) {
        console.error('Error parsing The Verge article:', err)
      }
    })

    // Deduplicate by URL (The Verge sometimes duplicates)
    const uniqueArticles = Array.from(
      new Map(articles.map(a => [a.url, a])).values()
    )

    console.log(`✅ The Verge: Scraped ${uniqueArticles.length} articles`)
    return uniqueArticles.slice(0, 10) // Limit to 10 most recent
  } catch (error) {
    console.error('The Verge scraper error:', error)
    return []
  }
}

/**
 * Scrape VentureBeat AI section
 * URL: https://venturebeat.com/category/ai/
 */
export async function scrapeVentureBeat(): Promise<ScrapedArticle[]> {
  try {
    const response = await fetch('https://venturebeat.com/category/ai/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      console.error('VentureBeat fetch failed:', response.status)
      return []
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const articles: ScrapedArticle[] = []

    // VentureBeat uses article structures
    $('article, div.ArticleListing').each((i, elem) => {
      try {
        const $article = $(elem)
        const $link = $article.find('a[href*="venturebeat.com"]').first()
        const title = $article.find('h2, h3, .article-title').text().trim()
        const url = $link.attr('href') || ''
        const excerpt = $article.find('p, .excerpt').first().text().trim()
        const dateStr = $article.find('time').attr('datetime')

        if (title && url) {
          articles.push({
            title,
            url,
            excerpt: excerpt || title.substring(0, 200),
            source: 'venturebeat',
            published_at: dateStr ? new Date(dateStr) : new Date(),
            content_hash: generateContentHash(title, excerpt || title),
          })
        }
      } catch (err) {
        console.error('Error parsing VentureBeat article:', err)
      }
    })

    console.log(`✅ VentureBeat: Scraped ${articles.length} articles`)
    return articles.slice(0, 10)
  } catch (error) {
    console.error('VentureBeat scraper error:', error)
    return []
  }
}

/**
 * Fetch from Reddit r/artificial
 * Uses Reddit's public JSON API (no auth required)
 */
export async function fetchRedditAI(): Promise<ScrapedArticle[]> {
  try {
    const response = await fetch('https://www.reddit.com/r/artificial/top.json?t=day&limit=20', {
      headers: {
        'User-Agent': 'CoreSentia News Aggregator v1.0',
      },
    })

    if (!response.ok) {
      console.error('Reddit fetch failed:', response.status)
      return []
    }

    const data = await response.json()
    const articles: ScrapedArticle[] = []

    data.data.children.forEach((post: any) => {
      try {
        const p = post.data

        // Skip stickied posts and megathreads
        if (p.stickied || p.title.toLowerCase().includes('megathread')) {
          return
        }

        // Only include posts with decent upvotes (quality signal)
        if (p.ups < 50) {
          return
        }

        articles.push({
          title: p.title,
          url: p.url.includes('reddit.com') ? `https://reddit.com${p.permalink}` : p.url,
          excerpt: p.selftext?.substring(0, 300) || p.title,
          source: 'reddit',
          published_at: new Date(p.created_utc * 1000),
          content_hash: generateContentHash(p.title, p.selftext || p.title),
          score: p.ups,
        })
      } catch (err) {
        console.error('Error parsing Reddit post:', err)
      }
    })

    console.log(`✅ Reddit: Fetched ${articles.length} posts`)
    return articles
  } catch (error) {
    console.error('Reddit API error:', error)
    return []
  }
}

/**
 * Fetch AI products from Product Hunt
 * Uses Product Hunt's public GraphQL API
 */
export async function fetchProductHunt(): Promise<ScrapedArticle[]> {
  try {
    // Product Hunt's public posts endpoint (no auth required for today's posts)
    const response = await fetch('https://www.producthunt.com/frontend/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CoreSentia News Aggregator v1.0',
      },
      body: JSON.stringify({
        query: `
          query {
            posts(order: VOTES, first: 20) {
              edges {
                node {
                  id
                  name
                  tagline
                  description
                  votesCount
                  createdAt
                  url
                  topics {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })

    if (!response.ok) {
      console.error('Product Hunt fetch failed:', response.status)
      return []
    }

    const data = await response.json()
    const articles: ScrapedArticle[] = []

    data.data?.posts?.edges?.forEach((edge: any) => {
      try {
        const product = edge.node

        // Filter for AI-related products
        const topics = product.topics?.edges?.map((t: any) => t.node.name.toLowerCase()) || []
        const isAI = topics.some((t: string) =>
          t.includes('ai') ||
          t.includes('artificial intelligence') ||
          t.includes('machine learning') ||
          t.includes('automation')
        )

        if (isAI && product.votesCount > 50) {
          articles.push({
            title: `${product.name} - ${product.tagline}`,
            url: product.url,
            excerpt: product.description || product.tagline,
            source: 'producthunt',
            published_at: new Date(product.createdAt),
            content_hash: generateContentHash(product.name, product.tagline),
            score: product.votesCount,
          })
        }
      } catch (err) {
        console.error('Error parsing Product Hunt product:', err)
      }
    })

    console.log(`✅ Product Hunt: Fetched ${articles.length} AI products`)
    return articles
  } catch (error) {
    console.error('Product Hunt API error:', error)
    return []
  }
}

/**
 * Run all scrapers and aggregate results
 */
export async function aggregateAllNews(): Promise<ScrapedArticle[]> {
  console.log('🚀 Starting news aggregation...')

  const results = await Promise.allSettled([
    scrapeTechCrunch(),
    scrapeTheVerge(),
    scrapeVentureBeat(),
    fetchRedditAI(),
    fetchProductHunt(),
  ])

  const articles: ScrapedArticle[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      articles.push(...result.value)
    } else {
      console.error(`Scraper ${index} failed:`, result.reason)
    }
  })

  console.log(`✅ Total articles aggregated: ${articles.length}`)
  return articles
}
