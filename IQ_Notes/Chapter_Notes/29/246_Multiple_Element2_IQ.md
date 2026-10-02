# 246_Multiple_Element2 — Typed Locator Arrays and verbatimModuleSyntax

**File:** `29_Playwright/e2e_tests/06_Multiple_Element_Filter/246_Multiple_Element2.spec.ts`

## Overview
This follow-up spec types the result of `.all()` as `Locator[]` and logs each `href`. It is the TypeScript companion to 245: same list-group links, but the import must satisfy `verbatimModuleSyntax`.

---

## Main Concept
`Locator` is a type, not a runtime export. With `"verbatimModuleSyntax": true` in `tsconfig.json`, a value import would remain in emitted JavaScript and fail. Import it with `type Locator`. `test` and `expect` stay value imports because they exist at runtime.

`.all()` already returns `Promise<Locator[]>`, so the annotation is documentation, not inference help.

### Code Example

```javascript
import { test, expect, type Locator } from '@playwright/test';

test('Basic verify how to handle multiple elements ', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
  const rightPanelLinks: Locator[] = await page.locator('a.list-group-item').all();
  for (const link of rightPanelLinks) {
    console.log(await link.getAttribute('href'));
  }
});
```

### Key Points

- Use `type Locator` (or `import type { Locator }`) under verbatim module syntax.
- Prefer inferring `Locator[]` unless the annotation teaches a reader.
- `getAttribute` returns `string | null`; handle missing attributes in real asserts.

---

## Common Mistakes

- Writing `import { Locator }` and hitting TS1484.
- Mixing value and type names in one specifier without the `type` keyword on the type.
- Using `.all()` then treating items as `ElementHandle` snapshots from Puppeteer.

---

## Summary
**Key Takeaway:** Multi-element locators in TypeScript need type-only imports for `Locator` when `verbatimModuleSyntax` is on.
