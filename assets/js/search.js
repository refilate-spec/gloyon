/**
 * AGS AI Smart Search Engine (search.js)
 * Features: Fuzzy matching, relevancy scoring, real-time debouncing, and smart UI dropdown.
 */

class AGSSmartSearch {
    constructor(options) {
        this.inputSelector = options.inputSelector;
        this.resultsContainerSelector = options.resultsContainerSelector;
        this.data = options.data || []; // Array of objects: [{title, category, url, description, tags}]
        this.minChars = options.minChars || 1;
        
        this.init();
    }

    init() {
        const inputElement = document.querySelector(this.inputSelector);
        if (!inputElement) return;

        // Create dropdown container dynamically if not present
        let dropdown = document.querySelector(this.resultsContainerSelector);
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'ags-search-dropdown hidden absolute z-50 mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl overflow-hidden text-slate-100';
            inputElement.parentNode.style.position = 'relative';
            inputElement.parentNode.appendChild(dropdown);
        }
        this.dropdown = dropdown;

        // Event listener with Debouncing (AI-like responsive throttling)
        let debounceTimer;
        inputElement.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const query = e.target.value.trim();

            debounceTimer = setTimeout(() => {
                if (query.length >= this.minChars) {
                    const results = this.performSmartSearch(query);
                    this.renderResults(results, query);
                } else {
                    this.hideDropdown();
                }
            }, 150); // 150ms instant response delay
        });

        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!inputElement.contains(e.target) && !this.dropdown.contains(e.target)) {
                this.hideDropdown();
            }
        });
    }

    // AI-Style Relevancy & Fuzzy Scoring Algorithm
    performSmartSearch(query) {
        const qWords = query.toLowerCase().split(/\s+/);
        const scoredResults = this.data.map(item => {
            let score = 0;
            const title = (item.title || '').toLowerCase();
            const desc = (item.description || '').toLowerCase();
            const category = (item.category || '').toLowerCase();
            const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';

            qWords.forEach(word => {
                if (title.includes(word)) score += 10;       // Exact title match weight
                if (category.includes(word)) score += 6;   // Category match weight
                if (tags.includes(word)) score += 5;       // Tag match weight
                if (desc.includes(word)) score += 2;       // Description match weight
                
                // Fuzzy/Partial match bonus
                if (title.startsWith(word)) score += 5;
            });

            return { item, score };
        });

        // Filter out zero scores and sort by highest relevance score
        return scoredResults
            .filter(res => res.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(res => res.item)
            .slice(0, 6); // Top 6 AI suggestions limit
    }

    // Render Smart Dropdown UI
    renderResults(results, query) {
        if (results.length === 0) {
            this.dropdown.innerHTML = `
                <div class="p-4 text-center text-sm text-slate-400">
                    <i class="fa-solid fa-ghost mb-1 text-emerald-400 text-lg"></i>
                    <p>No intelligent matches found for "<span class="text-emerald-400">${query}</span>"</p>
                </div>`;
            this.showDropdown();
            return;
        }

        let html = `<div class="p-2 text-xs font-semibold text-emerald-400 border-b border-slate-800 flex justify-between items-center">
                        <span><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> AI Suggested Results</span>
                        <span class="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">${results.length} found</span>
                    </div>
                    <div class="max-h-72 overflow-y-auto divide-y divide-slate-800/50">`;

        results.forEach(item => {
            html += `
                <a href="${item.url || '#'}" class="block p-3 hover:bg-slate-800/80 transition-all group">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">${highlightMatch(item.title, query)}</span>
                        ${item.category ? `<span class="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 border border-slate-700">${item.category}</span>` : ''}
                    </div>
                    ${item.description ? `<p class="text-xs text-slate-400 mt-1 line-clamp-1">${item.description}</p>` : ''}
                </a>`;
        });

        html += `</div>`;
        this.dropdown.innerHTML = html;
        this.showDropdown();
    }

    showDropdown() {
        this.dropdown.classList.remove('hidden');
    }

    hideDropdown() {
        this.dropdown.classList.add('hidden');
    }
}

// Helper function to highlight searched text dynamically
function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="text-emerald-400 font-semibold underline decoration-emerald-500/50">$1</span>');
}

