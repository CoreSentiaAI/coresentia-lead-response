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
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-raleway">
              Insights & Technical Writing
            </h1>
            <p className="text-lg text-dt-secondary max-w-2xl">
              AI development insights, automation architecture, and lessons from building production software.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dt-secondary text-lg mb-4">
                  No blog posts published yet. Check back soon!
                </p>
                <Link
                  href="/"
                  className="text-brand-accent hover:text-brand-highlight font-semibold transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-6 hover:border-brand-primary/30 hover:glow-blue transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className="text-dt-tertiary text-sm">&middot;</span>
                      <div className="flex items-center gap-1 text-dt-tertiary text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-dt-primary mb-3 font-raleway">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-brand-accent transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-dt-secondary mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Tag className="w-4 h-4 text-dt-tertiary" />
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-dark-bg-elevated text-dt-tertiary px-2 py-1 rounded border border-dark-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-highlight font-semibold text-sm transition-colors"
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
        <section className="py-16 px-6 bg-dark-bg-secondary border-t border-dark-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-dt-primary mb-4 font-raleway">
              Have a Project in Mind?
            </h2>
            <p className="text-dt-secondary mb-6 max-w-2xl mx-auto">
              We build intelligent applications, AI automation, and production SaaS systems.
            </p>
            <Link
              href="/#contact"
              className="inline-block btn-primary px-8 py-3 rounded-full font-semibold relative overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="shimmer-span" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
