import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Loader2 } from 'lucide-react'
import { Button, Reveal, SplitHeading, Eyebrow, Flag } from '../components/ui'

const LOCATIONS = [
  { v: 'us', label: 'United States' },
  { v: 'ng', label: 'Nigeria' },
  { v: 'other', label: 'Somewhere else' },
]
const PURPOSES = ['Family support', 'School fees', 'Rent', 'Property / building', 'Business', 'Other']

// NOTE: there is no backend yet. Submissions are validated client-side and
// not stored or sent anywhere. Wire `onSubmit` to a real endpoint before launch.
export default function Waitlist() {
  const [form, setForm] = useState({ name: '', email: '', where: 'us', purposes: [], consent: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const toggle = (p) =>
    set('purposes', form.purposes.includes(p) ? form.purposes.filter((x) => x !== p) : [...form.purposes, p])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Tell us what to call you'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.consent) e.consent = 'Please agree so we can email you'
    setErrors(e)
    return !Object.keys(e).length
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setTimeout(() => setStatus('done'), 1100)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin)
    } catch {
      /* clipboard unavailable; still show feedback */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="waitlist">
      <div className="waitlist__intro">
        <Reveal>
          <Eyebrow>Early access</Eyebrow>
        </Reveal>
        <SplitHeading text={'Be first to lock\nin a swap'} className="h1" />
        <Reveal delay={0.2}>
          <p className="muted">
            We’re opening Akudo gradually, starting with the US ⇄ Nigeria corridor. Join the waitlist for launch news
            and a chance to shape what we build.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="waitlist__perks">
          {['Launch updates, no spam', 'Early-access invitations', 'A say in fees and features'].map((p) => (
            <span key={p}>
              <Check size={15} strokeWidth={3} /> {p}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.35} className="waitlist__flags">
          <Flag code="us" size={44} />
          <Flag code="ng" size={44} />
        </Reveal>
      </div>

      <Reveal className="waitlist__card" delay={0.1}>
        <AnimatePresence mode="wait">
          {status !== 'done' ? (
            <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, scale: 0.97 }}>
              <div className={`field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">Name</label>
                <input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your first name" autoComplete="given-name" />
                <FieldError msg={errors.name} />
              </div>
              <div className={`field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" autoComplete="email" />
                <FieldError msg={errors.email} />
              </div>

              <fieldset className="field">
                <legend>Where are you based?</legend>
                <div className="segmented segmented--light segmented--full">
                  {LOCATIONS.map((l) => (
                    <button type="button" key={l.v} className={form.where === l.v ? 'is-on' : ''} onClick={() => set('where', l.v)}>
                      {form.where === l.v && <motion.span layoutId="where" className="segmented__bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="field">
                <legend>
                  What do you usually swap for? <em>(optional)</em>
                </legend>
                <div className="checks">
                  {PURPOSES.map((p) => {
                    const on = form.purposes.includes(p)
                    return (
                      <motion.button type="button" key={p} className={`check ${on ? 'is-on' : ''}`} onClick={() => toggle(p)} whileTap={{ scale: 0.94 }} aria-pressed={on}>
                        <AnimatePresence>
                          {on && (
                            <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: 16, opacity: 1 }} exit={{ width: 0, opacity: 0 }}>
                              <Check size={14} strokeWidth={3} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {p}
                      </motion.button>
                    )
                  })}
                </div>
              </fieldset>

              <label className={`consent ${errors.consent ? 'has-error' : ''}`}>
                <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
                <span className="consent__box">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>
                  I agree to receive emails about Akudo. I understand Akudo isn’t offering services yet, and I can
                  unsubscribe anytime.
                </span>
              </label>
              <FieldError msg={errors.consent} />

              <Button type="submit" variant="dark" className="waitlist__submit" disabled={status === 'sending'} icon={status === 'sending' ? null : 'chevron'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="spin" /> Saving your spot…
                  </>
                ) : (
                  'Join the waitlist'
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div key="done" className="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="done__burst" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos((i / 14) * Math.PI * 2) * 110,
                      y: Math.sin((i / 14) * Math.PI * 2) * 110,
                      opacity: 0,
                      scale: 0.4,
                    }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                ))}
              </div>
              <motion.span className="done__check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.5 }} />
                </svg>
              </motion.span>
              <h2>You’re on the list, {form.name.split(' ')[0]}.</h2>
              <p className="muted">
                We’ll email <strong>{form.email}</strong> as early access opens. In the meantime, share Akudo with the
                people you swap with.
              </p>
              <div className="done__actions">
                <Button onClick={copy} variant="dark" icon={null}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={copied ? 'y' : 'n'} className="inline-ic" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                      {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Link copied' : 'Copy invite link'}
                    </motion.span>
                  </AnimatePresence>
                </Button>
                <Button to="/how-it-works" variant="ghost" icon="arrow">
                  How it works
                </Button>
              </div>
              <p className="tiny">Demo form. Nothing was sent or stored.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  )
}

function FieldError({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.span className="field__error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', x: [0, -4, 4, -2, 0] }} exit={{ opacity: 0, height: 0 }}>
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
