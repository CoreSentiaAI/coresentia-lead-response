import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Header from '../components/Header'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - CoreSentia | AI Industry News & Business Automation Tips',
  description: 'Stay updated on AI trends, automation strategies, and practical tips for Australian service businesses. Expert insights on using AI to grow your business.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'CoreSentia Blog - AI Industry News & Automation Tips',
    description: 'Expert insights on AI trends, automation, and technology for Australian service businesses.',
    url: 'https://www.coresentia.com.au/blog',
  },
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  published_at: string
  view_count: number
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, category, tags, author, published_at, view_count')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-white text-text-primary font-opensans">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy/90">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat text-white">
              CoreSentia Blog
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              AI industry insights, automation strategies, and practical tips for Australian service businesses.
              Stay ahead of the curve with expert analysis from CoreSentia.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg mb-4">
                  No blog posts published yet. Check back soon!
                </p>
                <Link
                  href="/"
                  className="text-brand-orange hover:underline font-semibold"
                >
                  Return to Homepage →
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className="text-text-secondary text-sm">•</span>
                      <div className="flex items-center gap-1 text-text-secondary text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-brand-navy mb-3 font-montserrat">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-brand-orange transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Tag className="w-4 h-4 text-text-secondary" />
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-brand-orange hover:underline font-semibold"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-4 font-montserrat">
              Ready to Transform Your Business?
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Stop missing leads. Let CoreSentia's AI receptionist handle customer inquiries 24/7.
            </p>
            <Link
              href="/"
              className="inline-block bg-brand-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
