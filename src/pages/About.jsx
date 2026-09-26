import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Building2, MessageCircle, Sparkles } from 'lucide-react'
import { PageHero } from '../components/sections'
import { Reveal, SectionHead, Stagger, staggerChild, SplitHeading, Eyebrow } from '../components/ui'
import { ROADMAP } from '../data/content'

const ROUTES = [
  {
    icon: Building2,
    title: 'The formal route',
    body: 'Fast and familiar. The provider sits in the middle as the counterparty and handles conversion. That’s a service many people who already hold both currencies don’t actually need.',
  },
  {
    icon: MessageCircle,
    title: 'The group-chat route',
    body: 'People with accounts in both countries find each other and make two domestic payments. It works on reputation, until one side sends and the other goes quiet.',
  },
  {
    icon: Sparkles,
    title: 'The Akudo route',
    body: 'Keep the peer-to-peer swap and the rate you agree together. Add verified people, a shared record, clear deadlines and a release that waits for both sides.',
    hl: true,
  },
]

function Roadmap() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })
  return (
    <div className="roadmap" ref={ref}>
      <div className="roadmap__line">
        <motion.span style={{ scaleY }} />
      </div>
      {ROADMAP.map((r, i) => (
        <Reveal key={r.phase} className="roadmap__item" delay={i * 0.05}>
          <span className={`roadmap__dot ${i === 0 ? 'is-now' : ''}`} />
          <div className="roadmap__card">
            <div className="roadmap__meta">
              <span>{r.phase}</span>
              <span className={`roadmap__status ${i === 0 ? 'is-now' : ''}`}>{r.status}</span>
            </div>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Akudo"
        title={'Built for people who\nlive in two currencies'}
        sub="Millions of people in the diaspora move value between dollars and naira for family, school fees, property and business. We think they deserve a way to do it that runs on more than hope."
      />

      <section className="section section--flush-top">
        <Stagger className="routes">
          {ROUTES.map(({ icon: Icon, title, body, hl }) => (
            <motion.div key={title} variants={staggerChild} className={`route ${hl ? 'route--hl' : ''}`} whileHover={{ y: -6 }}>
              <span className="principle__icon">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.div>
          ))}
        </Stagger>
      </section>

      <section className="section" id="name">
        <div className="name-block">
          <Reveal className="name-block__word">
            <span>Akụ</span>
            <motion.i
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 }}
            >
              +
            </motion.i>
            <span>Udo</span>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Why the name</Eyebrow>
            </Reveal>
            <SplitHeading as="h2" className="h2" text={'Wealth, and\npeace of mind'} />
            <Reveal delay={0.15}>
              <p className="muted">
                In Igbo, <em>akụ</em> speaks to wealth and <em>udo</em> to peace. Akudo is about both: moving what you’ve
                worked for between your two homes, without the worry of whether the other side will follow through.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="roadmap">
        <SectionHead
          eyebrow="Roadmap"
          title={'Start with trust.\nGrow from there.'}
          sub="We’re starting narrow on purpose. Plans beyond Phase 1 are directional and will change as we learn."
        />
        <Roadmap />
      </section>

      <section className="section section--tight">
        <Reveal className="portrait-quote">
          <img src="/images/portrait-afro.jpg" alt="Portrait of a young woman" />
          <blockquote>
            <p>“The best swap is the one you don’t have to worry about after you hit send.”</p>
            <footer>The idea behind Akudo</footer>
          </blockquote>
        </Reveal>
      </section>
    </>
  )
}
