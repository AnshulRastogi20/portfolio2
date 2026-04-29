// Centralized data — easy to edit in one place.

export const SITE = {
  name: "Anshul",
  fullName: "Anshul",
  tagline: "Builder · AI Engineer · Storyteller",
  bio: "I build AI-powered products, ship side projects, and write about the craft of making things on the internet.",
  location: "India",
  email: "hello@anshul.dev",
  socials: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
};

export const STATS = [
  { value: 1240, suffix: "+", label: "Newsletter readers" },
  { value: 38, suffix: "", label: "Projects shipped" },
  { value: 12, suffix: "", label: "Hackathons & wins" },
  { value: 6, suffix: "+", label: "Years building" },
];

export const VALUES = [
  { title: "Depth Over Hacks", desc: "Real understanding compounds. Shortcuts decay.", icon: "🪨" },
  { title: "Authenticity", desc: "I share what I actually use, build, and believe.", icon: "✶" },
  { title: "Value-First", desc: "Teach, ship, give — money follows trust.", icon: "◈" },
  { title: "Offer-Centric", desc: "Every word maps to a clear next step for you.", icon: "→" },
];

export const VENTURES = [
  { name: "Socioverse", desc: "A creator-first social experiment.", tag: "Social", url: "#" },
  { name: "Up N Running", desc: "Helping early founders ship in days, not months.", tag: "Studio", url: "#" },
  { name: "BunkToBrains", desc: "Turning lecture bunks into genuine learning.", tag: "EdTech", url: "#" },
];

export const PROJECT_CATEGORIES = [
  {
    slug: "web",
    title: "Web Development",
    desc: "Full-stack apps, AI tools, landing pages.",
    count: 18,
    icon: "</>",
  },
  {
    slug: "video",
    title: "Video Editing",
    desc: "Story-driven edits for creators and brands.",
    count: 12,
    icon: "▶",
  },
  {
    slug: "graphic",
    title: "Graphic Design",
    desc: "Identity, posters, social, thumbnails.",
    count: 24,
    icon: "◐",
  },
];

export const PROJECTS = [
  { slug: "ai-builder", title: "AI Builder Studio", category: "web", desc: "Generate full-stack apps from a prompt.", stack: ["Next.js", "OpenAI", "Postgres"], cover: "ai" },
  { slug: "socioverse", title: "Socioverse", category: "web", desc: "Creator-first social platform MVP.", stack: ["React", "Supabase", "Tailwind"], cover: "social" },
  { slug: "uprunning", title: "Up N Running", category: "web", desc: "Founder-launchpad in 7 days.", stack: ["Astro", "Stripe", "MDX"], cover: "rocket" },
  { slug: "doc-edit", title: "Documentary Cut", category: "video", desc: "30-min documentary feature edit.", stack: ["Premiere", "DaVinci"], cover: "film" },
  { slug: "brand-id", title: "Brand Identity Kit", category: "graphic", desc: "Logo system + guidelines for a SaaS.", stack: ["Figma", "Illustrator"], cover: "brand" },
];

export const ACHIEVEMENTS = [
  { title: "Data Structures & Algorithms", category: "Certifications", issuer: "Coursera", date: "2024", featured: true },
  { title: "Programming in Java", category: "Certifications", issuer: "NPTEL", date: "2024", featured: true },
  { title: "HackKRMU 4.0 Winner", category: "Awards", issuer: "KRMU", date: "2024", featured: true },
  { title: "District Chess Champion", category: "Recognition", issuer: "District Sports Authority", date: "2022", featured: false },
  { title: "Full-Stack Web Development", category: "Certifications", issuer: "Meta", date: "2023", featured: false },
  { title: "AI for Everyone", category: "Certifications", issuer: "DeepLearning.AI", date: "2024", featured: false },
];

export const BLOG_POSTS = [
  {
    slug: "shipping-in-public",
    title: "Shipping in Public: My First 30 Days",
    excerpt: "What changed when I started building with the door open — followers, feedback, and the fear of being seen.",
    date: "2025-04-10",
    readTime: "6 min",
    category: "Building",
    tags: ["BuildInPublic", "Indie"],
    featured: true,
  },
  {
    slug: "ai-stack-2025",
    title: "My AI Stack for 2025 (And Why)",
    excerpt: "The exact tools, models, and workflows I use to ship AI features fast — without overengineering.",
    date: "2025-03-22",
    readTime: "8 min",
    category: "AI",
    tags: ["AI", "Stack", "Tools"],
    featured: true,
  },
  {
    slug: "personal-brand-myth",
    title: "The Personal Brand Myth Nobody Talks About",
    excerpt: "You don't need a brand. You need a body of work. Here's how to confuse the two and waste two years.",
    date: "2025-02-14",
    readTime: "5 min",
    category: "Creator",
    tags: ["Brand", "Creator"],
    featured: false,
  },
  {
    slug: "deep-work-college",
    title: "Doing Deep Work in College",
    excerpt: "How I protect 4 hours of deep work as a student building products on the side.",
    date: "2025-01-30",
    readTime: "7 min",
    category: "Productivity",
    tags: ["DeepWork", "Student"],
    featured: false,
  },
];

export const SKILLS = {
  Languages: [
    { name: "TypeScript", level: 95 },
    { name: "Python", level: 88 },
    { name: "Java", level: 78 },
    { name: "SQL", level: 82 },
  ],
  "AI / ML": [
    { name: "OpenAI / LLMs", level: 92 },
    { name: "RAG / Vector DBs", level: 85 },
    { name: "LangChain", level: 80 },
    { name: "Prompt Engineering", level: 90 },
  ],
  Frameworks: [
    { name: "React / Next.js", level: 95 },
    { name: "Node.js", level: 88 },
    { name: "Tailwind CSS", level: 96 },
    { name: "Framer Motion", level: 85 },
  ],
  Tools: [
    { name: "Figma", level: 90 },
    { name: "Premiere Pro", level: 85 },
    { name: "Git / GitHub", level: 92 },
    { name: "Vercel / Cloud", level: 88 },
  ],
};

