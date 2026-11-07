document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");
    const searchStatus = document.getElementById("search-status");
    const tagButtons = document.querySelectorAll(".tag");

    let activeCategory = "all";

    // Function to render results onto DOM
    function executeSearch() {
        const query = searchInput.value;
        const results = window.mySearchEngine.search(query, activeCategory);

        // Update Status text
        searchStatus.textContent = `Found ${results.length} result(s)`;

        // Clear previous results
        searchResults.innerHTML = "";

        if (results.length === 0) {
            searchResults.innerHTML = `<div class="result-card"><p>No matching results found. Try alternative keywords.</p></div>`;
            return;
        }

        // Populate cards
        results.forEach(item => {
            const card = document.createElement("div");
            card.className = "result-card";
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="badge">${item.category}</span>
            `;
            searchResults.appendChild(card);
        });
    }

    // Event Listeners
    searchInput.addEventListener("input", executeSearch);
    searchBtn.addEventListener("click", executeSearch);

    // Category Tag Filters
    tagButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            tagButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            activeCategory = e.target.getAttribute("data-category");
            executeSearch();
        });
    });

    // Initial load render
    executeSearch();
});
