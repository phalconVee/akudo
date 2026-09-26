// Central copy + sample data. Every figure on the site is illustrative:
// Akudo is pre-launch, so nothing here should read as a live rate, price or result.

export const NAV_LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/safety', label: 'Trust & Safety' },
  { to: '/fees', label: 'Fees' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
]

export const USE_CASES = [
  'Family support',
  'School fees',
  'Rent back home',
  'Building projects',
  'Business invoices',
  'Weddings & events',
  'Medical bills',
  'Moving between two homes',
]

export const SAMPLE_RATE = 1500 // NGN per USD, sample value for the demo only

export const COUNTERPARTIES = [
  { initials: 'CO', name: 'Chinedu Okafor', where: 'Lagos · Verified profile', swaps: 14 },
  { initials: 'AB', name: 'Amaka Bello', where: 'Abuja · Verified profile', swaps: 9 },
  { initials: 'TA', name: 'Tunde Adeyemi', where: 'Enugu · Verified profile', swaps: 21 },
]

export const CORRIDORS = [
  { code: 'us', name: 'United States', status: 'First corridor' },
  { code: 'ng', name: 'Nigeria', status: 'First corridor' },
  { code: 'gb', name: 'United Kingdom', status: 'Exploring' },
  { code: 'ca', name: 'Canada', status: 'Exploring' },
  { code: 'gh', name: 'Ghana', status: 'Exploring' },
  { code: 'ke', name: 'Kenya', status: 'Exploring' },
  { code: 'za', name: 'South Africa', status: 'Exploring' },
]

export const FEATURE_TAGS = [
  'Swap Links',
  'SwapLock',
  'Verified Profiles',
  'Time Windows',
  'Dispute Desk',
  'Swap History',
]

// icon keys map to lucide icons inside FeatureGrid
export const FEATURE_TILES = [
  { icon: 'link', label: 'Swap Links', title: 'Lock a deal straight from your group chat', to: '/how-it-works' },
  { icon: 'lock', label: 'SwapLock', title: 'Nothing moves until both sides fund', to: '/how-it-works' },
  { icon: 'badge', label: 'Verified Profiles', title: 'Know who is on the other side', to: '/safety' },
  { icon: 'scale', label: 'Dispute Desk', title: 'A real process when a swap stalls', to: '/safety' },
  { icon: 'handshake', label: 'Your Rate', title: 'Rates you agree on together', to: '/fees' },
  { icon: 'history', label: 'Swap History', title: 'A record of every handshake', to: '/how-it-works' },
  { icon: 'timer', label: 'Time Windows', title: 'Swaps that expire cleanly', to: '/how-it-works' },
  { icon: 'grad', label: 'Coming later', title: 'Tuition & rent with confirmation', to: '/about' },
]

export const STEPS = [
  {
    key: 'agree',
    title: 'Agree',
    short: 'Agree the terms',
    body:
      'You and your counterparty agree on an amount, a rate and a time window. That might happen in your group chat, with family, or with someone you already know.',
  },
  {
    key: 'link',
    title: 'Link',
    short: 'Share a Swap Link',
    body:
      'One of you creates a Swap Link with those terms. The other opens it, checks the details and accepts. Both profiles are identity-verified.',
  },
  {
    key: 'fund',
    title: 'Fund',
    short: 'Both sides fund',
    body:
      'Each person pays into their own side, domestically: dollars in the US, naira in Nigeria. Akudo tracks both sides in one shared view.',
  },
  {
    key: 'confirm',
    title: 'Confirm',
    short: 'Both sides confirmed',
    body:
      'Once both sides are confirmed funded, the swap is locked. If one side never funds within the window, the other side is returned.',
  },
  {
    key: 'release',
    title: 'Release',
    short: 'Released together',
    body:
      'Both sides are released at the same time to the accounts each person named. Nobody has to go first, and nobody is left waiting on trust alone.',
  },
]

