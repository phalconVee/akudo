# Akudo marketing site

Multi-page React site (Vite + React Router + Framer Motion) for Akudo, a pre-launch trust and matching layer for peer-to-peer USD ⇄ NGN swaps.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Pages
| Route | Page |
|---|---|
| `/` | Home: hero, photo cards, interactive swap demo, corridors, features, stat + QR, CTA |
| `/how-it-works` | Auto-playing 5-step walkthrough, ways in, "what if" cases |
| `/safety` | What Akudo is / isn't, principles, tips, reporting |
| `/fees` | Fee principles + illustrative fee-model calculator |
| `/about` | Story, name meaning, scroll-drawn roadmap |
| `/faq` | Searchable, filterable accordion |
| `/waitlist` | Validated sign-up form (client-side only, not wired to a backend) |
| `/legal/:doc` | Draft terms, privacy and disclosures (placeholders for counsel) |

## Notes
- Copy and sample data live in `src/data/content.js`. Every rate, amount, name and chart is illustrative.
- Copy is deliberately conservative: no "escrow", "bank", "guaranteed", "insured" or savings claims, no competitor names, no partner logos, and CTAs are waitlist-only. Have counsel review before launch.
- The waitlist form doesn't send or store anything. Wire `onSubmit` in `src/pages/Waitlist.jsx` to a real endpoint.
- Photos are Unsplash-licensed stock (`public/images`). Flags come from flagcdn (`public/flags`).
- For static hosting with `BrowserRouter`, configure an SPA fallback to `index.html`.
