/**
 * Filtering & Search Script for /tools/
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("tool-search");
  const categorySelect = document.getElementById("category-filter");
  const pricingSelect = document.getElementById("pricing-filter");
  const clearBtn = document.getElementById("clear-filters");
  const grid = document.getElementById("tools-grid");
  const resultsCount = document.getElementById("results-count");

  if (!grid || typeof DIGITAL_TOOLS_DATABASE === "undefined") return;

  // Populate category options dropdown dynamically from CATEGORIES_LIST
  if (categorySelect && typeof CATEGORIES_LIST !== "undefined") {
    CATEGORIES_LIST.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  // Parse URL query parameters if available (e.g. ?q=ai)
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get("q");
  if (initialQuery && searchInput) {
    searchInput.value = decodeURIComponent(initialQuery);
  }

  function renderTools() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedCategory = categorySelect ? categorySelect.value : "";
    const selectedPricing = pricingSelect ? pricingSelect.value : "";

    const filtered = DIGITAL_TOOLS_DATABASE.filter(tool => {
      const matchesQuery = !query || tool.name.toLowerCase().includes(query) || 
                           tool.shortDescription.toLowerCase().includes(query) ||
                           tool.tags.some(t => t.toLowerCase().includes(query));
      
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesPricing = !selectedPricing || tool.pricingModel.toLowerCase() === selectedPricing.toLowerCase();

      return matchesQuery && matchesCategory && matchesPricing;
    });

    resultsCount.textContent = `Showing ${filtered.length} verified product${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-secondary); border-radius: 10px; border: 1px solid var(--border);">
          <h3>No matching products found</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">Try adjusting your search criteria or clearing filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(tool => `
      <div class="product-card">
        <div>
          <div class="card-header">
            <img src="${tool.logo}" alt="${tool.name}" class="card-logo" onerror="this.src='../assets/images/favicon.svg'">
            <div class="card-title-area">
              <h3>${tool.name}</h3>
              <span class="category-badge">${tool.category}</span>
            </div>
          </div>
          <p class="card-desc">${tool.shortDescription}</p>
        </div>
        <div class="card-footer">
          <span class="pricing-label">${tool.pricingModel} ${tool.hasFreePlan ? '(Free Plan)' : ''}</span>
          <div style="display: flex; gap: 0.5rem;">
            <a href="${tool.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Official Site</a>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Event Listeners
  if (searchInput) searchInput.addEventListener("input", renderTools);
  if (categorySelect) categorySelect.addEventListener("change", renderTools);
  if (pricingSelect) pricingSelect.addEventListener("change", renderTools);
  
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categorySelect) categorySelect.value = "";
      if (pricingSelect) pricingSelect.value = "";
      renderTools();
    });
  }

  // Initial render
  renderTools();
});

