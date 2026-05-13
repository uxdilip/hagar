import { HeroHome } from "@/app/components/sections/HeroHome";
import { AboutParallax } from "@/app/components/sections/AboutParallax";
import { ProjectsScattered } from "@/app/components/sections/ProjectsScattered";

export default function Home() {
  return (
    <>
      <HeroHome />
      <AboutParallax />
      <ProjectsScattered />
    </>
  );
}
