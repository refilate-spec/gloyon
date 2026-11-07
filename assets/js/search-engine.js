// Gloyon local search intelligence. Runs entirely in the browser; no external AI service required.
const norm=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const arr=v=>Array.isArray(v)?v:[];
const fields=p=>[p.name,p.brand,p.category,p.subcategory,p.description,p.longDescription,...arr(p.keywords),...arr(p.synonyms),...arr(p.tags),...arr(p.features),...arr(p.benefits),p.pricingModel,p.productType,...arr(p.platforms),...arr(p.targetAudience),...arr(p.useCases),...arr(p.integrations)].join(' ');
const aliases={"ai":"ai-tools","artificial intelligence":"ai-tools","website":"web-hosting","websites":"web-hosting","design":"graphic-design","graphic":"graphic-design","security":"cybersecurity","secure":"cybersecurity","work":"productivity-tools","productivity":"productivity-tools"};
const stop=new Set(['a','an','the','for','to','with','and','or','of','in','on','my','me','i','need','want','looking','find','best','good','tool','tools','software','app']);
export function understandQuery(raw,products=[]){
 const query=norm(raw),tokens=query.split(' ').filter(t=>t&&!stop.has(t));
 const intent=[];
 if(/\b(write|writing|content|blog|copy)\b/.test(query))intent.push('Writing & content');
 if(/\b(image|photo|picture|art|design|logo)\b/.test(query))intent.push('Design & images');
 if(/\b(host|hosting|domain|website|site|web)\b/.test(query))intent.push('Websites & hosting');
 if(/\b(security|secure|password|privacy|vpn|antivirus)\b/.test(query))intent.push('Security');
 if(/\b(research|study|learn|education|student)\b/.test(query))intent.push('Research & learning');
 if(/\b(team|project|task|workflow|manage|productivity)\b/.test(query))intent.push('Productivity');
 let pricing='';if(/\b(free|no cost|without paying)\b/.test(query))pricing='free';else if(/\b(paid|premium|subscription)\b/.test(query))pricing='paid';else if(/\b(freemium)\b/.test(query))pricing='freemium';
 const platform=['web','windows','mac','macos','linux','android','ios'].find(x=>new RegExp('\\b'+x+'\\b').test(query))||'';
 let category='';for(const [key,id] of Object.entries(aliases)){if(new RegExp('\\b'+key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b').test(query)){category=id;break}}
 if(!category){const cats=[...new Set(products.map(p=>p.category).filter(Boolean))];category=cats.find(c=>query.includes(norm(c).replace(/-/g,' ')))||''}
 const budget=(query.match(/(?:under|below|less than|upto|up to)\s*\$?\s*(\d+(?:\.\d+)?)/)||[])[1];
 return {query,tokens,intent,pricing,platform,category,budget};
}
function editDistance(a,b){if(Math.abs(a.length-b.length)>1)return 9;let i=0,j=0,d=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++}else{d++;if(d>1)return d;if(a.length>b.length)i++;else if(b.length>a.length)j++;else{i++;j++}}}return d+(i<a.length||j<b.length?1:0)}
export function rankProducts(products,raw){const meta=understandQuery(raw,products);if(!meta.query)return products.map(p=>({product:p,score:Number(!!p.featured),reason:p.featured?'Featured discovery':'Explore this product'}));
 return products.map(p=>{const name=norm(p.name),brand=norm(p.brand),category=norm(p.category),all=norm(fields(p)),tokens=meta.tokens;let score=0;const hits=[];
 if(name===meta.query){score+=150;hits.push('Exact product name')};if(brand===meta.query){score+=115;hits.push('Brand match')};if(name.includes(meta.query)){score+=85;hits.push('Name match')};if(category.includes(meta.query)){score+=55;hits.push('Category match')};
 for(const t of tokens){if(name.split(' ').some(x=>x===t)){score+=24;hits.push('Name')}else if(name.split(' ').some(x=>x.startsWith(t))){score+=17;hits.push('Name')}else if(brand.split(' ').some(x=>x.startsWith(t))){score+=14;hits.push('Brand')}else if(all.includes(t)){score+=9;hits.push('Features & details')}else if(t.length>3&&all.split(' ').some(x=>editDistance(x,t)===1)){score+=3;hits.push('Similar keyword')}}
 if(meta.category&&p.category===meta.category){score+=28;hits.push('Relevant category')};if(meta.platform&&arr(p.platforms).some(x=>norm(x)===meta.platform)){score+=12;hits.push('Platform match')};if(meta.pricing==='free'&&(p.freePlan||norm(p.pricingModel).includes('free'))){score+=9;hits.push('Free plan')};if(meta.pricing==='freemium'&&norm(p.pricingModel).includes('freemium'))score+=9;
 if(p.featured)score+=2;
 return {product:p,score,reason:[...new Set(hits)].slice(0,2).join(' · ')||'Related discovery'};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
}
export function searchProducts(products,q){return rankProducts(products,q).map(x=>x.product)}
