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
