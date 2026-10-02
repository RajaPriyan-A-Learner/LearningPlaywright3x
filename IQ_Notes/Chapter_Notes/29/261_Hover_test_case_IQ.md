# 261_Hover_test_case — dragTo with force on a Custom Board

**File:** `29_Playwright/e2e_tests/10_Keyboard_Hover_Drag_Drop_Calender/261_Hover_test_case.spec.ts`

## Overview
The file name says hover; the body drags `#column-a` onto `#column-b` on the Testing Academy DnD widgets page using `dragTo({ force: true })`.

---

## Main Concept
`source.dragTo(target)` performs hover, mouse down, move, and mouse up with actionability checks. `{ force: true }` skips some checks (stable, receives events) when a library’s hit-testing disagrees with Playwright.

Use force only after a normal `dragTo` fails against overlays or synthetic HTML5 listeners.

### Code Example

```javascript
await page.goto('https://app.thetestingacademy.com/playwright/widgets/dnd');
const columnA = page.locator('#column-a');
const columnB = page.locator('#column-b');
await columnA.dragTo(columnB, { force: true });
```

### Key Points

- `dragTo` is the high-level API; 263 shows the low-level mouse equivalent.
- `force: true` can click through interceptors — it can also hide real bugs.
- Assert column text swap after the drop instead of `page.pause()`.

---

## Common Mistakes

- Assuming the filename describes the API (`hover()` is never called here).
- Using `force` as the default on every drag.
- Dragging CSS ids that exist on Heroku (`262`) while pointed at the TTA URL.

---

## Summary
**Key Takeaway:** Prefer `locator.dragTo(target)`; add `{ force: true }` only when custom DnD stacks block actionability.
