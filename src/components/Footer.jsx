import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { Button, SplitHeading, Reveal, LogoMark } from './ui'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      ['How it works', '/how-it-works'],
      ['Swap Links', '/how-it-works#steps'],
      ['Fees', '/fees'],
      ['Join the waitlist', '/waitlist'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Akudo', '/about'],
      ['Why the name', '/about#name'],
      ['Roadmap', '/about#roadmap'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['FAQs', '/faq'],
      ['Safe swapping tips', '/safety#tips'],
      ['Report a concern', '/safety#report'],
    ],
  },
  {
    title: 'Trust & Legal',
    links: [
      ['Trust & Safety', '/safety'],
      ['Terms (draft)', '/legal/terms'],
      ['Privacy (draft)', '/legal/privacy'],
      ['Disclosures', '/legal/disclosures'],
    ],
  },
]

function Social({ label, children }) {
  return (
    <motion.a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="social"
      aria-label={`${label} (coming soon)`}
      whileHover={{ y: -3, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </motion.a>
  )
}

function CTA() {
  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 })
  const sy = useSpring(my, { stiffness: 80, damping: 20 })
  const bg = useMotionTemplate`radial-gradient(520px circle at ${sx}% ${sy}%, rgba(92,232,164,0.22), transparent 60%)`
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }
  return (
    <div className="cta" onMouseMove={onMove}>
      <motion.div className="cta__glow" style={{ background: bg }} aria-hidden="true" />
      <SplitHeading as="h2" className="cta__title" text={'Your swap. Your rate.\nBoth sides locked in.'} />
      <Reveal delay={0.3} className="cta__action">
        <Button to="/waitlist" variant="mint" magnetic>
          Join the waitlist
        </Button>
        <p className="cta__note">Akudo is in development. No services are offered yet.</p>
      </Reveal>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <CTA />
      <Reveal className="footer-card" y={40}>
        <div className="footer-card__grid">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h4 className="footer-card__title">{c.title}</h4>
              <ul>
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="footer-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-card__bottom">
          <Button to="/waitlist" variant="green" icon={null}>
            Get early access
          </Button>
          <div className="footer-card__badges">
            <span className="store-badge">
              <Smartphone size={20} />
              <span>
                <small>Coming soon to</small>
                iOS
              </span>
            </span>
            <span className="store-badge">
              <Smartphone size={20} />
              <span>
                <small>Coming soon to</small>
                Android
              </span>
            </span>
            <Social label="X">
              <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
            </Social>
            <Social label="Instagram">
              <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1-3.4.2-5 1.8-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.2 3.4 1.8 5 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.4-.2 5-1.8 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.2-3.4-1.8-5-5.2-5.2C14.7 3 14.4 3 12 3Zm0 1.6c2.4 0 2.6 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7.1 1 .1 1.2.1 3.6s0 2.6-.1 3.6c-.1 2.4-1.3 3.6-3.7 3.7-1 .1-1.2.1-3.6.1s-2.6 0-3.6-.1c-2.4-.1-3.6-1.3-3.7-3.7-.1-1-.1-1.2-.1-3.6s0-2.6.1-3.6c.1-2.4 1.3-3.6 3.7-3.7 1-.1 1.2-.1 3.6-.1Z" />
            </Social>
            <Social label="LinkedIn">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v4.9h-4v-11Z" />
            </Social>
          </div>
        </div>

        <div className="footer-card__legal">
          <span className="footer-card__brand">
            <LogoMark size={16} /> © {new Date().getFullYear()} Akudo
          </span>
          <p>
            Akudo is a product in development and is not currently offering any services. Nothing on this site is an
            offer or solicitation of financial services. Akudo is not a bank and does not exchange currency or set
            rates. Features described are planned, may change, and are subject to legal review before launch. Figures,
            names and rates shown are illustrative.
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
