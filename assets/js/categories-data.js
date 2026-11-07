import {loadCategories} from './data-loader.js';export async function initCategories(){const c=await loadCategories();window.GLOYON_CATEGORIES=c;return c}
