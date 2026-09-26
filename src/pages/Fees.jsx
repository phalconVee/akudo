import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Handshake, RotateCcw, Info } from 'lucide-react'
import { PageHero } from '../components/sections'
import { Reveal, SectionHead, Stagger, staggerChild } from '../components/ui'
import { SAMPLE_RATE } from '../data/content'

const MODELS = {
  flat: { label: 'Flat per swap', desc: 'One fixed fee per side, whatever the size.', calc: () => 5 },
  percent: {
    label: 'Small percentage',
    desc: 'A small share of the amount per side, with a floor and a cap.',
    calc: (usd) => Math.min(25, Math.max(2, usd * 0.005)),
  },
}

function Calculator() {
  const [usd, setUsd] = useState(1000)
  const [model, setModel] = useState('flat')
  const fee = MODELS[model].calc(usd)
  const ngn = usd * SAMPLE_RATE
  const pct = ((usd - 100) / (10000 - 100)) * 100

  return (
    <div className="calc">
      <div className="calc__controls">
        <div className="segmented" role="tablist" aria-label="Fee model">
          {Object.entries(MODELS).map(([k, m]) => (
            <button key={k} role="tab" aria-selected={model === k} className={model === k ? 'is-on' : ''} onClick={() => setModel(k)}>
              {model === k && <motion.span layoutId="seg" className="segmented__bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{m.label}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={model} className="muted small" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {MODELS[model].desc}
          </motion.p>
        </AnimatePresence>

        <label className="calc__label" htmlFor="amt">
          Swap amount
          <strong>${usd.toLocaleString()}</strong>
        </label>
        <input
          id="amt"
          type="range"
          min={100}
          max={10000}
          step={50}
          value={usd}
          onChange={(e) => setUsd(+e.target.value)}
          className="range range--dark"
          style={{ '--p': `${pct}%` }}
        />
        <div className="calc__scale">
          <span>$100</span>
          <span>$10,000</span>
        </div>
      </div>

      <div className="calc__out">
        <div className="calc__row">
          <span>You send in the US</span>
          <strong>${usd.toLocaleString()}</strong>
        </div>
        <div className="calc__row">
          <span>Counterparty sends in Nigeria</span>
          <strong>₦{ngn.toLocaleString()}</strong>
        </div>
        <div className="calc__row calc__row--hl">
          <span>Example Akudo fee (your side)</span>
          <AnimatePresence mode="popLayout">
            <motion.strong
              key={fee.toFixed(2)}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
            >
              ${fee.toFixed(2)}
            </motion.strong>
          </AnimatePresence>
        </div>
        <div className="calc__row">
          <span>Taken from the rate</span>
          <strong>$0.00</strong>
        </div>
        <p className="calc__note">
          <Info size={14} /> Illustrative only. Pricing is not final and uses a sample rate of ₦{SAMPLE_RATE.toLocaleString()}{' '}
          / $1. Final fees will be shown before you commit to any swap.
        </p>
      </div>
    </div>
  )
}

const PRINCIPLES = [
  { icon: Eye, title: 'Shown upfront', body: 'You’ll see the exact fee before you lock a swap. No surprises after.' },
  { icon: Handshake, title: 'Never inside the rate', body: 'The rate is agreed between the two of you. Akudo doesn’t add a margin to it.' },
  { icon: RotateCcw, title: 'Nothing for expired swaps', body: 'Our plan: if a swap expires unfunded, there’s no fee for it.' },
]

export default function Fees() {
  return (
    <>
      <PageHero
        eyebrow="Fees"
        title={'A simple fee for\nthe lock. That’s it.'}
        sub="Akudo is designed to earn from coordinating the swap, not from the rate you and your counterparty agree."
      />
      <section className="section section--flush-top">
        <Stagger className="fee-principles">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={staggerChild} className="fee-principle" whileHover={{ y: -6 }}>
              <span className="principle__icon">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.div>
          ))}
        </Stagger>
      </section>
      <section className="section">
        <SectionHead
          eyebrow="Explore the models"
          title={'Two options we’re\nweighing up'}
          sub="We haven’t set pricing yet. Play with the two models we’re considering, then tell us which you prefer when you join the waitlist."
        />
        <Reveal>
          <Calculator />
        </Reveal>
      </section>
    </>
  )
}
