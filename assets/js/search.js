/**
 * AGS Standalone AI Search & Suggestion Engine (search.js)
 * Independent module for /tools/ page
 */

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("tool-search");
    if (!searchInput || typeof DIGITAL_TOOLS_DATABASE === "undefined") return;

    // Parent container ko relative banana zaroori hai dropdown ke liye
    const parent = searchInput.parentElement;
    if (window.getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
    }

    // Dropdown container dynamically create karein
    const dropdown = document.createElement("div");
    dropdown.className = "ags-ai-dropdown hidden absolute left-0 right-0 top-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl overflow-hidden z-50 text-slate-100 text-left";
    parent.appendChild(dropdown);

    // AI Semantic Scoring & Filtering
    function getAISuggestions(query) {
        const qWords = query.toLowerCase().split(/\s+/).filter(Boolean);
        if (qWords.length === 0) return [];

        const scored = DIGITAL_TOOLS_DATABASE.map(tool => {
            let score = 0;
            const name = (tool.name || "").toLowerCase();
            const desc = (tool.shortDescription || "").toLowerCase();
            const cat = (tool.category || "").toLowerCase();
            const tags = Array.isArray(tool.tags) ? tool.tags.map(t => t.toLowerCase()) : [];

            qWords.forEach(word => {
                if (name.includes(word)) { score += 15; if (name.startsWith(word)) score += 5; }
                if (cat.includes(word)) score += 10;
                if (tags.some(t => t.includes(word))) score += 8;
                if (desc.includes(word)) score += 4;
            });

            return { tool, score };
        });

        return scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.tool)
            .slice(0, 5); // Top 5 AI Suggestions
    }

    // Input Event with Debounce
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();

        debounceTimer = setTimeout(() => {
            if (query.length > 0) {
                const suggestions = getAISuggestions(query);
                
                if (suggestions.length > 0) {
                    dropdown.innerHTML = `
                        <div class="px-3 py-2 text-xs font-semibold text-emerald-400 border-b border-slate-800 bg-slate-950/90 flex justify-between items-center">
                            <span><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> AI Smart Suggestions</span>
                            <span class="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[10px]">${suggestions.length} found</span>
                        </div>
                        <div class="divide-y divide-slate-800/50 max-h-60 overflow-y-auto">
                            ${suggestions.map(item => `
                                <a href="${item.officialUrl}" target="_blank" rel="noopener noreferrer" class="block p-3 hover:bg-slate-800/80 transition-colors group">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-slate-200 group-hover:text-emerald-400">${item.name}</span>
                                        <span class="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">${item.category}</span>
                                    </div>
                                    <div class="text-xs text-slate-400 mt-0.5 line-clamp-1">${item.shortDescription}</div>
                                </a>
                            `).join('')}
                        </div>
                    `;
                    dropdown.classList.remove("hidden");
                } else {
                    dropdown.innerHTML = `<div class="p-3 text-xs text-slate-400 text-center">No AI suggestions found</div>`;
                    dropdown.classList.remove("hidden");
                }
            } else {
                dropdown.classList.add("hidden");
            }
        }, 120);
    });

    // Bahar click karne par dropdown hide ho jaye
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add("hidden");
        }
    });
});
