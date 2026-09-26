import { motion } from 'framer-motion'
import { Check, X, Fingerprint, Lock, Timer, Scale, Eye, ShieldCheck, Flag as FlagIcon } from 'lucide-react'
import { PageHero } from '../components/sections'
import { Reveal, SectionHead, Stagger, staggerChild, SplitHeading, Eyebrow, Button } from '../components/ui'

const IS = [
  'A coordination layer for swaps two people have already agreed',
  'A shared, time-stamped record of each swap',
  'Identity verification for every member',
  'A published process for pausing and reviewing a swap',
]
const ISNT = [
  'A bank, a wallet or an investment product',
  'A currency exchange. We never buy, sell or convert',
  'A rate setter. The two people agree the rate',
  'Available yet. Akudo is still in development',
]

const PRINCIPLES = [
  { icon: Fingerprint, title: 'Verified before you swap', body: 'Every member is identity-verified before they can create or accept a Swap Link.' },
  { icon: Lock, title: 'Both sides first', body: 'A swap is only released once both sides are confirmed funded. Never one side alone.' },
  { icon: Timer, title: 'Clear time windows', body: 'Each swap has a deadline. If it isn’t fully funded in time, it expires and the funded side is returned.' },
  { icon: Scale, title: 'A real dispute process', body: 'Either person can pause a swap. A person on our team reviews the record from both sides.' },
  { icon: Eye, title: 'Ongoing monitoring', body: 'We plan to screen activity for misuse and act on it, including closing profiles that break the rules.' },
  { icon: ShieldCheck, title: 'Privacy by default', body: 'Your counterparty sees what they need for the swap, not your documents or your full details.' },
]

const TIPS = [
  'Only swap with people whose profile name matches who you agreed with.',
  'Agree the amount, rate and window before creating a Swap Link, and check them again before accepting.',
  'Never pay a counterparty directly outside of the swap flow.',
  'Be wary of anyone rushing you, offering a rate that feels too good, or asking for your login details.',
  'If something feels off, pause the swap. There is no penalty for being careful.',
]

export default function Safety() {
  return (
    <>
      <PageHero
        eyebrow="Trust & Safety"
        title={'Trust you don’t\nhave to take on faith'}
        sub="Group chats run on reputation and hope. Akudo is being designed so accountability is built into every swap, and so it’s clear exactly what we do and don’t do."
      />

      <section className="section section--flush-top">
        <div className="isnt">
          <Reveal className="isnt__col isnt__col--is">
            <h3>What Akudo is</h3>
            <ul>
              {IS.map((t) => (
                <li key={t}>
                  <span className="isnt__icon">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="isnt__col" delay={0.1}>
            <h3>What Akudo isn’t</h3>
            <ul>
              {ISNT.map((t) => (
                <li key={t}>
                  <span className="isnt__icon isnt__icon--x">
                    <X size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Our principles" title={'Six rules every\nswap follows'} />
        <Stagger className="principles">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={staggerChild} className="principle" whileHover={{ y: -6 }}>
              <motion.span className="principle__icon" whileHover={{ rotate: -10, scale: 1.1 }}>
                <Icon size={22} strokeWidth={1.8} />
              </motion.span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.div>
          ))}
        </Stagger>
      </section>

      <section className="section" id="tips">
        <div className="split split--reverse">
          <Reveal className="split__img">
            <img src="/images/man-phone.jpg" alt="A smiling man looking at his phone" />
          </Reveal>
          <div className="split__text">
            <Reveal>
              <Eyebrow>Safe swapping tips</Eyebrow>
            </Reveal>
            <SplitHeading as="h2" className="h2" text={'Good habits that\nkeep swaps clean'} />
            <Stagger as="ol" className="tips">
              {TIPS.map((t, i) => (
                <motion.li key={t} variants={staggerChild}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </motion.li>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section section--tight" id="report">
        <Reveal className="report">
          <span className="report__icon">
            <FlagIcon size={22} />
          </span>
          <div>
            <h3>Report a concern</h3>
            <p>
              Once Akudo launches, every swap will have a “Pause & report” option and a dedicated support channel. If
              you have a question or concern about Akudo before launch, join the waitlist and reply to any update we
              send. A person on our team reads every reply.
            </p>
          </div>
          <Button to="/waitlist" variant="dark" size="sm">
            Join the waitlist
          </Button>
        </Reveal>
      </section>
    </>
  )
}
