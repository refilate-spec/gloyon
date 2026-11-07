import {CONFIG} from './config.js';
const cache={};
async function json(url){if(cache[url])return cache[url];cache[url]=fetch(url).then(r=>{if(!r.ok)throw Error('Could not load '+url);return r.json()}).catch(e=>{delete cache[url];throw e});return cache[url]}
export const loadCategories=()=>json(CONFIG.paths.categories);
export const loadIndex=()=>json(CONFIG.paths.index);
export const loadArticles=()=>json(CONFIG.paths.articles);
export async function loadCategory(id){const idx=await loadIndex();const shard=[...new Set(idx.filter(p=>p.category===id).map(p=>p.shard))];const groups=await Promise.all(shard.map(s=>json(CONFIG.paths.products+s)));return groups.flat().filter(p=>p.category===id)}
export async function loadProducts(ids){const wanted=new Set(ids);const idx=await loadIndex();const shards=[...new Set(idx.filter(p=>wanted.has(p.id)).map(p=>p.shard))];const groups=await Promise.all(shards.map(s=>json(CONFIG.paths.products+s)));return groups.flat().filter(p=>wanted.has(p.id))}
export async function loadAllForSearch(){const idx=await loadIndex();const shards=[...new Set(idx.map(p=>p.shard))];const groups=await Promise.all(shards.map(s=>json(CONFIG.paths.products+s)));return groups.flat()}
