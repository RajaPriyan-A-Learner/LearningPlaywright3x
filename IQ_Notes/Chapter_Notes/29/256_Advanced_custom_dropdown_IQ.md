# 256_Advanced_custom_dropdown — Searchable, Multi, Creatable, Async Selects

**File:** `29_Playwright/e2e_tests/08_Web_Select_Frames_Iframe/256_Advanced_custom_dropdown.spec.ts`

## Overview
This spec exercises four react-select-style widgets on `/playwright/tables/select-boxes`: single searchable, multi-chip, creatable tags, and async typeahead for cities.

---

## Main Concept
Each widget is a clickable container (`#rs-single`, `#rs-multi`, `#rs-creatable`, `#rs-async`). Options appear in a portal menu. Multi-select needs `Escape` to close the menu after chips are added so the next widget can receive clicks.

Async select: fill `#rs-async-input` with `'de'`, then assert the menu contains `Delhi` before clicking `getByRole('option', { name: 'Delhi', exact: true })`.

### Code Example

```javascript
await page.locator('#rs-single').click();
await page.getByText('Cypress').click();

await page.locator('#rs-multi').click();
await page.getByText('Pytest', { exact: true }).click();
await page.getByText('JUnit', { exact: true }).click();
await page.keyboard.press('Escape');

await page.locator('#rs-async').click();
await page.getByTestId('rs-async-input').fill('de');
await expect(page.getByTestId('rs-async-menu')).toContainText('Delhi');
await page.getByRole('option', { name: 'Delhi', exact: true }).click();
```

### Code Breakdown: `256_Advanced_custom_dropdown.spec.ts`

**Line-by-line Explanation:**
*   `Line 8-9`: Handles a standard searchable dropdown: clicks the container and clicks the visible text "Cypress".
*   `Line 12-15`: Handles a multi-select dropdown (chips): clicks the container, selects two exact options ("Pytest", "JUnit"), and then crucially presses the `Escape` key to force the menu overlay to close.
*   `Line 19-22`: Handles a creatable dropdown: clicks, selects options, and presses `Escape`.
*   `Line 28-31`: Handles an async dropdown: clicks the container, uses `fill('de')` on an internal input field to trigger an API search, waits for the specific text "Delhi" to appear in the menu (`toContainText`), and finally clicks the option.

**Why this approach was chosen:**
The coder chose this sequence to handle complex React-Select style widgets. They explicitly used `page.keyboard.press("Escape")` because in multi-selects, clicking an option usually leaves the dropdown menu open, which can intercept clicks meant for elements underneath it. For the async select, they correctly implemented an `expect().toContainText()` to force Playwright to wait for the network request to resolve and populate the DOM before attempting to click.

**Alternative Effective Way:**
Using `page.keyboard.press("Escape")` is functional but simulates a blunt global action.
An alternative effective way to close a multi-select without relying on global keyboard events is to click outside the menu, such as on the `<body>` or the next element directly, if the UI supports "click-away" to close:
```typescript
// Click the body to trigger onBlur and close the dropdown naturally
await page.locator('body').click(); 
```
However, the current `Escape` method is perfectly valid for testing keyboard accessibility.

### Key Points

- `exact: true` prevents “Java” vs “JavaScript”-style collisions in chip lists.
- Assert the async menu before clicking; network lag is why `toContainText` exists.
- `keyboard.press('Escape')` dismisses an open listbox.

---

## Common Mistakes

- Clicking the next combobox while the previous menu is still open (overlay intercepts).
- Filling async input without waiting for the fetched options.
- Using `selectOption` on div-based react-select.

---

## Summary
**Key Takeaway:** Advanced custom selects are click, type or choose options, Escape to close, and web-first asserts on async menus.
