# Air-Roam Premium Travel Platform — Public Site Overhaul

Transform the current single-page dark site into a multi-route, light, premium travel connectivity platform. Preserve existing architecture (TanStack Start, component structure, animation utilities) — rebuild the visual system and expand surface area.

## 1. Visual System Reset

Rewrite `src/styles.css` design tokens for a light, travel-inspired palette:

- Background `#FFFFFF`, Surface `#F8FAFC`, Foreground near-black
- Primary Amber `#F59E0B`, Secondary Teal `#14B8A6`, Accent Sky `#38BDF8`
- Success emerald, Error red
- Soft shadows (elevated, card, glow-amber, glow-teal)
- Gradients: sunrise (amber→sky), horizon (sky→teal) — used sparingly
- Retain animation keyframes (flight-arc, float, drift, pulse-ring) — recolor for light theme
- Typography: keep Bricolage Grotesque display / Inter body / JetBrains Mono; larger heading scale, more whitespace
- Remove heavy glassmorphism; use white cards + soft shadows + subtle borders

## 2. Product Naming (global find/replace)

- "Air-Roam eSIM" → **DRET eSIM**
- "Nomad Pocket WiFi" → **Air-Roam Pocket WiFi**
- Travel SIM unchanged
- "Enterprise" → **Enterprise Solutions**

## 3. Routing Architecture

Add TanStack file-based routes (each with full `head()` metadata, unique title/description/OG):

```
src/routes/
  __root.tsx          (shared Navbar + Footer + Outlet)
  index.tsx           Home
  destinations.tsx    Destinations layout (Outlet)
  destinations.index.tsx   Explorer + world map
  destinations.$country.tsx  Country detail
  esim.tsx            DRET eSIM
  travel-sim.tsx      Travel SIM
  pocket-wifi.tsx     Air-Roam Pocket WiFi
  enterprise.tsx      Enterprise Solutions
  pricing.tsx
  what-is-esim.tsx
  faq.tsx
  support.tsx
  contact.tsx
  about.tsx
  affiliates.tsx
  planner.tsx         Find My Plan interactive wizard
  assistant.tsx       AI Travel Assistant chat UI
```

Root layout renders shared `<Navbar/>` + `<Outlet/>` + `<Footer/>`.

## 4. Shared Components

New/updated under `src/components/`:

- `site/Navbar.tsx` — sticky, light, mega-menu for Products/Destinations, mobile sheet menu
- `site/Footer.tsx` — 6-column premium footer, newsletter, social, legal
- `site/CountryCard.tsx`, `site/ProductCard.tsx` (clickable Link), `site/FeatureCard.tsx`, `site/TestimonialCard.tsx`, `site/FAQAccordion.tsx`, `site/CTASection.tsx`, `site/StatCounter.tsx`, `site/PricingCard.tsx`
- `site/WorldMap.tsx` — SVG-based interactive map, hover/click countries, animated connection lines
- `site/PlaneAnimation.tsx`, `site/ConnectionLines.tsx` — reused hero motifs recolored
- `planner/PlannerWizard.tsx` — multi-step (destination, dates, travelers, product type, usage) with mock recommendations
- `assistant/ChatUI.tsx` — installed via AI Elements (conversation, message, prompt-input, shimmer) with mocked assistant responses
- `data/` — mock datasets: countries (~30 curated + 190 count), plans, testimonials, FAQs, tips

## 5. Page-Level Content

Each page: hero → features/how-it-works → visuals → FAQ (where relevant) → CTA. All content written specifically for that page — no placeholders.

- **Home**: hero (headline + dual CTA Find My Plan/Explore Destinations, animated plane + connection lines), stats bar, product grid (4 clickable cards), featured destinations (6), how-it-works (3-step), testimonials, blog preview (3 cards), AI assistant teaser, final CTA
- **Destinations**: search + region filters + world map + country grid; `/destinations/$country` renders country hero, coverage, plans, tips, currency, time
- **Product pages**: overview, feature grid, benefits, pricing preview (link to /pricing), how-it-works, compatibility table, FAQ, related products
- **Pricing**: toggle by product, plan cards, comparison table
- **FAQ/Support/Contact/About/Affiliates/What is eSIM**: proper editorial content, sections, imagery accents
- **Planner**: 5-step wizard → recommended plans screen with mock data
- **Assistant**: full-page chat with AI Elements composer, pre-seeded flow

## 6. Interactive Pieces

- Navbar mega-menu (Radix hover-card or custom)
- Country search with fuzzy match
- World map: SVG world with dots per country, hover shows tooltip, click navigates
- Planner: stepper, form state via useState, mock recommendation engine
- Assistant: scripted mock replies keyed off user text
- Coverage checker + roaming calculator on `/support` and pricing
- Animated counters on Home stats (IntersectionObserver)

## 7. Technical Notes

- Install AI Elements: `bun x ai-elements@latest add conversation message prompt-input shimmer`
- No new backend, no auth, no Supabase this phase
- Every route sets head() with unique title/description/og:title/og:description; keep og:url + canonical self-referential; root sets sitewide defaults only
- Keep `defaultPreloadStaleTime: 0`, use `<Link to="...">` everywhere
- Responsive: mobile-first, `grid + min-w-0 + shrink-0` pattern on all header rows
- Accessibility: semantic landmarks, aria-labels, keyboard nav on menus/wizard
- All new colors go through semantic tokens; no hardcoded hex in components

## 8. Out of Scope (explicit)

- Authentication, dashboards, checkout, real payments
- Real Supabase / DB / server functions
- Real map tiles (SVG only)
- Real AI backend (mock scripted responses)

Ready to build on approval.