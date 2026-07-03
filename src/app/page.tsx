import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Project } from "@/components/sections/project";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

import { featuredProjects } from "@/lib/projects";

const [projectOne, projectTwo, projectThree] = featuredProjects;

export default function Home() {
  return (
    <>

      <Hero />

      <Project project={projectOne} index={1} />

      <About />

      <Project project={projectTwo} index={2} reversed />

      <Skills />

      <Project project={projectThree} index={3} />

      <Contact />
    </>
  );
}
