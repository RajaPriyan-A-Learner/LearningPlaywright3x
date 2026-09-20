# 241_getByRole_textbox — Semantic ARIA Textbox Locators in Playwright

**File:** `29_Playwright/e2e_tests/03_Locator_Commands/Playwright Locator Commands/241_getByRole_textbox.spec.ts`

## Overview
This test demonstrates how to interact with form input fields using Playwright's accessibility-first `getByRole('textbox')` locator strategy on the Wingify login application (`https://app.wingify.com/#/login`). It emphasizes targeting inputs by accessible name and role rather than brittle CSS classes or arbitrary XPath expressions.

---

## Main Concept

Playwright prioritizes user-facing accessibility semantics. Instead of locating an input via implementation details like `<input id="login-username" class="form-control">`, Playwright queries the browser's Accessibility (ARIA) tree using:

```typescript
page.getByRole('textbox', { name: 'Email', exact: true })
```

This ensures tests emulate how real users and assistive technologies (such as screen readers) perceive and interact with inputs. The `{ exact: true }` option prevents strict-mode ambiguities when multiple inputs share partial labels (e.g., "Email" vs. "Confirm Email").

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test("Verify the error message in the wingify free trial", async ({ page }) => {
    // Navigate to Wingify login portal
    await page.goto("https://app.wingify.com/#/login");

    // Locate textbox inputs via semantic ARIA role and accessible name
    const username = page.getByRole("textbox", { name: "Email", exact: true });
    const password = page.getByRole("textbox", { name: "Password" });

    // Fill credentials with auto-waiting for editable and enabled state
    await username.fill('admin@vwo.com');
    await password.fill('1234');

    // Pause execution for live inspector debugging if needed
    await page.pause();
});
```

### Key Points

- **Semantic Role Matching:** `textbox` matches `<input type="text">`, `<input type="email">`, `<textarea>`, and elements with `role="textbox"`.
- **Accessible Name Resolution:** Playwright computes the name from `<label for="...">`, `aria-label`, `aria-labelledby`, or input placeholders.
- **Strict Mode Compliance:** Passing `{ exact: true }` ensures exact string matching, preventing multiple locator resolution errors in Playwright's strict mode.
- **Automatic Actionability Waiting:** `fill()` automatically checks that the input is attached, visible, stable, enabled, and editable before typing.

---

## Common Mistakes

- **Omitting `exact: true` on Common Names:** Locating `{ name: 'Email' }` can fail in strict mode if another element on the page is labeled "Business Email" or "Enter your Email".
- **Confusing Textbox Role with Non-text Inputs:** Password fields (`<input type="password">`) often expose a `textbox` role in ARIA, but some design systems or custom widgets might require `getByLabel('Password')`.
- **Hard-coding Arbitrary Sleeps:** Using `page.waitForTimeout()` instead of trusting Playwright's built-in auto-waiting mechanism on `fill()`.
- **Overusing `.nth()`:** Chaining `.nth(1)` masks underlying accessibility or locator specificity issues rather than refining the accessible name.

---

## Summary

**Key Takeaway:** `page.getByRole('textbox', { name, exact })` is the Tier S gold standard for text inputs in Playwright. It decouples automated tests from volatile DOM class names, prevents `StaleElementReferenceException` errors, and inherently enforces accessible HTML design in your application.
