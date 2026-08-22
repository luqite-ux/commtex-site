import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
const source = readFileSync(new URL('../components/footer.tsx', import.meta.url), 'utf8')
test('blocked-name footer keeps its primary logo contained, responsive, and linked home', () => { assert.match(source, /<Link[\s\S]{0,500}<(?:Image|img)/); assert.match(source, /object-contain/); assert.match(source, /max-w-full/); assert.match(source, /aria-label=["'][^"']*home[^"']*["']/i) })
test('preferred contact fallback derives its copyright year at runtime', () => {
  const hook = readFileSync(new URL('../lib/hooks/use-contact-settings.ts', import.meta.url), 'utf8')
  assert.doesNotMatch(hook, /©\s*2024\b/)
  assert.match(hook, /new Date\(\)\.getFullYear\(\)/)
})
