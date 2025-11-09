import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Header from '../../components/Header'
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
    process.env.SUPABASE_SERVICE_KEY!
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

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white text-text-primary font-opensans">
      <Header />

      <main className="pt-24 pb-20">
        {/* Back to Blog */}
        <section className="py-6 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-orange hover:underline font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <article className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <div className="mb-4">
              <span className="text-sm font-semibold text-brand-orange uppercase tracking-wider">
                {post.category.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 font-montserrat leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <span>•</span>
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
                  <span>•</span>
                  <span>{post.view_count} views</span>
                </>
              )}
            </div>

            {/* Content */}
            <MarkdownRenderer content={post.content} />

            {/* Source Attribution */}
            {post.source_url && post.source_name && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-text-secondary">
                  <strong>Source:</strong> This article references or builds upon content from{' '}
                  <a
                    href={post.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange hover:underline"
                  >
                    {post.source_name}
                  </a>
                </p>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="w-5 h-5 text-text-secondary" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-gray-100 text-text-secondary px-3 py-1 rounded"
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
