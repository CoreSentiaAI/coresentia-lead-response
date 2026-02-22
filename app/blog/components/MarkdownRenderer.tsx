'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-dt-primary mt-8 mb-4 font-raleway" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-dt-primary mt-8 mb-4 font-raleway" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold text-dt-primary mt-6 mb-3 font-raleway" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-dt-secondary mb-4 leading-relaxed" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-brand-accent hover:text-brand-highlight transition-colors" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside text-dt-secondary mb-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside text-dt-secondary mb-4 space-y-2" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-brand-accent pl-4 italic text-dt-secondary my-4" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="bg-dark-bg-elevated text-brand-highlight px-2 py-1 rounded text-sm font-mono" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
