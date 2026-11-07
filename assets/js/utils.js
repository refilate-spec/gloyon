export const $=(s,r=document)=>r.querySelector(s);export const $$=(s,r=document)=>[...r.querySelectorAll(s)];
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const params=()=>new URLSearchParams(location.search);
export const safeUrl=(u)=>{try{const x=new URL(u,location.href);return ['http:','https:'].includes(x.protocol)?x.href:'#'}catch{return '#'}};
export const dateLabel=s=>s?new Date(s+'T00:00:00').toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'Not disclosed';
export const toast=m=>{let n=$('.toast');if(!n){n=document.createElement('div');n.className='toast';document.body.append(n)}n.textContent=m;setTimeout(()=>n.remove(),1800)};
export const slugify=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
