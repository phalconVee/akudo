import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Safety from './pages/Safety'
import Fees from './pages/Fees'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Waitlist from './pages/Waitlist'
import Legal from './pages/Legal'
import { Button, SplitHeading } from './components/ui'

const TITLES = {
  '/': 'Akudo | Peer swaps, both sides locked in',
  '/how-it-works': 'How it works · Akudo',
  '/safety': 'Trust & Safety · Akudo',
  '/fees': 'Fees · Akudo',
  '/about': 'About · Akudo',
  '/faq': 'FAQ · Akudo',
  '/waitlist': 'Join the waitlist · Akudo',
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] || 'Akudo'
    if (hash) {
      // wait for the page transition before scrolling to an anchor
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 450)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return <motion.div className="progress" style={{ scaleX }} />
}

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

function NotFound() {
  return (
    <section className="page-hero notfound">
      <SplitHeading text={'This swap link\ndoesn’t exist'} className="h1" />
      <p className="page-hero__sub">The page you’re looking for has moved or never existed.</p>
      <Button to="/" variant="ring">
        Back to home
      </Button>
    </section>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <ProgressBar />
      <a href="#content" className="skip">
        Skip to content
      </a>
      <div className="frame">
        <div className="sheet">
          <Nav />
          <div id="content">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Page><Home /></Page>} />
                <Route path="/how-it-works" element={<Page><HowItWorks /></Page>} />
                <Route path="/safety" element={<Page><Safety /></Page>} />
                <Route path="/fees" element={<Page><Fees /></Page>} />
                <Route path="/about" element={<Page><About /></Page>} />
                <Route path="/faq" element={<Page><FAQ /></Page>} />
                <Route path="/waitlist" element={<Page><Waitlist /></Page>} />
                <Route path="/legal/:doc" element={<Page><Legal /></Page>} />
                <Route path="*" element={<Page><NotFound /></Page>} />
              </Routes>
            </AnimatePresence>
          </div>
          <Footer />
        </div>
      </div>
      <p className="frame__note">
        Pre-launch concept · <Link to="/legal/disclosures">Disclosures</Link>
      </p>
    </MotionConfig>
  )
}
