import {addUnique,get} from './storage.js';export const addSearch=q=>{if(q.trim())addUnique('recentSearch',q.trim(),10)};export const recentSearches=()=>get('recentSearch',[]);