export const COURSES = [
  {
    slug: "ai-builder-bootcamp",
    title: "The AI Builder Bootcamp",
    summary: "From prompt to product. Ship a real AI SaaS in 6 weeks.",
    level: "Intermediate",
    launchEta: "Q3 2025",
    earlyBird: "$199",
    bullets: ["6 weeks of live + recorded", "Build 3 shippable AI apps", "Cohort + community access", "Lifetime updates"],
  },
  {
    slug: "indie-launch",
    title: "Indie Launch Playbook",
    summary: "The marketing system I used to get my first 1,000 users.",
    level: "Beginner",
    launchEta: "Q2 2025",
    earlyBird: "$79",
    bullets: ["Launch scripts + templates", "Audience-first frameworks", "Real launch breakdowns"],
  },
  {
    slug: "design-for-devs",
    title: "Design for Developers",
    summary: "Make your apps look 10x better in 10 days.",
    level: "Beginner",
    launchEta: "Q4 2025",
    earlyBird: "$129",
    bullets: ["Type, color, spacing fundamentals", "Component design system", "Tailwind mastery"],
  },
];

export const PRODUCTS = [
  { slug: "ai-starter-kit", title: "AI Builder's Starter Kit", type: "digital", price: "$0", desc: "Free PDF + Notion template to launch your first AI project this week.", cover: "kit" },
  { slug: "saas-template", title: "Premium SaaS Template", type: "digital", price: "$49", desc: "Production-ready Next.js + Stripe + Supabase template.", cover: "code" },
  { slug: "prompt-vault", title: "The Prompt Vault", type: "digital", price: "$29", desc: "200+ battle-tested prompts for builders and creators.", cover: "vault" },
  { slug: "merch-tee", title: "Builder Tee", type: "merch", price: "$32", desc: "Soft-cotton tee. Wear your craft.", cover: "tee" },
  { slug: "merch-sticker", title: "Sticker Pack", type: "merch", price: "$8", desc: "Vinyl sticker set for your laptop.", cover: "sticker" },
];

export const COACHING = [
  {
    name: "1:1 Strategy Call",
    price: "$120",
    duration: "60 min",
    desc: "One sharp call. We diagnose, prioritize, and walk away with a 30-day plan.",
    includes: ["60-min Zoom call", "Recording + notes", "7 days follow-up via email"],
  },
  {
    name: "Code & Product Review",
    price: "$340",
    duration: "1 week",
    desc: "I review your codebase, UX, and positioning. You get a written report + Loom walkthrough.",
    includes: ["Async repo + product review", "20-min Loom walkthrough", "Written priorities doc"],
    popular: true,
  },
  {
    name: "Monthly Mentorship",
    price: "$680/mo",
    duration: "Ongoing",
    desc: "I'm in your corner. Weekly calls, async DMs, accountability.",
    includes: ["4 calls/month", "Slack DM access", "Project reviews on demand"],
  },
];

export const TESTIMONIALS = [
  { quote: "Anshul's review unblocked 3 months of work in one call. Worth 10x what I paid.", author: "Maya K.", role: "Founder, Loop AI" },
  { quote: "The newsletter is the only one I open every week. Genuinely useful, no fluff.", author: "Devansh R.", role: "Engineer @ Zerodha" },
  { quote: "Hired Anshul to design our identity. The brand felt like ours from day one.", author: "Aarav S.", role: "Founder, Northcraft" },
  { quote: "His AI bootcamp made me dangerous. I shipped my first SaaS in week 4.", author: "Priya T.", role: "Indie maker" },
];

export const USES = [
  { category: "Hardware", items: ["MacBook Pro 14\" M3", "LG 27\" 4K display", "Keychron Q1 Pro", "Logitech MX Master 3S", "Sony WH-1000XM5"] },
  { category: "Editor", items: ["Cursor (primary)", "VS Code", "Zed (occasional)", "GitHub Copilot + Claude"] },
  { category: "Design", items: ["Figma", "Linear", "Raycast", "Arc Browser", "Notion"] },
  { category: "Stack", items: ["React + Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"] },
];

export const NOW = {
  updated: "2025-04-29",
  items: [
    { title: "Building", text: "An AI-native CRM for indie founders. Currently rewriting the inbox." },
    { title: "Writing", text: "A long essay on \"the death of the personal brand\" — out next week." },
    { title: "Learning", text: "RAG evaluation, multi-agent systems, and (still) better typography." },
    { title: "Reading", text: "Working in Public — Nadia Eghbal." },
  ],
};

export const TIMELINE = [
  { year: "2019", title: "First line of code", text: "Curiosity → obsession. Started with HTML and never stopped." },
  { year: "2021", title: "First freelance project", text: "Built a website for a local business. Got paid in pizza and confidence." },
  { year: "2022", title: "District Chess Champion", text: "Discipline from chess shaped how I approach every craft." },
  { year: "2023", title: "First product shipped", text: "Launched my first SaaS. 12 users in a month. Loved every one." },
  { year: "2024", title: "HackKRMU 4.0 Winner", text: "Built an AI tool in 36 hours. Took home the top prize." },
  { year: "2025", title: "Going full builder", text: "Newsletter, courses, products. Building in public." },
];
