// Advanced Database / Indexed Content
const searchDatabase = [
    {
        id: 1,
        title: "Mastering Modern JavaScript",
        description: "Learn advanced ES6+ features, closures, async/await, and performance optimization techniques.",
        category: "development",
        keywords: ["js", "javascript", "coding", "async"]
    },
    {
        id: 2,
        title: "CSS Grid and Flexbox Masterclass",
        description: "Build responsive, fluid layout designs effortlessly using modern CSS styling rules.",
        category: "design",
        keywords: ["css", "ui", "grid", "flexbox", "design"]
    },
    {
        id: 3,
        title: "Introduction to Generative AI",
        description: "Understand how large language models, neural networks, and prompt engineering work under the hood.",
        category: "ai",
        keywords: ["ai", "machine learning", "llm", "openai", "tech"]
    },
    {
        id: 4,
        title: "Building Scalable Search Engines",
        description: "Step-by-step tutorial on indexing text, tokenization, filtering, and scoring relevancy scores.",
        category: "development",
        keywords: ["search", "indexing", "algorithm", "database"]
    },
    {
        id: 5,
        title: "UI/UX Design Systems in 2026",
        description: "Best practices for creating reusable component libraries and dark-mode friendly design tokens.",
        category: "design",
        keywords: ["ui", "ux", "figma", "design systems"]
    }
];

// Search Engine Class for Advanced Queries & Scoring
class SearchEngine {
    constructor(dataset) {
        this.dataset = dataset;
    }

    normalize(text) {
        return text.toLowerCase().trim();
    }

    search(query, selectedCategory = "all") {
        const cleanQuery = this.normalize(query);
        const terms = cleanQuery.split(/\s+/).filter(Boolean);

        return this.dataset.filter(item => {
            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
            if (!matchesCategory) return false;
            if (terms.length === 0) return true;

            const targetText = this.normalize(`${item.title} ${item.description} ${item.keywords.join(' ')}`);
            return terms.every(term => targetText.includes(term));
        });
    }
}

// Expose instance globally
window.mySearchEngine = new SearchEngine(searchDatabase);
