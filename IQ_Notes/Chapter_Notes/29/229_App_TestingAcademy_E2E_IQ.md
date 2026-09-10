# 229 — End-to-End Workflow: Form Inputs, Authentication & Dashboard Navigation

**File:** `29_Playwright/01_Playwright_Fundamentals/e2e_tests/app_testingacademy_test.spec.ts`

## Overview
This file tests a complete multi-step user journey on the Testing Academy portal: initiating authentication, filling input textboxes (`getByRole('textbox')`), triggering keyboard actions (`press('Enter')`), submitting verification tokens, interacting with dismissible modals and dialog buttons, and traversing dashboard tabs (`Programs`, `Projects`, `Practice`, `Interview`, `Cheat Sheet`, `AI Tools`, `Articles`, `Certification`) before logging out.

---

## Main Concept

End-to-End (E2E) test automation validates how real users experience full business workflows across multiple screens, inputs, and states.

### 1. Form Interaction & Typing Emulation
- `page.getByRole('textbox', { name: 'Email address' }).fill(email)` clears existing content and inputs text into the target element.
- `press('Enter')` dispatches realistic keyboard keydown, keypress, and keyup events to trigger form submission.

### 2. Modal & Dialog Dismissal Patterns
Modern SPAs frequently display onboarding overlays or announcement banners. Clicking modal buttons (`Dismiss`, `Close`) ensures the viewport is unobstructed before interacting with underlying dashboard navigation items.

### 3. Role-Based Navigation Traversal
- `page.getByRole('tab', { name: 'Programs' })` specifically targets accessibility tab controls.
- Traversing tabs sequentially tests client-side routing, DOM updates, and UI rendering integrity.

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Testing Academy Portal E2E Flow', () => {
  
  test('user authentication, dashboard navigation and logout flow', async ({ page }) => {
    // 1. Navigate to portal
    await page.goto('https://app.thetestingacademy.com/');

    // 2. Open login modal
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Input email address and trigger submission
    const emailInput = page.getByRole('textbox', { name: 'Email address' });
    await emailInput.fill('rajapriyan.krishnaswamy@gmail.com');
    await emailInput.press('Enter');

    // 4. Input verification code (e.g. 2FA / OTP token)
    const otpInput = page.getByRole('textbox', { name: 'Enter verification code' });
    await otpInput.fill('840052');

    // 5. Dismiss notification modals if present
    const dismissBtn = page.getByRole('button', { name: 'Dismiss' });
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click();
    }

    // 6. Navigate to enrolled course
    await page.getByRole('link', { name: 'Playwright Enrolled' }).click();

    const closeBtn = page.getByRole('button', { name: 'Close' });
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }

    // 7. Verify and traverse primary dashboard tabs
    const tabs = [
      'Programs', 'Projects', 'Practice', 'Interview', 
      'Cheat Sheet', 'AI Tools', 'Articles', 'Certification'
    ];

    for (const tabName of tabs) {
      const tab = page.getByRole('tab', { name: tabName });
      await tab.click();
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    }

    // 8. Logout
    await page.getByRole('button', { name: 'Logout' }).click();
  });

});
```

### Key Points
- **Actionability & Element Overlay Handling:** Playwright ensures buttons are clickable and not obscured by loader spinners before dispatching click events.
- **Handling Transient Modals:** Optional dialogs should be checked with `isVisible()` or handled through global event listeners.
- **Parametric Tab Iteration:** Looping through dashboard tab lists keeps test suites DRY while thoroughly asserting state changes.

---

## Common Mistakes
- **Redundant Consecutive Clicks:** Calling `click()` twice in a row on the exact same input element creates unnecessary network and execution overhead.
- **Hardcoding Static Timeouts:** Using `page.waitForTimeout(5000)` instead of waiting for specific locators (`await expect(locator).toBeVisible()`) introduces arbitrary latency and flaky failures.
- **Ignoring Navigation Assertions:** Simply clicking through buttons without verifying URL changes or DOM element presence fails to detect silent rendering errors.

---

## Summary
**Key Takeaway:** End-to-end user flows combine role-based inputs, keyboard triggers, modal handling, and tab assertions to test real-world user experiences end-to-end.
