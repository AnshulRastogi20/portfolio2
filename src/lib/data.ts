// Centralized data - easy to edit in one place.
//
// EVERY NUMBER IN THIS FILE MUST TRACE TO SOMETHING THAT ACTUALLY HAPPENED,
// AND MUST CARRY ITS DATE. That is not a style preference; it is rule §7 of
// Assets/brand/sightofanshul/BRAND-BRIEF.md, and breaking it is a factual error
// on a public page. Before you add a figure here, read that section. The short
// version:
//
//   - Never claim current revenue. There was revenue and it ENDED IN JUNE 2026.
//     If it appears, it is past tense and dated.
//   - Never invent a client, a metric, a system or a result. Never round a
//     number to make it cleaner.
//   - Never state a testimonial, rating or review that does not exist. A
//     fabricated "4.8/5 from 150 reviews" was already removed once.
//   - Never position him as an Instagram growth guru. His authority is AI
//     systems, full stop.
//   - Describe systems as they run today, not as they were designed to run.
//   - When in doubt: generic and true beats specific and flattering.
//
// Voice: elder brother, never guru. Hedges stay in. No aphoristic closers.
// No em dash characters anywhere - use ' - ' or rewrite.

export const SITE = {
  name: "Anshul",
  fullName: "Anshul Rastogi",
  brand: "Sight of Anshul",
  tagline: "Perspective is everything.",
  identity: "Systems architect · Entrepreneur · Delhi",
  bio: "I build AI systems, and then I show people exactly how they work. I am 20, I am in Delhi, and most of what I know came from shipping things - including the ones that did not work.",
  location: "Delhi, India",
  email: "anshulrastogi020@gmail.com",
  calendly: "https://calendly.com/upnrunning0/30min",
  canonical: "https://sightofanshul.com",
  socials: {
    twitter: "https://x.com/AnshulR20",
    github: "https://github.com/AnshulRastogi20",
    linkedin: "https://www.linkedin.com/in/anshulrastogi20",
    instagram: "https://instagram.com/sightofanshul",
    youtube: "https://youtube.com/@sightofanshul",
    upnrunning: "https://www.upnrunning.in",
    socioverse: "https://www.socioverse.io",
    sightofai: "https://sightofai.space",
  },
};

/**
 * The AI Sight free release. Numbers here are load-bearing and were settled in
 * Socials/ai-sight-free-release/README.md on 2026-09-02.
 *
 * SAY 15 LECTURES. Fourteen are recorded; the introductory lecture is planned
 * and not yet filmed. The figure "16" is wrong and is stale wherever it appears.
 * The course is genuinely free with no catch - any language implying a paywall,
 * an upsell or a premium version is wrong.
 */
export const COURSE = {
  name: "AI Sight",
  lectures: 15,
  recorded: 14,
  runtime: "2 h 16 m",
  cadence: "Two a week, Tuesday and Friday",
  window: "15 September to 30 October 2026",
  playlist: "https://youtube.com/@sightofanshul",
  oneOnOne: "https://sightofai.space",
  blurb:
    "Fifteen lectures, released free on YouTube, two a week. No paywall, no premium tier, no catch - I tried selling it and nobody bought it, so it is going out for nothing instead.",
};

/**
 * The workbook: the one lead capture in the whole plan.
 *
 * Delivery and capture both live in Socioverse Planets. The workbook is the
 * zero-price `file` product `ai-sight-workbook` on the anshulrastogi storefront;
 * its checkout collects the billing email and Planets fulfils the order the
 * moment it is placed, with no payment rail in the way.
 *
 * `planetsUrl` is the product's public page. The default is the live product
 * rather than an empty string on purpose: this URL goes into 15 video
 * descriptions and must not depend on a hosting env var being remembered.
 * VITE_WORKBOOK_PLANETS_URL still overrides it if the product ever moves.
 *
 * The `?embed=1` variant is what goes in the iframe - that route answers with
 * `Content-Security-Policy: frame-ancestors *` and posts its own height back,
 * where the storefront routes send `X-Frame-Options: SAMEORIGIN` and would be
 * refused. See Workbook.tsx for the height handshake.
 */
export const WORKBOOK = {
  sections: 15,
  planetsUrl:
    import.meta.env.VITE_WORKBOOK_PLANETS_URL ??
    "https://www.socioverse.io/d/anshulrastogi/ai-sight-workbook",
  contents: [
    "One section per lecture, all 15",
    "The one idea from each lecture, written down",
    "Homework you can actually tick off",
    "Every prompt, command and file path, copy-paste ready",
    "The mistake that usually goes wrong at that step",
  ],
};

