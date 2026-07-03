/**
 * Case studies — single source of truth for all 4 password-protected projects.
 *
 * Used by:
 * - `app/work/[slug]/page.tsx` to render the dynamic case study page
 * - `app/components/sections/ProjectsScattered.tsx` to render cards on the home page
 */

export type MetaItem = { label: string; value: string };

export type CaseStudySection =
  | {
    type: "media";
    src: string;
    alt?: string;
    aspect?: string;
    caption?: string;
  }
  | {
    type: "text";
    heading?: string;
    body: string[];
  }
  | {
    type: "section-intro"; // optional small tagline + h2 + lede paragraph
    tagline?: string;
    heading: string;
    body?: string;
    align?: "left" | "center";
  }
  | {
    type: "feature-cards"; // 3-up cards with icon + heading + body
    heading?: string;
    body?: string;
    cards: { icon: string; heading: string; body: string }[];
  }
  | {
    type: "principles-grid"; // 4-up cards, dark icons + heading + body
    heading: string;
    cards: { icon: string; heading: string; body: string }[];
  }
  | {
    type: "design-challenge"; // big callout box with highlighted text
    label: string; // e.g. "Design Challenge"
    text: string; // supports {h1}…{/h1} for highlight
    theme?: "light" | "rose";
  }
  | {
    type: "text-columns"; // multi-column tagline+heading+body blocks
    heading?: string; // optional section heading rendered above the columns
    tagline?: string; // optional small tagline above the heading
    body?: string; // optional intro paragraph between heading and columns
    columns: { tagline?: string; heading: string; body: string }[];
    cols?: 1 | 2 | 3;
    align?: "left" | "center";
  }
  | {
    type: "text-list"; // grouped vertical list (tagline → items, repeat)
    heading?: string;
    groups: {
      tagline: string;
      items: { heading: string; body: string }[];
    }[];
  }
  | {
    type: "alternating-rows"; // flexible alternating image+text rows
    items: {
      image: string;
      tagline?: string;
      heading: string;
      body: string;
      aspect?: string;
      subBlock?: { tagline?: string; heading?: string; body: string };
    }[];
  }
  | {
    type: "media-quad"; // 2x2 image grid with outer-only rounded corners
    images: { src: string; alt?: string }[];
  }
  | {
    type: "prototype-showcase"; // image + CTA button
    image: string;
    alt?: string;
    buttonLabel: string;
    buttonHref: string;
  }
  | {
    type: "before-after"; // image with Before/After tags + checklist
    items: { image: string; heading: string; points: string[] }[];
  }
  | {
    type: "pain-points"; // 3 stat cards: title + big number + description
    tagline: string;
    items: { title: string; value: string; description: string }[];
  }
  | {
    type: "personas"; // alternating left/right rows with image + heading + JTBD
    tagline: string;
    heading: string;
    items: {
      image: string;
      heading: string;
      body: string;
      jtbd: string;
    }[];
  }
  | {
    type: "solution-showcase"; // image + 3 numbered steps
    tagline: string;
    heading: string;
    body: string;
    image: string;
    imagePosition?: "left" | "right";
    steps: { num: string; heading: string; body: string; image?: string }[];
  }
  | {
    type: "info-grid";
    challenge: string;
    perspective: string;
    meta: MetaItem[];
  }
  | { type: "media-grid"; images: { src: string; alt?: string; aspect?: string }[] }
  | { type: "quote"; text: string; author?: string }
  | {
    type: "lottie"; // Lottie animation JSON (e.g. animated mobile screens)
    src: string;
    aspect?: string;
    caption?: string;
    /** Bottom-right mask dims to hide watermark from free-tier exports. */
    maskWidth?: string;
    maskHeight?: string;
  }
  | {
    type: "metrics";
    tagline?: string;
    heading?: string;
    body?: string;
    items: { value: string; label: string }[];
  }
  | {
    type: "key-results"; // left-border bar style (Overview "Key Results at a Glance")
    heading?: string;
    items: { value: string; label: string }[];
  }
  | {
    type: "result-cards"; // rounded card style (Results & Impact)
    items: { value: string; label: string }[];
  }
  | {
    type: "learnings-list"; // 2x2 numbered grid
    tagline: string;
    heading: string;
    items: { num: string; heading: string; body: string }[];
  }
  // ─── PROPOSAL CASE STUDY SECTIONS ────────────────────────────────────────
  // These are used exclusively by case studies with `layout: "proposal"`.
  | {
    type: "proposal-hero"; // dark green hero with logo + H1 + body + image side
    logo: string;
    logoLabel: string;
    heading: string; // supports {h1}…{/h1} for mint highlight
    body: string;
    heroImage: string;
    presentedTo: { label: string; name: string };
    presentedBy: { label: string; name: string };
  }
  | {
    type: "proposal-section-header"; // centered tagline + H2 (mint) + body (white)
    tagline: string;
    heading: string; // supports {h1}…{/h1} for mint highlight
    body?: string;
    bg?: "dark" | "light"; // default "light" (mint bg #E1F6ED)
  }
  | {
    type: "proposal-feature-text"; // 2-up text + image (alternating sides)
    bg?: "dark" | "light";
    heading: string; // section header above the rows
    tagline?: string;
    headerBody?: string;
    items: {
      eyebrow: string; // e.g. "GOAL", "USER SEGMENT" — caps mint
      body: string;
      image: string;
      imageOnRight?: boolean;
    }[];
  }
  | {
    type: "proposal-feature-cards"; // dark cards with icon + heading + body
    bg?: "dark" | "light";
    tagline: string;
    heading: string; // supports {h1}…{/h1}
    headerBody?: string;
    cards: {
      icon?: string; // optional SVG path
      heading: string;
      body: string;
      image?: string; // optional bottom image for some cards
    }[];
    layout?: "market" | "features"; // market = 2 stacked + 1 large; features = 3 cols × 2 rows
  }
  | {
    type: "proposal-table"; // multi-column table with header + data rows
    bg?: "dark" | "light";
    tagline: string;
    heading: string;
    headerBody?: string;
    columns: { header: string; cells: string[] }[];
  }
  | {
    type: "proposal-logo-grid"; // 6 competitor logos in wrapped flex grid
    heading: string;
    headerBody?: string;
    logos: { src: string; alt: string }[];
  }
  | {
    type: "proposal-timeline"; // horizontal timeline with progress dots
    tagline: string;
    heading: string;
    headerBody?: string;
    steps: {
      date: string;
      heading: string;
      body: string;
    }[];
  }
  | {
    type: "proposal-contact"; // final contact section (left text + right image)
    heading: string;
    contactLabel: string;
    email: string;
    website: string;
    socials: { label: string; href: string; icon: string }[];
    image: string;
  };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  duration: string;
  tags: string[];
  /** 4-up meta strip shown in the hero (Timeline / Role / Tools / Platform). */
  meta?: MetaItem[];
  coverImage: string;
  /** Optional separate thumbnail for the home page grid (falls back to coverImage). */
  thumbnail?: string;
  tagline: string;
  sections: CaseStudySection[];
  /**
   * Layout variant. "default" uses the standard contained layout with
   * CaseStudyHeader. "proposal" is the dark-themed full-bleed proposal
   * layout (CLEPAIR) where each section manages its own background and
   * the standard header is replaced by a `proposal-hero` section.
   */
  layout?: "default" | "proposal";
};

