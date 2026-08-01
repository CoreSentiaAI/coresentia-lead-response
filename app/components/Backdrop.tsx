import Image from 'next/image'

/* Low-opacity concrete backdrop for text sections — texture instead of flat
   tone. Dark theme only; edges dissolve into the page. The parent section
   needs `relative overflow-hidden`, and its content `relative z-10`. */
export default function Backdrop({
  src,
  opacity = 0.16,
  position = 'center',
}: {
  src: string
  opacity?: number
  position?: string
}) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none dark-only" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: position, opacity }}
        quality={80}
        sizes="100vw"
      />
      <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
    </div>
  )
}
