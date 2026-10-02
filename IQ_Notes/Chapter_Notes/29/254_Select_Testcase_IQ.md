# 254_Select_Testcase — Native HTML selectOption

**File:** `29_Playwright/e2e_tests/08_Web_Select_Frames_Iframe/254_Select_Testcase.spec.ts`

## Overview
This spec drives the classic Heroku `/dropdown` page: a real `<select id="dropdown">`. It clicks the control then selects “Option 2” via `selectOption`.

---

## Main Concept
Native `<select>` elements expose options in the accessibility tree. `locator.selectOption(label | value | index)` waits until the select is enabled, then sets the value and fires `change`/`input`.

Clicking the select first is optional for native widgets. Custom comboboxes (255–256) cannot use `selectOption` at all.

### Code Example

```javascript
await page.goto('https://the-internet.herokuapp.com/dropdown');
await page.locator('#dropdown').click();
await page.selectOption('#dropdown', 'Option 2');
await expect(page.locator('#dropdown')).toHaveValue('2');
```

### Key Points

- Pass the option’s `value` attribute or visible label; both work for this page.
- `page.selectOption(selector, values)` is shorthand for `page.locator(selector).selectOption`.
- Assert with `toHaveValue` rather than pausing.

---

## Common Mistakes

- Calling `selectOption` on a React/ARIA listbox that is not a `<select>`.
- Selecting by index `1` without realizing option 0 is “Please select”.
- Assuming click-open is required; Playwright can set native selects without opening the UI.

---

## Summary
**Key Takeaway:** Use `selectOption` only for real `<select>` elements; custom dropdowns need click + role/option locators.
