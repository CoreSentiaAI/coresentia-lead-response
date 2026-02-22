import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react'
import MarkdownRenderer from '../components/MarkdownRenderer'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  published_at: string
  meta_description: string
  og_image: string
  source_url: string
  source_name: string
  view_count: number
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    return null
  }

  // Increment view count
  await supabase
    .from('blog_posts')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', data.id)

  return data
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found - CoreSentia Blog',
    }
  }

  return {
    title: `${post.title} - CoreSentia Blog`,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author],
      url: `https://www.coresentia.com.au/blog/${post.slug}`,
      images: post.og_image ? [post.og_image] : ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: post.og_image ? [post.og_image] : ['/og-image.png'],
    },
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary">
      <Header />

      <main className="pt-32 pb-0">
        {/* Back to Blog */}
        <section className="px-6 lg:px-8 pb-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-highlight font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <article className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="text-sm font-semibold text-brand-accent uppercase tracking-wider">
                {post.category.replace('-', ' ')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-dt-primary mb-6 font-raleway leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-dt-tertiary text-sm mb-8 pb-8 border-b border-dark-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <span>&middot;</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              {post.view_count > 0 && (
                <>
                  <span>&middot;</span>
                  <span>{post.view_count} views</span>
                </>
              )}
            </div>

            {/* Content */}
            <MarkdownRenderer content={post.content} />

            {/* Source Attribution */}
            {post.source_url && post.source_name && (
              <div className="mt-8 p-4 bg-dark-bg-tertiary rounded-lg border border-dark-border">
                <p className="text-sm text-dt-secondary">
                  <strong>Source:</strong> This article references or builds upon content from{' '}
                  <a
                    href={post.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-accent hover:text-brand-highlight transition-colors"
                  >
                    {post.source_name}
                  </a>
                </p>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-dark-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="w-5 h-5 text-dt-tertiary" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-dark-bg-elevated text-dt-tertiary px-3 py-1 rounded border border-dark-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

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
