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
