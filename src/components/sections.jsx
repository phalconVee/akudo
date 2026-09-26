import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
  ArrowRight,
  ArrowUpRight,
  Link2,
  Lock,
  BadgeCheck,
  Scale,
  Handshake,
  History,
  Timer,
  GraduationCap,
  ChevronDown,
  Smartphone,
} from 'lucide-react'
import { CORRIDORS, FEATURE_TILES } from '../data/content'
import { Flag, Reveal, Stagger, staggerChild, Tilt, LogoMark, Illustrative, SplitHeading, Eyebrow } from './ui'

/* ---------- Activity chart (purple pill bars) ---------- */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DATA = {
  Week: { total: '6 swaps', sub: 'completed this week', vals: [2, 4, 3, 5, 7, 3, 1] },
  Month: { total: '23 swaps', sub: 'completed this month', vals: [4, 6, 4, 5, 7, 4, 3] },
}

export function ActivityChart() {
  const [range, setRange] = useState('Month')
  const [hover, setHover] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const d = DATA[range]

  return (
    <div className="activity" ref={ref}>
      <div className="activity__head">
        <AnimatePresence mode="wait">
          <motion.strong
            key={d.total}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {d.total}
          </motion.strong>
        </AnimatePresence>
        <span className="activity__badge">Preview</span>
        <span className="activity__sub">{d.sub}</span>
        <motion.button
          type="button"
          className="activity__toggle"
          whileTap={{ scale: 0.94 }}
          onClick={() => setRange((r) => (r === 'Month' ? 'Week' : 'Month'))}
        >
          {range} <ArrowUpRight size={14} />
        </motion.button>
      </div>
      <div className="activity__grid" onMouseLeave={() => setHover(null)}>
        {DAYS.map((day, di) => (
          <div
            key={day}
            className={`activity__col ${hover === di ? 'is-hover' : ''} ${hover !== null && hover !== di ? 'is-dim' : ''}`}
            onMouseEnter={() => setHover(di)}
          >
            <AnimatePresence>
              {hover === di && (
                <motion.span
                  className="activity__tip"
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                >
                  {d.vals[di]} swaps
                </motion.span>
              )}
            </AnimatePresence>
            {Array.from({ length: 7 }).map((_, ci) => {
              const level = 6 - ci // 0 = bottom cell
              const on = level < d.vals[di]
              return (
                <motion.span
                  key={ci}
                  className={`activity__cell ${on ? 'is-on' : ''}`}
                  initial={false}
                  animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0.3, opacity: 0 }}
                  transition={{ delay: inView ? di * 0.05 + level * 0.04 : 0, duration: 0.45 }}
                />
              )
            })}
            <span className="activity__day">{day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Swap tickets (tilted cards) ---------- */
export function Tickets() {
  return (
    <div className="tickets">
      <div className="ticket-pos ticket-pos--back">
        <Tilt className="ticket ticket--back" max={6}>
          <div className="ticket__chip" />
          <span className="ticket__brand">
            <LogoMark size={14} /> SwapLock
          </span>
        </Tilt>
      </div>
      <div className="ticket-pos ticket-pos--front">
        <Tilt className="ticket ticket--front" max={10}>
          <span className="ticket__glare" />
          <span className="ticket__chip ticket__chip--sm" />
          <span className="ticket__side">USD side · sample</span>
          <strong className="ticket__amt">$750.00</strong>
          <span className="ticket__name">Adaeze N.</span>
          <span className="ticket__brand">
            <LogoMark size={18} /> akudo
          </span>
        </Tilt>
      </div>
    </div>
  )
}

/* ---------- Feature tiles ---------- */
const ICONS = {
  link: Link2,
  lock: Lock,
  badge: BadgeCheck,
  scale: Scale,
  handshake: Handshake,
  history: History,
  timer: Timer,
  grad: GraduationCap,
}

export function FeatureGrid({ tiles = FEATURE_TILES }) {
  return (
    <Stagger className="tiles">
      {tiles.map((t) => {
        const Icon = ICONS[t.icon]
        return (
          <motion.div key={t.label} variants={staggerChild}>
            <Link to={t.to} className="tile">
              <span className="tile__icon">
                <Icon size={22} strokeWidth={1.7} />
              </span>
              <span className="tile__body">
                <small>{t.label}</small>
                <span>{t.title}</span>
              </span>
              <ArrowRight className="tile__arrow" size={17} />
            </Link>
          </motion.div>
        )
      })}
    </Stagger>
  )
}

/* ---------- 2/2 stat block + QR ---------- */
function Fraction() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const a = setTimeout(() => setN(1), 500)
    const b = setTimeout(() => setN(2), 1200)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [inView])
  return (
    <div className="fraction" ref={ref} aria-label="2 of 2">
      <span className="fraction__num">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={n}
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            {n}
          </motion.span>
        </AnimatePresence>
      </span>
      <sup>/2</sup>
    </div>
  )
}

export function StatBlock() {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/waitlist` : '/waitlist'
  return (
    <Reveal className="stat">
      <div className="stat__left">
        <Fraction />
        <p>
          sides must be confirmed funded before anything is released. Not one. Not most. Both, on every single
          swap.
        </p>
      </div>
      <div className="stat__right">
        <p className="stat__lead">
          We&rsquo;re building Akudo so the swaps you already make with your community come with accountability
          built in.
        </p>
        <motion.div className="qr" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
          <div className="qr__code">
            <QRCodeSVG value={url} size={132} fgColor="#0B1F1A" bgColor="#ffffff" level="M" />
            <span className="qr__scan" aria-hidden="true" />
          </div>
          <div className="qr__text">
            <h3>Scan to join the waitlist</h3>
            <p>Point your phone camera here to save your spot for early access.</p>
            <span className="qr__platforms">
              <Smartphone size={16} /> iOS &amp; Android coming soon
            </span>
          </div>
        </motion.div>
        <p className="stat__tag">
          Your rate.
          <br />
          Your people.
          <br />
          Both sides locked in.
        </p>
      </div>
    </Reveal>
  )
}

/* ---------- Corridor flags ---------- */
export function Corridors() {
  return (
    <Stagger className="corridors">
      {CORRIDORS.map((c) => (
        <motion.div
          key={c.code}
          variants={staggerChild}
          className={`corridor ${c.status === 'First corridor' ? 'is-live' : ''}`}
          whileHover={{ y: -8, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          tabIndex={0}
        >
          <Flag code={c.code} name={c.name} size={104} />
          <span className="corridor__tip">
            <strong>{c.name}</strong>
            {c.status}
          </span>
        </motion.div>
      ))}
    </Stagger>
  )
}

/* ---------- Accordion ---------- */
export function Accordion({ items, openFirst = false }) {
  const [open, setOpen] = useState(openFirst ? 0 : null)
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className={`acc ${isOpen ? 'is-open' : ''}`}>
            <button type="button" className="acc__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{it.q}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="acc__icon">
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="acc__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Inner-page hero ---------- */
export function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="page-hero">
      <div className="rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <SplitHeading text={title} className="h1 page-hero__title" />
      {sub && (
        <Reveal delay={0.2}>
          <p className="page-hero__sub">{sub}</p>
        </Reveal>
      )}
      {children && <Reveal delay={0.3}>{children}</Reveal>}
    </section>
  )
}

export { Illustrative }
