const KEYS={liked:'gloyon_liked',saved:'gloyon_saved',recent:'gloyon_recently_viewed',compare:'gloyon_compare',history:'gloyon_search_history',recentSearch:'gloyon_recent_searches',theme:'gloyon_theme',view:'gloyon_view_mode'};
export const get=(k,fb=[])=>{try{const v=JSON.parse(localStorage.getItem(KEYS[k]||k));return v??fb}catch{return fb}};
export const set=(k,v)=>{try{localStorage.setItem(KEYS[k]||k,JSON.stringify(v));return true}catch{return false}};
export const toggle=(k,id)=>{const a=get(k,[]);const n=a.includes(id)?a.filter(x=>x!==id):[...a,id];set(k,n);return n};
export const addUnique=(k,id,max=30)=>{const a=get(k,[]).filter(x=>x!==id);a.unshift(id);set(k,a.slice(0,max));return a};
export const remove=(k,id)=>set(k,get(k,[]).filter(x=>x!==id));
export const clear=k=>set(k,[]);
export const KEYS_MAP=KEYS;
