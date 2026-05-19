"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * ProposalFeatureCards — matches Figma node 12340:3946 (Market Opportunity)
 * and 12340:4137 (Key Features).
 *
 * "market" layout: Row with [2 stacked cards LEFT] + [1 tall card RIGHT]
 * "features" layout: 3-col × 2-row grid
 *
 * Colors: bg #213F31, cards #2B5442, heading #6CD3A5, body white
 */
export function ProposalFeatureCards({
  tagline,
  heading,
  headerBody,
  cards,
  layout = "features",
}: {
  tagline: string;
  heading: string;
  headerBody?: string;
  bg?: "dark" | "light";
  cards: { icon?: string; heading: string; body: string; image?: string }[];
  layout?: "market" | "features";
}) {
  return (
    <div className="space-y-20">
      {/* Centered header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-base font-semibold text-white">{tagline}</p>
        <WordReveal
          as="h2"
          className="font-serif text-4xl leading-[1.2] tracking-tight text-[#6CD3A5] md:text-5xl"
        >
          {heading}
        </WordReveal>
        {headerBody && (
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white md:text-lg">
            {headerBody}
          </p>
        )}
      </div>

      {/* Cards */}
      {layout === "market" ? <MarketLayout cards={cards} /> : <FeaturesLayout cards={cards} />}
    </div>
  );
}

function MarketLayout({ cards }: { cards: { icon?: string; heading: string; body: string; image?: string }[] }) {
  // 2 stacked left + 1 tall right
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Left: 2 stacked */}
      <div className="flex flex-col gap-8">
        {cards.slice(0, 2).map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
      {/* Right: 1 tall card */}
      {cards[2] && (
        <div className="flex">
          <Card card={cards[2]} tall />
        </div>
      )}
    </div>
  );
}

function FeaturesLayout({ cards }: { cards: { icon?: string; heading: string; body: string; image?: string }[] }) {
  // 3 columns × 2 cards each. Cards are ordered column-by-column:
  // Col 1: cards[0], cards[1] | Col 2: cards[2], cards[3] | Col 3: cards[4], cards[5]
  const columns = [
    cards.slice(0, 2),
    cards.slice(2, 4),
    cards.slice(4, 6),
  ];
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {columns.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-8">
          {col.map((c, i) => (
            <Card key={i} card={c} tall={!c.image} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Card({
  card,
  tall,
}: {
  card: { icon?: string; heading: string; body: string; image?: string };
  tall?: boolean;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded border border-black/50 bg-[#2B5442] ${tall ? "flex-1" : ""}`}
    >
      <div className="flex flex-1 flex-col gap-6 p-8">
        {card.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.icon} alt="" className="h-12 w-12" aria-hidden />
        )}
        <div className="space-y-4">
          <WordReveal
            as="h3"
            className="font-sans text-2xl font-bold leading-[1.3] text-[#6CD3A5] md:text-[32px]"
          >
            {card.heading}
          </WordReveal>
          <p className="text-sm leading-relaxed text-white md:text-base">
            {card.body}
          </p>
        </div>
      </div>
      {card.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.image}
          alt=""
          className="h-[233px] w-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
}
