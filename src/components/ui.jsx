import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

/* ---------- Logo ---------- */
export function LogoMark({ size = 22 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 13.7-5.6" />
        <path d="M18.4 2.4v4.2h-4.2" />
        <path d="M20 12a8 8 0 0 1-13.7 5.6" />
        <path d="M5.6 21.6v-4.2h4.2" />
      </g>
    </svg>
  )
}

export function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Akudo home">
      <LogoMark />
      <span>akudo</span>
    </Link>
  )
}

/* ---------- Buttons ---------- */
function Magnetic({ children, strength = 0.25, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className || ''}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  )
}

export function Button({
  to,
  href,
  onClick,
  variant = 'dark',
  size = 'md',
  icon = 'chevron',
  magnetic = false,
  type = 'button',
  disabled,
  children,
  className = '',
}) {
  const Icon = icon === 'arrow' ? ArrowRight : icon === 'chevron' ? ChevronRight : null
  const inner = (
    <>
      <span className="btn__shine" aria-hidden="true" />
      <span className="btn__label">{children}</span>
      {Icon && (
        <span className="btn__icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2.2} />
        </span>
      )}
    </>
  )
  const cls = `btn btn--${variant} btn--${size} ${className}`
  let el
  if (to) el = <Link to={to} className={cls}>{inner}</Link>
  else if (href) el = <a href={href} className={cls}>{inner}</a>
  else
    el = (
      <button type={type} onClick={onClick} className={cls} disabled={disabled}>
        {inner}
      </button>
    )
  return magnetic ? <Magnetic>{el}</Magnetic> : el
}

export function TextLink({ to, children }) {
  return (
    <Link to={to} className="text-link">
      <span>{children}</span>
      <ArrowRight size={15} />
    </Link>
  )
}

/* ---------- Pills / eyebrows ---------- */
export function Pill({ children, to, variant = 'mint' }) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight size={13} strokeWidth={2.4} className="pill__arrow" />
    </>
  )
  if (to)
    return (
      <Link to={to} className={`pill pill--${variant}`}>
        {content}
      </Link>
    )
  return <span className={`pill pill--${variant}`}>{content}</span>
}

export function Eyebrow({ children, light }) {
  return <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{children}</p>
}

/* ---------- Motion helpers ---------- */
const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 26, className, as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </M>
  )
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
export const staggerChild = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export function Stagger({ children, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </M>
  )
}

/** Splits a headline into words that rise in one after another. */
export function SplitHeading({ text, as = 'h1', className, delay = 0 }) {
  const M = motion[as]
  // observe the (unclipped) heading itself; the word spans start outside their overflow mask
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const lines = text.split('\n')
  let i = 0
  return (
    <M ref={ref} className={className} aria-label={text.replace('\n', ' ')}>
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.split(' ').map((w, wi) => {
            const d = delay + i++ * 0.06
            return (
              <span key={wi}>
                {wi > 0 && ' '}
                <span className="split-word">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: inView ? '0%' : '110%' }}
                  transition={{ duration: 0.9, delay: d, ease }}
                >
                  {w}
                </motion.span>
                </span>
              </span>
            )
          })}
        </span>
      ))}
    </M>
  )
}

export function CountUp({ to, from = 0, duration = 1.6, format = (v) => Math.round(v).toLocaleString() }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => {
    if (!inView) return
    const c = animate(from, to, {
      duration,
      ease,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => c.stop()
  }, [inView, to, from, duration, format])
  return <span ref={ref}>{format(from)}</span>
}

/** Card that tilts toward the pointer. */
export function Tilt({ children, className, max = 8 }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 16 })
  const sry = useSpring(ry, { stiffness: 180, damping: 16 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ eyebrow, title, sub, align = 'center', light }) {
  return (
    <div className={`section-head section-head--${align} ${light ? 'section-head--light' : ''}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <SplitHeading as="h2" text={title} className="h2" />
      {sub && (
        <Reveal delay={0.15}>
          <p className="section-head__sub">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Flag({ code, size = 40, name }) {
  return (
    <span className="flag" style={{ width: size, height: size }}>
      <img src={`/flags/${code}.svg`} alt={name || code.toUpperCase()} loading="lazy" />
    </span>
  )
}

export function Illustrative({ children = 'Illustrative' }) {
  return <span className="illustrative">{children}</span>
}
