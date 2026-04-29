// Centralized data — easy to edit in one place.
// Sourced from upnrunning.in, anshulrastogi.xyz, and socioverse.io

export const SITE = {
  name: "Anshul",
  fullName: "Anshul Rastogi",
  tagline: "Founder, Up N Running · Builder of Socioverse · AI Engineer",
  bio: "I build AI products that make Indian businesses Up N Running. Founder of Up N Running and Socioverse — I ship outreach, content, and ops automations for founders and creators.",
  location: "India",
  email: "hello@upnrunning.in",
  calendly: "https://calendly.com/upnrunning0/30min",
  socials: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    upnrunning: "https://www.upnrunning.in",
    socioverse: "https://www.socioverse.io",
  },
};

// From upnrunning.in "AI Advantage" outcome metrics
export const STATS = [
  { value: 50, suffix: "%+", label: "Lower manual workload" },
  { value: 10, suffix: "x", label: "More qualified leads" },
  { value: 60, suffix: "%", label: "Faster response time" },
  { value: 10, suffix: "K+", label: "Creators on Socioverse" },
];

export const VALUES = [
  { title: "Depth Over Hacks", desc: "Real understanding compounds. Shortcuts decay.", icon: "🪨" },
  { title: "Authenticity", desc: "I share what I actually use, build, and believe.", icon: "✶" },
  { title: "Value-First", desc: "Teach, ship, give — money follows trust.", icon: "◈" },
  { title: "Offer-Centric", desc: "Every word maps to a clear next step for you.", icon: "→" },
];

export const VENTURES = [
  {
    name: "Up N Running",
    desc: "AI products & DFY services that automate outreach, content, ops and reporting for founders.",
    tag: "Studio",
    url: "https://www.upnrunning.in",
  },
  {
    name: "Socioverse",
    desc: "AI-powered Instagram growth engine — competitor reel analysis, script generation, DM automation, and a built-in Lead Bank CRM.",
    tag: "SaaS",
    url: "https://www.socioverse.io",
  },
  {
    name: "BunkToBrains",
    desc: "Turning lecture bunks into genuine learning. Bite-sized study tools for students.",
    tag: "EdTech",
    url: "#",
  },
];

// Up N Running products & services
export const SERVICES = [
  {
    slug: "oto-engine",
    name: "OTO Engine",
    tagline: "Complete outreach-to-onboard automation",
    desc: "End-to-end pipeline that takes a cold prospect from first touch to signed proposal — without a human in the loop until the meeting starts.",
    bullets: ["Multi-channel lead gen", "Inbox management & smart routing", "Auto meeting booking", "AI proposal drafts", "Onboarding workflows"],
  },
  {
    slug: "instagram-rag",
    name: "Instagram RAG",
    tagline: "RAG-powered Instagram content & replies grounded in your knowledge",
    desc: "Generates on-brand captions, FAQ answers, and idea prompts using your own docs, transcripts, and past posts as context.",
    bullets: ["On-brand captions", "DM / FAQ answers", "Idea prompts from your archive", "Tone-matched to founder voice"],
  },
  {
    slug: "voice-ai-assistant",
    name: "Voice AI Assistant",
    tagline: "Intelligent business communication partner",
    desc: "Handles inbound and outbound calls, qualifies leads, books appointments, and never forgets a follow-up.",
    bullets: ["Natural conversations", "Lead qualification", "Appointment scheduling", "Captures every detail"],
  },
  {
    slug: "linkedin-agent",
    name: "LinkedIn Agent",
    tagline: "Intelligent LinkedIn automation for leads",
    desc: "Sends thoughtful connections and personalized messages at scale, scoring replies by intent.",
    bullets: ["Automated connections", "Personalized messages", "Lead scoring", "Reply detection"],
  },
  {
    slug: "creative-studio-ai",
    name: "Creative Studio AI",
    tagline: "AI-powered creative automation platform",
    desc: "Spins up posters, thumbnails, short-form video cuts and brand assets in your visual system.",
    bullets: ["AI graphic design", "Video automation", "Brand asset library", "Templates in your system"],
  },
  {
    slug: "ai-proposal-generator",
    name: "AI Proposal Generator",
    tagline: "Instant, data-driven proposals that close deals faster",
    desc: "Auto-drafts proposals from a discovery call transcript with pricing, scope, and outcomes baked in.",
    bullets: ["Performance metrics", "ROI tracking", "Optimization insights", "14× faster than manual"],
  },
];

