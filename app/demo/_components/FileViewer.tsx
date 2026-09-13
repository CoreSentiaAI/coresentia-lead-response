'use client'
import { useEffect, useState } from 'react'
import type { Attachment } from '../_lib/types'
import { fileUrl, fmtBytes } from '../_lib/files'
import { fmtDateTime } from '../_lib/format'
import { Button, Chip, Modal, ModalHeader } from './ui'

// Popout viewer. PDFs use the browser's own viewer in an iframe, images are
// shown to fit, Word files get a rendered page preview plus the real file to
// download. Files added in this session preview from memory.

export function KindTile({ kind, size = 36 }: { kind: Attachment['kind']; size?: number }) {
  const map = {
    pdf: { bg: '#fce8e8', fg: '#9b2c2c', label: 'PDF' },
    docx: { bg: '#e8effc', fg: '#1e48b8', label: 'DOC' },
    image: { bg: '#e3f5ec', fg: '#166a42', label: 'IMG' },
    file: { bg: '#eef1f4', fg: '#3f4a57', label: 'FILE' },
  }[kind]
  return (
    <span className="inline-flex items-center justify-center rounded-md font-semibold shrink-0" style={{ width: size, height: size, background: map.bg, color: map.fg, fontSize: Math.round(size * 0.28), letterSpacing: '0.04em' }}>
      {map.label}
    </span>
  )
}

function DocPage({ seeded }: { seeded: boolean }) {
  // The seeded brief is rendered as a page so the popout shows a document,
  // not a download prompt. Uploaded Word files cannot be rendered in the
  // browser without a converter, so they get a plain note.
  if (!seeded) {
    return (
      <div className="h-full flex items-center justify-center text-center px-8">
        <div className="max-w-sm">
          <KindTile kind="docx" size={48} />
          <p className="mt-4 text-[13.5px]">Word files added in the demo are stored for this session and open in Word. In the platform build, a preview renders here.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="h-full overflow-y-auto bg-[#e9ebef] py-8 px-4 scrollbar-thin">
      <div className="mx-auto bg-white shadow-[0_8px_30px_rgba(16,24,40,0.12)]" style={{ width: 'min(100%, 760px)', padding: '64px 72px', fontFamily: 'Calibri, Carlito, "Helvetica Neue", Arial, sans-serif', color: '#1c2430' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Brief: Purchase orders - raise and approve</h1>
        <p style={{ fontSize: 12.5, color: '#5b6675', margin: '6px 0 22px' }}>Version 2. Submitted 24 July 2026 by Priya Nair. Locked 28 July 2026 by Helen Marsh.</p>
        {[
          ['Business outcome', ['Raise a PO against a project, route it by value, approve it on a phone, post it to the ERP. Audit trail on every step.']],
          ['Current state', ['PO template in Excel, emailed for signature, re-keyed into the ERP by accounts. About 40 a week. No view of committed cost until the invoice lands.']],
          [
            'What the module must do',
            [
              'Raise a PO against a project with line items, quantities, unit prices and GST calculated.',
              'Route by the ex GST total: one approver under $25,000, two at or over.',
              'Approve or reject with a note from a phone.',
              'Post approved POs to the ERP as committed cost with a sync reference.',
              'Keep an audit trail per PO: who did what, when.',
            ],
            true,
          ],
          ['Out of scope for this brief', ['Receipting and three-way match (separate request).', 'Standing supply agreements.'], true],
          ['Sign-off', ['Priya Nair (Procurement Manager) and Helen Marsh (Head of Finance) sign off on production. Internal owner: Priya Nair.']],
          ['Attachments', ['Process map v2 (PDF). PO approval flow, current state (PNG).']],
        ].map(([h, items, bullets]) => (
          <section key={h as string} style={{ marginTop: 18 }}>
            <h2 style={{ fontSize: 15.5, fontWeight: 700, margin: '0 0 6px' }}>{h as string}</h2>
            {bullets ? (
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: 13.5, lineHeight: 1.55, listStyle: 'disc' }}>
                {(items as string[]).map((t) => (
                  <li key={t} style={{ margin: '3px 0' }}>
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              (items as string[]).map((t) => (
                <p key={t} style={{ margin: '0 0 8px', fontSize: 13.5, lineHeight: 1.55 }}>
                  {t}
                </p>
              ))
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

export default function FileViewer({ attachment, onClose }: { attachment: Attachment | null; onClose: () => void }) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    setUrl(attachment ? fileUrl(attachment) : null)
  }, [attachment])

  if (!attachment) return <Modal open={false} onClose={onClose}>{null}</Modal>
  const seeded = Boolean(attachment.url)

  return (
    <Modal open onClose={onClose}>
      <ModalHeader
        kicker={attachment.kind === 'pdf' ? 'PDF document' : attachment.kind === 'docx' ? 'Word document' : attachment.kind === 'image' ? 'Image' : 'File'}
        title={attachment.name}
        subtitle={`${fmtBytes(attachment.size)}, added by ${attachment.uploadedBy}, ${fmtDateTime(attachment.at)}`}
        onClose={onClose}
        chips={
          <>
            <Chip tone={attachment.kind === 'pdf' ? 'red' : attachment.kind === 'docx' ? 'blue' : attachment.kind === 'image' ? 'green' : 'grey'}>{attachment.kind}</Chip>
            {!seeded && <Chip tone="amber">This session</Chip>}
            {url && (
              <a href={url} download={attachment.name} className="inline-flex">
                <Button size="sm">Download</Button>
              </a>
            )}
          </>
        }
      />
      <div className="flex-1 min-h-0 bg-[#e9ebef]">
        {attachment.kind === 'pdf' && url && <iframe src={`${url}#view=FitH`} title={attachment.name} className="w-full h-full border-0 bg-white" />}
        {attachment.kind === 'image' && url && (
          <div className="h-full flex items-center justify-center p-6 overflow-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={attachment.name} className="max-w-full max-h-full rounded-md shadow-[0_8px_30px_rgba(16,24,40,0.15)] bg-white" />
          </div>
        )}
        {attachment.kind === 'docx' && <DocPage seeded={seeded} />}
        {(attachment.kind === 'file' || (!url && attachment.kind !== 'docx')) && (
          <div className="h-full flex items-center justify-center text-center px-8">
            <div className="max-w-sm">
              <KindTile kind={attachment.kind} size={48} />
              <p className="mt-4 text-[13.5px] text-pm-muted">{url ? 'No preview for this file type.' : 'This file was added in an earlier session. The demo keeps the record but not the bytes.'}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
