# 242_getByRole_link — Semantic ARIA Link Locators in Playwright

**File:** `29_Playwright/e2e_tests/03_Locator_Commands/Playwright Locator Commands/242_getByRole_link.spec.ts`

## Overview
This test demonstrates targeting navigational elements using Playwright's `getByRole('link')` locator on the Katalon CURA Healthcare Service application (`https://katalon-demo-cura.herokuapp.com/`). It highlights how anchor tags and navigational buttons with link semantics can be identified reliably without coupling the test to CSS styling or brittle XPath hierarchies.

---

## Main Concept

In modern web development, call-to-action (CTA) buttons are frequently styled using CSS button classes (`.btn .btn-dark .btn-lg`) but rendered semantically as anchor tags (`<a href="./profile.php#login">`). 

Playwright's `getByRole('link')` queries the accessibility tree for elements that exhibit navigational link semantics:

```typescript
page.getByRole('link', { name: 'Make Appointment', exact: true })
```

This approach adheres to the user-first testing philosophy: real users look for clickable links with the text "Make Appointment", regardless of whether the element has an ID of `#btn-make-appointment` or a class of `.btn-theme`.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test("Verify navigation to appointment flow on CURA healthcare", async ({ page }) => {
    // Navigate to CURA demo home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Locate the primary action link via semantic ARIA role and exact text
    const mainButton = page.getByRole("link", { 
        name: "Make Appointment", 
        exact: true 
    });

    // Execute click with automated actionability verification
    await mainButton.click();

    // Verify successful navigation to login/appointment page
    await expect(page).toHaveURL(/.*login/);

    // Optional pause for visual inspection during test authoring
    await page.pause();
});
```

### Key Points

- **Semantic Role Disambiguation:** Differentiates navigational hyperlinks (`role="link"`, `<a>`) from stateful action buttons (`role="button"`, `<button>`).
- **Exact Accessible Name Matching:** `{ exact: true }` ensures that links with similar prefixes or sub-phrases do not violate strict mode.
- **Auto-Waiting on Actionability:** `click()` automatically verifies that the element is connected to the DOM, visible in viewport, stable (not animating), and un-obscured by sticky headers or loading overlays.
- **Lazy Evaluation:** Playwright locators re-evaluate upon dispatch, avoiding stale element exceptions even when single-page apps dynamically mount routes.

---

## Common Mistakes

- **Using `button` Role for Anchor Tags:** Attempting `getByRole('button', { name: 'Make Appointment' })` on an `<a>` tag that lacks `role="button"` will result in a timeout because the element's ARIA role is `link`.
- **Targeting Hidden Mobile Navigation Links:** If responsive designs render duplicate navigation bars (desktop vs. mobile drawer), an un-scoped `getByRole('link')` triggers strict mode violations. Solution: Scope within the active header or container.
- **Relying on Case-Sensitive Fragile XPath:** Using `//a[text()='Make Appointment']` fails if whitespace changes or CSS `text-transform: uppercase` is misunderstood.
- **Ignoring Navigation Completion:** Clicking a link that navigates should ideally be followed by web-first assertions like `await expect(page).toHaveURL(...)`.

---

## Summary

**Key Takeaway:** Always use `page.getByRole('link', { name, exact })` for navigational elements. It faithfully mimics real user intent, respects HTML5 semantic accessibility standards, and builds resilient E2E automation that survives UI design overhauls.
