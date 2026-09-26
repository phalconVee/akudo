import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'
import { Logo, Button } from './ui'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const active = NAV_LINKS.find((l) => pathname.startsWith(l.to))?.to
  const highlight = hovered ?? active

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Logo />
        <nav className="nav__links" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="nav__link"
              onMouseEnter={() => setHovered(l.to)}
            >
              {highlight === l.to && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav__pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="nav__text">{l.label}</span>
              {active === l.to && <span className="nav__dot" />}
            </NavLink>
          ))}
        </nav>
        <div className="nav__cta">
          <Button to="/waitlist" variant="dark" size="sm" icon={null}>
            Join the waitlist
          </Button>
        </div>
        <button
          className="nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'x' : 'm'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <NavLink to={l.to} className="mobile-menu__link">
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <Button to="/waitlist" variant="dark" className="mobile-menu__cta">
              Join the waitlist
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
