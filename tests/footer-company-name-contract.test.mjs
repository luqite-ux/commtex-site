import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

test('footer fallback has the selected Jiaxing company name', () => {
  const source = readFileSync(new URL('../lib/hooks/use-contact-settings.ts', import.meta.url), 'utf8')
  const footer = readFileSync(new URL('../components/footer.tsx', import.meta.url), 'utf8')
  assert.match(source, /FOOTER_COMPANY_NAME/)
  assert.match(source, /Jiaxing Companion Matrix Textile Technology Co\., Ltd\./)
  assert.match(footer, /FOOTER_COMPANY_NAME/)
  assert.doesNotMatch(footer, /Companion Matrix Textile Technology Co\., Ltd\. \$\{t\("footer\.copyright"\)\}/)
})
