/**
 * Global Digital Products & Tools Discovery Platform - Central Database
 * Schema version: 1.0.0
 */

const DIGITAL_TOOLS_DATABASE = [
  {
    id: "notion",
    name: "Notion",
    slug: "notion",
    logo: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    shortDescription: "All-in-one workspace for notes, docs, project management, and team collaboration.",
    fullDescription: "Notion is a deeply customizable workspace that combines notes, tasks, wikis, and databases into a single app. It allows individuals and teams to structure knowledge, manage projects, and build custom internal workflows effortlessly.",
    category: "Productivity Tools",
    productType: "SaaS",
    pricingModel: "Freemium",
    hasFreePlan: true,
    officialUrl: "https://www.notion.so/",
    affiliateUrl: "",
    affiliateStatus: "not-approved",
    features: [
      "Customizable wikis and docs",
      "Robust relational databases",
      "Task and project boards",
      "Real-time team collaboration",
      "AI-powered writing and summarizing"
    ],
    platforms: ["Web", "Mac", "Windows", "iOS", "Android"],
    targetAudience: ["Creators", "Developers", "Freelancers", "Business Owners"],
    tags: ["Workspace", "Notes", "Project Management", "Collaboration"],
    dateAdded: "2026-01-10",
    lastVerified: "2026-02-15",
    featured: true,
    status: "published"
  },
  {
    id: "figma",
    name: "Figma",
    slug: "figma",
    logo: "https://www.google.com/s2/favicons?domain=figma.com&sz=128",
    shortDescription: "Collaborative interface design tool for building meaningful products together.",
    fullDescription: "Figma is a cloud-based design and prototyping tool used for creating user interfaces, websites, mobile apps, and design systems. It empowers multi-user real-time collaboration across design and engineering teams.",
    category: "Graphic Design Tools",
    productType: "SaaS",
    pricingModel: "Freemium",
    hasFreePlan: true,
    officialUrl: "https://www.figma.com/",
    affiliateUrl: "",
    affiliateStatus: "not-approved",
    features: [
      "Real-time multiplayer editing",
      "Advanced vector networks",
      "Interactive prototyping & variables",
      "Design systems & component libraries",
      "Dev Mode for engineers"
    ],
    platforms: ["Web", "Mac", "Windows"],
    targetAudience: ["Designers", "Developers", "Freelancers", "Agencies"],
    tags: ["UI/UX", "Design", "Prototyping", "Collaboration"],
    dateAdded: "2026-01-12",
    lastVerified: "2026-02-18",
    featured: true,
    status: "published"
  },
  {
    id: "webflow",
    name: "Webflow",
    slug: "webflow",
    logo: "https://www.google.com/s2/favicons?domain=webflow.com&sz=128",
    shortDescription: "Visual web development platform that empowers you to build professional, custom websites.",
    fullDescription: "Webflow gives designers and developers the power to design, build, and launch custom responsive websites visually using clean semantic HTML, CSS, and JavaScript without writing code.",
    category: "Website Builders",
    productType: "SaaS",
    pricingModel: "Freemium",
    hasFreePlan: true,
    officialUrl: "https://webflow.com/",
    affiliateUrl: "https://webflow.com/?rfsn=sample",
    affiliateStatus: "approved",
    features: [
      "Visual CSS layout engine",
      "Built-in CMS and dynamic content",
      "Enterprise-grade hosting & SSL",
      "Advanced animations & interactions",
      "SEO optimization controls"
    ],
    platforms: ["Web"],
    targetAudience: ["Web Designers", "Freelancers", "Agencies", "Marketers"],
    tags: ["No-Code", "Web Design", "Hosting", "CMS"],
    dateAdded: "2026-01-15",
    lastVerified: "2026-02-20",
    featured: true,
    status: "published"
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    slug: "chatgpt",
    logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
    shortDescription: "Advanced conversational AI assistant by OpenAI for writing, coding, brainstorming, and analysis.",
    fullDescription: "ChatGPT utilizes state-of-the-art language models to assist users with diverse workflows, ranging from creative content writing and complex software debugging to data analysis and problem-solving.",
    category: "AI Tools",
    productType: "SaaS",
    pricingModel: "Freemium",
    hasFreePlan: true,
    officialUrl: "https://chatgpt.com/",
    affiliateUrl: "",
    affiliateStatus: "not-approved",
    features: [
      "Natural conversational interface",
      "Code generation & debugging",
      "Data analysis and document parsing",
      "Custom GPTs creation",
      "Voice and vision capabilities"
    ],
    platforms: ["Web", "iOS", "Android", "Mac", "Windows"],
    targetAudience: ["Creators", "Developers", "Students", "Professionals"],
    tags: ["AI", "Writing", "Automation", "Assistant"],
    dateAdded: "2026-01-05",
    lastVerified: "2026-02-22",
    featured: true,
    status: "published"
  },
  {
    id: "vercel",
    name: "Vercel",
    slug: "vercel",
    logo: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
    shortDescription: "Frontend cloud platform for fast static and Jamstack deployments with global CDN.",
    fullDescription: "Vercel provides developer-first deployment infrastructure optimized for modern frontend frameworks like Next.js, React, and Vue, offering lightning-fast edge performance and automatic CI/CD workflows.",
    category: "Cloud Services",
    productType: "SaaS",
    pricingModel: "Freemium",
    hasFreePlan: true,
    officialUrl: "https://vercel.com/",
    affiliateUrl: "",
    affiliateStatus: "not-approved",
    features: [
      "Instant git-based deployments",
      "Global Edge Network & CDN",
      "Automatic SSL certificates",
      "Serverless and Edge Functions",
      "Real-time analytics and monitoring"
    ],
    platforms: ["Web"],
    targetAudience: ["Developers", "Agencies", "Tech Startups"],
    tags: ["Hosting", "Cloud", "Deployment", "DevOps"],
    dateAdded: "2026-01-20",
    lastVerified: "2026-02-25",
    featured: false,
    status: "published"
  }
];

const CATEGORIES_LIST = [
  "AI Tools", "SaaS Software", "Website Builders", "Themes & Templates", 
  "Plugins & Extensions", "Hosting & Domains", "Graphic Design Tools", 
  "Video & Audio Tools", "SEO Tools", "Marketing Tools", "Social Media Tools", 
  "E-commerce Tools", "Business Tools", "Productivity Tools", "Automation Tools", 
  "No-Code Tools", "Developer Tools", "Security & Privacy", "Finance & Accounting", 
  "Online Education", "Stock Photos & Videos", "Digital Assets", "Writing Tools", 
  "Email Marketing", "Analytics & Research", "Freelancing Tools", "Mobile Apps", 
  "Cloud Services", "Legal & HR Software", "Website Optimization"
];

