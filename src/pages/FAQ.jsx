import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Accordion, PageHero } from '../components/sections'
import { Reveal, TextLink } from '../components/ui'
import { FAQ as DATA } from '../data/content'

export default function FAQ() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const cats = ['All', ...DATA.map((d) => d.cat)]

  const items = useMemo(() => {
    const all = DATA.filter((d) => cat === 'All' || d.cat === cat).flatMap((d) => d.items)
    const term = q.trim().toLowerCase()
    return term ? all.filter((i) => (i.q + i.a).toLowerCase().includes(term)) : all
  }, [cat, q])

  return (
    <>
      <PageHero eyebrow="FAQ" title={'Questions,\nanswered plainly'} sub="The short version of how Akudo is designed to work, and what it won’t do." />
      <section className="section section--flush-top faq">
        <Reveal className="faq__tools">
          <div className="search">
            <Search size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" aria-label="Search questions" />
            <AnimatePresence>
              {q && (
                <motion.button
                  type="button"
                  aria-label="Clear search"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={() => setQ('')}
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="segmented segmented--light" role="tablist" aria-label="Categories">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => setCat(c)}>
                {cat === c && <motion.span layoutId="faqseg" className="segmented__bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span>{c}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={cat + q} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {items.length ? (
              <Accordion items={items} openFirst />
            ) : (
              <p className="empty">No questions match “{q}”. Try another word.</p>
            )}
          </motion.div>
        </AnimatePresence>
        <Reveal className="faq__more">
          <p>Still wondering about something?</p>
          <TextLink to="/waitlist">Join the waitlist and ask us</TextLink>
        </Reveal>
      </section>
    </>
  )
}
