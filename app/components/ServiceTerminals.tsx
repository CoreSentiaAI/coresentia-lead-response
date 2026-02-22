'use client'
import { useEffect, useRef, useState } from 'react'

function TerminalCard({
  label,
  command,
  lines,
  featured = false,
  delay = 0,
}: {
  label: string
  command: string
  lines: string[]
  featured?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [typed, setTyped] = useState('')
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let cancelled = false

    const startTimer = setTimeout(() => {
      let i = 0
      const typeInterval = setInterval(() => {
        if (cancelled) { clearInterval(typeInterval); return }
        i++
        if (i <= command.length) {
          setTyped(command.slice(0, i))
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            if (!cancelled) setShowOutput(true)
          }, 250)
        }
      }, 30)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
    }
  }, [visible, command, delay])

  return (
    <div
      ref={ref}
      className={`bg-dark-bg-primary border border-dark-border rounded-xl overflow-hidden
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${featured ? 'h-full' : ''}
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-dark-border">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/50" />
        <span className="ml-2 text-[11px] text-dt-tertiary font-mono">{label}</span>
      </div>

      {/* Terminal body */}
      <div className={`${featured ? 'p-6 lg:p-8' : 'p-5 lg:p-6'} font-mono text-sm leading-relaxed`}>
        {/* Command line */}
        <div className="flex items-start gap-2">
          <span className="text-brand-accent select-none shrink-0">$</span>
          <span className="text-dt-secondary">
            {typed}
            {!showOutput && visible && (
              <span className="inline-block w-1.5 h-4 bg-brand-accent ml-0.5 animate-pulse align-middle" />
            )}
          </span>
        </div>

        {/* Output */}
        {showOutput && (
          <div className="mt-4 text-dt-secondary leading-relaxed animate-terminal-reveal">
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ServiceTerminals() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        <TerminalCard
          label="ai-automation"
          command="describe ai-automation"
          lines={[
            'Conversational AI, workflow automation, and intelligent',
            'data processing. We\'ve built the systems handling real',
            'phone calls, qualifying leads, and booking appointments',
            '— 24/7, without human intervention.',
          ]}
          delay={0}
        />
        <TerminalCard
          label="saas-platforms"
          command="describe saas-platforms"
          lines={[
            'Full-stack applications with auth, payments,',
            'dashboards, and multi-tenant architecture.',
          ]}
          delay={200}
        />
      </div>
      <div className="flex flex-col gap-5">
        <TerminalCard
          label="internal-tools"
          command="describe internal-tools"
          lines={[
            'Custom dashboards, admin panels, and operational',
            'tools that streamline the workflows your team',
            'actually uses.',
          ]}
          delay={300}
        />
        <TerminalCard
          label="websites"
          command="describe websites"
          lines={[
            'Fast, modern websites built with Next.js.',
            'From landing pages to full business platforms',
            '— designed, built, and deployed.',
          ]}
          delay={500}
        />
      </div>
    </div>
  )
}
