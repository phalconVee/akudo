import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, ChevronDown, Check } from 'lucide-react'
import { Button, Pill, Reveal, SplitHeading, TextLink, Tilt, Eyebrow } from '../components/ui'
import SwapWidget from '../components/SwapWidget'
import { ActivityChart, Corridors, FeatureGrid, StatBlock, Tickets } from '../components/sections'
import { SectionHead } from '../components/ui'
import { FEATURE_TAGS, USE_CASES } from '../data/content'

const SLIDES = [
  'Built for the swaps you already make in your community group chats, now with both sides locked in before anything moves.',
  'Dollars stay in the US. Naira stays in Nigeria. Two domestic payments, coordinated so nobody has to go first.',
]

function Hero() {
  return (
    <section className="hero">
      <div className="guides" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="rings rings--hero" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Pill to="/waitlist" variant="solid">
          Coming soon · US ⇄ Nigeria
        </Pill>
      </motion.div>
      <SplitHeading text={'Peer swaps with\nboth sides locked in'} className="hero__title" delay={0.15} />
      <motion.p
        className="hero__sub"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        Akudo is a trust layer for dollar ⇄ naira swaps between people. You agree the rate. Both sides fund. Then
        both sides are released together.
      </motion.p>
      <motion.div
        className="hero__actions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <Button to="/waitlist" variant="ring" magnetic>
          Join the waitlist
        </Button>
        <TextLink to="/how-it-works">See how it works</TextLink>
      </motion.div>
    </section>
  )
}

function Marquee() {
  const row = [...USE_CASES, ...USE_CASES]
  return (
    <div className="marquee" aria-label="What people swap for">
      <div className="marquee__track">
        {row.map((u, i) => (
          <span key={i} className="marquee__item">
            <i /> {u}
          </span>
        ))}
      </div>
    </div>
  )
}

function PhotoCards() {
  const [slide, setSlide] = useState(0)
  const [dir, setDir] = useState('USD → NGN')
  const [menu, setMenu] = useState(false)
  const { scrollYProgress } = useScroll()
  const imgY = useTransform(scrollYProgress, [0, 0.4], ['0%', '8%'])

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="photos">
      <Reveal className="photo photo--portrait" y={40}>
        <motion.img style={{ y: imgY, scale: 1.12 }} src="/images/hero-portrait.jpg" alt="A smiling young woman" />
        <div className="photo__dropdown">
          <button type="button" onClick={() => setMenu((m) => !m)} aria-expanded={menu}>
            {dir}
            <motion.span animate={{ rotate: menu ? 180 : 0 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
          <AnimatePresence>
            {menu && (
              <motion.ul
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
              >
                {['USD → NGN', 'NGN → USD'].map((o) => (
                  <li key={o}>
                    <button
                      type="button"
                      onClick={() => {
                        setDir(o)
                        setMenu(false)
                      }}
                    >
                      {o} {o === dir && <Check size={13} />}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <Tilt className="photo__chip" max={12}>
          <AnimatePresence mode="wait">
            <motion.strong
              key={dir}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {dir === 'USD → NGN' ? '$2,500.00' : '₦3,750,000'}
            </motion.strong>
          </AnimatePresence>
          <span>Swap locked · sample</span>
        </Tilt>
      </Reveal>

      <Reveal className="photo photo--wide" y={40} delay={0.1}>
        <motion.img
          style={{ y: imgY, scale: 1.12 }}
          src="/images/hero-friends.jpg"
          alt="Friends laughing together outdoors"
        />
        <div className="photo__shade" />
        <div className="photo__slides">
          <div className="dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === slide ? 'is-on' : ''}
                aria-label={`Show message ${i + 1}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={slide}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.5 }}
            >
              {SLIDES[slide]}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.div
          className="recent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
          whileHover={{ y: -4 }}
        >
          <h4>Recent swap</h4>
          <div className="recent__row">
            <span className="mono">#SWP-1042</span>
            <span>School fees · sample</span>
          </div>
          <div className="recent__row">
            <span className="recent__status">
              <span className="recent__dot">
                <ArrowUp size={10} strokeWidth={3} />
              </span>
              Released together
            </span>
            <span>Sep 21, 2026</span>
          </div>
        </motion.div>
      </Reveal>
    </div>
  )
}

function FeaturesPanel() {
  return (
    <section className="panel features">
      <div className="features__left">
        <Reveal>
          <Pill to="/how-it-works" variant="outline">
            Our features
          </Pill>
        </Reveal>
        <SplitHeading as="h2" text={'Built for how the\ndiaspora already swaps'} className="h2 features__title" />
        <Reveal delay={0.15}>
          <p className="muted">
            Keep the relationships and rates you already have. Akudo adds the missing piece: a shared record, a clear
            window, and a release that only happens when both sides are in.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="tags">
          {FEATURE_TAGS.map((t) => (
            <motion.span key={t} className="tag" whileHover={{ y: -2 }}>
              {t}
            </motion.span>
          ))}
        </Reveal>
        <Reveal delay={0.25}>
          <Tickets />
        </Reveal>
      </div>
      <Reveal className="features__right" delay={0.1}>
        <img src="/images/feature-laptop.jpg" alt="A woman using a laptop on her sofa" />
        <ActivityChart />
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <PhotoCards />

      <section className="section">
        <SectionHead
          eyebrow="Swap with someone you know"
          title={'Two domestic payments.\nOne locked handshake.'}
          sub="Set the amount and the rate you agreed, pick your counterparty, and swipe to lock. Try it. This demo walks through a swap from lock to release."
        />
        <Reveal className="mint-panel">
          <SwapWidget />
          <div className="mint-panel__corridors">
            <Eyebrow>Starting with the US ⇄ Nigeria corridor</Eyebrow>
            <Corridors />
          </div>
        </Reveal>
      </section>

      <FeaturesPanel />

      <section className="section">
        <SectionHead
          eyebrow="Why Akudo"
          title={'Accountability for\nevery peer swap'}
          sub="Everything a group-chat swap is missing: verified people, a shared record, clear deadlines and a real process when something goes wrong."
        />
        <FeatureGrid />
      </section>

      <section className="section section--tight">
        <StatBlock />
      </section>
    </>
  )
}
