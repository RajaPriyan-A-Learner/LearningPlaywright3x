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

### Code Breakdown: `261_Hover_test_case.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to a Drag and Drop testing widget.
*   `Line 6-7`: Instantiates two locators: `columnA` (the source) and `columnB` (the target).
*   `Line 9`: Uses the high-level API `.dragTo(columnB, { force: true })` to execute the entire drag-and-drop sequence in one command.
*   `Line 11`: Pauses the execution.

**Why this approach was chosen:**
The coder chose `dragTo()` because it is Playwright's most convenient, abstraction-heavy method for HTML5 Drag and Drop operations. It automatically handles moving the mouse to the center of the source, pressing down, moving to the target, and releasing. They added `{ force: true }` likely to bypass Playwright's strict actionability checks if the element's bounding box is obscured or animating.

**Alternative Effective Way:**
Relying on `{ force: true }` is a "code smell" in UI testing because it means a real user might not be able to perform the action.
An alternative effective way is to fix the underlying visibility or animation issue by forcing the test to wait until the elements are stable, removing the need for `force`:
```typescript
await columnA.waitFor({ state: 'visible' });
await columnB.waitFor({ state: 'visible' });
await columnA.dragTo(columnB);
```
If the drag is a complex custom JS implementation (like SortableJS) rather than HTML5 drag-and-drop, `dragTo()` often fails, requiring manual mouse coordinate movements (as seen in later cases).

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
