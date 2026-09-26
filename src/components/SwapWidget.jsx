import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Minus, Plus, ChevronsRight, Check, Smile, Paperclip, RotateCcw, ArrowLeftRight } from 'lucide-react'
import { COUNTERPARTIES, SAMPLE_RATE } from '../data/content'

const fmtUSD = (v) => v.toLocaleString('en-US')
const fmtNGN = (v) => '₦' + Math.round(v).toLocaleString('en-US')

/** Digits that roll vertically when the value changes. */
function Rolling({ value, className }) {
  const [dir, setDir] = useState(1)
  const prev = useRef(value)
  useEffect(() => {
    setDir(value >= prev.current ? 1 : -1)
    prev.current = value
  }, [value])
  return (
    <span className={`rolling ${className || ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: dir * 26, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: dir * -26, opacity: 0, filter: 'blur(4px)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Press-and-hold stepper button that repeats. */
function StepButton({ onStep, label, children }) {
  const timer = useRef()
  const start = () => {
    onStep()
    let delay = 380
    const loop = () => {
      onStep()
      delay = Math.max(60, delay * 0.8)
      timer.current = setTimeout(loop, delay)
    }
    timer.current = setTimeout(loop, delay)
  }
  const stop = () => clearTimeout(timer.current)
  useEffect(() => stop, [])
  return (
    <motion.button
      type="button"
      className="stepper"
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.88 }}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onStep()}
    >
      {children}
    </motion.button>
  )
}

function SwipeToLock({ onLock, disabled }) {
  const track = useRef(null)
  const x = useMotionValue(0)
  const [max, setMax] = useState(260)
  const fill = useTransform(x, (v) => v + 56)
  const textOpacity = useTransform(x, [0, max * 0.6], [1, 0])

  useEffect(() => {
    const measure = () => track.current && setMax(track.current.offsetWidth - 64)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (!disabled) animate(x, 0, { type: 'spring', stiffness: 300, damping: 26 })
  }, [disabled, x])

  const onEnd = () => {
    if (x.get() > max * 0.82) {
      animate(x, max, { type: 'spring', stiffness: 400, damping: 30 })
      onLock()
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 22 })
    }
  }

  return (
    <div className="swipe" ref={track}>
      <motion.div className="swipe__fill" style={{ width: fill }} />
      <motion.span className="swipe__text" style={{ opacity: textOpacity }}>
        Swipe to lock swap
      </motion.span>
      <motion.button
        type="button"
        className="swipe__handle"
        drag={disabled ? false : 'x'}
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.04}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={onEnd}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            animate(x, max, { duration: 0.4 })
            onLock()
          }
        }}
        aria-label="Lock swap (demo)"
        whileTap={{ scale: 0.94 }}
      >
        {disabled ? <Check size={20} /> : <ChevronsRight size={22} />}
      </motion.button>
    </div>
  )
}

const STAGES = [
  { you: 'Waiting', them: 'Waiting', label: 'Swap locked, waiting for both sides' },
  { you: 'Funded', them: 'Waiting', label: 'Your side funded' },
  { you: 'Funded', them: 'Funded', label: 'Both sides confirmed' },
  { you: 'Released', them: 'Released', label: 'Released together' },
]

export default function SwapWidget() {
  const [usd, setUsd] = useState(750)
  const [rate, setRate] = useState(SAMPLE_RATE)
  const [cp, setCp] = useState(0)
  const [note, setNote] = useState('')
  const [stage, setStage] = useState(-1)

  const locked = stage >= 0
  useEffect(() => {
    if (stage < 0 || stage >= STAGES.length - 1) return
    const t = setTimeout(() => setStage((s) => s + 1), 1400)
    return () => clearTimeout(t)
  }, [stage])

  const change = (d) => setUsd((v) => Math.min(20000, Math.max(50, v + d)))
  const person = COUNTERPARTIES[cp]

  return (
    <div className="swapw">
      <div className="swapw__amount">
        <p className="swapw__label">Amount (USD)</p>
        <div className="swapw__row">
          <StepButton label="Decrease amount" onStep={() => !locked && change(-50)}>
            <Minus size={18} strokeWidth={2.6} />
          </StepButton>
          <div className="swapw__value">
            <sup>$</sup>
            <Rolling value={fmtUSD(usd)} />
          </div>
          <StepButton label="Increase amount" onStep={() => !locked && change(50)}>
            <Plus size={18} strokeWidth={2.6} />
          </StepButton>
        </div>
        <div className="swapw__rate">
          <label htmlFor="rate">
            Rate you agreed <em>(sample)</em>
          </label>
          <span className="swapw__rate-val">
            <Rolling value={`₦${rate.toLocaleString()}`} /> / $1
          </span>
        </div>
        <input
          id="rate"
          type="range"
          min={1300}
          max={1700}
          step={5}
          value={rate}
          disabled={locked}
          onChange={(e) => setRate(+e.target.value)}
          className="range"
          style={{ '--p': `${((rate - 1300) / 400) * 100}%` }}
        />
        <div className="swapw__sides">
          <div>
            <span>You send in the US</span>
            <strong>${fmtUSD(usd)}</strong>
          </div>
          <ArrowLeftRight size={16} />
          <div>
            <span>They send in Nigeria</span>
            <strong>
              <Rolling value={fmtNGN(usd * rate)} />
            </strong>
          </div>
        </div>
      </div>

      <div className="swapw__card">
        <h3>Swap with</h3>
        <div className="swapw__person">
          <AnimatePresence mode="wait">
            <motion.div
              key={person.name}
              className="swapw__person-inner"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.25 }}
            >
              <span className="avatar">{person.initials}</span>
              <div>
                <strong>{person.name}</strong>
                <small>
                  {person.where} · {person.swaps} swaps
                </small>
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.button
            type="button"
            className="chip-btn"
            whileTap={{ scale: 0.92 }}
            disabled={locked}
            onClick={() => setCp((c) => (c + 1) % COUNTERPARTIES.length)}
          >
            Change
          </motion.button>
        </div>

        <div className="swapw__note">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add note"
            aria-label="Add a note"
            maxLength={60}
            disabled={locked}
          />
          <Smile size={20} />
          <Paperclip size={19} />
        </div>

        <SwipeToLock disabled={locked} onLock={() => setStage(0)} />

        <AnimatePresence>
          {locked && (
            <motion.div
              className="swapw__status"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="swapw__status-inner">
                <div className="swapw__track">
                  {['You · US', `${person.name.split(' ')[0]} · NG`].map((who, i) => {
                    const st = i === 0 ? STAGES[stage].you : STAGES[stage].them
                    return (
                      <div className="swapw__side" key={who}>
                        <span>{who}</span>
                        <span className={`state state--${st.toLowerCase()}`}>
                          <motion.i layout />
                          {st}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="swapw__progress">
                  <motion.span
                    animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </div>
                <div className="swapw__foot">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={stage}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      {STAGES[stage].label}
                    </motion.p>
                  </AnimatePresence>
                  {stage === STAGES.length - 1 && (
                    <motion.button
                      type="button"
                      className="reset"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setStage(-1)}
                    >
                      <RotateCcw size={14} /> Replay
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="swapw__disclaimer">Interactive demo. No money moves and no real rate is shown.</p>
    </div>
  )
}
