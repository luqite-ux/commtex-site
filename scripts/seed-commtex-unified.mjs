import { readFileSync } from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'
import { createClient } from '@supabase/supabase-js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { COMMTEX_TENANT_ID, mapArticle, mapCategory, mapProduct } from './commtex-migration-map.mjs'

function loadExport(file, exportName) {
  const source = readFileSync(file, 'utf8')
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const context = { exports: {}, module: { exports: {} } }
  context.module.exports = context.exports
  vm.runInNewContext(code, context, { filename: file })
  return context.module.exports[exportName]
}

const mime = (file) => ({ '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' })[path.extname(file).toLowerCase()] || 'application/octet-stream'

async function main() {
  for (const key of ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'R2_S3_ENDPOINT', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME']) if (!process.env[key]) throw new Error(`missing ${key}`)
  const publicUrl = (process.env.R2_PUBLIC_URL || process.env.R2_PUBLIC_URL_PREFIX || process.env.NEXT_PUBLIC_R2_PUBLIC_URL_PREFIX || '').replace(/\/$/, '')
  if (!publicUrl.startsWith('https://')) throw new Error('missing R2 public URL')
  const root = path.resolve(import.meta.dirname, '..')
  const products = loadExport(path.join(root, 'lib/products-data.ts'), 'products')
  const articles = loadExport(path.join(root, 'lib/news-data.ts'), 'newsArticles')
  const referenced = new Set()
  for (const p of products) { referenced.add(p.mainImage); for (const x of p.images || []) referenced.add(x.src); for (const x of p.colorCategories || []) referenced.add(x.image) }
  for (const a of articles) { referenced.add(a.coverImage); for (const x of a.images || []) referenced.add(x.src) }
  const r2 = new S3Client({ region: 'auto', endpoint: process.env.R2_S3_ENDPOINT, requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } })
  const imageMap = new Map()
  let uploaded = 0
  for (const relative of [...referenced].filter(Boolean)) {
    if (!relative.startsWith('/images/')) throw new Error(`unexpected image path: ${relative}`)
    const file = path.join(root, 'public', ...relative.split('/').filter(Boolean))
    const body = readFileSync(file)
    const key = `products/${COMMTEX_TENANT_ID}/legacy/${relative.replace(/^\/images\//, '')}`
    await r2.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key, Body: body, ContentType: mime(file), CacheControl: 'public, max-age=31536000, immutable' }))
    imageMap.set(relative, `${publicUrl}/${key.split('/').map(encodeURIComponent).join('/')}`)
    uploaded += 1
  }
  const categoryNames = [...new Set(products.map((p) => p.category))]
  const categoryRows = categoryNames.map((name, index) => mapCategory(name, COMMTEX_TENANT_ID, index + 1))
  const productRows = products.map((p, index) => mapProduct(p, COMMTEX_TENANT_ID, imageMap, index + 1))
  const articleRows = articles.map((a) => mapArticle(a, COMMTEX_TENANT_ID, imageMap))
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  for (const [table, rows] of [['product_categories', categoryRows], ['products', productRows], ['articles', articleRows]]) {
    const { error } = await sb.from(table).upsert(rows, { onConflict: 'tenant_id,slug' })
    if (error) throw new Error(`${table}: ${error.message}`)
    const slugs = new Set(rows.map((row) => row.slug))
    const { data: existing, error: readError } = await sb.from(table).select('id,slug').eq('tenant_id', COMMTEX_TENANT_ID)
    if (readError) throw readError
    for (const row of existing || []) if (!slugs.has(row.slug)) { const { error: deleteError } = await sb.from(table).delete().eq('id', row.id).eq('tenant_id', COMMTEX_TENANT_ID); if (deleteError) throw deleteError }
  }
  console.log(JSON.stringify({ categories: categoryRows.length, products: productRows.length, articles: articleRows.length, images: imageMap.size, uploaded }))
}

main().catch((error) => { console.error(error.message); process.exit(1) })
