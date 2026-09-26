import { motion } from 'framer-motion'
import { Eye, Handshake, RotateCcw, Info } from 'lucide-react'
import { PageHero } from '../components/sections'
import { Reveal, SectionHead, Stagger, staggerChild } from '../components/ui'

const PRINCIPLES = [
  { icon: Eye, title: 'No platform fees', body: 'Akudo does not collect a platform fee to create, accept, or complete a swap.' },
  { icon: Handshake, title: 'Open by design', body: 'The platform is being designed for broad access, so fees do not become the thing that keeps people out.' },
  { icon: RotateCcw, title: 'No hidden charges', body: 'We do not hide fees inside the rate, add a spread, or surprise you after a swap is created.' },
]

const FEE_ROWS = [
  ['Platform fee today', '$0.00'],
  ['Hidden spread inside the rate', '$0.00'],
  ['Fee for an expired, unfunded swap', '$0.00'],
]

export default function Fees() {
  return (
    <>
      <PageHero
        eyebrow="Fees"
        title={'No platform fees.\nNo hidden charges.'}
        sub="Akudo is designed as an open trust layer for peer swaps. We do not collect hidden fees, add spreads, or bury costs inside the rate."
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
          eyebrow="Current fee policy"
          title={'Clear pricing starts\nwith zero surprises'}
          sub="The rate you see should be the rate you agreed. Nothing extra should be tucked away in the exchange."
        />
        <Reveal>
          <div className="calc">
            <div className="calc__controls">
              <p className="muted">
                Akudo is focused on trust, safety and access. The rate remains the rate you and your
                counterparty agree together.
              </p>
              <p className="muted small">
                No platform fee is deducted from either side, and no hidden spread is bundled into a worse exchange rate.
              </p>
            </div>

            <div className="calc__out">
              {FEE_ROWS.map(([label, value]) => (
                <div className="calc__row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
              <p className="calc__note">
                <Info size={14} /> Akudo is pre-launch and not currently offering live financial services.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
