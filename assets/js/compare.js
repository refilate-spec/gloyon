document.addEventListener("DOMContentLoaded", () => {
  const sel1 = document.getElementById("compare-select-1");
  const sel2 = document.getElementById("compare-select-2");
  const result = document.getElementById("comparison-result");

  if (!sel1 || !sel2 || typeof DIGITAL_TOOLS_DATABASE === "undefined") return;

  DIGITAL_TOOLS_DATABASE.forEach(tool => {
    sel1.innerHTML += `<option value="${tool.id}">${tool.name}</option>`;
    sel2.innerHTML += `<option value="${tool.id}">${tool.name}</option>`;
  });

  function updateComparison() {
    const t1 = DIGITAL_TOOLS_DATABASE.find(t => t.id === sel1.value);
    const t2 = DIGITAL_TOOLS_DATABASE.find(t => t.id === sel2.value);

    if (!t1 || !t2) {
      result.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">Please select both tools for comparison.</p>`;
      return;
    }

    result.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <h2>${t1.name}</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0.5rem 0 1rem 0;">${t1.shortDescription}</p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><strong>Category:</strong> ${t1.category}</li>
            <li><strong>Pricing:</strong> ${t1.pricingModel} ${t1.hasFreePlan ? '(Free Plan Available)' : ''}</li>
            <li><strong>Platforms:</strong> ${t1.platforms.join(", ")}</li>
            <li><strong>Target Audience:</strong> ${t1.targetAudience.join(", ")}</li>
          </ul>
        </div>
        <div>
          <h2>${t2.name}</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0.5rem 0 1rem 0;">${t2.shortDescription}</p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><strong>Category:</strong> ${t2.category}</li>
            <li><strong>Pricing:</strong> ${t2.pricingModel} ${t2.hasFreePlan ? '(Free Plan Available)' : ''}</li>
            <li><strong>Platforms:</strong> ${t2.platforms.join(", ")}</li>
            <li><strong>Target Audience:</strong> ${t2.targetAudience.join(", ")}</li>
          </ul>
        </div>
      </div>
    `;
  }

  sel1.addEventListener("change", updateComparison);
  sel2.addEventListener("change", updateComparison);
});

