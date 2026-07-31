import test from 'node:test'
import assert from 'node:assert/strict'
import { COMMTEX_TENANT_ID, mapArticle, mapCategory, mapProduct } from './commtex-migration-map.mjs'

const images = new Map([['/main.jpg', 'https://r2.example/main.jpg'], ['/detail.jpg', 'https://r2.example/detail.jpg']])

test('maps a product to the unified tenant schema', () => {
  const row = mapProduct({ slug: 'fabric-1', name: 'Fabric', articleNumber: 'A1', category: 'Wool Blend', mainImage: '/main.jpg', images: [{ src: '/detail.jpg', alt: 'Detail' }], specifications: [{ label: 'Width', value: '150 cm' }], features: [{ title: 'Feel', content: 'Soft' }], colorCategories: [] }, COMMTEX_TENANT_ID, images, 1)
  assert.equal(row.tenant_id, COMMTEX_TENANT_ID)
  assert.equal(row.category_slug, 'wool-blend')
  assert.equal(row.image_url, 'https://r2.example/main.jpg')
  assert.deepEqual(row.specs, { Width: '150 cm' })
})

test('maps article markdown and images without losing structure', () => {
  const row = mapArticle({ slug: 'guide', title: 'Guide', excerpt: 'Intro', content: '## Heading\n\nParagraph\n\n![image](0)', date: '2026-03-01', coverImage: '/main.jpg', images: [{ src: '/detail.jpg', alt: 'Detail' }] }, COMMTEX_TENANT_ID, images)
  assert.match(row.content, /<h2>Heading<\/h2>/)
  assert.match(row.content, /<p>Paragraph<\/p>/)
  assert.match(row.content, /https:\/\/r2\.example\/detail\.jpg/)
})

test('rejects foreign tenants and missing R2 assets', () => {
  assert.throws(() => mapCategory('Wool', 'wrong', 1), /foreign tenant/)
  assert.throws(() => mapProduct({ slug: 'x', name: 'X', category: 'Wool', mainImage: '/missing.jpg' }, COMMTEX_TENANT_ID, images, 1), /missing R2 image/)
})
