# 260_Keyboard_test_case — page.keyboard.press, down, and up

**File:** `29_Playwright/e2e_tests/10_Keyboard_Hover_Drag_Drop_Calender/260_Keyboard_test_case.spec.ts`

## Overview
keycode.info displays the last key event. This spec presses `A`, `ArrowLeft`, and `Shift+O`, captures screenshots, then demonstrates holding and releasing Shift with `keyboard.down` / `keyboard.up`.

---

## Main Concept
`page.keyboard.press('A')` sends a full keydown + keyup. Modifier chords use `Shift+O` in one string. For held modifiers across several keys, call `down('Shift')`, press letters, then `up('Shift')`.

The spec’s last two lines reverse the usual order (`up` then `down`) and are exploratory, not a production pattern.

### Code Example

```javascript
await page.goto('https://keycode.info');
await page.keyboard.press('A');
await page.screenshot({ path: 'A.png' });
await page.keyboard.press('ArrowLeft');
await page.keyboard.press('Shift+O');
await page.keyboard.down('Shift');
await page.keyboard.press('A');
await page.keyboard.up('Shift');
```

### Key Points

- Focus must be on the page (or an input) or key events go nowhere useful.
- Chord syntax is `'Control+A'`, `'Meta+KeyK'`, platform-aware.
- Prefer `locator.press` when the key should target a specific field.

---

## Common Mistakes

- Calling `up` before `down` and wondering why Shift never latches.
- Writing screenshots into the repo root without `.gitignore`.
- Using `press('shift+o')` lowercase inconsistently across browsers.

---

## Summary
**Key Takeaway:** `press` is one-shot including chords; `down`/`up` hold modifiers across multiple keys.