/**
 * Countables only, and only ones that are checkable. The age is the strongest
 * hook the brand has (BRAND-BRIEF §5) so it leads. The last one is not
 * self-deprecation for its own sake - it is why the rest is believable.
 */
export const STATS = [
  { value: 20, suffix: "", label: "Years old" },
  { value: 15, suffix: "", label: "Lectures, free" },
  { value: 3, suffix: "", label: "Things built and shipped" },
  { value: 2, suffix: "", label: "The market turned down" },
];

/**
 * Dated proof. Each line is something observed, with the month it happened.
 * If you cannot name the month, it does not go here.
 */
export const RECEIPTS = [
  {
    date: "Jun 2025 - Jun 2026",
    title: "Up N Running delivered client systems",
    text: "An AI automation agency, run solo. It had paying retainers, and that income ended in June 2026. It is not taking new clients right now.",
  },
  {
    date: "Jan 2026",
    title: "Socioverse went live",
    text: "An Instagram AI SaaS, built solo and running today with real users on it. No paying subscribers yet - the product risk is retired, the willingness to pay is untested.",
  },
  {
    date: "2026",
    title: "The Shopify try-on shipped and then got parked",
    text: "It reached real users. The market rejected it on garment accuracy, and I parked it by choice rather than keep polishing something people had already told me was not good enough.",
  },
  {
    date: "2026",
    title: "BunkToBrains was postponed",
    text: "Co-founded, roughly 40%. Not enough students were interested, so it stopped. That is a demand failure, not an unfinished build, and the distinction matters.",
  },
  {
    date: "Sep 2026",
    title: "AI Sight goes out free",
    text: "Fifteen lectures I originally priced at Rs 999. It sold zero copies. So it is going on YouTube for nothing, two a week from 15 September.",
  },
];

export const VALUES = [
  {
    title: "Honesty",
    desc: "I try to tell the truth even when it is the more expensive option in the moment, and especially to myself. I do not always manage it, but the times I have not are the ones that cost me most.",
    icon: "✦",
  },
  {
    title: "Ownership",
    desc: "When something goes wrong I look for my part in it first. Not because outcomes are always fair, but because the parts I own are the only ones I can do anything about.",
    icon: "◉",
  },
  {
    title: "Change",
    desc: "I have had to let go of a fair amount of who I was to get to whatever comes next. That has been uncomfortable more often than it has been inspiring.",
    icon: "↻",
  },
];

export const VENTURES = [
  {
    name: "Socioverse",
    desc: "Founder, built solo. An Instagram AI SaaS, live with real users on it today. No paying subscribers yet.",
    tag: "SaaS",
    url: "https://www.socioverse.io",
  },
  {
    name: "Up N Running",
    desc: "Founder. An AI automation agency. It delivered client systems through to June 2026. Not taking new clients right now.",
    tag: "Agency",
    url: "https://www.upnrunning.in",
  },
  {
    name: "BunkToBrains",
    desc: "Co-founder, roughly 40%. EdTech. Postponed because not enough students were interested.",
    tag: "EdTech",
    url: "https://www.bunktobrains.com",
  },
];

/**
 * What Up N Running built. Present as WHAT WAS BUILT, not as a menu - the
 * agency is not taking new clients, and this site is not an agency site.
 */
