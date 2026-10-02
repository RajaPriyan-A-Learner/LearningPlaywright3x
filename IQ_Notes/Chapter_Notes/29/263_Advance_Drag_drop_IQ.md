# 263_Advance_Drag_drop — Mouse Bounding-Box Drag Sequence

**File:** `29_Playwright/e2e_tests/10_Keyboard_Hover_Drag_Drop_Calender/263_Advance_Drag_drop.spec.ts`

## Overview
The TTA Kanban board listens to mouse coordinates more than HTML5 drag events. This spec reads `boundingBox()` for card and column, then `mouse.move` / `down` / `move({ steps: 10 })` / `up`.

---

## Main Concept
`boundingBox()` returns `{ x, y, width, height }` in CSS pixels, or `null` if hidden. The non-null assertion `!` matches this repo’s TypeScript style; production code should throw if the box is missing.

`steps: 10` interpolates intermediate points so hover-sensitive boards receive `mousemove` events instead of a teleport.

### Code Example

```javascript
const source = page.locator('#card-write-spec');
const sBox = (await source.boundingBox())!;
const target = page.locator('[data-status="in-progress"]');
const tBox = (await target.boundingBox())!;

await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
await page.mouse.down();
await page.mouse.move(tBox.x + tBox.width / 2, tBox.y + tBox.height / 2, { steps: 10 });
await page.mouse.up();
```

### Code Breakdown: `263_Advance_Drag_drop.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to a Kanban board widget demo.
*   `Line 7-8`: Locates the source card (`#card-write-spec`) and extracts its physical bounding box (`x`, `y`, `width`, `height`).
*   `Line 10-11`: Locates the target drop zone (`[data-status="in-progress"]`) and extracts its bounding box.
*   `Line 13-14`: Calculates the center of the source box, moves the mouse there, and presses the left mouse button (`down()`).
*   `Line 15-16`: Calculates the center of the target box, slowly moves the mouse there in `10` steps (to trigger drag-over events), and releases the button (`up()`).

**Why this approach was chosen:**
The coder chose to manually orchestrate the mouse events (`move`, `down`, `move`, `up`) because complex, JS-driven drag-and-drop libraries (like react-beautiful-dnd or SortableJS) often ignore standard HTML5 drag events. By moving the mouse in `{ steps: 10 }`, they give the browser's event loop time to fire `mousemove` and `mouseenter` events, allowing the Kanban board's physics engine to calculate insertion points correctly.

**Alternative Effective Way:**
Calculating the center of bounding boxes manually `(x + width / 2)` is verbose and prone to null-pointer errors if the element is off-screen.
An alternative effective way is to let Playwright handle the centering implicitly using locator-based mouse interactions:
```typescript
await source.hover();
await page.mouse.down();
await target.hover({ steps: 10 });
await page.mouse.up();
```
This is significantly more effective as `.hover()` automatically scrolls the element into view and places the cursor exactly in its center, removing the need for manual math.

### Key Points

- Center-of-box math (`x + width / 2`) hits the draggable handle.
- Low-level mouse bypasses some locator actionability; pair with a visible assertion after drop.
- `type Locator` import is required for the annotated variables.

---

## Common Mistakes

- Forgetting `steps`, so the library never sees dragover.
- Using `boundingBox()` before the card is visible (null box).
- Mixing this sequence with `dragTo` in the same test without a reload.

---

## Summary
**Key Takeaway:** When `dragTo` is ignored by a Kanban library, drive the pointer with bounding boxes and stepped `mouse.move`.
