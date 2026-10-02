# 245_Multiple_Element — Collecting and Acting on Locator Lists

**File:** `29_Playwright/e2e_tests/06_Multiple_Element_Filter/245_Multiple_Element.spec.ts`

## Overview
This spec shows how Playwright turns a multi-match locator into a list you can inspect or click. On the Testing Academy filter page it collects every `a.list-group-item`, logs each label, clicks the “Forgotten Password” entry by visible text, then reads each link’s `href`.

---

## Main Concept
`page.locator()` stays lazy until you ask for data. `.allInnerTexts()` waits for the first match, then returns every matching string. `.all()` returns an array of `Locator` objects so each node can still auto-wait on later actions.

Use `.first()` when `getByText()` would hit more than one node. That avoids Playwright strict-mode errors while you loop over snapshot text.

### Code Example

```javascript
const texts = await page.locator('a.list-group-item').allInnerTexts();
for (const linkText of texts) {
  if (linkText === 'Forgotten Password') {
    await page.getByText(linkText).first().click();
  }
}
const links = await page.locator('a.list-group-item').all();
for (const link of links) {
  console.log(await link.getAttribute('href'));
}
```

### Key Points

- `.allInnerTexts()` is for reading labels; `.all()` is for acting on each node.
- Looping over strings is cheap; looping over locators still retries per action.
- `.first()` is a disambiguation tool, not a replacement for a unique locator.

---

## Common Mistakes

- Treating `.all()` as a static DOM snapshot forever — later clicks can still re-query.
- Clicking `getByText(linkText)` without `.first()` when the same string appears twice.
- Leaving `page.pause()` in committed tests; it hangs CI waiting for the inspector.

---

## Summary
**Key Takeaway:** Split bulk reads (`allInnerTexts`) from bulk actions (`.all()` plus per-locator methods) so list pages stay strict-mode safe.