const placeholderImg = (id: string, w = 1600, h = 1000) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop`;

// ─── Case Studies ─────────────────────────────────────────────────────────────
export const caseStudies: CaseStudy[] = [
  {
    slug: "sama-ai-listing",
    title: "Designing a Multi-Modal AI Listing Assistant",
    client: "Soum Marketplace",
    year: "2026",
    role: "UX/UI Designer",
    duration: "Oct–Nov 2026",
    tags: ["AI", "Mobile", "iOS"],
    meta: [
      { label: "Timeline", value: "Oct–Nov 2026" },
      { label: "Role", value: "UX/UI Designer" },
      { label: "Tools", value: "Figma" },
      { label: "Platform", value: "iOS Mobile" },
    ],
    coverImage: "/work/sama-ai-listing/hero.png",
    tagline:
      "An AI-first selling experience on Soum that turns a single sentence, photo, or voice note into a fully priced, photo-enhanced listing.",
    sections: [
      // OVERVIEW
      {
        type: "section-intro",
        tagline: "Overview",
        heading: "What is Agentic Selling?",
        body:
          "An AI-first selling experience on the Soum platform that offers four distinct pathways — chat, voice, image, and manual — all converging to a single outcome: a fully priced, photo-enhanced, ready-to-publish product listing.",
      },
      {
        type: "feature-cards",
        cards: [
          {
            icon: "/work/sama-ai-listing/icons/platform-soum.svg",
            heading: "Soum Marketplace",
            body:
              "Saudi Arabia's leading electronics marketplace expanding into Real Estate & Cars",
          },
          {
            icon: "/work/sama-ai-listing/icons/platform-robot.svg",
            heading: "Sama AI",
            body:
              "\"Powered by SOUM / Proudly Saudi\" — an intelligent listing companion with personality",
          },
          {
            icon: "/work/sama-ai-listing/icons/platform-mobile.svg",
            heading: "iOS Mobile App",
            body:
              "iOS Mobile form factor with native camera, voice, and chat integration",
          },
        ],
      },
      {
        type: "key-results",
        heading: "Key Results at a Glance",
        items: [
          { value: "1.5min", label: "Listing creation time" },
          { value: "78%", label: "Listing completion rate" },
          { value: "4.6/5", label: "User satisfaction score" },
        ],
      },

      // DESIGN PRINCIPLES
      {
        type: "principles-grid",
        heading: "My Design Principles",
        cards: [
          {
            icon: "/work/sama-ai-listing/icons/principle-iterate.svg",
            heading: "\u201CIterate & Elevate\u201D",
            body:
              "Great design isn't born perfect. It's refined through cycles of feedback, testing, and thoughtful improvement. There's always room to push further, one iteration at a time.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-empathy.svg",
            heading: "\u201CEmpathy First\u201D",
            body:
              "Every decision starts with understanding real people and their daily challenges, while showing care toward their frustrations, habits, and jobs-to-be-done.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-details.svg",
            heading: "\u201CSweat the Small Stuff\u201D",
            body:
              "The small details of a product define its quality. From spacing and typography to component sizing and microcopy, each element should be thoughtfully considered.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-delight.svg",
            heading: "\u201CDelight Unexpected\u201D",
            body:
              "Well-timed animations, playful transitions, and warm confirmations. Small moments of joy like these turn routine tasks into memorable experiences.",
          },
        ],
      },

      // PROBLEM & RESEARCH
      {
        type: "section-intro",
        tagline: "Problem & Research",
        heading: "Why selling online is still broken",
        body:
          "Online sellers face a paradox: the easier it is to buy, the harder it still is to sell. We set out to understand exactly where the friction lives.",
      },
      {
        type: "design-challenge",
        label: "Design Challenge",
        text:
          "\u201CHow might we reduce listing creation from {h1}18 minutes{/h1} to under {h1}2 minutes{/h1} while actually improving quality?\u201D",
      },
      {
        type: "pain-points",
        tagline: "Key Pain Points",
        items: [
          {
            title: "Slow Listing Creation",
            value: "18min",
            description:
              "Sellers spend about 18 minutes creating a listing, filling forms and setting prices.",
          },
          {
            title: "Poor Photo Quality",
            value: "73%",
            description:
              "Sellers often upload unedited photos with cluttered backgrounds, lowering buyer interest.",
          },
          {
            title: "Pricing Uncertainty",
            value: "82%",
            description:
              "Sellers struggle to set prices, causing overpricing or underpricing.",
          },
        ],
      },

      // TARGET USERS
      {
        type: "personas",
        tagline: "Target Users",
        heading: "Who are we designing for?",
        items: [
          {
            image: "/work/sama-ai-listing/persona-casual.png",
            heading: "The Casual Seller",
            body:
              "A casual seller who values speed over perfection — making it easy to list items quickly without effort.",
            jtbd:
              "When I want to sell my old phone, I want to list it in seconds without describing every detail, so I can quickly get it off my hands.",
          },
          {
            image: "/work/sama-ai-listing/persona-business.png",
            heading: "The Small Business Owner",
            body:
              "A high-volume seller focused on efficiency and consistency — where every minute saved scales across many listings.",
            jtbd:
              "When I list 20+ items daily, I want a fast and standardized process, so I can save time and maintain consistent quality.",
          },
          {
            image: "/work/sama-ai-listing/persona-hustler.png",
            heading: "The Side Hustler",
            body:
              "An aspiring seller who wants professional-looking listings to stand out and sell faster.",
            jtbd:
              "When I create a listing, I want my photos to look polished and attractive without needing a studio, so I can sell faster and maximize earnings.",
          },
        ],
      },

      // SOLUTIONS
      {
        type: "solution-showcase",
        tagline: "Solution 1",
        heading: "Manual Listing with AI Guard Rails",
        body:
          "The traditional form flow — but with an AI safety net. Sama watches, waits, and intervenes only when it can genuinely help.",
        image: "/work/sama-ai-listing/solution-1/step-1.png",
        imagePosition: "left",
        steps: [
          {
            num: "01",
            heading: "Start with Variants",
            body:
              "The user begins selecting brand, model, and capacity from dropdowns. Sama AI watches passively — no intrusion yet.",
            image: "/work/sama-ai-listing/solution-1/step-1.png",
          },
          {
            num: "02",
            heading: "AI Detects Hesitation",
            body:
              "If the user pauses too long, Sama proactively nudges: \"We noticed you're taking a while — can I help?\" A gentle intervention, not a takeover.",
            image: "/work/sama-ai-listing/solution-1/step-2.png",
          },
          {
            num: "03",
            heading: "Form Completed + AI Escape Hatch",
            body:
              "After filling the form, Sama offers: \"Want to skip the manual steps? I can list this for you instead.\" The AI path is always one tap away.",
            image: "/work/sama-ai-listing/solution-1/step-3.png",
          },
        ],
      },
      {
        type: "solution-showcase",
        tagline: "Solution 2",
        heading: "Chat with Sama AI",
        body:
          "Type one sentence. Sama extracts everything. The 4-state send animation provides constant feedback — users always know where they are in the process.",
        image: "/work/sama-ai-listing/solution-2/step-1.png",
        imagePosition: "right",
        steps: [
          {
            num: "01",
            heading: "Compose",
            body:
              "User types a natural language message with product details.",
            image: "/work/sama-ai-listing/solution-2/step-1.png",
          },
          {
            num: "02",
            heading: "Message Status",
            body:
              "Shows real-time message delivery states — from sending to successfully sent — so users clearly understand what's happening.",
            image: "/work/sama-ai-listing/solution-2/step-2.png",
          },
          {
            num: "03",
            heading: "AI Response",
            body:
              "Sama extracts model, color, storage, condition, battery, accessories — all from one sentence.",
            image: "/work/sama-ai-listing/solution-2/step-3.png",
          },
        ],
      },
      {
        type: "solution-showcase",
        tagline: "Solution 3",
        heading: "From amateur to professional in one tap",
        body:
          "AI-enhanced photos received 2.3× more views than originals. The enhancement is always opt-in — users keep full control.",
        image: "/work/sama-ai-listing/solution-3/step-1.png",
        imagePosition: "left",
        steps: [
          {
            num: "01",
            heading: "Raw Photos",
            body:
              "Unedited photos on wood backgrounds — cluttered, inconsistent lighting, amateur look.",
            image: "/work/sama-ai-listing/solution-3/step-1.png",
          },
          {
            num: "02",
            heading: "AI Enhancement Offer",
            body:
              "Before/After comparison + benefit checklist — sharper quality, better lighting, higher engagement.",
            image: "/work/sama-ai-listing/solution-3/step-2.png",
          },
          {
            num: "03",
            heading: "Enhanced Result",
            body:
              "Clean studio-style presentation — backgrounds transformed, lighting corrected, professional look.",
            image: "/work/sama-ai-listing/solution-3/step-3.png",
          },
        ],
      },

      // MORE SCREENS — animated Lottie composition (replaces static image)
      {
        type: "section-intro",
        tagline: "Screens",
        heading: "More Screens+",
      },
      {
        type: "lottie",
        src: "/work/sama-ai-listing/lottie/sama-screens.json",
        aspect: "4/3",
        maskWidth: "26%",
        maskHeight: "9%",
      },

      // DESIGN SYSTEM
      {
        type: "text",
        heading: "Building for Scale",
        body: [
          "Our design system is intentionally crafted for simplicity, ensuring ease of use and accessibility. Hosted on Figma, it offers a user-friendly interface, allowing for effortless navigation and collaboration among team members.",
        ],
      },
      {
        type: "media",
        src: "/work/sama-ai-listing/design-system.png",
        alt: "Sama AI design system",
        aspect: "984/842",
      },

      // RESULTS
      {
        type: "section-intro",
        tagline: "Results & Impact",
        heading: "The numbers speak",
        body:
          "From 18-minute listings to 90-second conversations. Here's how Sama AI transformed the selling experience on Soum.",
      },
      {
        type: "result-cards",
        items: [
          { value: "1.5min", label: "Listing creation time" },
          { value: "78%", label: "Listing completion rate" },
          { value: "45%", label: "Photo quality improvement" },
        ],
      },

      // KEY LEARNINGS
      {
        type: "learnings-list",
        tagline: "Key Learnings",
        heading: "What I Learned",
        items: [
          {
            num: "01",
            heading: "AI Should Earn Trust",
            body:
              "The progressive intervention pattern (passive → proactive → active) outperformed always-on AI. Users who experienced the gradual approach were 40% more likely to adopt AI features.",
          },
          {
            num: "02",
            heading: "Transparency Beats Magic",
            body:
              "Showing how the price was calculated increased acceptance by 35% vs. just presenting a number. Users don't want a black box — they want an explainable partner.",
          },
          {
            num: "03",
            heading: "Multi-Modal > Single Path",
            body:
              "73% of users tried at least 2 different input modes. The most common combo: image first, then chat for details. Flexibility drives adoption.",
          },
          {
            num: "04",
            heading: "Enhancement Is the Hook",
            body:
              "AI photo enhancement had the highest feature adoption (89%). The before/after proof created an immediate \"aha moment\" that built trust for other AI features.",
          },
        ],
      },
    ],
  },

  // ─── REMAINING CASE STUDIES (placeholder until real Figma data is provided) ──
  {
    slug: "soum-partners",
    title: "Soum Partners — a B2B inventory management portal",
    client: "Soum Marketplace",
    year: "2026",
    role: "UX/UI Designer",
    duration: "Oct–Nov 2026",
    tags: ["B2B", "Web", "iOS"],
    meta: [
      { label: "Timeline", value: "Oct–Nov 2026" },
      { label: "Role", value: "UX/UI Designer" },
      { label: "Tools", value: "Figma" },
      { label: "Platform", value: "Desktop + iOS Mobile" },
    ],
    coverImage: "/work/soum-partners/01.png",
    tagline:
      "A B2B inventory management platform — empowering professional partners to manage catalogs, create SKUs, and track inspections across desktop and mobile.",
    sections: [
      // OVERVIEW
      {
        type: "section-intro",
        tagline: "Overview",
        heading: "What is the Partner Portal?",
        body:
          "A B2B inventory management platform for the Soum marketplace — empowering professional partners to manage catalogs, create SKUs, and track inspections through a unified experience across desktop and mobile.",
      },
      {
        type: "feature-cards",
        cards: [
          {
            icon: "/work/soum-partners/icons/platform-partners.svg",
            heading: "B2B Partners & Merchants",
            body:
              "Saudi Arabia's leading electronics marketplace expanding into Real Estate & Cars",
          },
          {
            icon: "/work/soum-partners/icons/platform-desktop.svg",
            heading: "Desktop Partner Portal",
            body:
              "\"Powered by SOUM / Proudly Saudi\" — an intelligent listing companion with personality",
          },
          {
            icon: "/work/soum-partners/icons/platform-mobile.svg",
            heading: "iOS Partner App",
            body:
              "iOS Mobile form factor with native camera, voice, and chat integration",
          },
        ],
      },
      {
        type: "key-results",
        heading: "Key Results at a Glance",
        items: [
          { value: "60%", label: "Faster onboarding time" },
          { value: "48+", label: "Products managed per partner" },
          { value: "3×", label: "Faster SKU generation" },
        ],
      },

      // DESIGN PRINCIPLES (same 4 principles, reuse existing icons)
      {
        type: "principles-grid",
        heading: "My Design Principles",
        cards: [
          {
            icon: "/work/sama-ai-listing/icons/principle-iterate.svg",
            heading: "\u201CIterate & Elevate\u201D",
            body:
              "Great design isn't born perfect. It's refined through cycles of feedback, testing, and thoughtful improvement. There's always room to push further, one iteration at a time.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-empathy.svg",
            heading: "\u201CEmpathy First\u201D",
            body:
              "Every decision starts with understanding real people and their daily challenges, while showing care toward their frustrations, habits, and jobs-to-be-done.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-details.svg",
            heading: "\u201CSweat the Small Stuff\u201D",
            body:
              "The small details of a product define its quality. From spacing and typography to component sizing and microcopy, each element should be thoughtfully considered.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-delight.svg",
            heading: "\u201CDelight Unexpected\u201D",
            body:
              "Well-timed animations, playful transitions, and warm confirmations. Small moments of joy like these turn routine tasks into memorable experiences.",
          },
        ],
      },

      // PROBLEM & RESEARCH
      {
        type: "section-intro",
        tagline: "Problem & Research",
        heading: "Why B2B inventory management needed a rethink",
        body:
          "While Soum's consumer app excels at C2C selling, professional partners need a fundamentally different experience — built for density, precision, and operational efficiency.",
      },
      {
        type: "design-challenge",
        label: "Design Challenge",
        text:
          "\u201CHow might we give {h1}professional partners{/h1} the operational control of enterprise tools within the simplicity of a {h1}consumer-grade{/h1} interface?\u201D",
      },
      {
        type: "pain-points",
        tagline: "Key Pain Points",
        items: [
          {
            title: "Slow Inventory Workflows",
            value: "18min",
            description:
              "Partners spend too much time managing bulk inventory — navigating forms and tracking statuses.",
          },
          {
            title: "SKU Complexity at Scale",
            value: "48+",
            description:
              "High-volume sellers manage many product variants. Manual SKU creation is prone to errors and takes time.",
          },
          {
            title: "Platform Fragmentation",
            value: "2×",
            description:
              "Partners must manage inventory from both desktop and mobile, ensuring a consistent experience.",
          },
        ],
      },

      // TARGET USERS
      {
        type: "personas",
        tagline: "Target Users",
        heading: "Who are we designing for?",
        items: [
          {
            image: "/work/soum-partners/persona-wholesaler.png",
            heading: "The Electronics Wholesaler",
            body:
              "A high-volume seller managing hundreds of devices — requiring bulk tools and clear tracking from a centralized workspace.",
            jtbd:
              "When I handle large inventory, I want to manage listings and track inspection status in bulk, so I can efficiently oversee everything from my desk.",
          },
          {
            image: "/work/soum-partners/persona-shop.png",
            heading: "The Small Shop Owner",
            body:
              "A busy shop owner managing inventory on the go — balancing in-store customers with online listings.",
            jtbd:
              "When I update my listings, I want to do it quickly from my phone, so I can manage my shop without interrupting my day.",
          },
          {
            image: "/work/soum-partners/persona-vendor.png",
            heading: "The Regional Vendor",
            body:
              "A multi-item seller who needs clear visibility across listing statuses to stay in control of operations.",
            jtbd:
              "When I review my inventory, I want to instantly see which items are live, pending, or sold, so I can make quick decisions and stay organized.",
          },
        ],
      },

      // SOLUTIONS
      {
        type: "solution-showcase",
        tagline: "Solution 1",
        heading: "Frictionless Partner Onboarding",
        body:
          "Passwordless OTP login gets busy merchants from identity verification to their operational dashboard in under 60 seconds. The same flow works across web and mobile with platform-specific optimizations.",
        image: "/work/soum-partners/solution-1/step-1.png",
        imagePosition: "left",
        steps: [
          {
            num: "01",
            heading: "Phone Number Entry",
            body:
              "Partners enter their Saudi mobile number (+966). Only valid 9-digit numbers proceed. The Continue button remains disabled until valid input is detected.",
            image: "/work/soum-partners/solution-1/step-1.png",
          },
          {
            num: "02",
            heading: "OTP Verification",
            body:
              "A 5-digit OTP is sent to the partner's phone. The screen shows the target number, a countdown timer (3:00), and a Confirm button that activates when all digits are filled. Failed OTPs show red styling with \"Resend code\".",
            image: "/work/soum-partners/solution-1/step-2.png",
          },
          {
            num: "03",
            heading: "Dashboard Landing",
            body:
              "After login, partners access My Catalog — the main operational view. A \"Welcome Back\" message with navigation for My Catalog, Create SKU, and Add Products ensures quick access.",
            image: "/work/soum-partners/solution-1/step-3.png",
          },
        ],
      },
      {
        type: "solution-showcase",
        tagline: "Solution 2",
        heading: "The Merchant Control Center",
        body:
          "Day-to-day inventory operations — search, filter, triage, and monitor. Designed for fast lookup and clear status visibility with immediate recovery from zero-result states.",
        image: "/work/soum-partners/solution-2/step-1.png",
        imagePosition: "right",
        steps: [
          {
            num: "01",
            heading: "My Catalog — Main View",
            body:
              "The operational dashboard shows a data table on desktop and compact cards on mobile. Both support SKU or Inventory ID search and pagination for 48+ products.",
            image: "/work/soum-partners/solution-2/step-1.png",
          },
          {
            num: "02",
            heading: "Status Filter Dropdown",
            body:
              "Partners filter by Sell Status: All, Active, Inactive, or Sold. Radio-style single-select simplifies filtering. The dropdown anchors inline for quick inventory triage.",
            image: "/work/soum-partners/solution-2/step-2.png",
          },
          {
            num: "03",
            heading: "No Products Yet",
            body:
              "New partners without inventory see a guidance card stating \"No products yet\". Two CTAs — Watch Tutorial and View Guide — help activate the partner.",
            image: "/work/soum-partners/solution-2/step-3.png",
          },
        ],
      },
      {
        type: "solution-showcase",
        tagline: "Solution 3",
        heading: "Structured SKU Generation",
        body:
          "The catalog-structuring stage where partners define sellable variant granularity before inventory scaling. Taxonomy-driven creation ensures consistent, marketplace-ready SKU outputs.",
        image: "/work/soum-partners/solution-3/step-1.png",
        imagePosition: "left",
        steps: [
          {
            num: "01",
            heading: "Create SKU — Starting Point",
            body:
              "The SKU Management card allows you to Generate SKU. New partners see a \"No SKUs yet\" state with Watch Tutorial and View Guide options.",
            image: "/work/soum-partners/solution-3/step-1.png",
          },
          {
            num: "02",
            heading: "Generated SKUs History",
            body:
              "Returning partners view their SKU batches in a compact table (Color, Capacity, RAM, Storage). Pagination supports 48+ SKUs. The Generate SKU card stays at the top for repeat creation, indicating a recurring workflow.",
            image: "/work/soum-partners/solution-3/step-2.png",
          },
          {
            num: "03",
            heading: "Variant Matrix & Generation",
            body:
              "Select Category (Mobiles), Brand (Apple), Model (iPhone 15 Pro) to load variants. A counter (\"0 of 8 selected\") and Select All enable granular and bulk actions. Generate SKU is disabled until one variant is selected.",
            image: "/work/soum-partners/solution-3/step-3.png",
          },
        ],
      },

      // MORE SCREENS — animated Lottie composition
      {
        type: "section-intro",
        tagline: "Screens",
        heading: "More Screens+",
      },
      {
        type: "lottie",
        src: "/work/soum-partners/lottie/showreel.json",
        aspect: "4/3",
        maskWidth: "26%",
        maskHeight: "9%",
      },

      // DESIGN SYSTEM (reuses image from sama-ai-listing)
      {
        type: "text",
        heading: "Building for Scale",
        body: [
          "Our design system is intentionally crafted for simplicity, ensuring ease of use and accessibility. Hosted on Figma, it offers a user-friendly interface, allowing for effortless navigation and collaboration among team members.",
        ],
      },
      {
        type: "media",
        src: "/work/sama-ai-listing/design-system.png",
        alt: "Soum Partners design system",
        aspect: "984/842",
      },

      // RESULTS
      {
        type: "section-intro",
        tagline: "Results & Impact",
        heading: "The numbers speak",
        body:
          "Partner onboarding time dropped from minutes to seconds, inventory operations scaled to hundreds of items, and SKU generation became a few-tap workflow.",
      },
      {
        type: "result-cards",
        items: [
          { value: "60s", label: "Onboarding to dashboard" },
          { value: "48+", label: "Products managed efficiently" },
          { value: "3×", label: "Faster SKU generation" },
        ],
      },

      // KEY LEARNINGS
      {
        type: "learnings-list",
        tagline: "Key Learnings",
        heading: "What I Learned",
        items: [
          {
            num: "01",
            heading: "Density Is a Feature for B2B",
            body:
              "Professional partners need information-dense interfaces. Table views with status visibility outperformed card layouts in testing — scanning 48+ items requires density.",
          },
          {
            num: "02",
            heading: "Status Visibility Drives Daily Logins",
            body:
              "Partners check inspection outcomes and sell status on the portal. Making these visible on every row transformed the dashboard into an operational command center.",
          },
          {
            num: "03",
            heading: "Cross-Platform Parity Reduces Relearning",
            body:
              "72% of partners use web and mobile. By keeping the same navigation (My Catalog → Create SKU → Add Products), we reduced the cognitive cost of switching platforms.",
          },
          {
            num: "04",
            heading: "Empty States Are Activation Opportunities",
            body:
              "We designed contextual empty states with CTAs like Watch Tutorial and View Guide. This turned \"no data\" moments into onboarding opportunities, reducing first-inventory time by 40%.",
          },
        ],
      },
    ],
  },
  {
    slug: "mirror-booking",
    title: "Redesigning the salon booking experience for Saudi Arabia",
    client: "MIRROR",
    year: "2023",
    role: "UX/UI Designer",
    duration: "Oct–Nov 2023",
    tags: ["Mobile", "B2C + B2B", "Saudi Arabia"],
    meta: [
      { label: "Timeline", value: "Oct–Nov 2023" },
      { label: "Role", value: "UX/UI Designer" },
      { label: "Tools", value: "Figma" },
      { label: "Platform", value: "Mobile (B2B & B2C)" },
    ],
    coverImage: "/work/mirror-booking/hero.png",
    thumbnail: "/work/mirror-booking/Image.png",
    tagline:
      "An end-to-end salon booking platform connecting customers with beauty businesses across Saudi Arabia — built for both sides of the marketplace.",
    sections: [
      // INTRODUCTION
      {
        type: "text",
        heading: "Introduction",
        body: [
          "MIRROR is an advanced salon-based mobile application that offers a platform to the beauty, cosmetic, spa and salon businesses to book customer appointments with talented professionals in their area. Customers can browse and book their favourite treatments and services with the salon and spa businesses available on our platform. Our 24/7 booking platform lets customers book at a time that suits them and at a price that suits their budget.",
          "This research explores the world of beauty salon bookings, considering the perspectives of both salon owners and users. We aim to gain deep insights from these two key players in the industry and provide an information architecture for the booking platform to enhance its efficiency and user-friendliness.",
        ],
      },

      // TARGET AUDIENCE
      {
        type: "text-columns",
        cols: 1,
        align: "center",
        heading: "Target Audience",
        columns: [
          {
            tagline: "B2C",
            heading: "Customers seeking personalized beauty experiences",
            body: "Starting in Jeddah — a diverse mix of males and females seeking personalized beauty experiences across various age groups and interests.",
          },
          {
            tagline: "B2B",
            heading: "Female-owned beauty businesses",
            body: "Predominantly female-owned beauty businesses concentrated in Jeddah, catering to diverse gender preferences by offering a wide range of services.",
          },
        ],
      },

      // DESIGN PRINCIPLES
      {
        type: "principles-grid",
        heading: "My Design Principles",
        cards: [
          {
            icon: "/work/sama-ai-listing/icons/principle-iterate.svg",
            heading: "\u201CIterate & Elevate\u201D",
            body:
              "Great design isn't born perfect. It's refined through cycles of feedback, testing, and thoughtful improvement. There's always room to push further, one iteration at a time.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-empathy.svg",
            heading: "\u201CEmpathy First\u201D",
            body:
              "Every decision starts with understanding real people and their daily challenges, while showing care toward their frustrations, habits, and jobs-to-be-done.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-details.svg",
            heading: "\u201CSweat the Small Stuff\u201D",
            body:
              "The small details of a product define its quality. From spacing and typography to component sizing and microcopy, each element should be thoughtfully considered.",
          },
          {
            icon: "/work/sama-ai-listing/icons/principle-delight.svg",
            heading: "\u201CDelight Unexpected\u201D",
            body:
              "Well-timed animations, playful transitions, and warm confirmations. Small moments of joy like these turn routine tasks into memorable experiences.",
          },
        ],
      },

      // PROBLEM
      {
        type: "section-intro",
        tagline: "Problem",
        heading: "Problem",
        body: "In Saudi Arabia's busy beauty scene, salons face lots of challenges every day. They deal with managing their staff, organizing appointments efficiently, and trying to attract more customers using smart marketing through an affordable and smooth platform.",
      },
      {
        type: "alternating-rows",
        items: [
          {
            image: "/work/mirror-booking/problem-1.png",
            tagline: "Problem #1",
            heading: "Fragmented Booking Landscape",
            body: "The salon booking landscape in Saudi Arabia lacks a unified, user-friendly platform. Customers struggle with fragmented booking processes across WhatsApp, Instagram, phone calls, and walk-ins — with no single solution that brings it all together.",
          },
          {
            image: "/work/mirror-booking/problem-2.png",
            tagline: "Problem #2",
            heading: "No Unified Platform for Users",
            body: "People who go to salons want things to be easy, quick, and top-notch. They're looking for a platform that not only works well but also gives them good information about the services and helps them make smart choices. Currently, no platform delivers this comprehensive experience.",
          },
        ],
      },

      // DESIGN CHALLENGE — Centered heading + Rose callout
      {
        type: "section-intro",
        heading: "Defining the problem",
        align: "center",
      },
      {
        type: "design-challenge",
        theme: "rose",
        label: "Defining the Problem",
        text: "How might we help salon owners manage staff, {h1}simplify bookings{/h1}, and promote their services so they can grow their business and offer customers easy access to quality beauty care?",
      },

      // GOALS
      {
        type: "text-list",
        heading: "Goals",
        groups: [
          {
            tagline: "BUSINESS GOALS",
            items: [
              {
                heading: "Give salon owners affordable, easy-to-use tools",
                body: "Most beauty salons in Riyadh and Jeddah are run by women who juggle staff management, appointment scheduling, and marketing with no single platform that fits their budget. Mirror provides one system that handles all three.",
              },
              {
                heading: "Reduce booking fragmentation",
                body: "Salons currently take bookings through WhatsApp, Instagram, phone calls, and walk-ins — leading to double-bookings, no-shows, and lost revenue. Mirror consolidates every channel into a single calendar.",
              },
            ],
          },
          {
            tagline: "USER GOALS",
            items: [
              {
                heading: "Find and book salons without friction",
                body: "97% of our survey respondents use smartphones for bookings, yet 79% still rely on social media to discover salons. Mirror gives them a dedicated platform with real-time availability, transparent pricing, and one-tap booking.",
              },
              {
                heading: "Make informed decisions",
                body: "Users want to see ratings, reviews, service menus, and photos before committing. Mirror surfaces all of this upfront so they can compare salons and choose with confidence.",
              },
            ],
          },
        ],
      },

      // RESEARCH
      {
        type: "text-columns",
        heading: "Understanding Users & Market",
        tagline: "Research",
        body: "We conducted an extensive analysis of the beauty services market, combining competitor research, user interviews, and surveys to build a comprehensive understanding of both sides of the platform — the customers booking beauty services and the salon owners managing their businesses.",
        cols: 2,
        columns: [
          {
            heading: "Competitor Analysis",
            body: "We conducted an analysis of competitors within the beauty service app industry. It offers an extensive breakdown of both local and global competitors, examining their features matrix. We included direct and indirect competitor categories.",
          },
          {
            heading: "Indirect Competitors",
            body: "Competition from platforms like WhatsApp, Instagram, Snapchat, TikTok and Facebook. General appointment scheduling apps. Review platforms like Yelp, TripAdvisor, or Google Reviews. E-commerce platforms like Amazon that may offer beauty products.",
          },
        ],
      },
      {
        type: "media-quad",
        images: [
          { src: "/work/mirror-booking/research-1.png", alt: "Market research insight 1" },
          { src: "/work/mirror-booking/research-2.png", alt: "Market research insight 2" },
          { src: "/work/mirror-booking/research-3.png", alt: "Market research insight 3" },
          { src: "/work/mirror-booking/research-4.png", alt: "Market research insight 4" },
        ],
      },

      // OUR USERS
      {
        type: "section-intro",
        heading: "Our Users",
        body: "We developed personas representing the two sides of the Mirror platform — end users seeking salon services and salon owners managing their businesses.",
        align: "center",
      },
      {
        type: "media",
        src: "/work/mirror-booking/persona-customer.png",
        alt: "Customer persona — end user",
        aspect: "16/9",
      },
      {
        type: "media",
        src: "/work/mirror-booking/persona-owner.png",
        alt: "Salon owner persona",
        aspect: "16/9",
      },

      // FROM RESEARCH TO DESIGN
      {
        type: "text-columns",
        tagline: "Process",
        heading: "From Research to Design",
        body: "With a strong foundation of user and market insights, we transitioned from research into design — mapping out the product architecture, prioritizing features, and sketching the first interface concepts for both the customer-facing app and the salon-owner dashboard.",
        cols: 1,
        columns: [
          {
            heading: "Site Maps",
            body: "We created detailed site maps for both sides of the platform to establish clear navigation hierarchies. The B2C map focuses on discovery, booking, and profile management, while the B2B map organizes the salon owner's tools around appointments, staff, and business analytics.",
          },
        ],
      },
      {
        type: "media",
        src: "/work/mirror-booking/sitemap-b2c.png",
        alt: "Mirror B2C site map",
        aspect: "16/10",
        caption: "B2C — Customer app",
      },
      {
        type: "media",
        src: "/work/mirror-booking/sitemap-b2b.png",
        alt: "Mirror B2B site map",
        aspect: "16/10",
        caption: "B2B — Salon owner dashboard",
      },

      // HIGH-FIDELITY WIREFRAMING
      {
        type: "section-intro",
        tagline: "Design",
        heading: "High-Fidelity Wireframing",
        body: "High-fidelity wireframes allowed us to quickly explore layout options and user flows before committing to visual design. We iterated on screen structures for both the customer booking journey and the salon owner's management experience, testing assumptions about information hierarchy and interaction patterns.",
      },
      {
        type: "media",
        src: "/work/mirror-booking/wireframe-1.png",
        alt: "B2C wireframes",
        aspect: "16/9",
      },
      {
        type: "media",
        src: "/work/mirror-booking/wireframe-2.png",
        alt: "B2B wireframes",
        aspect: "16/9",
      },

      // UI + PROTOTYPE
      {
        type: "section-intro",
        heading: "UI + Prototype",
        tagline: "Visual Design",
        body: "We went through extensive iterations to refine every screen, crafting a visual booking experience that feels intuitive and delightful for both customers and salon owners.",
      },
      {
        type: "prototype-showcase",
        image: "/work/mirror-booking/hero.png",
        alt: "Mirror B2C app prototype",
        buttonLabel: "View B2C Prototype",
        buttonHref: "#",
      },
      {
        type: "prototype-showcase",
        image: "/work/mirror-booking/prototype-b2b.png",
        alt: "Mirror B2B dashboard prototype",
        buttonLabel: "View B2B Prototype",
        buttonHref: "#",
      },

      // USABILITY TESTING
      {
        type: "section-intro",
        tagline: "Testing",
        heading: "Usability Testing",
        body: "We conducted six usability tests of the Mirror app to identify and address usability issues. Our objective was to provide Mirror with recommendations to enhance the communication of their concept, optimize the organization of salon details, and create excitement among potential users.",
      },
      {
        type: "alternating-rows",
        items: [
          {
            image: "/work/mirror-booking/improvement-1.png",
            heading: "Improvement #1",
            body: "Improve the user experience by addressing users' desire for post-booking notifications and enhancing communication.",
            subBlock: {
              heading: "The Problem",
              body: "Users express a desire for post-booking notifications to enhance their experience, ensuring appointment confirmation and providing guidance.",
            },
          },
          {
            image: "/work/mirror-booking/improvement-2.png",
            heading: "Improvement #2",
            body: "Improve the user experience by addressing users' difficulties in navigating with salon profiles.",
            subBlock: {
              heading: "The Problem",
              body: "Users faced challenges in identifying and navigating the tabs related to salon profiles on the interface.",
            },
          },
          {
            image: "/work/mirror-booking/improvement-3.png",
            heading: "Improvement #3",
            body: "Address the issue of some categories' misleading icons.",
            subBlock: {
              heading: "The Problem",
              body: "Users have identified icons within the interface that are misleading, leading to confusion and a less intuitive user experience.",
            },
          },
        ],
      },

      // ITERATIONS & FIXES
      {
        type: "section-intro",
        heading: "Iterations & Fixes",
        body: "Based on our testing findings, we implemented targeted UI improvements to address the most critical usability issues:",
        align: "center",
      },
      {
        type: "before-after",
        items: [
          {
            image: "/work/mirror-booking/before-after-1.png",
            heading: "Appointment Confirmation",
            points: [
              "Added confirmation step for salon bookings",
              "Enhances reliability and user confidence",
              "Gives the salons the choice and flexibility",
            ],
          },
          {
            image: "/work/mirror-booking/before-after-2.png",
            heading: "New Appointments Screen",
            points: [
              "Dedicated screen for managing appointments",
              "Streamlined process for new appointments",
            ],
          },
        ],
      },

      // DESIGN SYSTEM
      {
        type: "section-intro",
        tagline: "Design System",
        heading: "Building for Scale",
        body: "Our design system is intentionally crafted for simplicity, ensuring ease of use and accessibility. Hosted on Figma, it offers a user-friendly interface, allowing for effortless navigation and collaboration among team members.",
      },
      {
        type: "media",
        src: "/work/mirror-booking/design-system.png",
        alt: "Mirror design system",
        aspect: "16/9",
      },

      // WHAT I LEARNED
      {
        type: "section-intro",
        tagline: "Reflection",
        heading: "What I Learned",
        body: "Mirror represents a holistic approach to user experience, seamlessly blending user-centric design and functionality. Through iterative processes and user feedback integration, we sculpted an app that not only simplifies salon booking but also establishes a cohesive, intuitive interface, catering to both providers and users' needs.",
      },
      {
        type: "learnings-list",
        tagline: "Next Steps",
        heading: "Where Mirror goes from here",
        items: [
          {
            num: "01",
            heading: "Collaboration with Development",
            body: "Work closely with the engineering team to translate the design system and prototypes into production code. This means establishing a shared component library, defining interaction specifications for every state, and setting up a feedback loop so design and development stay aligned throughout the build.",
          },
          {
            num: "02",
            heading: "Iterate Based on Feedback",
            body: "Launch a closed beta with a small group of salon owners and customers in Jeddah. Collect quantitative data on task completion rates and qualitative feedback through follow-up interviews. Use those insights to refine the booking flow, salon profile pages, and notification system before a wider rollout.",
          },
          {
            num: "03",
            heading: "Quality Assurance",
            body: "Run end-to-end testing across both the B2C and B2B apps — covering edge cases like overlapping appointments, last-minute cancellations, and poor network conditions. Validate that the interface performs consistently on the most common devices in the Saudi market.",
          },
          {
            num: "04",
            heading: "Launch Preparation",
            body: "Build onboarding flows for both user types. Salon owners need a guided setup for their profile, services, and availability. Customers need a clear first-run experience that shows them the value of the platform within 30 seconds. Prepare support documentation and a launch marketing strategy targeting Jeddah first.",
          },
        ],
      },
    ],
  },
  {
    slug: "clepair-proposal",
    title: "CLEPAIR UX/UI Proposal",
    client: "CLEPAIR",
    year: "2024",
    role: "UX/UI Designer",
    duration: "7–10 weeks",
    tags: ["Proposal", "Mobile", "Automotive"],
    coverImage: "/work/clepair-proposal/hero.png",
    tagline:
      "A comprehensive design strategy for empowering car owners across Saudi Arabia with convenient, on-demand vehicle care services.",
    layout: "proposal",
    sections: [
      // ─── HERO ─────────────────────────────────────────────────────────
      {
        type: "proposal-hero",
        logo: "/work/clepair-proposal/logo.png",
        logoLabel: "CLEPAIR",
        heading: "UX/UI\n{h1}Proposal{/h1}",
        body: "A comprehensive design strategy for empowering car owners across Saudi Arabia with convenient, on-demand vehicle care services.",
        heroImage: "/work/clepair-proposal/hero.png",
        presentedTo: { label: "Presented To", name: "Raed Al Mashhadi" },
        presentedBy: { label: "Presented By", name: "Hagar Hassan" },
      },
      // ─── GOAL & USER SEGMENT ──────────────────────────────────────────
      {
        type: "proposal-feature-text",
        bg: "light",
        tagline: "UXUI PROPOSAL",
        heading: "Goal and user segment",
        items: [
          {
            eyebrow: "GOAL",
            body: "The goal of the app is to empower busy car owners in major cities across Saudi Arabia to conveniently clean or repair their vehicles without the need to visit physical automotive shops, while simultaneously assisting local automotive service providers in efficiently connecting with potential customers.",
            image: "/work/clepair-proposal/goal.png",
            imageOnRight: false,
          },
          {
            eyebrow: "USER SEGMENT",
            body: "The app targets busy professionals, families, rideshare drivers, car enthusiasts, tourists, businesses with vehicle fleets, senior citizens, and local automotive service providers in major cities in Saudi Arabia. It aims to offer convenient, on-demand car cleaning and repair services to cater to their specific needs.",
            image: "/work/clepair-proposal/user-segment.png",
            imageOnRight: true,
          },
        ],
      },
      // ─── MARKET OPPORTUNITY ───────────────────────────────────────────
      {
        type: "proposal-feature-cards",
        bg: "dark",
        tagline: "Market Opportunity",
        heading: "Why do we need this app?",
        headerBody: "Investing in the development of a car wash mobile app can help you with huge profits. The car service and cleaning industry is ripe for disruption as people increasingly value convenience and efficiency.",
        layout: "market",
        cards: [
          {
            icon: "/work/clepair-proposal/icons/relume.svg",
            heading: "Market Size opportunity",
            body: "The KSA Car Wash Service market size surpassed USD 486.17 million in 2022 and is projected to expand at a CAGR of 11.12% between 2022 and 2028.",
          },
          {
            icon: "/work/clepair-proposal/icons/star-shine.svg",
            heading: "Better customer experiences",
            body: "All-in-one car service and cleaning app brings convenience to your car care needs. Users enjoy easy scheduling, transparency, and roadside assistance, while owners benefit from increased revenue, streamlined operations, and marketing support, creating a win-win solution for all.",
          },
          {
            icon: "/work/clepair-proposal/icons/repeat.svg",
            heading: "Recurring nature of the services",
            body: "The nature of this type of service ensures that users will return to use it repeatedly. This assurance stems from a combination of factors that prioritize user satisfaction, convenience, and quality.",
            image: "/work/clepair-proposal/recurring.png",
          },
        ],
      },
      // ─── KPIs & METRICS TABLE ─────────────────────────────────────────
      {
        type: "proposal-table",
        bg: "light",
        tagline: "KPIs & Metrics",
        heading: "Measuring Success",
        headerBody: "Key performance indicators that will define and track the app's growth trajectory.",
        columns: [
          {
            header: "KPIs and Metrics",
            cells: [
              "User Retention Rate",
              "Avg. Service Booking Time",
              "User Satisfaction Score",
              "Conversion Rate",
              "Avg. Transaction Value",
              "Service Completion Time",
              "Number of Service Providers",
              "App Downloads",
              "Customer Acquisition Cost",
            ],
          },
          {
            header: "Description",
            cells: [
              "Percentage of users who return for additional services.",
              "The time it takes for a user to book a service.",
              "Ratings and feedback provided by users.",
              "Percentage of app visitors who book a service.",
              "The average amount spent by users per service.",
              "Time taken to complete scheduled services.",
              "The total number of partnered service centers.",
              "The number of times the app is downloaded.",
              "The cost to acquire each new user.",
            ],
          },
        ],
      },
      // ─── COMPETITIVE ANALYSIS ─────────────────────────────────────────
      {
        type: "proposal-logo-grid",
        heading: "Competitive Analysis",
        headerBody: "Understanding the existing players in the Saudi automotive services market to identify opportunities for differentiation.",
        logos: [
          { src: "/work/clepair-proposal/competitors/comp-1.png", alt: "Competitor 1" },
          { src: "/work/clepair-proposal/competitors/comp-2.png", alt: "Competitor 2" },
          { src: "/work/clepair-proposal/competitors/comp-3.png", alt: "Competitor 3" },
          { src: "/work/clepair-proposal/competitors/comp-4.png", alt: "Competitor 4" },
          { src: "/work/clepair-proposal/competitors/comp-5.png", alt: "Competitor 5" },
          { src: "/work/clepair-proposal/competitors/comp-6.png", alt: "Competitor 6" },
        ],
      },
      // ─── CURRENT JOURNEY AUDIT TABLE ──────────────────────────────────
      {
        type: "proposal-table",
        bg: "light",
        tagline: "Current Journey Audit",
        heading: "Current journey potential",
        headerBody: "A detailed audit of the existing app experience, identifying key concerns and actionable suggestions for improvement.",
        columns: [
          {
            header: "Sign in / Sign up",
            cells: [
              "Elements",
              "App Identity",
              "User Satisfaction Score",
              "Conversion Rate",
              "Avg. Transaction Value",
              "Service Completion Time",
              "Number of Service Providers",
              "App Downloads",
              "Customer Acquisition Cost",
            ],
          },
          {
            header: "Concern",
            cells: [
              "The user experience is hindered by complex and redundant elements, such as repetitive location notification positioning.",
              "The time it takes for a user to book a service.",
              "Ratings and feedback provided by users.",
              "Percentage of app visitors who book a service.",
              "The average amount spent by users per service.",
              "Time taken to complete scheduled services.",
              "The total number of partnered service centers.",
              "The number of times the app is downloaded.",
              "The cost to acquire each new user.",
            ],
          },
          {
            header: "Suggestion",
            cells: [
              "Restructure the user journey by focusing on the profile creation process instead of the sign-in process. Eliminate extraneous details and keep it concise.",
              "The time it takes for a user to book a service.",
              "Ratings and feedback provided by users.",
              "Percentage of app visitors who book a service.",
              "The average amount spent by users per service.",
              "Time taken to complete scheduled services.",
              "The total number of partnered service centers.",
              "The number of times the app is downloaded.",
              "The cost to acquire each new user.",
            ],
          },
        ],
      },
      // ─── KEY FEATURES ─────────────────────────────────────────────────
      {
        type: "proposal-feature-cards",
        bg: "dark",
        tagline: "Proposed Features",
        heading: "Key Features",
        headerBody: "A curated list of strategic features designed to differentiate CLEPAIR from competitors and deliver exceptional user value.",
        layout: "features",
        cards: [
          {
            icon: "/work/clepair-proposal/icons/wallet.svg",
            heading: "Customer Wallet",
            body: "Provide users with a digital wallet where they can store credits for future use, ensuring convenience and encouraging repeat bookings.",
          },
          {
            heading: "Multi-Vehicle Support",
            body: "Allow users to register and manage multiple vehicles within the app, catering to large families or individuals with multiple cars.",
            image: "/work/clepair-proposal/feature-multi-vehicle.png",
          },
          {
            heading: "Gender-Inclusive Marketing",
            body: "Develop advertising campaigns that focus on both male and female users to create a more inclusive brand image and appeal to a broader audience.",
            image: "/work/clepair-proposal/feature-gender.png",
          },
          {
            icon: "/work/clepair-proposal/icons/reviews.svg",
            heading: "User Reviews",
            body: "Prioritize and prominently display user reviews and ratings, as these form the basis for other users' choices and build trust in your service.",
          },
          {
            icon: "/work/clepair-proposal/icons/gifts.svg",
            heading: "Coupon & Loyalty Programs",
            body: "Implement coupon code integration and multi-tiered loyalty programs to reward frequent users and incentivize repeat business.",
          },
          {
            heading: "Offline Service Requests",
            body: "Enable users to book services and request information while offline, with the app automatically processing the requests once internet is restored.",
            image: "/work/clepair-proposal/feature-offline.png",
          },
        ],
      },
      // ─── TIMELINE ─────────────────────────────────────────────────────
      {
        type: "proposal-timeline",
        tagline: "Project Timeline",
        heading: "Proposed Timeline",
        headerBody: "The timeline for UX/UI design typically falls within the range of 7 to 10 weeks, with project complexity and user research extent acting as key factors.",
        steps: [
          {
            date: "1 week",
            heading: "Stakeholder / Provider Interviews",
            body: "Gaining a comprehensive understanding of the overarching business objectives and the specific requirements set forth by service providers is crucial for successful collaboration.",
          },
          {
            date: "1–2 weeks",
            heading: "Market Research",
            body: "In-depth analysis of the competitive landscape reveals key market trends that can significantly impact our strategy. Understanding these dynamics will help us position ourselves effectively for future growth.",
          },
          {
            date: "1–2 weeks",
            heading: "User Research",
            body: "Engaging in interviews and surveys is essential for gathering valuable insights. Additionally, developing detailed personas helps in understanding user needs and preferences more effectively.",
          },
          {
            date: "2 weeks",
            heading: "Wireframing / UI Phase",
            body: "Designing wireframes is a crucial step in the development process, as it allows us to visualize the layout and functionality of our application. Additionally, crafting high-fidelity UI designs ensures that the final product is not only user-friendly but also visually appealing.",
          },
          {
            date: "1 week",
            heading: "Testing",
            body: "Conducting usability testing is essential for understanding user interactions. By iterating on feedback, we can enhance the overall experience and ensure our product meets user needs.",
          },
          {
            date: "1 week",
            heading: "Handoff",
            body: "Creating comprehensive design specifications and detailed developer hand-off documentation is essential for ensuring a smooth transition from design to development.",
          },
        ],
      },
      // ─── CONTACT ──────────────────────────────────────────────────────
      {
        type: "proposal-contact",
        heading: "For inquiries,\ncontact us.",
        contactLabel: "Contact:",
        email: "info@isglobal.co",
        website: "http://www.isglobal.co/",
        socials: [
          { label: "Facebook", href: "#", icon: "/work/clepair-proposal/socials/facebook.svg" },
          { label: "Instagram", href: "#", icon: "/work/clepair-proposal/socials/instagram.svg" },
          { label: "X", href: "#", icon: "/work/clepair-proposal/socials/x.svg" },
          { label: "LinkedIn", href: "#", icon: "/work/clepair-proposal/socials/linkedin.svg" },
          { label: "YouTube", href: "#", icon: "/work/clepair-proposal/socials/youtube.svg" },
        ],
        image: "/work/clepair-proposal/credits.png",
      },
    ],
  },
];

/** Look up a case study by slug. Returns undefined if not found. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/**
 * Get prev / next case studies (loops at boundaries).
 */
export function getAdjacent(slug: string): {
  prev: CaseStudy;
  next: CaseStudy;
} | undefined {
  const idx = caseStudies.findIndex((cs) => cs.slug === slug);
  if (idx === -1) return undefined;
  const total = caseStudies.length;
  return {
    prev: caseStudies[(idx - 1 + total) % total],
    next: caseStudies[(idx + 1) % total],
  };
}
