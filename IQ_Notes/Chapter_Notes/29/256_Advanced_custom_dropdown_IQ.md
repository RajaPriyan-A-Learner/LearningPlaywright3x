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
