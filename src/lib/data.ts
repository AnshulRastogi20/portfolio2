// Centralized data — easy to edit in one place.
// Sourced from upnrunning.in, anshulrastogi.xyz, and socioverse.io

export const SITE = {
  name: "Anshul",
  fullName: "Anshul Rastogi",
  tagline: "Systems Architect · Founder, Up N Running · Builder of Socioverse",
  bio: "I design and implement robust, end-to-end ecosystems that solve foundational business challenges. My mission is to replace manual friction with intelligent, efficient, and automated pathways to growth.",
  location: "India",
  email: "upnrunning0@gmail.com",
  calendly: "https://calendly.com/upnrunning0/30min",
  socials: {
    twitter: "https://x.com/AnshulR20",
    github: "https://github.com/AnshulRastogi20",
    linkedin: "https://www.linkedin.com/in/anshulrastogi20",
    youtube: "https://youtube.com/@sightofanshul",
    upnrunning: "https://www.upnrunning.in",
    socioverse: "https://www.socioverse.io",
  },
};

// From upnrunning.in "AI Advantage" outcome metrics
export const STATS = [
  { value: 50, suffix: "%+", label: "Lower manual workload" },
  { value: 10, suffix: "x", label: "More qualified leads" },
  { value: 60, suffix: "%", label: "Faster response time" },
  { value: 5, suffix: "+", label: "Hrs saved/week" },
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
    desc: "EdTech startup with a 25+ member team and 7,000+ students in the WhatsApp community. Helping students ace semester exams with notes, courses, and community.",
    tag: "EdTech",
    url: "https://www.bunktobrains.com",
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
    count: 100,
    icon: "</>",
  },
  {
    slug: "video",
    title: "Video Editing",
    desc: "Professional video editing and post-production.",
    count: 100,
    icon: "▶",
  },
  {
    slug: "graphic",
    title: "Graphic Design",
    desc: "Creative design solutions for digital and print media.",
    count: 50,
    icon: "◐",
  },
];

