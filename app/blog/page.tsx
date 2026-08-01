import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - CoreSentia | AI Development Insights & Technical Writing',
  description: 'Technical insights on AI development, automation architecture, and building production software. From the CoreSentia development studio.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'CoreSentia Blog - AI Development Insights',
    description: 'Technical insights on AI development, automation, and building production software.',
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

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent-ink font-semibold tracking-wider uppercase text-xs mb-3 block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 font-display">
              Insights & Technical Writing
            </h1>
            <p className="text-lg text-ink-2 max-w-2xl">
              AI development insights, automation architecture, and lessons from building production software.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-ink-2 text-lg mb-4">
                  No blog posts published yet. Check back soon!
                </p>
                <Link
                  href="/"
                  className="text-accent-ink hover:text-ink-1 font-semibold transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-surface-card border border-line-soft rounded p-6 hover:border-accent transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-accent-ink uppercase tracking-wider">
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className="text-ink-3 text-sm">&middot;</span>
                      <div className="flex items-center gap-1 text-ink-3 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-ink-1 mb-3 font-display">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-accent-ink transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-ink-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Tag className="w-4 h-4 text-ink-3" />
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-surface-raised text-ink-3 px-2 py-1 rounded border border-line-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-accent-ink hover:text-ink-1 font-semibold text-sm transition-colors"
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
        <section className="py-16 px-6 bg-surface-alt border-t border-line-soft">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-ink-1 mb-4 font-display">
              Have a Project in Mind?
            </h2>
            <p className="text-ink-2 mb-6 max-w-2xl mx-auto">
              We build intelligent applications, AI automation, and production SaaS systems.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-7 py-3 bg-accent text-[#0d0d0c] font-medium rounded-sm font-display hover:bg-[#0d86cc] transition-colors"
            >
              <span className="relative z-10">Get in Touch</span>
              
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
