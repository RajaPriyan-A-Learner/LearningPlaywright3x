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
