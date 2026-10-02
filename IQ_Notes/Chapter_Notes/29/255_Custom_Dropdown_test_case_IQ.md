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
