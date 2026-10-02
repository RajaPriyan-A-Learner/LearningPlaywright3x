# 255_Custom_Dropdown_test_case — ARIA Combobox Clicks

**File:** `29_Playwright/e2e_tests/08_Web_Select_Frames_Iframe/255_Custom_Dropdown_test_case.spec.ts`

## Overview
Testing Academy custom dropdowns are buttons plus option lists, not `<select>`. This spec opens the language trigger, picks JavaScript by role, then picks an exact experience label.

---

## Main Concept
`getByTestId('lang-trigger')` opens the list. `getByRole('option', { name: 'JavaScript' })` reads the accessibility tree the same way a screen reader does.

`getByText('Mid-level (4-6 years)', { exact: true })` avoids substring hits such as “Senior” vs “Mid-level”.

### Code Example

```javascript
await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns');
await page.getByTestId('lang-trigger').click();
await page.getByRole('option', { name: 'JavaScript' }).click();
await page.getByTestId('experience-trigger').click();
await page.getByText('Mid-level (4-6 years)', { exact: true }).click();
```

### Code Breakdown: `255_Custom_Dropdown_test_case.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to a custom dropdown testing page.
*   `Line 6-7`: Clicks a `data-testid` trigger to open the language dropdown, then explicitly locates and clicks the list item using `getByRole("option", { name:"JavaScript" })`.
*   `Line 11-12`: Clicks a different trigger to open the experience dropdown, and selects an item using `getByText("Mid-level (4-6 years)", { exact: true })`.

**Why this approach was chosen:**
The coder recognized that these are *custom* dropdowns (likely built with `<div>` and `<ul>`), not native `<select>` tags. Therefore, `selectOption` will fail. They chose a two-step approach: first simulating a human click to open the menu, then clicking the specific option. The use of `{ exact: true }` in `getByText` ensures it doesn't accidentally click a partial match (e.g., clicking "Senior" when looking for "Senior Manager").

**Alternative Effective Way:**
While `getByText` works for the second dropdown, it ignores the accessibility tree. The first approach (`getByRole`) is much stronger.
An alternative effective way is to always enforce ARIA roles for custom comboboxes to ensure both tests and screen-readers work identically:
```typescript
await page.getByTestId('experience-trigger').click();
await page.getByRole('option', { name: "Mid-level (4-6 years)", exact: true }).click();
```
This is more effective because it validates that the front-end developers correctly applied `role="option"` to the custom dropdown list items.

### Key Points

- Prefer `getByRole('option')` over `getByText` when the popup uses `role="option"`.
- Exact text matching stops overlapping career-level labels.
- Commented `getByText('JavaScript').first()` is the brittle fallback.

---

## Common Mistakes

- Using `selectOption` and wondering why nothing happens.
- Matching “Java” as a substring of “JavaScript”.
- Clicking the trigger twice and closing the menu before the option click.

---

## Summary
**Key Takeaway:** Custom dropdowns are open-trigger then choose `option`; never `selectOption`.
