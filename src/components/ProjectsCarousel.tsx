import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import ProjectCard from "./ProjectCard"
import { useTheme } from "../context/ThemeContext"

export type Project = {
  title: string,
  description: string,
  link: string,
  github: string,
  src: string,
  technologies: string[],
  comingSoon?: boolean,
}

const AUTO_SPEED = 40   // px per second
const TILE_STEP = 316   // tile width (300) + gap (16)

const ProjectsCarousel = ({ projects }: { projects: Project[] }) => {
  const { theme } = useTheme()
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)

  // interaction flags kept in refs so the animation loop reads them without re-subscribing
  const hoverRef = useRef(false)
  const downRef = useRef(false)
  const draggedRef = useRef(false)
  const modalRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollRef = useRef(0)
  const capturedRef = useRef(false)

  const loop = [...projects, ...projects]

  // Seamless wrap: the track holds two copies, so shifting by half its width shows identical pixels.
  const normalize = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const half = el.scrollWidth / 2
    if (half <= 0) return
    if (el.scrollLeft >= half) el.scrollLeft -= half
    else if (el.scrollLeft < 0) el.scrollLeft += half
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!hoverRef.current && !downRef.current && !modalRef.current) {
        el.scrollLeft += AUTO_SPEED * dt
        normalize()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [normalize])

  // Modal side effects: pause auto-scroll, lock body scroll, Escape to close, focus the close button.
  useEffect(() => {
    modalRef.current = !!selected
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null) }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeBtnRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [selected])

  // Mouse drag (touch and trackpad use the container's native horizontal scroll).
  // Capture only after the drag threshold is crossed, otherwise pointer capture
  // would steal the click from the tile button and the modal would never open.
  const onPointerDown = (e: React.PointerEvent) => {
    downRef.current = true
    draggedRef.current = false
    capturedRef.current = false
    if (e.pointerType === "mouse") {
      startXRef.current = e.clientX
      startScrollRef.current = scrollerRef.current?.scrollLeft ?? 0
    }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!downRef.current || e.pointerType !== "mouse") return
    const el = scrollerRef.current
    if (!el) return
    const dx = e.clientX - startXRef.current
    if (!draggedRef.current && Math.abs(dx) > 5) {
      draggedRef.current = true
      try { el.setPointerCapture(e.pointerId); capturedRef.current = true } catch { /* capture may fail if pointer already released */ }
    }
    if (draggedRef.current) {
      el.scrollLeft = startScrollRef.current - dx
      normalize()
    }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    downRef.current = false
    const el = scrollerRef.current
    if (capturedRef.current && el) {
      try { el.releasePointerCapture(e.pointerId) } catch { /* already released */ }
    }
    capturedRef.current = false
  }

  const step = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * TILE_STEP, behavior: "smooth" })
  }

  const openIfClick = (p: Project) => {
    if (!draggedRef.current) setSelected(p)
  }

  const arrowStyle = theme
    ? "absolute top-1/2 -translate-y-1/2 z-10 hidden sm:grid place-items-center w-9 h-9 rounded-full bg-primary/80 border border-[#333] text-secondary hover:bg-primary cursor-pointer transition-colors"
    : "absolute top-1/2 -translate-y-1/2 z-10 hidden sm:grid place-items-center w-9 h-9 rounded-full bg-primary/80 border border-[#bbb] text-secondary hover:bg-primary cursor-pointer transition-colors"

  const techStyle = theme
    ? "w-fit px-2 py-1 bg-[#656161]/50 text-[11px] text-secondary font-light rounded-xl"
    : "w-fit px-2 py-1 bg-[#656161]/20 text-[11px] text-secondary font-light rounded-xl"

  const btnStyle = theme
    ? "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#333] text-sm hover:bg-[#F5F5F5]/12.5 transition-colors"
    : "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#bbb] text-sm hover:bg-[#707070]/15 transition-colors"

  return (
    <div className="relative w-full">
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => { hoverRef.current = true }}
        onMouseLeave={() => { hoverRef.current = false }}
        onScroll={normalize}
        className="w-full overflow-x-auto overscroll-x-contain no-scrollbar cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="flex gap-4 w-max py-1">
          {loop.map((c, i) => (
            <ProjectCard
              key={`${c.title}-${i}`}
              title={c.title}
              description={c.description}
              technologies={c.technologies}
              src={c.src}
              comingSoon={c.comingSoon}
              onClick={() => openIfClick(c)}
            />
          ))}
        </div>
      </div>

      <button type="button" aria-label="Previous projects" onClick={() => step(-1)} className={`${arrowStyle} left-1`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L5 8l5 5" /></svg>
      </button>
      <button type="button" aria-label="Next projects" onClick={() => step(1)} className={`${arrowStyle} right-1`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M6 3l5 5-5 5" /></svg>
      </button>

      {selected && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/70" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[101] w-full max-w-[560px] max-h-[85vh] overflow-hidden rounded-2xl border border-[#333] bg-primary text-secondary"
          >
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 grid place-items-center w-8 h-8 rounded-full bg-primary/50 backdrop-blur-sm border border-secondary/20 text-secondary hover:bg-primary cursor-pointer transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 4l8 8M12 4l-8 8" /></svg>
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-6">
              <img className="rounded-xl w-full max-h-[280px] object-cover object-top bg-black/20 mb-4" src={selected.src} alt={`${selected.title} screenshot`} />

              <h3 className="font-medium text-xl mb-3">{selected.title}</h3>
            <p className="font-light text-sm mb-5">{selected.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selected.technologies.map((t) => <span className={techStyle} key={t}>{t}</span>)}
            </div>

            <div className="flex flex-wrap gap-3">
              {selected.comingSoon ? (
                <Link to="/coming-soon" className={btnStyle}>Coming soon</Link>
              ) : selected.link ? (
                <a href={selected.link} className={btnStyle}>
                  Visit
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.91715 9.08278C2.76093 8.92654 2.76093 8.67326 2.91715 8.5171L8.23431 3.1999H4.79999C4.57908 3.1999 4.39999 3.02081 4.39999 2.7999C4.39999 2.57899 4.57908 2.3999 4.79999 2.3999H9.19999C9.30607 2.3999 9.40783 2.44205 9.48287 2.51706C9.55783 2.59208 9.59999 2.69381 9.59999 2.7999V7.19991C9.59999 7.42082 9.42087 7.59991 9.19999 7.59991C8.97911 7.59991 8.79999 7.42082 8.79999 7.19991V3.76559L3.48283 9.08278C3.32662 9.23894 3.07336 9.23894 2.91715 9.08278Z" fill="currentColor"/></svg>
                </a>
              ) : null}
              {selected.github && (
                <a href={selected.github} className={btnStyle}>GitHub</a>
              )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default ProjectsCarousel
