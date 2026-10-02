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

### Code Breakdown: `254_Select_Testcase.spec.ts`

**Line-by-line Explanation:**
*   `Line 3-4`: Navigates to a standard test page containing native HTML dropdowns.
*   `Line 6`: Clicks the native `<select>` element (identified by `#dropdown`).
*   `Line 7`: Uses Playwright's native `selectOption` API to choose the option with the visible label or value "Option 2".
*   `Line 9`: Pauses the execution.

**Why this approach was chosen:**
The coder correctly chose `page.selectOption()` because the target element is a native HTML `<select>` tag. Playwright's `selectOption` automatically handles opening the native UI, selecting the correct `<option>`, and firing the necessary underlying JavaScript `change` and `input` events, which manual clicking often misses.

**Alternative Effective Way:**
Clicking the `<select>` element (`Line 6`) before calling `selectOption` is completely redundant for native dropdowns.
An alternative effective way is to skip the click entirely and immediately invoke `selectOption`:
```typescript
await page.goto("https://the-internet.herokuapp.com/dropdown");
await page.locator("#dropdown").selectOption({ label: "Option 2" });
```
This is more effective because it executes faster, utilizes the locator object directly, and explicitly defines whether it's selecting by `label`, `value`, or `index` to prevent ambiguity.

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
