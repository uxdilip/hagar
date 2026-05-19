"use client";

import type { CaseStudySection } from "@/lib/caseStudies";
import { CaseStudyMedia } from "./CaseStudyMedia";
import { CaseStudyText } from "./CaseStudyText";
import { CaseStudyInfoGrid } from "./CaseStudyInfoGrid";
import { CaseStudyMediaGrid } from "./CaseStudyMediaGrid";
import { CaseStudyQuote } from "./CaseStudyQuote";
import { CaseStudyMetrics } from "./CaseStudyMetrics";
import { CaseStudySectionIntro } from "./CaseStudySectionIntro";
import { CaseStudyFeatureCards } from "./CaseStudyFeatureCards";
import { CaseStudyPrinciplesGrid } from "./CaseStudyPrinciplesGrid";
import { CaseStudyDesignChallenge } from "./CaseStudyDesignChallenge";
import { CaseStudyPainPoints } from "./CaseStudyPainPoints";
import { CaseStudyPersonas } from "./CaseStudyPersonas";
import { CaseStudySolutionShowcase } from "./CaseStudySolutionShowcase";
import { CaseStudyLearningsList } from "./CaseStudyLearningsList";
import { CaseStudyLottie } from "./CaseStudyLottie";
import { CaseStudyKeyResults } from "./CaseStudyKeyResults";
import { CaseStudyResultCards } from "./CaseStudyResultCards";
import { CaseStudyTextColumns } from "./CaseStudyTextColumns";
import { CaseStudyTextList } from "./CaseStudyTextList";
import { CaseStudyAlternatingRows } from "./CaseStudyAlternatingRows";
import { CaseStudyMediaQuad } from "./CaseStudyMediaQuad";
import { CaseStudyPrototypeShowcase } from "./CaseStudyPrototypeShowcase";
import { CaseStudyBeforeAfter } from "./CaseStudyBeforeAfter";
import { ProposalHero } from "./ProposalHero";
import { ProposalSectionHeader } from "./ProposalSectionHeader";
import { ProposalFeatureText } from "./ProposalFeatureText";
import { ProposalFeatureCards } from "./ProposalFeatureCards";
import { ProposalTable } from "./ProposalTable";
import { ProposalLogoGrid } from "./ProposalLogoGrid";
import { ProposalTimeline } from "./ProposalTimeline";
import { ProposalContact } from "./ProposalContact";

/**
 * Renders a single case study section. Dispatches to the right component
 * based on the discriminated `type` field.
 */
