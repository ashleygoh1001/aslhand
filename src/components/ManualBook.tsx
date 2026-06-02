import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { manualBook } from '../data/manual'

const total = manualBook.slides.length
const STICKY_TOP_RATIO = 0.1
const STICKY_HEIGHT_RATIO = 0.8

function usePinnedBookProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
  const progress = useMotionValue(0)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const vh = window.innerHeight
      const stickyTop = vh * STICKY_TOP_RATIO
      const stickyHeight = vh * STICKY_HEIGHT_RATIO

      const rect = el.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const pinStart = elementTop - stickyTop
      const pinEnd = elementTop + el.offsetHeight - stickyHeight - stickyTop
      const pinLength = Math.max(1, pinEnd - pinStart)

      const p = Math.min(1, Math.max(0, (window.scrollY - pinStart) / pinLength))
      progress.set(p)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [containerRef, progress])

  return progress
}

function useScrollTrackHeight() {
  const [heightPx, setHeightPx] = useState<number | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const vh = window.innerHeight
      const pageStep = vh * (manualBook.scrollHeightPerPage / 100)
      const stickyTop = vh * STICKY_TOP_RATIO
      const stickyHeight = vh * STICKY_HEIGHT_RATIO
      // One scroll segment per page flip, plus room for sticky viewport
      const pinLength = (total - 1) * pageStep
      setHeightPx(Math.ceil(pinLength + stickyHeight + stickyTop))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return heightPx
}

function StaticManual({
  current,
  onPrev,
  onNext,
}: {
  current: number
  onPrev: () => void
  onNext: () => void
}) {
  const slide = manualBook.slides[current]
  return (
    <div>
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-pop-ink bg-white shadow-pop">
        <img src={slide.src} alt={slide.alt} className="w-full object-contain" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={current === 0}
          className="btn-pop rounded-full px-4 py-2 text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm font-medium text-pop-ink">
          Page <span className="font-bold italic text-pop-purple">{current + 1}</span> of {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={current === total - 1}
          className="btn-pop rounded-full px-4 py-2 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function FlipBook({ bookProgress }: { bookProgress: MotionValue<number> }) {
  const pageFloat = useTransform(bookProgress, (v) => v * (total - 1))

  const rotateY = useTransform(pageFloat, (p) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(p)))
    if (idx >= total - 1) return 'rotateY(0deg)'
    const t = Math.min(1, Math.max(0, p - idx))
    return `rotateY(${-t * 180}deg)`
  })

  const foldShadow = useTransform(pageFloat, (p) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(p)))
    if (idx >= total - 1) return 0
    const t = Math.min(1, Math.max(0, p - idx))
    return Math.sin(t * Math.PI) * 0.4
  })

  const [topIndex, setTopIndex] = useState(0)
  const [underIndex, setUnderIndex] = useState(0)

  useMotionValueEvent(pageFloat, 'change', (p) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(p)))
    const t = idx >= total - 1 ? 0 : Math.min(1, Math.max(0, p - idx))
    setTopIndex(idx)
    setUnderIndex(t > 0.002 ? Math.min(total - 1, idx + 1) : idx)
  })

  // Preload upcoming slides so later pages don't stall on slow networks (e.g. Vercel CDN)
  useEffect(() => {
    for (let i = topIndex; i <= Math.min(total - 1, topIndex + 3); i++) {
      const img = new Image()
      img.src = manualBook.slides[i].src
    }
  }, [topIndex])

  const top = manualBook.slides[topIndex]
  const under = manualBook.slides[underIndex]

  return (
    <>
      <div className="absolute bottom-2 left-1/2 z-50 -translate-x-1/2 rounded-full border-2 border-pop-ink/20 bg-canvas/90 px-4 py-1.5 text-sm font-medium text-pop-ink shadow-sm backdrop-blur">
        Page <span className="font-bold italic text-pop-purple">{topIndex + 1}</span> of {total}
      </div>

      <div
        className="relative w-[min(92vw,52rem)]"
        style={{ perspective: '1600px', perspectiveOrigin: 'left center' }}
      >
        <div
          className="absolute -left-3 top-2 bottom-2 w-6 rounded-l-lg bg-gradient-to-r from-pop-ink/25 to-pop-ink/5 shadow-inner"
          aria-hidden="true"
        />

        <div className="relative aspect-[16/10] w-full" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 overflow-hidden rounded-r-xl border-2 border-pop-ink/15 bg-white shadow-pop-sm">
            <img
              key={under.src}
              src={under.src}
              alt={under.alt}
              className="h-full w-full object-contain bg-white"
              loading={underIndex < 4 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>

          <motion.div
            className="absolute inset-0"
            style={{
              transform: rotateY,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              zIndex: 2,
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-r-xl border-2 border-pop-ink/15 bg-white shadow-pop-sm"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <img
                key={top.src}
                src={top.src}
                alt={top.alt}
                className="h-full w-full object-contain bg-white"
                loading={topIndex < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/30 to-transparent"
                style={{ opacity: foldShadow }}
              />
            </div>
            <div
              className="absolute inset-0 rounded-l-xl border-2 border-pop-ink/10 bg-[#ebe4d8]"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export function ManualBook() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [currentPage, setCurrentPage] = useState(0)
  const scrollTrackHeightPx = useScrollTrackHeight()
  const bookProgress = usePinnedBookProgress(containerRef)

  if (reduceMotion) {
    return (
      <section className="mb-16" aria-label={manualBook.title}>
        <h3 className="mb-2 text-xl font-bold italic text-pop-purple">{manualBook.title}</h3>
        <p className="mb-6 text-pop-ink/70">Use the buttons to move through each page of the manual.</p>
        <StaticManual
          current={currentPage}
          onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(total - 1, p + 1))}
        />
      </section>
    )
  }

  return (
    <section className="mb-20" aria-label={manualBook.title}>
      <h3 className="mb-2 text-xl font-bold italic text-pop-purple">{manualBook.title}</h3>
      <p className="mb-8 max-w-2xl text-pop-ink/70">{manualBook.subtitle}</p>

      <div
        ref={containerRef}
        style={{ height: scrollTrackHeightPx ?? `${total * manualBook.scrollHeightPerPage}vh` }}
        className="relative"
      >
        <div className="sticky top-[10vh] z-10 flex h-[80vh] items-center justify-center">
          <FlipBook bookProgress={bookProgress} />
        </div>
      </div>

      <p className="mt-4 text-center text-sm italic text-pop-ink/50">
        Keep scrolling — each section flips to the next page
      </p>
    </section>
  )
}
