/**
 * Core Application Logic & Theme Switcher
 */

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Render Featured Products on Homepage
  const featuredGrid = document.getElementById("featured-products-grid");
  if (featuredGrid && typeof DIGITAL_TOOLS_DATABASE !== "undefined") {
    const featuredTools = DIGITAL_TOOLS_DATABASE.filter(tool => tool.featured || tool.status === "published");
    
    featuredGrid.innerHTML = featuredTools.map(tool => `
      <div class="product-card">
        <div>
          <div class="card-header">
            <img src="${tool.logo}" alt="${tool.name} logo" class="card-logo" onerror="this.src='assets/images/favicon.svg'">
            <div class="card-title-area">
              <h3>${tool.name}</h3>
              <span class="category-badge">${tool.category}</span>
            </div>
          </div>
          <p class="card-desc">${tool.shortDescription}</p>
        </div>
        <div class="card-footer">
          <span class="pricing-label">${tool.pricingModel} ${tool.hasFreePlan ? '(Free Plan)' : ''}</span>
          <a href="${tool.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Official Site</a>
        </div>
      </div>
    `).join("");
  }

  // Global search redirect or handling
  const globalSearchInput = document.getElementById("global-search");
  if (globalSearchInput) {
    globalSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = encodeURIComponent(globalSearchInput.value.trim());
        window.location.href = `tools/?q=${query}`;
      }
    });
  }
});