export function SectionRenderer({ section }: { section: CaseStudySection }) {
  switch (section.type) {
    case "media":
      return (
        <CaseStudyMedia
          src={section.src}
          alt={section.alt}
          aspect={section.aspect}
          caption={section.caption}
        />
      );

    case "text":
      return <CaseStudyText heading={section.heading} body={section.body} />;

    case "section-intro":
      return (
        <CaseStudySectionIntro
          tagline={section.tagline}
          heading={section.heading}
          body={section.body}
          align={section.align}
        />
      );

    case "feature-cards":
      return <CaseStudyFeatureCards cards={section.cards} />;

    case "principles-grid":
      return (
        <CaseStudyPrinciplesGrid
          heading={section.heading}
          cards={section.cards}
        />
      );

    case "design-challenge":
      return (
        <CaseStudyDesignChallenge
          label={section.label}
          text={section.text}
          theme={section.theme}
        />
      );

    case "text-columns":
      return (
        <CaseStudyTextColumns
          heading={section.heading}
          tagline={section.tagline}
          body={section.body}
          columns={section.columns}
          cols={section.cols}
          align={section.align}
        />
      );

    case "text-list":
      return <CaseStudyTextList heading={section.heading} groups={section.groups} />;

    case "alternating-rows":
      return <CaseStudyAlternatingRows items={section.items} />;

    case "media-quad":
      return <CaseStudyMediaQuad images={section.images} />;

    case "prototype-showcase":
      return (
        <CaseStudyPrototypeShowcase
          image={section.image}
          alt={section.alt}
          buttonLabel={section.buttonLabel}
          buttonHref={section.buttonHref}
        />
      );

    case "before-after":
      return <CaseStudyBeforeAfter items={section.items} />;

    case "pain-points":
      return (
        <CaseStudyPainPoints tagline={section.tagline} items={section.items} />
      );

    case "personas":
      return (
        <CaseStudyPersonas
          tagline={section.tagline}
          heading={section.heading}
          items={section.items}
        />
      );

    case "solution-showcase":
      return (
        <CaseStudySolutionShowcase
          tagline={section.tagline}
          heading={section.heading}
          body={section.body}
          image={section.image}
          imagePosition={section.imagePosition}
          steps={section.steps}
        />
      );

    case "info-grid":
      return (
        <CaseStudyInfoGrid
          challenge={section.challenge}
          perspective={section.perspective}
          meta={section.meta}
        />
      );

    case "media-grid":
      return <CaseStudyMediaGrid images={section.images} />;

    case "quote":
      return <CaseStudyQuote text={section.text} author={section.author} />;

    case "lottie":
      return (
        <CaseStudyLottie
          src={section.src}
          aspect={section.aspect}
          caption={section.caption}
          maskWidth={section.maskWidth}
          maskHeight={section.maskHeight}
        />
      );

    case "key-results":
      return (
        <CaseStudyKeyResults
          heading={section.heading}
          items={section.items}
        />
      );

    case "result-cards":
      return <CaseStudyResultCards items={section.items} />;

    case "metrics":
      return (
        <div className="space-y-12">
          {(section.tagline || section.heading || section.body) && (
            <div className="space-y-6">
              {section.tagline && (
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  {section.tagline}
                </p>
              )}
              {section.heading && (
                <h2 className="font-serif text-3xl leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <p className="max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
                  {section.body}
                </p>
              )}
            </div>
          )}
          <CaseStudyMetrics items={section.items} />
        </div>
      );

    case "learnings-list":
      return (
        <CaseStudyLearningsList
          tagline={section.tagline}
          heading={section.heading}
          items={section.items}
        />
      );

    // ─── PROPOSAL SECTIONS ──────────────────────────────────────────────
    case "proposal-hero":
      return (
        <ProposalHero
          logo={section.logo}
          logoLabel={section.logoLabel}
          heading={section.heading}
          body={section.body}
          heroImage={section.heroImage}
          presentedTo={section.presentedTo}
          presentedBy={section.presentedBy}
        />
      );

    case "proposal-section-header":
      return (
        <ProposalSectionHeader
          tagline={section.tagline}
          heading={section.heading}
          body={section.body}
          bg={section.bg}
        />
      );

    case "proposal-feature-text":
      return (
        <ProposalFeatureText
          heading={section.heading}
          tagline={section.tagline}
          headerBody={section.headerBody}
          bg={section.bg}
          items={section.items}
        />
      );

    case "proposal-feature-cards":
      return (
        <ProposalFeatureCards
          tagline={section.tagline}
          heading={section.heading}
          headerBody={section.headerBody}
          bg={section.bg}
          cards={section.cards}
          layout={section.layout}
        />
      );

    case "proposal-table":
      return (
        <ProposalTable
          tagline={section.tagline}
          heading={section.heading}
          headerBody={section.headerBody}
          bg={section.bg}
          columns={section.columns}
        />
      );

    case "proposal-logo-grid":
      return (
        <ProposalLogoGrid
          heading={section.heading}
          headerBody={section.headerBody}
          logos={section.logos}
        />
      );

    case "proposal-timeline":
      return (
        <ProposalTimeline
          tagline={section.tagline}
          heading={section.heading}
          headerBody={section.headerBody}
          steps={section.steps}
        />
      );

    case "proposal-contact":
      return (
        <ProposalContact
          heading={section.heading}
          contactLabel={section.contactLabel}
          email={section.email}
          website={section.website}
          socials={section.socials}
          image={section.image}
        />
      );
  }
}
