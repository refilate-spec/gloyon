/**
 * AGS Global AI Search Engine (Assets/js/search.js)
 * Pure JavaScript Search Module - No HTML needed here.
 */

class AGSGlobalSearch {
    constructor(config = {}) {
        this.inputSelector = config.inputSelector || '#global-search';
        this.wrapperSelector = config.wrapperSelector || '.search-bar-wrapper';
        this.data = config.data || window.siteDatabase || [];
        this.minChars = config.minChars || 1;
        
        // Auto-initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        const input = document.querySelector(this.inputSelector);
        const wrapper = document.querySelector(this.wrapperSelector);
        if (!input || !wrapper) return;

        // Ensure wrapper has relative positioning for the absolute dropdown
        const computedStyle = window.getComputedStyle(wrapper);
        if (computedStyle.position === 'static') {
            wrapper.style.position = 'relative';
        }

        // Create the AI suggestion dropdown container dynamically
        let dropdown = document.createElement('div');
        dropdown.className = 'ags-global-dropdown hidden absolute left-0 right-0 top-full mt-2 bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 text-slate-100 text-left';
        wrapper.appendChild(dropdown);
        this.dropdown = dropdown;

        // Debounced Input Event Listener for instant AI-like throttling
        let debounceTimer;
        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const query = e.target.value.trim();

            debounceTimer = setTimeout(() => {
                if (query.length >= this.minChars) {
                    const results = this.filterAndScore(query);
                    this.renderResults(results, query);
                } else {
                    this.hideDropdown();
                }
            }, 150);
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                this.hideDropdown();
            }
        });
    }

    // AI Relevancy & Keyword Scoring Algorithm
    filterAndScore(query) {
        const words = query.toLowerCase().split(/\s+/);
        const dataset = this.data.length ? this.data : (window.siteDatabase || []);

        const scoredResults = dataset.map(item => {
            let score = 0;
            const title = (item.title || '').toLowerCase();
            const desc = (item.description || '').toLowerCase();
            const category = (item.category || '').toLowerCase();
            const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';

            words.forEach(word => {
                if (title.includes(word)) score += 12;      // High weight for title match
                if (category.includes(word)) score += 8;    // Medium weight for category
                if (tags.includes(word)) score += 6;        // Weight for tags
                if (desc.includes(word)) score += 3;        // Baseline weight for description
                if (title.startsWith(word)) score += 5;     // Prefix boost
            });

            return { item, score };
        });

        // Filter valid matches, sort by score descending, and limit to top 6
        return scoredResults
            .filter(res => res.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(res => res.item)
            .slice(0, 6);
    }

    // Render Dropdown UI with Glow Highlighting
    renderResults(results, query) {
        if (results.length === 0) {
            this.dropdown.innerHTML = `
                <div class="p-4 text-center text-sm text-slate-400">
                    <i class="fa-solid fa-ghost text-emerald-400 text-lg mb-1 block"></i>
                    No intelligent matches found for "<span class="text-emerald-400">${query}</span>"
                </div>`;
            this.showDropdown();
            return;
        }

        let html = `
            <div class="px-4 py-2.5 text-xs font-semibold text-emerald-400 border-b border-slate-800/80 flex justify-between items-center bg-slate-950/60">
                <span><i class="fa-solid fa-wand-magic-sparkles mr-1.5"></i> AI Suggested Results</span>
                <span class="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">${results.length} found</span>
            </div>
            <div class="max-h-72 overflow-y-auto divide-y divide-slate-800/40">`;

        results.forEach(item => {
            html += `
                <a href="${item.url || '#'}" class="block p-3.5 hover:bg-slate-800/70 transition-all group">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                            ${this.highlightKeyword(item.title, query)}
                        </span>
                        ${item.category ? `<span class="text-[10px] bg-slate-800 border border-slate-700/80 px-2 py-0.5 rounded-full text-slate-400">${item.category}</span>` : ''}
                    </div>
                    ${item.description ? `<p class="text-xs text-slate-400 mt-1 line-clamp-1">${item.description}</p>` : ''}
                </a>`;
        });

        html += `</div>`;
        this.dropdown.innerHTML = html;
        this.showDropdown();
    }

    highlightKeyword(text, query) {
        if (!query) return text;
        const safeQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(${safeQuery})`, 'gi');
        return text.replace(regex, '<span class="text-emerald-400 font-semibold underline decoration-emerald-500/50">$1</span>');
    }

    showDropdown() {
        this.dropdown.classList.remove('hidden');
    }

    hideDropdown() {
        this.dropdown.classList.add('hidden');
    }
}
