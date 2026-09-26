import { NavLink, useParams, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SplitHeading } from '../components/ui'

const DOCS = {
  terms: {
    title: 'Terms of Use',
    body: [
      ['Draft placeholder', 'These terms are a placeholder for the pre-launch website and must be replaced with terms prepared by qualified legal counsel before Akudo offers any service.'],
      ['Use of this website', 'This website describes a product in development. You may browse it and join the waitlist. Nothing on it creates an account, a customer relationship or any obligation to provide services.'],
      ['No offer of services', 'Akudo is not currently offering any financial or payment services. Descriptions of features, fees and availability are forward-looking, may change, and depend on legal and regulatory review.'],
      ['Illustrative content', 'Rates, amounts, names, swap records and charts on this site are examples created for illustration. They are not quotes, results or testimonials.'],
    ],
  },
  privacy: {
    title: 'Privacy Notice',
    body: [
      ['Draft placeholder', 'This notice is a placeholder and must be finalized with counsel before any personal information is collected.'],
      ['What we would collect', 'If you join the waitlist, we would collect your name, email address, the country you are based in and, optionally, what you usually swap for.'],
      ['How we would use it', 'Only to send you updates about Akudo and early-access invitations, and to understand what people need from the product. We would not sell your information.'],
      ['Your choices', 'You could unsubscribe from emails at any time and ask us to delete your waitlist details.'],
    ],
  },
  disclosures: {
    title: 'Disclosures',
    body: [
      ['Status', 'Akudo is a product in development. It is not currently offering services and is not accepting or holding funds.'],
      ['What Akudo is not', 'Akudo is not a bank, does not provide deposit accounts, does not buy, sell or convert currency, does not set exchange rates, and does not provide investment, tax or legal advice.'],
      ['Regulatory review', 'Akudo’s model, operating structure and partners will be reviewed with legal counsel before launch, and features may change or be withdrawn as a result.'],
      ['Imagery', 'Photography is licensed stock imagery and does not depict Akudo users.'],
    ],
  },
}

export default function Legal() {
  const { doc } = useParams()
  const d = DOCS[doc]
  if (!d) return <Navigate to="/legal/terms" replace />
  return (
    <section className="legal">
      <aside className="legal__nav">
        {Object.entries(DOCS).map(([k, v]) => (
          <NavLink key={k} to={`/legal/${k}`} className="legal__tab">
            {({ isActive }) => (
              <>
                {isActive && <motion.span layoutId="legal-tab" className="legal__tab-bg" />}
                <span>{v.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </aside>
      <div className="legal__body">
        <AnimatePresence mode="wait">
          <motion.div key={doc} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            <p className="eyebrow">Last updated · Draft</p>
            <SplitHeading text={d.title} className="h2" />
            {d.body.map(([h, p], i) => (
              <Reveal key={h} delay={i * 0.05} className="legal__block">
                <h3>{h}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
