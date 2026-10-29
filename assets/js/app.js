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
/**
 * Product Detail Modal Handler
 */
document.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (card && !e.target.closest("a")) {
    const toolName = card.getAttribute("data-tool-id");
    if (typeof DIGITAL_TOOLS_DATABASE !== "undefined") {
      const tool = DIGITAL_TOOLS_DATABASE.find(t => t.id === toolName);
      if (tool) openProductModal(tool);
    }
  }
});

function openProductModal(tool) {
  let modalOverlay = document.getElementById("product-modal-overlay");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "product-modal-overlay";
    modalOverlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(5px);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
      padding: 1rem;
    `;
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div style="background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 2rem; position: relative; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
      <button id="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-primary); font-size: 1.5rem; cursor: pointer;">&times;</button>
      
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <img src="${tool.logo}" alt="${tool.name}" style="width: 56px; height: 56px; border-radius: 10px; background: var(--border); object-fit: contain;">
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 0.25rem;">${tool.name}</h2>
          <span class="category-badge">${tool.category}</span>
        </div>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;">${tool.fullDescription || tool.shortDescription}</p>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">Key Features:</h4>
        <ul style="padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.35rem;">
          ${tool.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border); pt: 1rem; padding-top: 1rem; align-items: center; justify-content: space-between;">
        <span style="font-size: 0.85rem; color: var(--text-secondary);">Verified: ${tool.lastVerified || 'Recent'}</span>
        <a href="${tool.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.6rem 1.5rem;">Visit Official Website &rarr;</a>
      </div>
    </div>
  `;

  modalOverlay.style.display = "flex";

  document.getElementById("close-modal").onclick = () => {
    modalOverlay.style.display = "none";
  };
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = "none";
  };
}

