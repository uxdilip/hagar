# Portfolio Website — Project Plan

A UI/UX designer portfolio: cool, professional, and clean. Public landing page + 4 password-protected case studies + contact form that emails on submit.

---

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Motion** (formerly Framer Motion) — scroll reveals, text animations, page transitions
- **Lenis** — buttery smooth scroll
- **GSAP + ScrollTrigger** — pinned sections, horizontal scroll, scrubbed animations
- **react-parallax-tilt** — tilt on case study cards
- **lucide-react** — icons
- **Resend** — email delivery
- **Next.js Route Handlers** (`app/api/contact/route.ts`) — serverless API
- **Vercel** — hosting

---

## Sections (Landing Page) — all 8 confirmed

1. **Hero** — Big bold typography, name + tagline, animated text reveal, subtle cursor-following gradient/noise. Marquee strip of skills underneath.
2. **Intro / About blurb** — Short manifesto (2–3 sentences) revealed word-by-word on scroll.
3. **Selected Work (Case Studies)** — 4 large cards with hover preview, tilt effect, click → password gate → case study.
4. **Services / What I Do** — Pinned-scroll section with 3–4 services (Product Design, UX Research, Design Systems, etc.).
5. **Process / How I Work** — Horizontal scroll timeline (Discover → Define → Design → Deliver).
6. **Testimonials / Logos** — Marquee of client logos and/or rotating testimonial.
7. **Contact Form** — "Let's work together." Form with smooth focus animations, posts to `/api/contact`.
8. **Footer** — Socials (LinkedIn, Dribbble, Behance, X), email, copyright.

---

## Case Studies

- **Count:** 4 (all designs already built in Figma)
- **Layout:** Use the attached Figma design as the template/design system
- **Protection:** One shared password, soft client-side gate
  - User enters password → stored in `sessionStorage`
  - Browses all case studies during that session
  - Note: client-side gates are soft protection — fine for portfolio/recruiter sharing, not NDA-level

---

## Contact Form — Resend

- **Provider:** Resend (3,000 emails/month free)
- **Backend:** Next.js Route Handler at `app/api/contact/route.ts`
- **Flow:** Form → POST `/api/contact` → Resend API → email to owner
- **No database** — submissions live in your inbox only
- **Env vars (set in Vercel):**
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
- **Owner setup:** sign up at resend.com, verify sending domain, drop API key into Vercel env

---

## The Sexy Stack (effects & libraries)

- **Motion** — scroll reveals, text animations, page transitions
- **Lenis** — buttery smooth scroll (the thing that makes premium sites *feel* premium)
- **GSAP + ScrollTrigger** — pinned sections, horizontal scroll, scrubbed animations
- **Split text reveals** — letter/word-by-word hero animations
- **Custom cursor** — subtle blended cursor that grows on hover
- **Marquee** — infinite scrolling text/logos
- **react-parallax-tilt** — tilt on case study cards
- **Noise/grain overlay** — subtle SVG noise texture = instantly premium
- **Gradient mesh background** — animated soft gradient blob in hero

**Vibe references:** Locomotive, Studio Freight, Active Theory, Rauno, Emil Kowalski. Light-mode, big type, generous whitespace, micro-interactions everywhere.

---

## Design Decisions (locked)

- **Theme:** Light mode
- **Typography:**
  - **Headings:** Cormorant Garamond (serif) — Google Fonts
  - **Body:** Nunito Sans (sans-serif) — Google Fonts
- **Palette source:** Figma Style Guide — "Concept 3 — Plum & Gold" (pull exact values during Phase 1)

---

## File Structure

```
app/
├── layout.tsx                     # Root layout (Lenis, cursor, noise, nav)
├── page.tsx                       # Landing page (all 8 sections)
├── work/
│   └── [slug]/
│       └── page.tsx               # Case study template page
├── api/
│   └── contact/
│       └── route.ts               # Resend serverless handler
└── components/
    ├── layout/
    │   ├── Nav.tsx
    │   ├── Footer.tsx
    │   ├── SmoothScroll.tsx       # Lenis wrapper
    │   ├── CustomCursor.tsx
    │   └── NoiseOverlay.tsx
    ├── sections/
    │   ├── Hero.tsx               # 1. Hero
    │   ├── Intro.tsx              # 2. Intro/manifesto
    │   ├── SelectedWork.tsx       # 3. 4 case study cards
    │   ├── Services.tsx           # 4. What I do
    │   ├── Process.tsx            # 5. How I work
    │   ├── Testimonials.tsx       # 6. Logos/testimonials
    │   └── Contact.tsx            # 7. Contact form
    ├── ui/
    │   ├── SplitText.tsx          # Letter-by-letter reveals
    │   ├── Marquee.tsx            # Infinite scroll text
    │   ├── MagneticButton.tsx     # Buttons that follow cursor
    │   └── RevealOnScroll.tsx     # Generic scroll trigger
    └── case-study/
        ├── PasswordGate.tsx       # Password gate component
        └── CaseStudyLayout.tsx    # Renders from Figma design

lib/
├── caseStudies.ts                 # Content for 4 case studies
└── site.ts                        # Name, tagline, socials
```

---

## Build Phases

### Phase 1 — Foundation & Vibe
- Next.js 15 project setup with App Router + Tailwind v4
- Theme tokens (light mode, type scale, spacing) in CSS variables
- Fonts: Cormorant Garamond (headings) + Nunito Sans (body) via `next/font/google`
- Lenis smooth scroll wrapper
- Noise overlay + custom cursor
- Nav + Footer shells

### Phase 2 — Hero & Intro (sections 1–2)
- Hero with split-text reveal, animated tagline, marquee strip
- Intro manifesto with scroll-triggered word reveal

### Phase 3 — Selected Work (section 3)
- 4 case study cards with tilt + hover preview
- Routing scaffold for `/work/[slug]`

### Phase 4 — Services, Process, Testimonials (sections 4–6)
- Services pinned-scroll section
- Process horizontal-scroll timeline
- Testimonials/logo marquee

### Phase 5 — Contact & Footer (sections 7–8)
- Contact form with focus animations, validation, success state
- Footer with socials

### Phase 6 — Case Studies
- Password gate (`sessionStorage` based)
- Case study template matching Figma
- Plug in content for all 4

### Phase 7 — Resend Integration
- `app/api/contact/route.ts` handler
- Wire form → API
- Document env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`)

### Phase 8 — Deployment Prep
- README with Vercel deploy steps + env var setup
- Resend setup instructions (verify domain, get API key)

---

## Open Questions (need answers before Phase 1)

1. **Designer's name + tagline** for hero — or placeholder for now?
2. **Case study titles + cover images** — ready to drop in?
3. **Password** for case study gate — pick now or placeholder?
4. **Resend:** OK to sign up / verify domain / provide API key at deploy time?
