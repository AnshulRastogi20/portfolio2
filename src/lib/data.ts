// Centralized data — easy to edit in one place.
// Sourced from upnrunning.in, anshulrastogi.xyz, and socioverse.io

export const SITE = {
  name: "Anshul",
  fullName: "Anshul Rastogi",
  tagline: "Founder, Up N Running · Builder of Socioverse · AI Engineer",
  bio: "I build AI products that make Indian businesses Up N Running. Founder of Up N Running and Socioverse — I ship outreach, content, and ops automations for founders and creators.",
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

export const PROJECTS = [
  { slug: "socioverse", title: "Socioverse", category: "web", desc: "AI-powered Instagram growth engine — viral script generation, DM automation, Lead Bank CRM. 100+ signups.", stack: ["React", "TypeScript", "Supabase", "Gemini", "Meta API"], cover: "social" },
  { slug: "upnrunning", title: "Up N Running", category: "web", desc: "AI products studio for Indian businesses — OTO Engine, Voice AI, LinkedIn Agent and more.", stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"], cover: "rocket" },
  { slug: "bunktobrains", title: "BunkToBrains", category: "web", desc: "EdTech platform with Stealth PDF Engine, academic leaderboard, and 7000+ student community.", stack: ["Next.js", "Supabase", "Bunny.net"], cover: "edu" },
  { slug: "oto-engine", title: "OTO Engine", category: "web", desc: "Outreach-to-onboard automation pipeline for agencies.", stack: ["n8n", "Apollo.io", "GPT-5", "Fathom"], cover: "ai" },
  { slug: "alveek", title: "Alveek SaaS", category: "web", desc: "Appointment reminder automation to reduce patient no-shows for clinics.", stack: ["n8n", "WaSendarAPI", "Twilio"], cover: "health" },
  { slug: "instagram-rag", title: "Instagram RAG", category: "web", desc: "RAG-powered Instagram caption and DM generator grounded in founder knowledge bases.", stack: ["Python", "LangChain", "Pinecone"], cover: "rag" },

  { slug: "doc-edit", title: "Documentary Cut", category: "video", desc: "30-min documentary feature edit with color grading and sound design.", stack: ["Premiere Pro", "DaVinci Resolve"], cover: "film" },
  { slug: "creator-shorts", title: "Creator Shorts Pack", category: "video", desc: "Story-driven short-form edits for personal-brand creators.", stack: ["After Effects", "Premiere Pro"], cover: "shorts" },
  { slug: "brand-film", title: "Brand Film", category: "video", desc: "Founder-story brand film for a D2C client.", stack: ["Final Cut Pro", "DaVinci Resolve"], cover: "film2" },

  { slug: "brand-id", title: "SaaS Brand Identity", category: "graphic", desc: "Logo system, type pairing, and brand guidelines for a SaaS launch.", stack: ["Figma", "Illustrator"], cover: "brand" },
  { slug: "social-system", title: "Social Visual System", category: "graphic", desc: "Repeatable Instagram + LinkedIn visual system for a creator.", stack: ["Photoshop", "Figma"], cover: "social-design" },
  { slug: "print-collateral", title: "Print Collateral", category: "graphic", desc: "Pitch deck, posters, and print kit for an event.", stack: ["InDesign", "Illustrator"], cover: "print" },
];

export const ACHIEVEMENTS = [
  { title: "Founded Up N Running", category: "Ventures", issuer: "AI Software Company", date: "Jun 2025", featured: true },
  { title: "Launched Socioverse", category: "Ventures", issuer: "AI-Powered SaaS", date: "Jan 2026", featured: true },
  { title: "Co-Founded BunkToBrains", category: "Ventures", issuer: "EdTech Startup · 7000+ students", date: "Feb 2025", featured: true },
  { title: "Won Hack-KRMU Hackathon", category: "Awards", issuer: "KRMU", date: "2024", featured: true },
  { title: "AI Automation Expert", category: "Certifications", issuer: "Udemy", date: "2024", featured: false },
  { title: "Data Structures & Algorithms using Java", category: "Certifications", issuer: "NPTEL", date: "2024", featured: false },
  { title: "Programming in Java", category: "Certifications", issuer: "NPTEL", date: "2024", featured: false },
  { title: "Former District Chess Champion", category: "Recognition", issuer: "District Sports Authority", date: "2022", featured: false },
  { title: "Vice President, Career Development Cell", category: "Recognition", issuer: "VIPS Technical Campus", date: "Jan 2025 – Present", featured: false },
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
  { year: "2022", title: "District Chess Champion", text: "Discipline from chess shaped how I approach every craft." },
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
