# 257_IFrame_Test_case1 — frameLocator Form Fill

**File:** `29_Playwright/e2e_tests/09_Frame_Iframe/257_IFrame_Test_case1.spec.ts`

## Overview
The vehicle registration form lives inside `#frame-one`. This spec uses `page.frameLocator` so every fill, select, and submit is scoped to that iframe instead of the host page.

---

## Main Concept
`page.locator('#RESULT_TextField-1')` on the parent document finds nothing. `page.frameLocator('#frame-one').locator(...)` pierces one iframe boundary and keeps auto-waiting.

`FrameLocator` is lazy like `Locator`. Import it with `type FrameLocator` under verbatim module syntax.

### Code Example

```javascript
const vehicleFrame = page.frameLocator('#frame-one');
await vehicleFrame.locator('#RESULT_TextField-1').fill('Hyundai i10');
await vehicleFrame.locator('#RESULT_TextField-2').fill('Pramod Dutta');
await vehicleFrame.locator('#RESULT_RadioButton-1').selectOption('Hatchback');
await vehicleFrame.getByText('Submit registration', { exact: true }).click();
const output = await vehicleFrame.locator('#vehicle-output').innerText();
```

### Code Breakdown: `257_IFrame_Test_case1.spec.ts`

**Line-by-line Explanation:**
*   `Line 5`: Declares a typed `FrameLocator` variable and assigns it to the iframe with ID `#frame-one` using `page.frameLocator()`.
*   `Line 7-10`: Uses the `vechileFrame` object to target and fill multiple text inputs (`#RESULT_TextField-1`, etc.) and select a radio button natively using `selectOption`.
*   `Line 14-16`: Fills a text area and clicks the submit button, all scoped strictly to the `vechileFrame`.
*   `Line 18-19`: Extracts the output text from a success element inside the iframe and logs it.

**Why this approach was chosen:**
The coder correctly identified that elements inside an `<iframe>` exist in a completely separate DOM from the main page. They chose to use `page.frameLocator()` instead of the older `page.frame()` because `FrameLocator` acts just like a standard `Locator`: it is lazy, it automatically waits for the iframe to load, and it automatically retries finding elements inside it.

**Alternative Effective Way:**
The code heavily repeats the `vechileFrame.locator(...)` boilerplate.
An alternative effective way, especially for long forms inside iframes, is to chain the locators dynamically or extract them to a Page Object, but if staying procedural, grouping actions can look cleaner:
```typescript
const frame = page.frameLocator("#frame-one");
await test.step('Fill Vehicle Form', async () => {
    await frame.locator('#RESULT_TextField-1').fill('Hyundai i10');
    await frame.locator('#RESULT_TextField-2').fill('Pramod Dutta');
    // ...
});
```
Using `test.step()` groups the iframe interactions in the test report, making it much easier to debug if an iframe locator fails.

### Key Points

- Prefer `frameLocator` over `page.frame()` for tests; it retries when the iframe is slow to attach.
- Child locators must hang off the frame, not `page`.
- `selectOption` still works for a `<select>` that lives inside the frame.

---

## Common Mistakes

- Filling fields on `page` and assuming iframe content is in the same DOM.
- Using `page.frames()[1]` by index — order changes with ads and nested frames.
- Value-importing `FrameLocator`.

---

## Summary
**Key Takeaway:** One iframe equals one `frameLocator`; all actions and assertions stay on that object.
