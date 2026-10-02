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

### Code Breakdown: `246_Multiple_Element2.spec.ts`

**Line-by-line Explanation:**
*   `Line 1`: Imports `test`, `expect`, and importantly, the type `Locator`.
*   `Line 5`: Navigates to the multiple element filter page.
*   `Line 6`: Declares `rightPanelLinksTexts` explicitly as an array of `Locator` objects (`Locator[]`), and assigns it the result of `await page.locator('...').all()`.
*   `Line 7`: Logs the total count of locator elements found.
*   `Line 9-11`: Iterates through the typed `Locator[]` array and asynchronously extracts and logs the `href` attribute from each individual `Locator` node.
*   `Line 14`: Pauses execution for debugging.

**Why this approach was chosen:**
The coder chose to explicitly type the array as `Locator[]` to demonstrate how TypeScript handles Playwright objects. When `verbatimModuleSyntax` is enabled in `tsconfig.json`, types must be imported using the `type` keyword (`import { type Locator }`) so the compiler safely strips them out during the JavaScript build process.

**Alternative Effective Way:**
Since TypeScript is excellent at type inference, manually annotating the type `Locator[]` is technically redundant because `.all()` naturally returns `Promise<Locator[]>`.
An alternative effective way is to rely on implicit typing for cleaner code:
```typescript
const rightPanelLinks = await page.locator('a.list-group-item').all();
```
This is more effective because less boilerplate makes the test easier to read without losing any of the IDE intellisense benefits.

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
