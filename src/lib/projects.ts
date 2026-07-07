export type ProjectStatus = "Live" | "In Development" | "Completed";

export type FeaturedProject = {
  id: string;
  title: string;
  screenshot: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  engineering: string[];
  github: string;
  live: string;
  domain: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "explorx",
    title: "ExplorX",
    screenshot: "/explorX.png",
    tagline: "Full-Stack Hotel Booking Platform",
    description:
      "Built a full-stack hotel booking platform where travelers can discover hotels, book rooms, and manage reservations while hotel owners manage properties and bookings through a dedicated dashboard.",

    status: "Completed",

    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
      "Cloudinary",
    ],

    engineering: [
      "JWT authentication with role-based access control",
      "Room availability validation using date-overlap detection",
      "Booking snapshot pattern for data consistency",
      "Owner dashboard for property and booking management",
    ],

    github: "https://github.com/JashGupta/ExplorX",
    live: "https://explor-x.vercel.app",
    domain: "https://explor-x.vercel.app",
  },

  {
    id: "astrocrm",

    title: "AstroCRM",

    screenshot: "/astroCRM.png",

    tagline: "Full-Stack CRM for Professional Astrologers",

    description:
      "Built a full-stack CRM for astrologers to manage client records, consultations, follow-up tasks, and business analytics using a modular Express backend and MongoDB.",

    status: "Completed",

    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
      "Recharts",
    ],

    engineering: [
      "JWT authentication with protected REST APIs",
      "MongoDB aggregation pipelines for analytics dashboards",
      "Service-layer Express architecture separating controllers and business logic",
      "Soft delete strategy with indexed MongoDB queries",
    ],

    github: "https://github.com/JashGupta/AstroCRM",

    live: "https://astro-crm-black.vercel.app",

    domain: "https://astro-crm-black.vercel.app",
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
