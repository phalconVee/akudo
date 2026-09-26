import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock, Link2, Search, AlertTriangle, Pause, Play } from 'lucide-react'
import { PageHero } from '../components/sections'
import { Button, Reveal, SectionHead, Stagger, staggerChild, Flag, SplitHeading, Eyebrow, assetPath } from '../components/ui'
import { STEPS, WHAT_IFS } from '../data/content'

// State of each side for each step index
const SIDE_STATE = [
  { us: 'Agreed', ng: 'Agreed' },
  { us: 'Accepted', ng: 'Accepted' },
  { us: 'Funded', ng: 'Funding…' },
  { us: 'Confirmed', ng: 'Confirmed' },
  { us: 'Released', ng: 'Released' },
]

function Stepper() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), 3800)
    return () => clearTimeout(t)
  }, [active, playing])

  const s = SIDE_STATE[active]
  return (
    <div className="stepper-wrap" id="steps">
      <div className="steps">
        {STEPS.map((st, i) => (
          <button
            key={st.key}
            type="button"
            className={`step ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
            onClick={() => {
              setActive(i)
              setPlaying(false)
            }}
          >
            <span className="step__num">{i < active ? <Check size={14} strokeWidth={3} /> : i + 1}</span>
            <span className="step__text">
              <strong>{st.short}</strong>
              <AnimatePresence initial={false}>
                {i === active && (
                  <motion.span
                    className="step__body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {st.body}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            {i === active && playing && (
              <motion.span
                className="step__timer"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.8, ease: 'linear' }}
              />
            )}
          </button>
        ))}
        <button type="button" className="steps__play" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? 'Pause walkthrough' : 'Play walkthrough'}
        </button>
      </div>

      <div className="viz">
        <div className="viz__header">
          <span className="mono">#SWP-2207 · sample</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              className="viz__stage"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {STEPS[active].title}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="viz__sides">
          {[
            { code: 'us', label: 'US side', amt: '$1,200.00', st: s.us },
            { code: 'ng', label: 'Nigeria side', amt: '₦1,800,000', st: s.ng },
          ].map((side, i) => (
            <motion.div key={side.code} className="viz__side" layout>
              <Flag code={side.code} size={36} />
              <div>
                <small>{side.label}</small>
                <strong>{side.amt}</strong>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={side.st}
                  className={`state state--${side.st.replace('…', '').toLowerCase()}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <i />
                  {side.st}
                </motion.span>
              </AnimatePresence>
              {i === 0 && (
                <div className="viz__bridge" aria-hidden="true">
                  <motion.span
                    animate={{
                      background: active >= 3 ? '#5CE8A4' : 'rgba(255,255,255,0.18)',
                      boxShadow: active >= 3 ? '0 0 18px rgba(92,232,164,.8)' : '0 0 0 rgba(0,0,0,0)',
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="viz__bar">
          {STEPS.map((_, i) => (
            <motion.span key={i} animate={{ opacity: i <= active ? 1 : 0.2, scaleY: i === active ? 1.6 : 1 }} />
          ))}
        </div>
        <p className="viz__note">
          <Clock size={14} /> Time window: 24 hours · {active < 4 ? 'open' : 'complete'}
        </p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={'Nobody goes first.\nEverybody goes together.'}
        sub="Akudo coordinates two domestic payments so a swap only completes when both people have done their part."
      />

      <section className="section section--flush-top">
        <Reveal>
          <Stepper />
        </Reveal>
      </section>

      <section className="section">
        <SectionHead eyebrow="Two ways in" title={'Start where your\nswaps start today'} />
        <Stagger className="ways">
          <motion.div variants={staggerChild} className="way way--dark">
            <span className="way__icon">
              <Link2 size={22} />
            </span>
            <span className="way__tag">Phase 1 · first</span>
            <h3>Bring your match</h3>
            <p>
              Already agreed a swap in a group chat? Create a Swap Link with the terms and share it. Your counterparty
              accepts, both sides fund, and Akudo coordinates the release.
            </p>
          </motion.div>
          <motion.div variants={staggerChild} className="way">
            <span className="way__icon">
              <Search size={22} />
            </span>
            <span className="way__tag">Phase 2 · planned</span>
            <h3>Find a match</h3>
            <p>
              Post an offer with your amount, rate and window on the Rate Board, and connect with verified members who
              want the other side of the same swap.
            </p>
          </motion.div>
        </Stagger>
      </section>

      <section className="section">
        <SectionHead
          eyebrow="What if…"
          title={'Built for the moments\ngroup chats can’t handle'}
        />
        <Stagger className="whatifs">
          {WHAT_IFS.map((w, i) => (
            <motion.div key={w.q} variants={staggerChild} className="whatif" whileHover={{ y: -6 }}>
              <span className="whatif__n">0{i + 1}</span>
              <AlertTriangle size={20} className="whatif__icon" />
              <h3>{w.q}</h3>
              <p>{w.a}</p>
            </motion.div>
          ))}
        </Stagger>
      </section>

      <section className="section">
        <div className="split">
          <Reveal className="split__img">
            <img src={assetPath('/images/family.jpg')} alt="A family sitting together on a picnic blanket" />
          </Reveal>
          <div className="split__text">
            <Reveal>
              <Eyebrow>Made for two homes</Eyebrow>
            </Reveal>
            <SplitHeading as="h2" className="h2" text={'For the people\nwaiting on the other side'} />
            <Reveal delay={0.15}>
              <p className="muted">
                Rent for a parent. Fees for a sibling. A project that’s been years in the making. When the swap is for
                someone you love, you shouldn’t have to rely on hope. Akudo gives both people a clear view of where the
                swap stands, from the moment it’s agreed to the moment it’s released.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Button to="/safety" variant="dark" icon="arrow">
                How we build for trust
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
