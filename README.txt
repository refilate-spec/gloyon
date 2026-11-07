GLOYON - SEARCH ONLY PACKAGE

Included files:
- search.html
- assets/js/search.js
- assets/js/search-engine.js
- assets/css/ai-search.css

Installation:
1. Copy these files into the matching paths in your existing Gloyon project.
2. Keep your existing assets/css/theme.css, main.css, components.css, responsive.css.
3. Keep your existing assets/js/app.js and platform modules.
4. Ensure app.js imports/loads search.js for data-page="search" (the existing Gloyon app structure should already do this).

Dependencies used by search.js from the existing project:
- assets/js/data-loader.js
- assets/js/sort-engine.js
- assets/js/utils.js
- assets/js/view.js
- assets/js/history-engine.js

This package contains only the search page and search-specific code/styles, not the full Gloyon platform.
The intelligent matching is client-side; it does not call an external LLM/API.
