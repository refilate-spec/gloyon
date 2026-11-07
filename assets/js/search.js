document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");
    const searchStatus = document.getElementById("search-status");
    const tagButtons = document.querySelectorAll(".tag");

    let activeCategory = "all";

    function executeSearch() {
        const query = searchInput.value;
        const results = window.mySearchEngine.search(query, activeCategory);

        searchStatus.textContent = `Found ${results.length} result(s)`;
        searchResults.innerHTML = "";

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="result-card p-4 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-400 text-sm">
                    No matching results found. Try alternative keywords.
                </div>`;
            return;
        }

        results.forEach(item => {
            const card = document.createElement("div");
            card.className = "result-card p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl hover:border-slate-700";
            card.innerHTML = `
                <h3 class="text-sky-400 font-semibold text-lg mb-1">${item.title}</h3>
                <p class="text-slate-300 text-sm mb-3">${item.description}</p>
                <span class="badge text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md uppercase tracking-wider">${item.category}</span>
            `;
            searchResults.appendChild(card);
        });
    }

    searchInput.addEventListener("input", executeSearch);
    searchBtn.addEventListener("click", executeSearch);

    tagButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            tagButtons.forEach(btn => {
                btn.classList.remove("active", "bg-sky-500", "text-slate-950", "font-semibold");
                btn.classList.add("bg-slate-950", "border", "border-slate-800", "text-slate-400");
            });
            
            e.target.classList.add("active", "bg-sky-500", "text-slate-950", "font-semibold");
            e.target.classList.remove("bg-slate-950", "border", "border-slate-800", "text-slate-400");

            activeCategory = e.target.getAttribute("data-category");
            executeSearch();
        });
    });

    executeSearch();
});
