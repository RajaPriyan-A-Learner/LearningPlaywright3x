# 265_JS_Alerts — dialog Events for alert, confirm, and prompt

**File:** `29_Playwright/e2e_tests/11_JS_Alerts/265_JS_Alerts.spec.ts`

## Overview
Heroku’s javascript_alerts page exposes three native dialogs. The suite uses `test.describe` + `beforeEach` navigation, then `page.once('dialog', ...)` to accept an alert, accept a confirm, and type into a prompt.

---

## Main Concept
Browsers block the page until a dialog is handled. Playwright auto-dismisses unhandled dialogs, which fails tests that expected OK. Register `page.once('dialog')` **before** the click that opens the dialog.

`dialog.type()` is `'alert' | 'confirm' | 'prompt' | 'beforeunload'`. `accept(text)` supplies prompt input. Confirm test 2 correctly wires the listener first; test 1 clicks, then registers the listener, then pauses — that order is the anti-pattern.

### Code Example

```javascript
page.once('dialog', async (dialog) => {
  expect(dialog.type()).toBe('confirm');
  expect(dialog.message()).toBe('I am a JS Confirm');
  await dialog.accept();
});
await page.locator('button', { hasText: 'Click for JS Confirm' }).click();
await expect(page.locator('#result')).toHaveText('You clicked: Ok');

page.once('dialog', async (dialog) => {
  expect(dialog.type()).toBe('prompt');
  await dialog.accept('Hello from The Testing Academy');
});
await page.locator('button', { hasText: 'Click for JS Prompt' }).click();
```

### Code Breakdown: `265_JS_Alerts.spec.ts`

**Line-by-line Explanation:**
*   `Line 13-20` (Alert 1): The code *first* clicks a button to trigger a standard alert, and *then* sets up a `page.once('dialog', ...)` listener. Inside the listener, it asserts the message and calls `dialog.accept()`.
*   `Line 24-34` (Alert 2): The code correctly sets up the `page.once('dialog')` listener *before* clicking the button that triggers the confirm dialog. It asserts the dialog type (`confirm`) and message, accepts it, and then asserts a DOM element `#result` changed successfully.
*   `Line 46-54` (Alert 3): Similar to Alert 2, it registers the listener *before* triggering the prompt dialog. It asserts the type is `prompt`, checks for a default value, and passes a string `inputText` into `dialog.accept()` to simulate typing before submission.

**Why this approach was chosen:**
The coder demonstrated how Playwright intercepts native browser dialogs (which otherwise would block execution and cannot be inspected as DOM elements). They showed all three types of JS dialogs: `alert()`, `confirm()`, and `prompt()`. They intentionally set up a race condition in Alert 1 to show what *not* to do, then corrected it in Alerts 2 and 3 by placing the listener setup *before* the trigger action.

**Alternative Effective Way:**
The first test (Alert 1) has a critical race condition. If the click happens and the alert fires *before* the `once('dialog')` event loop ticks, the listener will miss the dialog and the test will hang forever.
An alternative effective way, to absolutely guarantee the listener catches the dialog, is to wrap the setup and the trigger in a `Promise.all`:
```typescript
const [dialog] = await Promise.all([
  page.waitForEvent('dialog'),
  page.getByRole('button', { name: "Click for JS Alert" }).click()
]);
expect(dialog.message()).toBe('I am a JS Alert');
await dialog.accept();
```
This is the most effective and resilient way to handle any asynchronous popup or dialog in Playwright, eliminating race conditions entirely.

### Key Points

- `once` handles a single dialog; `on` is for repeated alerts.
- `dismiss()` is the Cancel path for confirm/prompt.
- Assert `#result` with web-first `toHaveText`.

---

## Common Mistakes

- Clicking first, then attaching `dialog` (race; Playwright may already auto-dismiss).
- Forgetting `await dialog.accept()`.
- Using `page.on('dialog')` and leaking handlers across tests in the same worker.

---

## Summary
**Key Takeaway:** Subscribe to `dialog` before the triggering click, then `accept`/`dismiss` and assert the page result.
