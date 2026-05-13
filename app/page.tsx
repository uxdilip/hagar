import { HeroHome } from "@/app/components/sections/HeroHome";
import { AboutParallax } from "@/app/components/sections/AboutParallax";
import { ProjectsHome } from "@/app/components/sections/ProjectsHome";

export default function Home() {
  return (
    <>
      <HeroHome />
      <AboutParallax />
      <ProjectsHome />
    </>
  );
}
