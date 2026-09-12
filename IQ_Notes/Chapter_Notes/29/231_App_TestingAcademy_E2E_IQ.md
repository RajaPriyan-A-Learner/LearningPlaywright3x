# 231 — End-to-End Workflow: Form Inputs, Authentication & Dashboard Navigation

**File:** `29_Playwright/e2e_tests/01_Basics/231_app_testingacademy_test.spec.ts`

## Overview
This file demonstrates a comprehensive, real-world user journey across an authenticated web application. It automates navigating to the application root, clicking the login trigger, entering email credentials, submitting verification codes, dismissing modal notifications, accessing enrolled course programs, navigating diverse dashboard tabs, and safely logging out.

---

## Main Concept

End-to-End (E2E) testing validates that the integrated system—spanning user interface, API responses, authentication mechanisms, and state management—functions seamlessly from a user's perspective.

### Realistic User Journey Flow

```
┌──────────────┐      ┌─────────────┐      ┌────────────────────┐
│  Home Page   │ ───► │ Login Modal │ ───► │ OTP / Verification │
└──────────────┘      └─────────────┘      └────────────────────┘
                                                      │
                                                      ▼
┌──────────────┐      ┌─────────────┐      ┌────────────────────┐
│ User Logout  │ ◄─── │  Tab Swaps  │ ◄─── │ Enrolled Dashboard │
└──────────────┘      └─────────────┘      └────────────────────┘
```

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

test('complete user journey: login, verify, explore tabs, and logout', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/');
  
  // Step 1: Open login flow
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 2: Fill email input and submit
  const emailInput = page.getByRole('textbox', { name: 'Email address' });
  await emailInput.click();
  await emailInput.fill('rajapriyan.krishnaswamy@gmail.com');
  await emailInput.press('Enter');

  // Step 3: Enter verification code
  await page.getByRole('textbox', { name: 'Enter verification code' }).fill('840052');
  await page.getByRole('button', { name: 'Dismiss' }).click();

  // Step 4: Access enrolled learning course
  await page.getByRole('link', { name: 'Playwright Enrolled' }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  // Step 5: Navigate between dashboard navigation tabs
  const tabs = [
    'Programs', 'Projects', 'Practice', 'Interview',
    'Cheat Sheet', 'AI Tools', 'Articles', 'Certification'
  ];

  for (const tab of tabs) {
    await page.getByRole('tab', { name: tab }).click();
  }

  // Step 6: Log out
  await page.getByRole('button', { name: 'Logout' }).click();
});
```

### Key Points
- **Role-Based Tab Navigation:** Using `getByRole('tab', { name: tab })` tests against WAI-ARIA tab list specifications, guaranteeing accessibility compliance.
- **Keyboard Event Emulation:** `press('Enter')` simulates physical keypresses directly into the browser's input pipeline.
- **Modal Dismissal Handling:** Interacting with informational dialogs (`Dismiss`, `Close`) ensures subsequent element interactions are not blocked by modal backdrops.

---

## Common Mistakes
- **Hardcoding Sensitive Credentials in Test Files:** Committing plaintext passwords, OTPs, or API keys directly to Git repositories creates severe security vulnerabilities. Always use environment variables (`process.env.APP_PASSWORD`).
- **Ignoring Flaky Modals:** If a popup appears intermittently, subsequent clicks may be intercepted. Use proper conditional handlers or mock promotional popups.
- **Not Asserting Step Completions:** A test without assertions only verifies that pages do not throw fatal exceptions. Always add `expect(page).toHaveURL(...)` or `expect(element).toBeVisible()`.

---

## Summary
**Key Takeaway:** Real-world E2E test scripts validate end-to-end user workflows by combining accessibility locators, keyboard event dispatching, modal handling, and multi-tab state transitions.
