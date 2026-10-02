# 262_Drag_Drop — HTML5 dragTo on the-internet

**File:** `29_Playwright/e2e_tests/10_Keyboard_Hover_Drag_Drop_Calender/262_Drag_Drop.spec.ts`

## Overview
Heroku’s `/drag_and_drop` page is the canonical HTML5 DnD demo. This spec drags `#column-a` onto `#column-b` with default `dragTo` (no force).

---

## Main Concept
Playwright dispatches a realistic pointer sequence. For native HTML5 drag events this is usually enough. After the drop, column headers typically swap (`A` moves to the second column).

Duplicate `page.pause()` at the end is accidental.

### Code Example

```javascript
await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
const columnA = page.locator('#column-a');
const columnB = page.locator('#column-b');
await columnA.dragTo(columnB);
await expect(columnB).toContainText('A');
```

### Code Breakdown: `262_Drag_Drop.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to the Heroku Drag and Drop page.
*   `Line 6-7`: Grabs the two columns, `columnA` and `columnB`.
*   `Line 9`: Executes the standard `await columnA.dragTo(columnB)` command.
*   `Line 10-12`: Contains multiple `page.pause()` commands.

**Why this approach was chosen:**
The coder chose this file to demonstrate the simplest possible invocation of `.dragTo()` without any options like `{ force: true }`. Since the Heroku demo uses standard, cleanly implemented HTML5 drag-and-drop events (`dragstart`, `dragenter`, `drop`), Playwright's native abstraction works perfectly out of the box.

**Alternative Effective Way:**
The test completely lacks any assertion to verify that the drag-and-drop actually succeeded (e.g., that the columns swapped their header text).
An alternative effective way is to explicitly assert the state change in the DOM after the drag operation completes:
```typescript
await columnA.dragTo(columnB);
await expect(columnA.locator('header')).toHaveText('B');
await expect(columnB.locator('header')).toHaveText('A');
```
This is effective because it closes the loop on the test—proving the drag was interpreted correctly by the application logic.

### Key Points

- Same locator ids as 261, different origin and event implementation.
- Assert text after drop; pause is not an assertion.
- If HTML5 events never fire, fall back to `page.evaluate` DataTransfer hacks or mouse steps (263).

---

## Common Mistakes

- Copying `{ force: true }` from the TTA board onto this page without need.
- Asserting `#column-a` still has `A` after a successful swap.
- Hover-only then expecting a drop.

---

## Summary
**Key Takeaway:** Native HTML5 columns usually work with plain `dragTo`; always assert the swapped header text.