export const SERVICES = [
  {
    slug: "oto-engine",
    name: "OTO Engine",
    tagline: "Outreach to onboarding, in one pipeline",
    desc: "Takes a cold prospect from first touch through to a signed proposal, without a person in the loop until the meeting starts.",
    bullets: ["Multi-channel lead gen", "Inbox management and routing", "Meeting booking", "Proposal drafting", "Onboarding workflows"],
    videoUrl: "https://www.youtube.com/embed/wkQnv6027gM",
  },
  {
    slug: "instagram-rag",
    name: "Instagram RAG",
    tagline: "Captions and replies grounded in your own material",
    desc: "Writes captions, FAQ answers and idea prompts using the client's own docs, transcripts and past posts as context, rather than guessing.",
    bullets: ["On-brand captions", "DM and FAQ answers", "Idea prompts from the archive", "Tone matched to the founder"],
    videoUrl: "https://www.youtube.com/embed/dDf7CsJ6ilA",
  },
  {
    slug: "voice-ai-assistant",
    name: "Voice AI Assistant",
    tagline: "Inbound and outbound calls, handled",
    desc: "Takes calls, qualifies leads, books appointments and writes down what was said so nothing depends on somebody remembering it.",
    bullets: ["Natural conversations", "Lead qualification", "Appointment scheduling", "Call notes captured"],
  },
  {
    slug: "linkedin-agent",
    name: "LinkedIn Agent",
    tagline: "Connections and messages at scale, scored by intent",
    desc: "Sends connection requests and follow-ups, then sorts the replies by how interested the person actually sounds.",
    bullets: ["Automated connections", "Personalised messages", "Reply scoring", "Intent detection"],
  },
  {
    slug: "creative-studio-ai",
    name: "Creative Studio AI",
    tagline: "Posters, thumbnails and cuts inside one visual system",
    desc: "Produces posters, thumbnails, short-form cuts and brand assets that stay inside a defined visual system instead of drifting.",
    bullets: ["Graphic generation", "Video automation", "Brand asset library", "Templates in one system"],
  },
  {
    slug: "ai-proposal-generator",
    name: "AI Proposal Generator",
    tagline: "A proposal drafted from the call that just happened",
    desc: "Drafts a proposal from a discovery call transcript, with scope and pricing already filled in, so the follow-up goes out the same day.",
    bullets: ["Drafts from transcript", "Scope and pricing baked in", "Same-day follow-up", "Editable before sending"],
  },
];

// Three crafts. No project counts: the old "100 / 100 / 50" figures were not
// traceable to anything, so they are gone rather than rounded.
export const PROJECT_CATEGORIES = [
  {
    slug: "web",
    title: "Web and AI systems",
    desc: "Products and automations built with React, TypeScript, n8n and Supabase.",
    icon: "</>",
  },
  {
    slug: "video",
    title: "Video editing",
    desc: "Story-driven edits and post-production, mostly for YouTube.",
    icon: "▶",
  },
  {
    slug: "graphic",
    title: "Graphic design",
    desc: "Thumbnails, logos, decks and print kits.",
    icon: "◐",
  },
];

// Project cover images - upload your own screenshots to public/covers/{slug}.webp

