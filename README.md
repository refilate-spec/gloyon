# Gloyon
**Discover. Compare. Choose Better.**

A modular, static-first global digital product discovery and affiliate comparison starter platform. Built with HTML, CSS and vanilla JavaScript ES modules. No backend, database, authentication or build step is required.

## Run locally
Because ES modules and `fetch()` are used, serve the folder through any static HTTP server (for example, VS Code Live Server). Opening `index.html` directly with `file://` may block JSON requests.

## Structure
- Root HTML files: homepage, category, search, product view, comparison, saved, articles, legal and company pages.
- `assets/css/`: theme tokens, layout, components and responsive rules.
- `assets/js/`: configuration, storage, data loading, search, filters, sorting, comparison, sharing, URL resolution and page renderers.
- `data/categories.json`: lightweight category metadata loaded on the homepage.
- `data/products-index.json`: compact search/product shard index.
- `data/products/*.json`: category-specific product records.
- `data/articles.json`: editorial articles.
- `assets/images/`: image directories for future logos, categories, products and articles.

## Architecture and loading
Homepage loads only `categories.json` and `articles.json`; it does not load product records or render product cards. Category pages load the selected category shard. Search loads the product index and the referenced shards. Product view and comparison load only selected product records. Data loader caches successful JSON requests and avoids duplicate requests.

The central runtime registries are exposed as `window.GLOYON_CATEGORIES` and `window.GLOYON_PRODUCTS` when their corresponding initialization helpers are called. `products-data.js` provides `initProducts()` for the complete registry; do not call it on the homepage.

## Add a category
1. Add a unique object to `data/categories.json` with `id`, `slug`, `name`, `icon`, `description`, `featured`, `displayOrder` and `productCount`.
2. If products will belong to the category, create `data/products/<category-id>.json`.
3. Add its records to `data/products-index.json` with the matching `shard` filename.
4. Use a Font Awesome icon class in `icon`.

## Add a product
1. Add a record to the appropriate category shard, following the schema in the project brief.
2. Add a lightweight entry to `products-index.json` including `id`, `name`, `brand`, `category`, `description`, `keywords`, `tags`, `pricingModel`, `featured` and `shard`.
3. Keep IDs unique. Use only verified official URLs and approved affiliate URLs. Leave unknown facts empty or label them `Not disclosed`.
4. Update the category product count in `categories.json`.

## Product articles
Each product supports an `articleContent` object with `introduction`, `overview`, `howItWorks` and `evaluation`. Expand the view renderer and schema when adding richer editorial blocks. Independent editorial posts live in `data/articles.json`; article content supports paragraph and heading blocks.

## Affiliate URLs
Set `affiliateUrl` only after the relevant affiliate program has approved the exact destination. The resolver uses an affiliate URL for eligible outbound CTAs when present, otherwise it falls back to `officialUrl`. Never invent tracking links. Keep administrative commission and payout data out of public UI. The current demo data intentionally contains no affiliate URLs.

## Storage keys
`gloyon_liked`, `gloyon_saved`, `gloyon_recently_viewed`, `gloyon_compare`, `gloyon_search_history`, `gloyon_recent_searches`, `gloyon_theme`, `gloyon_view_mode`.

## Search, filters and comparison
Search uses normalized token matching, weighted fields, prefix/partial matches and a bounded one-edit typo fallback. Filter and sort engines are independent modules. The current category listing exposes basic in-category search and sorting; extend `filter-engine.js` to add additional filter controls. Comparison is capped at four products and requires at least two to render a table.

## Theme
Theme preference is stored in `gloyon_theme`; supported values are `dark`, `light` and `system`. The inline head bootstrap avoids a theme flash. The header toggle switches between dark and light.

## SEO
Each HTML route has static baseline metadata. Query-parameter product pages cannot reliably emit unique server-rendered social metadata on every static host. For stronger crawler and social preview support, generate dedicated static product pages or pre-render metadata at deployment time. Add canonical URLs, sitemap.xml and robots.txt when the production domain is known. Do not add fabricated review schema or aggregate ratings.

## Deployment
### GitHub Pages
Upload the project contents to a repository. Enable Pages for the chosen branch and folder. Keep relative paths as provided so the project works in a repository subdirectory.
### Cloudflare Pages
Connect the repository or upload the static output. No build command is required; set the output directory to the project root.

## Data integrity and limitations
The included products are a small demonstration catalog. Product data is intentionally conservative and is not marked verified. Current prices, availability, plans, feature details and terms must be checked on official provider sites. This starter implementation includes functional navigation, category-first homepage, category listings, search, product pages, saved/favorite utilities, share fallback, theme persistence and comparison. It does not claim measured Core Web Vitals or automated cross-browser QA. Contact form submission, live popularity metrics, ratings, user accounts, server-side search and affiliate network tracking are intentionally not implemented because they require infrastructure or verified data.
