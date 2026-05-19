import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { CaseStudyView } from "./CaseStudyView";

/**
 * Pre-render all 4 case studies at build time.
 * Anything else hits the not-found boundary.
 */
export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

/** Per-page metadata for SEO + sharing. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found · Hagar" };
  return {
    title: `${study.title} · Hagar`,
    description: study.tagline,
    openGraph: {
      title: study.title,
      description: study.tagline,
      images: [study.coverImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return <CaseStudyView study={study} />;
}