export const PROJECTS: { slug: string; title: string; category: string; desc: string; stack: string[]; cover: string; coverUrl?: string; demoUrl?: string; githubUrl?: string }[] = [
  { slug: "socioverse", title: "Socioverse", category: "web", desc: "Instagram AI SaaS: script generation, DM automation and a lead CRM. Built solo, live, with real users and no paying subscribers yet.", stack: ["React", "TypeScript", "Supabase", "Gemini", "Meta API"], cover: "social", coverUrl: "/covers/socioverse.webp", demoUrl: "https://www.socioverse.io" },
  { slug: "upnrunning", title: "Up N Running", category: "web", desc: "The AI automation agency: OTO Engine, Voice AI, LinkedIn Agent and the rest. Delivered client systems through to June 2026, not taking new clients now.", stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"], cover: "rocket", coverUrl: "/covers/upnrunning.webp", demoUrl: "https://www.upnrunning.in" },
  { slug: "shopify-tryon", title: "Shopify Virtual Try-On", category: "web", desc: "A virtual garment try-on that shipped and reached real users. The market rejected it on garment accuracy, and I parked it rather than keep polishing it.", stack: ["React", "Shopify App", "Diffusion models", "Supabase"], cover: "ai" },
  { slug: "bunktobrains", title: "BunkToBrains", category: "web", desc: "EdTech platform, co-founded at roughly 40%. Courses and study resources. Postponed - not enough students were interested.", stack: ["Next.js", "Supabase", "Bunny.net"], cover: "edu", coverUrl: "/covers/bunktobrains.webp", demoUrl: "https://www.bunktobrains.com" },
  { slug: "klipma", title: "Klipma", category: "web", desc: "Video clipping SaaS for Akima Films that turns podcasts and long-form video into campaign-ready clips.", stack: ["React", "TypeScript", "Supabase", "FFmpeg"], cover: "ai", coverUrl: "/covers/klipma.webp", demoUrl: "https://www.klipma.com" },
  { slug: "ramada", title: "Ramada by Wyndham", category: "web", desc: "Cinematic single-page hotel site for a Ramada by Wyndham property, with GSAP scroll choreography.", stack: ["React", "Vite", "GSAP", "Framer Motion"], cover: "web", coverUrl: "/covers/ramada.webp", demoUrl: "https://ramada-vasundhara.lovable.app" },
  { slug: "vishalaakshi", title: "Vishalaakshi Consultants", category: "web", desc: "Heritage consultancy site built as a slow, cinematic scroll with GSAP and Lenis.", stack: ["React", "GSAP", "Lenis", "Tailwind"], cover: "web", coverUrl: "/covers/vishalaakshi.webp", demoUrl: "https://vishalakshi.lovable.app" },
  { slug: "rag-brew-cafe", title: "Rag Brew Cafe", category: "web", desc: "A fast, responsive cafe site built to turn people browsing into people walking in.", stack: ["React", "TypeScript", "Tailwind"], cover: "web", coverUrl: "/covers/rag-brew.webp", demoUrl: "https://rag-brew-cafe.lovable.app" },
  { slug: "oto-engine", title: "OTO Engine", category: "web", desc: "The outreach-to-onboard pipeline as a multi-tenant product: agents for lead sourcing, email and proposal drafting.", stack: ["n8n", "Apollo.io", "Supabase", "React"], cover: "ai", demoUrl: "https://www.upnrunning.in" },
  { slug: "alveek", title: "Appointment Automation", category: "web", desc: "Multi-tenant appointment management with WhatsApp and email reminders, built to cut no-shows for service businesses.", stack: ["React", "n8n", "Supabase", "WhatsApp API"], cover: "health", coverUrl: "/covers/alveek.webp" },
  { slug: "instagram-rag", title: "Instagram RAG", category: "web", desc: "A five-module n8n pipeline: multimodal analysis of what a video did, a Pinecone index of it, and scripts written back out in the brand's voice.", stack: ["n8n", "Gemini", "Pinecone", "Apify"], cover: "rag" },
  { slug: "uptime-monitor", title: "Decentralized Uptime Monitor", category: "web", desc: "An incentive-driven monitoring network with WebSocket validators and Solana rewards, in a Turborepo monorepo.", stack: ["Next.js", "TypeScript", "Prisma", "Clerk", "Solana"], cover: "monitor", demoUrl: "https://maintenance-iota-ten.vercel.app/", githubUrl: "https://github.com/AnshulRastogi20/Website-Uptime-Check" },
  { slug: "waste-segregator", title: "Waste Segregator", category: "web", desc: "TensorFlow waste identification, built in two days for Hack-KRMU 4.0. It took second prize.", stack: ["React", "TypeScript", "Flask", "TensorFlow", "MongoDB"], cover: "waste", demoUrl: "https://recyclopedia-xi.vercel.app/", githubUrl: "https://github.com/AnshulRastogi20/waste-segregator" },
  { slug: "attendance-tracker", title: "Attendance Tracker", category: "web", desc: "An attendance tracker for students, built because the spreadsheet version kept getting abandoned.", stack: ["React", "TypeScript", "Next.js", "MongoDB", "Framer Motion"], cover: "attend", demoUrl: "https://www.attendit.tech/", githubUrl: "https://github.com/AnshulRastogi20/self-attendence-system" },
  { slug: "ama-app", title: "AMA App", category: "web", desc: "Anonymous messaging app for sending and receiving honest feedback.", stack: ["React", "TypeScript", "Next.js", "MongoDB"], cover: "ama", demoUrl: "https://maintenance-iota-ten.vercel.app/", githubUrl: "https://github.com/AnshulRastogi20/full-stack-ama-app" },

  { slug: "djkc-stories", title: "DJKC Studios", category: "video", desc: "Roughly ten months of story-driven edits and sound design for the DJKC YouTube channel.", stack: ["DaVinci Resolve", "Premiere Pro", "After Effects", "Audacity"], cover: "film", coverUrl: "/covers/djkc.webp", demoUrl: "https://www.youtube.com/watch?v=I7knjeTSIls&t=2s" },
  { slug: "creator-shorts", title: "Creator Shorts Pack", category: "video", desc: "Short-form edits for personal-brand creators.", stack: ["After Effects", "Premiere Pro"], cover: "shorts" },
  { slug: "brand-film", title: "Brand Film", category: "video", desc: "A founder-story brand film for a D2C client.", stack: ["Final Cut Pro", "DaVinci Resolve"], cover: "film2" },

  { slug: "thumbnails-logos", title: "Thumbnails and Logos", category: "graphic", desc: "Minimalist thumbnail and logo work, mostly for creators and small brands.", stack: ["Canva", "Illustrator", "Photoshop", "Figma"], cover: "brand", demoUrl: "https://www.canva.com/design/DAGeNacFzWg/BOb-Mw3kb2zWyMJ1I2k3SA/edit" },
  { slug: "social-system", title: "Social Visual System", category: "graphic", desc: "A repeatable Instagram and LinkedIn visual system for a creator.", stack: ["Photoshop", "Figma"], cover: "social-design" },
  { slug: "print-collateral", title: "Print Collateral", category: "graphic", desc: "Deck, posters and print kit for an event.", stack: ["InDesign", "Illustrator"], cover: "print" },
];

export const ACHIEVEMENTS: { title: string; category: string; issuer: string; date: string; featured: boolean; description?: string; link?: string; tags?: string[]; imageUrl?: string }[] = [
  { title: "Founded Up N Running", category: "Ventures", issuer: "AI automation agency", date: "Jun 2025", featured: true, description: "A productized AI automation agency, run solo. It delivered client systems through to June 2026 and is not taking new clients right now.", link: "https://www.upnrunning.in" },
  { title: "Launched Socioverse", category: "Ventures", issuer: "Instagram AI SaaS", date: "Jan 2026", featured: true, description: "Built solo. Live with real users. No paying subscribers yet.", link: "https://www.socioverse.io" },
  { title: "Co-Founded BunkToBrains", category: "Ventures", issuer: "EdTech · roughly 40%", date: "Feb 2025", featured: true, description: "Student-led platform for practical skills. Postponed because not enough students were interested.", link: "https://www.bunktobrains.com" },
  { title: "Second prize, Hack-KRMU 4.0", category: "Awards", issuer: "KRM University", date: "Feb 2025", featured: true, description: "Built a waste segregator web app in two days. Took second prize.", tags: ["Hackathon", "Accessibility"] },
  { title: "Complete Web Development Course", category: "Certifications", issuer: "Udemy · Hitesh Choudhary", date: "Mar 2025", featured: true, description: "77.5-hour course. Certificate UC-5598cfdd-445f-4d61-a3e6-68c63b9fba96.", link: "https://ude.my/UC-5598cfdd-445f-4d61-a3e6-68c63b9fba96", imageUrl: "/certificates/web.webp", tags: ["Web Development", "Full Stack"] },
  { title: "Data Structures and Algorithms using Java", category: "Certifications", issuer: "NPTEL · IIT Kharagpur", date: "Jul-Oct 2024", featured: true, description: "Elite certification, 75% consolidated score, 12 weeks. Roll NPTEL24CS96S453601284.", imageUrl: "/certificates/dsa.webp", tags: ["Java", "Algorithms"] },
  { title: "Programming in Java", category: "Certifications", issuer: "NPTEL · IIT Kharagpur", date: "Jul-Oct 2024", featured: true, description: "48% consolidated score, 12 weeks. Roll NPTEL24CS105S653600878.", imageUrl: "/certificates/java.webp", tags: ["Java", "Programming"] },
  { title: "District chess champion", category: "Recognition", issuer: "District Sports Association", date: "2018", featured: false, description: "Pattern recognition and thinking a few moves out. I think it is where a lot of how I approach systems came from, though I could be reading backwards into it." },
  { title: "Vice President, Career Development Cell", category: "Recognition", issuer: "VIPS Technical Campus", date: "Jan 2025 - Present", featured: false, description: "Career development and placement operations for the campus." },
];

export const BLOG_POSTS = [
  {
    slug: "a-new-beginning",
    title: "A New Beginning - My Blog Journey",
    excerpt: "Starting to write things down: web development, product building, and what I got wrong along the way.",
    date: "2025-02-02",
    readTime: "3 min",
    category: "Career",
    tags: ["Web Development", "MERN Stack", "Next.js", "Career"],
    featured: true,
  },
  {
    slug: "first-product-failure",
    title: "My First Product Failure - A Lesson in Databases",
    excerpt: "How my first product fell over because of how I had used the database, and what I took from it.",
    date: "2025-02-10",
    readTime: "4 min",
    category: "Building",
    tags: ["Web Development", "Databases", "Product Building", "Lessons Learned"],
    featured: true,
  },
  {
    slug: "advanced-web-dev",
    title: "Diving into Advanced Web Development",
    excerpt: "Learning Docker and poking at the Wasp framework, and what actually stuck.",
    date: "2025-02-16",
    readTime: "4 min",
    category: "Tech",
    tags: ["Web Development", "Docker", "Wasp Framework"],
    featured: false,
  },
  {
    slug: "hackathon-journey",
    title: "Aqualoop's Hackathon Journey - From Short Notice to Second Prize",
    excerpt: "A last-minute invite, two days, no sleep, and a waste segregator that took second prize.",
    date: "2024-02-23",
    readTime: "5 min",
    category: "Hackathon",
    tags: ["Hackathon", "Web Development", "Teamwork"],
    featured: false,
  },
];

/**
 * Tools, not scores. The old shape carried a `level` percentage per tool - 95%
 * React, 92% TypeScript and so on. Nobody measured those, which makes them
 * invented metrics on a public page. A list of what he actually works in says
 * the same true thing and claims nothing.
 */
export const SKILLS: Record<string, string[]> = {
  "Web and product": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Supabase"],
  "AI systems": ["Claude", "n8n", "RAG and vector DBs", "Gemini", "Prompt design", "Pinecone"],
  "Video editing": ["Premiere Pro", "After Effects", "DaVinci Resolve", "Remotion"],
  "Graphic design": ["Photoshop", "Illustrator", "Figma", "InDesign"],
};

export const PRODUCTS = [
  { slug: "socioverse", title: "Socioverse", type: "saas", price: "Free tier", desc: "Instagram AI SaaS. Built solo, live, real users on it.", cover: "social" },
  { slug: "oto-engine", title: "OTO Engine", type: "service", price: "Built 2025", desc: "Outreach-to-onboard automation. Built at Up N Running.", cover: "ai" },
  { slug: "voice-ai", title: "Voice AI Assistant", type: "service", price: "Built 2025", desc: "Call handling, lead qualification and appointment booking.", cover: "voice" },
  { slug: "linkedin-agent", title: "LinkedIn Agent", type: "service", price: "Built 2025", desc: "LinkedIn outreach with replies scored by intent.", cover: "linkedin" },
  { slug: "creative-studio", title: "Creative Studio AI", type: "service", price: "Built 2025", desc: "Posters, thumbnails and short-form cuts inside one visual system.", cover: "creative" },
  { slug: "ai-proposal", title: "AI Proposal Generator", type: "service", price: "Built 2025", desc: "Proposals drafted from a discovery call transcript.", cover: "proposal" },
];

/**
 * The one thing he sells. Rs 799, one session, fixed length, one system built -
 * decided 2026-09-03. The scope cap is on the page on purpose: at a small ticket
 * an open-ended "session" turns into three hours for the price of one.
 */
export const COACHING = [
  {
    name: "One session, one system",
    price: "Rs 799",
    duration: "One session, fixed length",
    desc: "The lectures are free. This is the hour where we build your specific thing, on your machine, together. It is for someone who already knows what they want built, not for someone looking for the fundamentals - those are on YouTube for nothing.",
    includes: [
      "One session, one system, built with you",
      "On your machine, with your data",
      "You leave with the thing working",
      "Want another? Same price, same shape",
    ],
    url: "https://sightofai.space",
  },
];

/**
 * Real quotes from real people, kept because they exist. There are NO ratings,
 * NO review counts and NO stars anywhere on this site - none of that was ever
 * collected, and a fabricated "4.8/5 from 150 reviews" had to be removed once
 * already. Do not reintroduce social proof that is not real.
 */
export const TESTIMONIALS = [
  { slug: "ankur-warikoo", quote: "Socioverse looks quite cool.", author: "Ankur Warikoo", role: "Entrepreneur, content creator and author" },
  { slug: "mradul-sharma", quote: "Socioverse is sick.", author: "Mradul Sharma", role: "Founder, Akima Films" },
  { slug: "norton-wong", quote: "He exceeded every expectation and delivered work that was more polished, disciplined, and thoughtful than many senior developers I have worked with.", author: "Norton Wong", role: "Founder, Alveek AI & Flow" },
  { slug: "rohit-iyyer", quote: "I told him what my vision was and he made it into a reality within 24 hours. His speed and explanations are insane.", author: "Rohit Iyyer", role: "Founder, Clients Forge" },
  { slug: "karan-bhadauria", quote: "Anshul is fully immersed in the project. Once we sit down, it's all in or nothing, no middle ground.", author: "Karan Bhadauria", role: "Founder, DJKC Studios" },
  { slug: "utkarsh-bhatia", quote: "Anshul is exceptionally talented at understanding the project demand and quickly delivering it.", author: "Utkarsh Bhatia", role: "Founder, DJKC Studios" },
];

export const NOW = {
  updated: "2026-09-04",
  items: [
    {
      title: "Releasing",
      text: "AI Sight goes out free on YouTube from 15 September, two lectures a week until the end of October. I priced it at Rs 999 first and sold none, so this is the second attempt at getting it to anybody.",
    },
    {
      title: "Writing",
      text: "The workbook that goes with it. One PDF, one section per lecture, with the prompts and commands in a form you can copy rather than retype off a video.",
    },
    {
      title: "Building",
      text: "Socioverse. It is live and people use it, and the next thing to find out is whether any of them will pay for it.",
    },
  ],
};

export const TIMELINE = [
  { year: "2018", title: "District chess champion", text: "Pattern recognition and thinking a few moves out. I suspect that is where a lot of how I build came from, though I might be reading that backwards." },
  { year: "2021-23", title: "The JEE wake-up", text: "CBSE 94%. I should have cleared JEE and did not, mostly because I was lying to myself about how much work I was actually putting in. That is the failure the rest of this is built on." },
  { year: "2023", title: "Joined VIPS AIML", text: "B.Tech AI/ML at VIPS Delhi. Started the DSA grind - four or five months of coding every evening after college." },
  { year: "Early 2024", title: "The pivot", text: "Two days on a LeetCode problem, for a job I was not sure I wanted. I decided to build on my own terms instead. I still do not know if that was the right call, but it is the one I made." },
  { year: "2023-24", title: "DJ KC Studios", text: "Around ten months editing for a story-driven YouTube channel. First real money, and the first time I had to deliver on somebody else's deadline." },
  { year: "Feb 2024", title: "Hack-KRMU 4.0", text: "Built a waste segregator in two days. Second prize." },
  { year: "Jan 2025", title: "VP, Career Development Cell", text: "Placement operations at VIPS." },
  { year: "Feb 2025", title: "Co-founded BunkToBrains", text: "EdTech, roughly 40% mine. It later got postponed - not enough students were interested. A demand failure, not an unfinished build." },
  { year: "Jun 2025", title: "Founded Up N Running", text: "Solo. An AI automation agency doing fixed-scope work for Indian businesses." },
  { year: "Late 2025", title: "Started Socioverse", text: "Built it alone. Instagram AI SaaS." },
  { year: "Jan 2026", title: "Socioverse went live", text: "Real users on it. Still no paying subscribers - the product works, the willingness to pay is the open question." },
  { year: "2026", title: "The Shopify try-on, shipped and parked", text: "It reached users and the market turned it down on garment accuracy. I parked it rather than keep working on something people had already told me was not good enough." },
  { year: "Jun 2026", title: "Agency income ended", text: "Up N Running stopped taking new clients. There is no revenue coming in from it now, and I would rather say that than imply otherwise." },
  { year: "Sep 2026", title: "AI Sight goes free", text: "Fifteen lectures I could not sell at Rs 999, going out on YouTube for nothing from the 15th." },
];

// Product facts for the Socioverse page. Socioverse is on this site as evidence
// that he ships, NOT as a funnel - it serves a different audience entirely.
export const SOCIOVERSE_FAQ = [
  { q: "What is Socioverse?", a: "An Instagram AI system: it reads what performed, drafts scripts in your voice, runs DM sequences and keeps the leads in one place." },
  { q: "How does competitor analysis work?", a: "You add competitor handles. It pulls their top-performing reels, extracts the hooks and patterns, and writes scripts against your brand voice instead of theirs." },
  { q: "Is it safe to connect my Instagram account?", a: "It uses the official Meta APIs for DMs, comments and publishing rather than working around them." },
  { q: "What does the free tier include?", a: "Thirty days, no card required." },
  { q: "How does DM automation work?", a: "Keyword triggers on comments and stories, an optional follow gate, then multi-step sequences with delays and branching." },
  { q: "Can it generate content?", a: "Yes - ideas, hooks and full scripts, built from your brand voice and what the competitor analysis found." },
  { q: "What does it cost?", a: "Free, $18 Starter, $48 Creator and $88 Agency." },
  { q: "Can I cancel any time?", a: "Yes. No contract, cancel from the dashboard." },
];