// Three crafts from anshulrastogi.xyz
export const PROJECT_CATEGORIES = [
  {
    slug: "web",
    title: "Web Development",
    desc: "Modern web apps built with React, Next.js, and TypeScript.",
    count: 18,
    icon: "</>",
  },
  {
    slug: "video",
    title: "Video Editing",
    desc: "Professional video editing and post-production.",
    count: 12,
    icon: "▶",
  },
  {
    slug: "graphic",
    title: "Graphic Design",
    desc: "Creative design solutions for digital and print media.",
    count: 24,
    icon: "◐",
  },
];

export const PROJECTS = [
  { slug: "socioverse", title: "Socioverse", category: "web", desc: "AI-powered Instagram growth engine — viral script generation, DM automation, Lead Bank CRM. 10K+ creators.", stack: ["React", "TypeScript", "Supabase", "OpenAI", "Meta API"], cover: "social" },
  { slug: "upnrunning", title: "Up N Running", category: "web", desc: "AI products studio for Indian businesses — OTO Engine, Voice AI, LinkedIn Agent and more.", stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"], cover: "rocket" },
  { slug: "oto-engine", title: "OTO Engine", category: "web", desc: "Outreach-to-onboard automation pipeline that books 24 meetings in 10 days.", stack: ["Node.js", "OpenAI", "Postgres"], cover: "ai" },
  { slug: "instagram-rag", title: "Instagram RAG", category: "web", desc: "RAG-powered Instagram caption and DM generator grounded in founder knowledge bases.", stack: ["Python", "LangChain", "Pinecone"], cover: "rag" },
  { slug: "attendance", title: "Attendance Tracker", category: "web", desc: "Responsive student attendance dashboard built with React and Next.js.", stack: ["React", "Next.js", "Tailwind"], cover: "attendance" },

  { slug: "doc-edit", title: "Documentary Cut", category: "video", desc: "30-min documentary feature edit with color grading and sound design.", stack: ["Premiere Pro", "DaVinci Resolve"], cover: "film" },
  { slug: "creator-shorts", title: "Creator Shorts Pack", category: "video", desc: "Story-driven short-form edits for personal-brand creators.", stack: ["After Effects", "Premiere Pro"], cover: "shorts" },
  { slug: "brand-film", title: "Brand Film", category: "video", desc: "Founder-story brand film for a D2C client.", stack: ["Final Cut Pro", "DaVinci Resolve"], cover: "film2" },

  { slug: "brand-id", title: "SaaS Brand Identity", category: "graphic", desc: "Logo system, type pairing, and brand guidelines for a SaaS launch.", stack: ["Figma", "Illustrator"], cover: "brand" },
  { slug: "social-system", title: "Social Visual System", category: "graphic", desc: "Repeatable Instagram + LinkedIn visual system for a creator.", stack: ["Photoshop", "Figma"], cover: "social-design" },
  { slug: "print-collateral", title: "Print Collateral", category: "graphic", desc: "Pitch deck, posters, and print kit for an event.", stack: ["InDesign", "Illustrator"], cover: "print" },
];

export const ACHIEVEMENTS = [
  { title: "Founded Up N Running", category: "Ventures", issuer: "Self", date: "2024", featured: true },
  { title: "Launched Socioverse to 10K+ creators", category: "Ventures", issuer: "Self", date: "2025", featured: true },
  { title: "HackKRMU 4.0 Winner", category: "Awards", issuer: "KRMU", date: "2024", featured: true },
  { title: "Data Structures & Algorithms", category: "Certifications", issuer: "Coursera", date: "2024", featured: false },
  { title: "Programming in Java", category: "Certifications", issuer: "NPTEL", date: "2024", featured: false },
  { title: "District Chess Champion", category: "Recognition", issuer: "District Sports Authority", date: "2022", featured: false },
  { title: "Full-Stack Web Development", category: "Certifications", issuer: "Meta", date: "2023", featured: false },
  { title: "AI for Everyone", category: "Certifications", issuer: "DeepLearning.AI", date: "2024", featured: false },
];

export const BLOG_POSTS = [
  {
    slug: "shipping-in-public",
    title: "Shipping in Public: My First 30 Days",
    excerpt: "What changed when I started building Up N Running with the door open — followers, feedback, and the fear of being seen.",
    date: "2025-04-10",
    readTime: "6 min",
    category: "Building",
    tags: ["BuildInPublic", "Indie"],
    featured: true,
  },
  {
    slug: "ai-stack-2025",
    title: "My AI Stack for 2025 (And Why)",
    excerpt: "The exact tools, models, and workflows I use to ship AI features fast inside Up N Running and Socioverse.",
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
    excerpt: "How I protect 4 hours of deep work as a student running a venture on the side.",
    date: "2025-01-30",
    readTime: "7 min",
    category: "Productivity",
    tags: ["DeepWork", "Student"],
    featured: false,
  },
];

// Tool stacks per craft, mirrored from anshulrastogi.xyz
export const SKILLS = {
  "Web Development": [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Tailwind CSS", level: 96 },
    { name: "Node.js", level: 88 },
  ],
  "AI / ML": [
    { name: "OpenAI / LLMs", level: 92 },
    { name: "RAG / Vector DBs", level: 85 },
    { name: "LangChain", level: 80 },
    { name: "Prompt Engineering", level: 90 },
  ],
  "Video Editing": [
    { name: "Adobe Premiere Pro", level: 90 },
    { name: "After Effects", level: 82 },
    { name: "DaVinci Resolve", level: 85 },
    { name: "Final Cut Pro", level: 78 },
  ],
  "Graphic Design": [
    { name: "Photoshop", level: 88 },
    { name: "Illustrator", level: 85 },
    { name: "Figma", level: 92 },
    { name: "InDesign", level: 75 },
  ],
};

export const COURSES = [
  {
    slug: "oto-engine-playbook",
    title: "Build Your Own OTO Engine",
    summary: "The exact outreach-to-onboard automation we run for Up N Running clients — yours to ship.",
    level: "Intermediate",
    launchEta: "Q3 2025",
    earlyBird: "$199",
    bullets: ["6 weeks of live + recorded", "Build the full OTO pipeline", "Templates, prompts, and scripts", "Cohort + community access"],
  },
  {
    slug: "indie-launch",
    title: "Indie Launch Playbook",
    summary: "The marketing system I used to bring Socioverse from 0 to 10K+ creators.",
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
  { slug: "socioverse", title: "Socioverse", type: "saas", price: "From $0", desc: "AI-powered Instagram growth engine. Free for 30 days.", cover: "social" },
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
    desc: "One sharp call with the Up N Running founder. We diagnose, prioritize, and walk away with a 30-day automation plan.",
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

// Real testimonials pulled from socioverse.io, upnrunning.in, anshulrastogi.xyz
export const TESTIMONIALS = [
  { quote: "Socioverse looks quite cool.", author: "Ankur Warikoo", role: "Entrepreneur, Content Creator & Author · 3M+ followers" },
  { quote: "Socioverse is sick.", author: "Mradul Sharma", role: "Founder, Akima Films" },
  { quote: "Up N Running transformed our entire sales process. We went from struggling to book meetings to having a pipeline full of qualified prospects.", author: "Sarah Johnson", role: "VP of Sales, TechFlow Solutions · 24 meetings in 10 days" },
  { quote: "The automation freed up our team to focus on creative work instead of administrative tasks. Client satisfaction scores went through the roof.", author: "Mike Chen", role: "Creative Director, Creative Marketing Hub · 14× faster proposals" },
  { quote: "The Voice AI handles our initial calls better than our junior staff. It never misses a follow-up and captures every detail perfectly.", author: "Jennifer Davis", role: "Managing Partner, GrowthMax Consulting · 85% qualification accuracy" },
  { quote: "Anshul is fully immersed in the project — once we sit down, it's all in or nothing, no middle ground.", author: "Karan Bhadauria", role: "Client" },
  { quote: "Anshul is exceptionally talented in terms of understanding the project demand and quickly delivering it.", author: "Utkarsh Bhatia", role: "Client" },
];

export const USES = [
  { category: "Hardware", items: ["MacBook Pro 14\" M3", "LG 27\" 4K display", "Keychron Q1 Pro", "Logitech MX Master 3S", "Sony WH-1000XM5"] },
  { category: "Editor", items: ["Cursor (primary)", "VS Code", "Zed (occasional)", "GitHub Copilot + Claude"] },
  { category: "Design", items: ["Figma", "Photoshop", "Illustrator", "InDesign", "Linear", "Raycast"] },
  { category: "Video", items: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro"] },
  { category: "Stack", items: ["React + Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"] },
];

export const NOW = {
  updated: "2025-04-29",
  items: [
    { title: "Building", text: "Shipping new modules inside Socioverse — Lead Bank CRM v2 and smarter DM sequences." },
    { title: "Running", text: "Up N Running's OTO Engine for a handful of founder clients this quarter." },
    { title: "Writing", text: "An essay on \"the death of the personal brand\" — out next week." },
    { title: "Reading", text: "Working in Public — Nadia Eghbal." },
  ],
};

export const TIMELINE = [
  { year: "2019", title: "First line of code", text: "Curiosity → obsession. Started with HTML and never stopped." },
  { year: "2021", title: "First freelance project", text: "Built a website for a local business. Got paid in pizza and confidence." },
  { year: "2022", title: "District Chess Champion", text: "Discipline from chess shaped how I approach every craft." },
  { year: "2023", title: "Old portfolio shipped", text: "Launched anshulrastogi.xyz — the three-craft (web / video / design) portfolio." },
  { year: "2024", title: "Founded Up N Running", text: "Started the AI products studio. HackKRMU 4.0 win in the same year." },
  { year: "2025", title: "Launched Socioverse", text: "AI-powered Instagram growth engine — 10K+ creators using it." },
];

// FAQ for the Socioverse product page
export const SOCIOVERSE_FAQ = [
  { q: "What is Socioverse?", a: "An AI-powered Instagram growth engine that analyzes viral content, generates scripts in your voice, automates DMs, and captures leads." },
  { q: "How does competitor analysis work?", a: "Add competitor handles. We scrape their top-performing reels, extract hooks and patterns, then generate ready-to-shoot scripts tuned to your brand voice." },
  { q: "Is Socioverse safe to use with my Instagram account?", a: "Yes — Socioverse is officially Meta-verified and uses the official Meta APIs for DMs, comments, and publishing." },
  { q: "What does the free trial include?", a: "The Launch Pack gives you 30 days free with no credit card required. Cancel anytime." },
  { q: "How does DM automation work?", a: "Set keyword triggers on comments and stories, add a Smart Follow Gate, and build multi-step sequences with delays and branching." },
  { q: "Can I generate content with AI?", a: "Yes — Content Studio generates ideas, hooks, and full scripts from your brand voice and competitor analysis." },
  { q: "How much does Socioverse cost?", a: "Free, $18 Starter, $48 Creator, and $88 Agency plans. Custom enterprise pricing available." },
  { q: "Can I cancel my subscription anytime?", a: "Yes. No contracts, no lock-in. Cancel from your dashboard whenever you want." },
];
