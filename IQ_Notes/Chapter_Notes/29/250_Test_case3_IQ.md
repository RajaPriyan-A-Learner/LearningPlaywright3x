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

### Code Breakdown: `250_Test_case3.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to the filter page.
*   `Line 6-8`: Targets all elements with the class `a.list-group-item` but chains the `.filter({ hasText: 'Forgotten Password' })` method to isolate the specific link, then clicks it.
*   `Line 10-13`: Targets all links (`a`) inside the `footer`, applies the `.filter({ hasText: 'Privacy Policy' })` method to isolate the correct link.
*   `Line 15`: Uses a web-first assertion to verify that the isolated privacy link contains the expected `href` attribute.

**Why this approach was chosen:**
The coder chose to use `.filter({ hasText: '...' })` to demonstrate how to elegantly handle elements that share the same generic CSS class. By scoping the second locator specifically to the `footer` (`page.locator('footer a')`), they restrict Playwright's search domain, ensuring it doesn't accidentally select a "Privacy Policy" link in the header.

**Alternative Effective Way:**
While `.filter({ hasText })` is powerful, it uses partial string matching by default, which can fail if multiple elements contain the word.
An alternative effective way is to use Playwright's native ARIA locators, which are less prone to breaking and automatically handle exact string matching if needed:
```typescript
const privacyLink = page.getByRole('link', { name: 'Privacy Policy', exact: true });
```
This is more effective because it completely avoids the need for generic CSS selectors (`footer a`) and makes the test strictly reflect the user experience.

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
