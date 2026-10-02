# 250_Test_case3 — locator.filter({ hasText }) on Link Lists

**File:** `29_Playwright/e2e_tests/07_WebTables/250_Test_case3.spec.ts`

## Overview
Despite living under WebTables, this spec teaches locator filtering on the multiple-element page. It clicks the Forgotten Password list item and asserts the footer Privacy Policy link’s `href`.

---

## Main Concept
`.filter({ hasText })` narrows a locator to descendants whose accessible or inner text matches. The outer locator stays lazy and strict: if two list items share the text, the click still throws.

Chaining `page.locator('footer a').filter({ hasText: 'Privacy Policy' })` scopes search to the footer so header duplicates cannot match.

### Code Example

```javascript
const forgottenPasswordLink = page
  .locator('a.list-group-item')
  .filter({ hasText: 'Forgotten Password' });
await forgottenPasswordLink.click();

const privacyLink = page.locator('footer a').filter({ hasText: 'Privacy Policy' });
await expect(privacyLink).toHaveAttribute('href', '#privacy-policy');
```

### Key Points

- `hasText` is substring by default; use `{ exact: true }` on `getByText` when you need a full string.
- Filter is the Playwright replacement for “find elements, then if text equals”.
- `toHaveAttribute` retries until the attribute matches.

---

## Common Mistakes

- Filtering the whole page with `getByText` and clicking the wrong duplicate.
- Using `hasText: 'Privacy'` when another footer link also contains that word.
- Clicking before the list finishes rendering; the locator itself auto-waits, `.count()` does not.

---

## Summary
**Key Takeaway:** `locator.filter({ hasText })` plus a parent scope is the idiomatic way to pick one item from a repeated CSS class.
