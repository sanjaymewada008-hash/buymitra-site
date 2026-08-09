const fs = require('fs');

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before migrating.');

const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' };

async function upsert(table, rows) {
  if (!rows.length) return;
  const response = await fetch(`${url}/rest/v1/${table}`, { method: 'POST', headers, body: JSON.stringify(rows) });
  if (!response.ok) throw new Error(`${table}: ${response.status} ${await response.text()}`);
}

const categoryRows = db.categories.map(category => ({
  id: category.id, name: category.name, slug: category.slug, enabled: category.enabled, subcategories: category.subcategories || []
}));
const productRows = db.products.map(product => ({
  id: product.id, name: product.name, sku: product.sku, brand: product.brand || 'BUYMITRA', category: product.category,
  subcategory: product.subcategory || null, short_description: product.shortDescription || null,
  full_description: product.fullDescription || null, price: product.price, mrp: product.mrp, stock: product.stock,
  low_stock_limit: product.lowStockLimit || 10, status: product.status || 'draft', tags: product.tags || [],
  variants: product.variants || [], attributes: product.attributes || {}, emoji: product.emoji || null,
  accent: product.accent || null, image: product.image || null, powder_image: product.powderImage || null,
  images: product.images || [], created_at: product.createdAt || new Date().toISOString()
}));
const orderRows = (db.orders || []).map(order => ({
  id: order.id, customer_identifier: order.customerIdentifier || null, items: order.items || [],
  subtotal: order.subtotal || 0, total: order.total || 0, status: order.status || 'pending', created_at: order.createdAt || new Date().toISOString()
}));

Promise.all([upsert('categories', categoryRows), upsert('products', productRows), upsert('orders', orderRows)])
  .then(() => console.log('Supabase migration complete.'))
  .catch(error => { console.error(error.message); process.exitCode = 1; });