export const WHAT_IFS = [
  {
    q: 'The other side never funds',
    a: 'When the time window closes without both sides funded, the swap expires and the funded side is returned. No release, no argument.',
  },
  {
    q: 'An amount is wrong',
    a: 'A side is only marked funded when it matches the agreed amount. Mismatches are flagged to both people before anything is locked.',
  },
  {
    q: 'Someone raises a concern',
    a: 'Either person can pause a swap and open a case with the Dispute Desk. A person on our team reviews the record from both sides.',
  },
]

export const ROADMAP = [
  {
    phase: 'Phase 1',
    title: 'Swap Links',
    body: 'Lock in swaps you have already agreed, starting with the US ⇄ Nigeria corridor. Win on trust, not discovery.',
    status: 'Building now',
  },
  {
    phase: 'Phase 2',
    title: 'Rate Board',
    body: 'Post an offer, see offers from verified members, and match without needing a group chat first.',
    status: 'Next',
  },
  {
    phase: 'Phase 3',
    title: 'Purpose Payments',
    body: 'Tuition paid to a school with confirmation, rent to verified landlords, and building work released by milestone.',
    status: 'Later',
  },
  {
    phase: 'Phase 4',
    title: 'More for two-home lives',
    body: 'New tools for people whose lives, families and plans sit in two countries at once.',
    status: 'Exploring',
  },
]

export const FAQ = [
  {
    cat: 'Basics',
    items: [
      {
        q: 'What is Akudo?',
        a: 'Akudo is a platform in development for people who already swap between dollars and naira in their communities. It adds accountability: both sides fund first, then both sides are released together.',
      },
      {
        q: 'Is Akudo available today?',
        a: 'Not yet. Akudo is pre-launch and is not currently offering any services. You can join the waitlist to hear when early access opens.',
      },
      {
        q: 'Who is Akudo for?',
        a: 'Akudo is for people whose lives sit across countries: family support, school fees, rent, projects, business needs and other everyday reasons people move value between two homes.',
      },
      {
        q: 'Why build Akudo?',
        a: 'Many peer swaps already happen through friends, family and community chats. Akudo is being built to keep that familiar flow while adding verified profiles, clear terms, deadlines and a shared record.',
      },
      {
        q: 'Does Akudo exchange currency?',
        a: 'No. Akudo does not buy, sell or convert currency, and it does not set rates. The two people in a swap agree the rate between themselves.',
      },
      {
        q: 'Which countries will Akudo support?',
        a: 'The first corridor we are designing for is the United States and Nigeria. Other corridors are being explored but have no timeline.',
      },
    ],
  },
  {
    cat: 'Swaps',
    items: [
      {
        q: 'How does a Swap Link work?',
        a: 'One person enters the agreed terms (amount, rate and time window) and shares the link. The other person reviews and accepts. From there, both sides fund and Akudo coordinates the release.',
      },
      {
        q: 'What if the other person does not fund?',
        a: 'If both sides are not funded before the window closes, the swap expires and any funded side is returned to the person who sent it.',
      },
      {
        q: 'Can I find a counterparty on Akudo?',
        a: 'At first, Akudo is for swaps you have already agreed with someone. A Rate Board for finding verified counterparties is planned for a later phase.',
      },
      {
        q: 'Is there a limit on swap size?',
        a: 'Limits will be set before launch and may depend on verification level. We will publish them clearly.',
      },
    ],
  },
  {
    cat: 'Trust & fees',
    items: [
      {
        q: 'How are people verified?',
        a: 'We plan to verify the identity of every member before they can create or accept a swap, and to keep monitoring activity for signs of misuse.',
      },
      {
        q: 'What will Akudo charge?',
        a: 'Akudo does not collect platform fees. The product is designed to be open to everyone, and we do not hide fees inside the rate.',
      },
      {
        q: 'Are there hidden fees or rate markups?',
        a: 'No. Akudo does not add a spread, change the rate you agreed, or collect hidden charges.',
      },
      {
        q: 'Who holds the money during a swap?',
        a: 'The exact structure is being designed with legal counsel and will be explained in full before launch. We will not ask anyone to send money until that is in place.',
      },
      {
        q: 'How do disputes work?',
        a: 'Either person can pause a swap and open a case. A member of our team reviews the record from both sides and follows a published process.',
      },
    ],
  },
]
