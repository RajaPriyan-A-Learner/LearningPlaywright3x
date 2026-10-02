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

### Code Breakdown: `245_Multiple_Element.spec.ts`

**Line-by-line Explanation:**
*   `Line 5-7`: Navigates to a filter page. Uses `locator().allInnerTexts()` to extract the visible text of every `.list-group-item` link into a string array, and logs the count.
*   `Line 9-11`: Loops through the text array and prints each link's label.
*   `Line 13-17`: Loops through the text array again. If a label matches "Forgotten Password", it locates that text and clicks it. It uses `.first()` to bypass strict mode errors if multiple elements have that exact text.
*   `Line 19-22`: Uses `locator().all()` to get an array of raw Playwright `Locator` objects, then loops through them to extract and log each element's `href` attribute.
*   `Line 24`: Pauses execution for debugging.

**Why this approach was chosen:**
The coder chose to demonstrate the difference between bulk data extraction (`allInnerTexts`) and bulk object extraction (`all`). By extracting strings first, they can easily log or assert the UI state. By extracting locators later, they can interact with specific attributes (`getAttribute`) on a per-node basis.

**Alternative Effective Way:**
The loop on `Line 13-17` to find and click a specific element is inefficient because it manually iterates over strings just to trigger a click.
An alternative effective way is to use Playwright's built-in filtering mechanisms directly on the locator chain without looping:
```typescript
await page.locator('a.list-group-item')
          .filter({ hasText: 'Forgotten Password' })
          .first()
          .click();
```
This is significantly more effective as it performs the matching natively within the Playwright engine, executing much faster and with cleaner code.

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