export const PROJECTS: { slug: string; title: string; category: string; desc: string; stack: string[]; cover: string; demoUrl?: string; githubUrl?: string }[] = [
  { slug: "socioverse", title: "Socioverse", category: "web", desc: "AI-powered Instagram growth engine — viral script generation, DM automation, Lead Bank CRM. 100+ signups.", stack: ["React", "TypeScript", "Supabase", "Gemini", "Meta API"], cover: "social", demoUrl: "https://www.socioverse.io" },
  { slug: "upnrunning", title: "Up N Running", category: "web", desc: "AI products studio for Indian businesses — OTO Engine, Voice AI, LinkedIn Agent and more.", stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"], cover: "rocket", demoUrl: "https://www.upnrunning.in" },
  { slug: "bunktobrains", title: "BunkToBrains", category: "web", desc: "EdTech platform with 25+ team, 7000+ student community, courses & study resources.", stack: ["Next.js", "Supabase", "Bunny.net"], cover: "edu", demoUrl: "https://www.bunktobrains.com" },
  { slug: "oto-engine", title: "OTO Engine", category: "web", desc: "Outreach-to-onboard automation pipeline — multi-tenant SaaS with AI agents for lead scraping, email, and proposal generation.", stack: ["n8n", "Apollo.io", "Supabase", "React"], cover: "ai", demoUrl: "https://www.upnrunning.in" },
  { slug: "alveek", title: "Appointment Automation", category: "web", desc: "Multi-tenant SaaS for appointment management with WhatsApp & Email reminders, reducing no-shows for service businesses.", stack: ["React", "n8n", "Supabase", "WhatsApp API"], cover: "health" },
  { slug: "instagram-rag", title: "Instagram RAG", category: "web", desc: "5-module n8n pipeline using multimodal AI to reverse-engineer viral videos, Pinecone RAG, and brand-aligned script generation.", stack: ["n8n", "Gemini", "Pinecone", "Apify"], cover: "rag" },
  { slug: "uptime-monitor", title: "Decentralized Uptime Monitor", category: "web", desc: "Decentralized, incentive-driven monitoring network with WebSocket validators and Solana rewards. Turborepo monorepo.", stack: ["Next.js", "TypeScript", "Prisma", "Clerk", "Solana"], cover: "monitor", demoUrl: "https://maintenance-iota-ten.vercel.app/", githubUrl: "https://github.com/AnshulRastogi20/Website-Uptime-Check" },
  { slug: "waste-segregator", title: "Waste Segregator", category: "web", desc: "TensorFlow-powered waste identification and segregation to promote better recycling habits.", stack: ["React", "TypeScript", "Flask", "TensorFlow", "MongoDB"], cover: "waste", demoUrl: "https://recyclopedia-xi.vercel.app/", githubUrl: "https://github.com/AnshulRastogi20/waste-segregator" },
  { slug: "attendance-tracker", title: "Attendance Tracker", category: "web", desc: "Interactive attendance tracking system with modern design for students.", stack: ["React", "TypeScript", "Next.js", "MongoDB", "Framer Motion"], cover: "attend", demoUrl: "https://www.attendit.tech/", githubUrl: "https://github.com/AnshulRastogi20/self-attendence-system" },
  { slug: "ama-app", title: "AMA App", category: "web", desc: "Anonymous Messaging App allowing users to send and receive honest, anonymous feedback.", stack: ["React", "TypeScript", "Next.js", "MongoDB"], cover: "ama", demoUrl: "https://maintenance-iota-ten.vercel.app/", githubUrl: "https://github.com/AnshulRastogi20/full-stack-ama-app" },

  { slug: "djkc-stories", title: "DJKC Studios", category: "video", desc: "Story-driven edits with top-notch sound design for DJKC channel — unique cinematic storytelling format.", stack: ["DaVinci Resolve", "Premiere Pro", "After Effects", "Audacity"], cover: "film", demoUrl: "https://www.youtube.com/watch?v=I7knjeTSIls&t=2s" },
  { slug: "creator-shorts", title: "Creator Shorts Pack", category: "video", desc: "Story-driven short-form edits for personal-brand creators.", stack: ["After Effects", "Premiere Pro"], cover: "shorts" },
  { slug: "brand-film", title: "Brand Film", category: "video", desc: "Founder-story brand film for a D2C client.", stack: ["Final Cut Pro", "DaVinci Resolve"], cover: "film2" },

  { slug: "thumbnails-logos", title: "Thumbnails & Logos", category: "graphic", desc: "Fresh, minimalist thumbnail and logo designs with versatile applications for modern audiences.", stack: ["Canva", "Illustrator", "Photoshop", "Figma"], cover: "brand", demoUrl: "https://www.canva.com/design/DAGeNacFzWg/BOb-Mw3kb2zWyMJ1I2k3SA/edit" },
  { slug: "social-system", title: "Social Visual System", category: "graphic", desc: "Repeatable Instagram + LinkedIn visual system for a creator.", stack: ["Photoshop", "Figma"], cover: "social-design" },
  { slug: "print-collateral", title: "Print Collateral", category: "graphic", desc: "Pitch deck, posters, and print kit for an event.", stack: ["InDesign", "Illustrator"], cover: "print" },
];

export const ACHIEVEMENTS: { title: string; category: string; issuer: string; date: string; featured: boolean; description?: string; link?: string; tags?: string[] }[] = [
  { title: "Founded Up N Running", category: "Ventures", issuer: "AI Software Company", date: "Jun 2025", featured: true, description: "A productized AI Automation Agency delivering fixed-scope solutions.", link: "https://www.upnrunning.in" },
  { title: "Launched Socioverse", category: "Ventures", issuer: "AI-Powered SaaS", date: "Jan 2026", featured: true, description: "Advanced Content Intelligence & Automation Platform with Emotional DNA extraction.", link: "https://www.socioverse.io" },
  { title: "Co-Founded BunkToBrains", category: "Ventures", issuer: "EdTech Startup · 7000+ students", date: "Feb 2025", featured: true, description: "Student-led platform focused on practical, real-world skills beyond academics.", link: "https://www.bunktobrains.com" },
  { title: "Won Hack-KRMU 4.0", category: "Awards", issuer: "KRM University", date: "Feb 2025", featured: true, description: "Built a waste segregator web app in 2 days — won second prize for innovative accessibility solution.", tags: ["Hackathon", "Innovation", "Accessibility"] },
  { title: "AI Automation Expert", category: "Certifications", issuer: "Udemy", date: "2024", featured: false, description: "Certified in AI automation workflows and implementation." },
  { title: "Data Structures & Algorithms using Java", category: "Certifications", issuer: "NPTEL", date: "Jul 2024", featured: false, description: "Certified in DSA covering OOP, functional programming, and algorithmic thinking.", tags: ["Java", "Algorithms", "Data Structures"] },
  { title: "Programming in Java", category: "Certifications", issuer: "NPTEL", date: "Jul 2024", featured: false, description: "Certified in Java programming covering OOP, functional programming, and core concepts.", tags: ["Java", "Programming", "OOP"] },
  { title: "Former District Chess Champion", category: "Recognition", issuer: "District Sports Association", date: "2018", featured: false, description: "Strategic foresight, pattern recognition, and resource management — skills now applied to systems architecture." },
  { title: "Vice President, Career Development Cell", category: "Recognition", issuer: "VIPS Technical Campus", date: "Jan 2025 – Present", featured: false, description: "Leading career development initiatives and mentorship programs." },
];

export const BLOG_POSTS = [
  {
    slug: "a-new-beginning",
    title: "A New Beginning — My Blog Journey",
    excerpt: "Excited to start my blog journey! Sharing my experiences in web development, product building, and lessons learned.",
    date: "2025-02-02",
    readTime: "3 min",
    category: "Career",
    tags: ["Web Development", "MERN Stack", "Next.js", "Career"],
    featured: true,
  },
  {
    slug: "first-product-failure",
    title: "My First Product Failure — A Lesson in Databases",
    excerpt: "How my first product failed due to improper database usage and the key lessons I learned from it.",
    date: "2025-02-10",
    readTime: "4 min",
    category: "Building",
    tags: ["Web Development", "Databases", "Product Building", "Lessons Learned"],
    featured: true,
  },
  {
    slug: "advanced-web-dev",
    title: "Diving into Advanced Web Development",
    excerpt: "Starting my journey into advanced web development by learning Docker and exploring the Wasp framework.",
    date: "2025-02-16",
    readTime: "4 min",
    category: "Tech",
    tags: ["Web Development", "Docker", "Wasp Framework", "Advanced Topics"],
    featured: false,
  },
  {
    slug: "hackathon-journey",
    title: "Aqualoop's Hackathon Journey — From Short Notice to Second Prize",
    excerpt: "We received a last-minute hackathon invite, endured sleepless nights, and built a winning waste segregator web app in just 2 days.",
    date: "2024-02-23",
    readTime: "5 min",
    category: "Hackathon",
    tags: ["Hackathon", "Web Development", "Competition", "Teamwork"],
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

export const PRODUCTS = [
  { slug: "socioverse", title: "Socioverse", type: "saas", price: "From $0", desc: "AI-powered Instagram growth engine. Free for 30 days.", cover: "social" },
  { slug: "oto-engine", title: "OTO Engine", type: "service", price: "Custom", desc: "End-to-end outreach-to-onboard automation for agencies.", cover: "ai" },
  { slug: "voice-ai", title: "Voice AI Assistant", type: "service", price: "Custom", desc: "AI-powered call handling, lead qualification, and appointment booking.", cover: "voice" },
  { slug: "linkedin-agent", title: "LinkedIn Agent", type: "service", price: "Custom", desc: "Intelligent LinkedIn automation for lead generation.", cover: "linkedin" },
  { slug: "creative-studio", title: "Creative Studio AI", type: "service", price: "Custom", desc: "AI-powered creative automation — posters, thumbnails, video cuts.", cover: "creative" },
  { slug: "ai-proposal", title: "AI Proposal Generator", type: "service", price: "Custom", desc: "Auto-draft proposals from discovery calls with pricing and scope.", cover: "proposal" },
];

export const COACHING = [
  {
    name: "Coming Soon",
    price: "TBD",
    duration: "TBD",
    desc: "1:1 coaching and mentorship programs are coming soon. Stay tuned!",
    includes: ["Details to be announced"],
  },
];

// Static testimonials kept as fallback — live data comes from Supabase
export const TESTIMONIALS = [
  { quote: "Socioverse looks quite cool.", author: "Ankur Warikoo", role: "Entrepreneur, Content Creator & Author · 3M+ followers" },
  { quote: "Socioverse is sick.", author: "Mradul Sharma", role: "Founder, Akima Films" },
  { quote: "He exceeded every expectation and delivered work that was more polished, disciplined, and thoughtful than many senior developers I have worked with.", author: "Norton Wong", role: "Founder, Alveek AI & Flow" },
  { quote: "I told him what my vision was and he made it into a reality within 24 hours — his speed and explanations are insane.", author: "Rohit Iyyer", role: "Founder, Clients Forge" },
  { quote: "Anshul is fully immersed in the project — once we sit down, it's all in or nothing, no middle ground.", author: "Karan Bhadauria", role: "Founder, DJKC Studios" },
  { quote: "Anshul is exceptionally talented at understanding the project demand and quickly delivering it.", author: "Utkarsh Bhatia", role: "Founder, DJKC Studios" },
];

export const NOW = {
  updated: "2026-05-03",
  items: [
    { title: "Building", text: "Shipping new modules inside Socioverse — Lead Bank CRM v2, smarter DM sequences, and the Emotional DNA Engine." },
    { title: "Running", text: "Up N Running — helping businesses automate with AI. Building OTO Engine, Voice AI, and more." },
    { title: "Growing", text: "BunkToBrains — scaling our EdTech community to 7000+ students with courses and study resources." },
  ],
};

export const TIMELINE = [
  { year: "2019", title: "First line of code", text: "Curiosity → obsession. Started with HTML and never stopped." },
  { year: "2021", title: "First freelance project", text: "Built a website for a local business. Got paid in pizza and confidence." },
  { year: "2018", title: "District Chess Champion", text: "Discipline from chess shaped how I approach every craft." },
  { year: "2023", title: "Old portfolio shipped", text: "Launched anshulrastogi.xyz — the three-craft (web / video / design) portfolio." },
  { year: "2024", title: "Won Hack-KRMU 4.0", text: "Hackathon win that validated my builder instincts." },
  { year: "Feb 2025", title: "Co-Founded BunkToBrains", text: "EdTech startup helping students ace exams. 25+ team, 7000+ students in WhatsApp community." },
  { year: "Jun 2025", title: "Founded Up N Running", text: "Started the AI software company — shipping automation products for businesses." },
  { year: "Jan 2026", title: "Launched Socioverse", text: "AI-powered Instagram growth engine — 100+ signups and growing." },
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
