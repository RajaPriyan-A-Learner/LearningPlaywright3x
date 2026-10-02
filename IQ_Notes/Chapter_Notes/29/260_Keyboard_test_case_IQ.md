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

### Code Breakdown: `260_Keyboard_test_case.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to a keycode testing utility site.
*   `Line 6-7`: Presses a single printable character (`A`) and immediately takes a screenshot to capture the page state.
*   `Line 9-10`: Presses a navigation key (`ArrowLeft`) and captures another screenshot.
*   `Line 13-14`: Simulates a keyboard shortcut by pressing multiple keys simultaneously using the `+` syntax (`Shift+O`), followed by a screenshot.
*   `Line 16-17`: Demonstrates granular key state control using `up("Shift")` to release a key, and `down("Shift")` to hold it.

**Why this approach was chosen:**
The coder utilized `page.keyboard` to trigger native OS-level keyboard events. This is chosen when the application logic listens globally to `keydown` or `keyup` events rather than just typed text inside a specific input field. Using `screenshot` after each press visualizes that the site successfully captured the global keystrokes.

**Alternative Effective Way:**
If the goal is to type text into a specific input box, using `page.keyboard.press()` in a loop is an anti-pattern.
An alternative effective way for filling inputs is using `locator.press()` or `locator.fill()` instead of the global `page.keyboard`:
```typescript
await page.locator('#search').pressSequentially('Hello', { delay: 100 });
await page.locator('#search').press('Enter');
```
This is much more effective for forms because it guarantees the specific element is focused before the keystrokes are emitted, avoiding flaky tests where global keys go missing.

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
