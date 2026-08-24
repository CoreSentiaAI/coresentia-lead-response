import Image from 'next/image'

/* Low-opacity concrete backdrop for text sections - texture instead of flat
   tone. The parent section needs `relative overflow-hidden`, and its content
   `relative z-10`. Dark theme uses the graded-dark asset; light theme swaps in
   the high-key `-light` twin of the same source (public/structure-X-light.jpg),
   shown stronger since the grade itself is quiet. Edges dissolve into the page
   in both themes. */
export default function Backdrop({
  src,
  opacity = 0.16,
  lightOpacity = 0.5,
  position = 'center',
}: {
  src: string
  opacity?: number
  lightOpacity?: number
  position?: string
}) {
  const lightSrc = src.replace(/\.jpg$/, '-light.jpg')
  return (
    <>
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
      <div className="absolute inset-0 z-0 pointer-events-none light-only" aria-hidden>
        <Image
          src={lightSrc}
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: position, opacity: lightOpacity }}
          quality={86}
          sizes="100vw"
        />
        <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #F7F5F0, transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #F7F5F0, transparent)' }} />
      </div>
    </>
  )
}
