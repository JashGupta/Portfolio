export type ProjectStatus = "Live" | "In Development" | "Completed";

export type FeaturedProject = {
  id: string;
  title: string;
  screenshot: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  architecture: string[];
  github: string;
  live: string;
  domain: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "explorx",
    title: "ExplorX",
    screenshot: "/explorX.png",
    tagline: "Discover places beyond the ordinary",
    description:
      "A full-stack travel discovery platform that helps users explore destinations, discover hidden gems, and plan memorable trips through a clean, responsive interface with curated recommendations.",
    status: "In Development",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    architecture: [
      "Responsive component-based frontend architecture",
      "REST API for destination and user management",
      "MongoDB-powered data storage",
      "Reusable UI components with scalable project structure",
    ],
    github: "https://github.com/yourusername/explorx",
    live: "",
    domain: "explorx.dev",
  },

  {
    id: "astrocrm",
    title: "AstroCRM",
    screenshot: "/astroCRM.png",
    tagline: "Managing consultations with clarity",
    description:
      "A CRM platform built for astrologers to manage clients, consultations, follow-ups, and business insights through an intuitive dashboard that simplifies daily operations.",
    status: "Completed",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    architecture: [
      "Dashboard for client and consultation management",
      "Follow-up workflow with status tracking",
      "Modular Express backend with REST APIs",
      "MongoDB collections optimized for CRM operations",
    ],
    github: "https://github.com/yourusername/humara-pandit-crm",
    live: "",
    domain: "humarapandit.app",
  },

  {
    id: "virtual-assistant",
    title: "Virtual Assistant",
    screenshot: "/explorX.png",
    tagline: "An AI-powered desktop assistant",
    description:
      "An intelligent virtual assistant capable of understanding voice commands, answering questions, opening applications and websites, and automating everyday desktop tasks through natural language interaction.",
    status: "Completed",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Web Speech API",
    ],
    architecture: [
      "Speech recognition for voice input",
      "Text-to-speech responses for natural interaction",
      "Command-based automation for desktop tasks",
      "Modular JavaScript architecture for extensibility",
    ],
    github: "https://github.com/yourusername/virtual-assistant",
    live: "",
    domain: "assistant.demo",
  },
];

export const statusStyles: Record<
  ProjectStatus,
  { dot: string; badge: string }
> = {
  Live: {
    dot: "bg-emerald-400",
    badge: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  },
  Completed: {
    dot: "bg-sky-400",
    badge: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  },
  "In Development": {
    dot: "bg-amber-400",
    badge: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  },
};
