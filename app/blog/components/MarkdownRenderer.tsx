'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-brand-navy mt-8 mb-4 font-montserrat" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4 font-montserrat" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold text-brand-navy mt-6 mb-3 font-montserrat" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-text-secondary mb-4 leading-relaxed" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-brand-orange hover:underline" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-2" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-brand-orange pl-4 italic text-text-secondary my-4" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
