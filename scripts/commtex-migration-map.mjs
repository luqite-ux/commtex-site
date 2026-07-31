export const COMMTEX_TENANT_ID = '1c89878a-5451-45eb-b4e6-c931795455bf'

const slugify = (value) => String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function requireTenant(tenantId) {
  if (tenantId !== COMMTEX_TENANT_ID) throw new Error('foreign tenant is not allowed')
}

function absoluteImage(path, imageMap) {
  if (!path) return null
  const url = imageMap.get(path)
  if (!url?.startsWith('https://')) throw new Error(`missing R2 image: ${path}`)
  return url
}

export function mapCategory(name, tenantId, sortOrder) {
  requireTenant(tenantId)
  return { tenant_id: tenantId, slug: slugify(name), name, name_en: name, name_i18n: { en: name }, sort_order: sortOrder, is_active: true }
}

export function mapProduct(product, tenantId, imageMap, sortOrder) {
  requireTenant(tenantId)
  if (!product?.slug) throw new Error('product slug is required')
  const description = (product.features || []).map((item) => item.content).filter(Boolean).join('\n\n')
  const images = (product.images || []).map((item) => ({ ...item, src: absoluteImage(item.src, imageMap) }))
  const colorCategories = (product.colorCategories || []).map((item) => ({ ...item, image: absoluteImage(item.image, imageMap) }))
  return {
    tenant_id: tenantId, slug: product.slug, name: product.name, name_en: product.name,
    name_i18n: { en: product.name }, description, description_en: description,
    description_i18n: { en: description }, category_slug: slugify(product.category),
    image_url: absoluteImage(product.mainImage, imageMap),
    specs: Object.fromEntries((product.specifications || []).map((item) => [item.label, item.value])),
    sort_order: sortOrder, is_active: true,
    extra_data: { article_number: product.articleNumber, category_name: product.category, images, features: product.features || [], color_categories: colorCategories },
  }
}

const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
export function markdownToHtml(value) {
  return String(value || '').split(/\n{2,}/).map((part) => {
    const text = part.trim()
    if (!text) return ''
    const heading = text.match(/^(#{2,3})\s+(.+)$/s)
    if (heading) return `<h${heading[1].length}>${escapeHtml(heading[2])}</h${heading[1].length}>`
    return `<p>${escapeHtml(text).replaceAll('\n', '<br>')}</p>`
  }).filter(Boolean).join('\n')
}

export function mapArticle(article, tenantId, imageMap) {
  requireTenant(tenantId)
  if (!article?.slug) throw new Error('article slug is required')
  const articleImages = (article.images || []).map((item) => ({ ...item, src: absoluteImage(item.src, imageMap) }))
  let content = markdownToHtml(article.content)
  content = content.replace(/<p>!\[image\]\((\d+)\)<\/p>/g, (_, index) => {
    const image = articleImages[Number(index)]
    return image ? `<figure><img src="${image.src}" alt="${escapeHtml(image.alt || article.title)}"><figcaption>${escapeHtml(image.caption || '')}</figcaption></figure>` : ''
  })
  return {
    tenant_id: tenantId, slug: article.slug, title: article.title, title_en: article.title,
    title_i18n: { en: article.title }, excerpt: article.excerpt, excerpt_en: article.excerpt,
    excerpt_i18n: { en: article.excerpt }, content, content_en: content, content_i18n: { en: content },
    featured_image: absoluteImage(article.coverImage, imageMap), is_published: true,
    published_at: new Date(article.date).toISOString(),
  }
}
