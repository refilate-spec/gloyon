import {loadAllForSearch,loadCategories} from './data-loader.js';
import {rankProducts,understandQuery} from './search-engine.js';
import {sortProducts} from './sort-engine.js';
import {$,params,esc} from './utils.js';
import {productCard} from './view.js';
import {addSearch,recentSearches} from './history-engine.js';

const SUGGESTIONS=['Best AI tools for writing','Free graphic design tools','Website hosting for small business','Cybersecurity and privacy tools','Productivity apps for students'];
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export async function renderSearch(){
 const q0=params().get('q')||'';const host=$('#page-content');
 host.innerHTML=`<section class="gx-search-hero"><span class="eyebrow"><i class="fa-solid fa-wand-magic-sparkles"></i> GLOYON INTELLIGENT DISCOVERY</span><h1 class="page-title">Find the right tool.<br><em>Not just another result.</em></h1><p class="muted">Describe what you need in your own words. Search across products, features, categories and use cases.</p>
 <form id="gx-search-form" class="gx-searchbar"><i class="fa-solid fa-magnifying-glass"></i><input id="search-q" autocomplete="off" value="${esc(q0)}" placeholder="e.g. free AI tool to create images..."><button type="submit">Search <i class="fa-solid fa-arrow-right"></i></button><button type="button" id="gx-clear" class="gx-clear" aria-label="Clear search"><i class="fa-solid fa-xmark"></i></button></form>
 <div class="gx-suggestions"><span>Try:</span>${SUGGESTIONS.map(s=>`<button type="button" class="gx-suggestion" data-query="${esc(s)}">${esc(s)}</button>`).join('')}</div></section>
 <section class="gx-search-workspace"><aside class="gx-filter-panel"><div class="gx-filter-head"><h3><i class="fa-solid fa-sliders"></i> Refine results</h3><button id="gx-reset" class="gx-reset" type="button">Reset</button></div>
 <label class="gx-label" for="gx-category">Category</label><select id="gx-category" class="select"><option value="">All categories</option></select>
 <label class="gx-label" for="gx-pricing">Pricing</label><select id="gx-pricing" class="select"><option value="">Any pricing</option><option value="free">Free plan available</option><option value="freemium">Freemium</option><option value="paid">Paid</option></select>
 <label class="gx-label" for="gx-platform">Platform</label><select id="gx-platform" class="select"><option value="">Any platform</option><option>Web</option><option>Windows</option><option>Mac</option><option>Linux</option><option>Android</option><option>iOS</option></select>
 <label class="gx-label" for="gx-type">Product type</label><select id="gx-type" class="select"><option value="">All types</option></select>
 <div class="gx-filter-note"><i class="fa-solid fa-circle-info"></i> Filters combine with your search to narrow the matches.</div></aside>
 <div class="gx-results-area"><div class="gx-results-top"><div><span class="eyebrow">DISCOVERY RESULTS</span><h2 id="gx-results-title">Explore the directory</h2><p id="search-count" class="search-result-count">Loading products…</p></div><select id="search-sort" class="select gx-sort" aria-label="Sort results"><option value="relevance">Best match</option><option value="featured">Featured</option><option value="az">Name: A–Z</option><option value="za">Name: Z–A</option><option value="newest">Recently updated</option></select></div>
 <div id="gx-understanding" class="gx-understanding" hidden></div><div id="gx-active-filters" class="gx-active-filters"></div><div id="search-results" class="product-grid"></div><div id="search-empty"></div></div></section>`;
 const products=await loadAllForSearch();let categories=[];try{categories=await loadCategories()}catch{}
 const categorySelect=$('#gx-category'),typeSelect=$('#gx-type');
 categories.filter(c=>!c.parent).forEach(c=>categorySelect.insertAdjacentHTML('beforeend',`<option value="${esc(c.id)}">${esc(c.name)}</option>`));
 [...new Set(products.map(p=>p.productType).filter(Boolean))].sort().forEach(t=>typeSelect.insertAdjacentHTML('beforeend',`<option value="${esc(t)}">${esc(t)}</option>`));
 const input=$('#search-q'),sort=$('#search-sort'),pricing=$('#gx-pricing'),platform=$('#gx-platform'),type=$('#gx-type');
 function draw(){const raw=input.value.trim(),meta=understandQuery(raw,products);let ranked=rankProducts(products,raw);
 if(categorySelect.value)ranked=ranked.filter(x=>x.product.category===categorySelect.value);
 if(pricing.value==='free')ranked=ranked.filter(x=>x.product.freePlan||norm(x.product.pricingModel).includes('free'));
 if(pricing.value==='freemium')ranked=ranked.filter(x=>norm(x.product.pricingModel).includes('freemium'));
 if(pricing.value==='paid')ranked=ranked.filter(x=>norm(x.product.pricingModel)==='paid');
 if(platform.value)ranked=ranked.filter(x=>(x.product.platforms||[]).some(v=>norm(v)===norm(platform.value)));
 if(type.value)ranked=ranked.filter(x=>x.product.productType===type.value);
 let list=ranked.map(x=>x.product);if(sort.value==='az'||sort.value==='za'||sort.value==='newest')list=sortProducts(list,sort.value);else if(sort.value==='featured')list.sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
 $('#gx-results-title').textContent=raw?'Search results':'Explore the directory';$('#search-count').textContent=`${list.length} ${list.length===1?'product':'products'} ${raw?'matched':'available'}`;
 const intelligence=$('#gx-understanding');const chips=[];if(meta.category)chips.push('Category detected');if(meta.pricing)chips.push(meta.pricing==='free'?'Free plan intent':meta.pricing+' pricing intent');if(meta.platform)chips.push(meta.platform+' platform');if(meta.intent.length)chips.push(...meta.intent);
 intelligence.hidden=!raw||!chips.length;intelligence.innerHTML=raw&&chips.length?`<span class="gx-ai-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></span><div><b>Search understanding</b><div class="gx-ai-chips">${chips.map(c=>`<span>${esc(c)}</span>`).join('')}</div></div>`:'';
 const active=[categorySelect.value&&categorySelect.options[categorySelect.selectedIndex].text,pricing.value&&pricing.options[pricing.selectedIndex].text,platform.value,type.value].filter(Boolean);$('#gx-active-filters').innerHTML=active.map(x=>`<span class="gx-active-chip">${esc(x)}</span>`).join('');
 $('#search-results').innerHTML=list.slice(0,60).map(p=>{const r=ranked.find(x=>x.product.id===p.id);return `<div class="gx-result-item">${productCard(p)}${raw&&r?.reason?`<div class="gx-match-reason"><i class="fa-solid fa-sparkles"></i> ${esc(r.reason)}</div>`:''}</div>`}).join('');
 const recent=recentSearches();$('#search-empty').innerHTML=list.length?'':`<div class="empty-state"><i class="fa-solid fa-magnifying-glass" style="font-size:23px"></i><h3>No matching products found</h3><p>Try a broader phrase, remove a filter or explore a suggested search.</p>${recent.length?'<div class="gx-recent"><b>Recent searches</b>'+recent.map(x=>`<button class="btn" data-query="${esc(x)}">${esc(x)}</button>`).join('')+'</div>':''}</div>`;
 }
 $('#gx-search-form').addEventListener('submit',e=>{e.preventDefault();addSearch(input.value);const u=new URL(location.href);if(input.value.trim())u.searchParams.set('q',input.value.trim());else u.searchParams.delete('q');history.replaceState({},'',u);draw()});
 input.addEventListener('input',draw);[sort,categorySelect,pricing,platform,type].forEach(el=>el.addEventListener('change',draw));
 $('#gx-clear').addEventListener('click',()=>{input.value='';const u=new URL(location.href);u.searchParams.delete('q');history.replaceState({},'',u);draw();input.focus()});
 $('#gx-reset').addEventListener('click',()=>{categorySelect.value='';pricing.value='';platform.value='';type.value='';sort.value='relevance';draw()});draw();
}
