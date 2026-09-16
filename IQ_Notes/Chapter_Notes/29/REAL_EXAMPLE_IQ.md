# REAL_EXAMPLE — Real-World E2E Login & Appointment Test

**File:** `29_Playwright/e2e_tests/03_Locator_Commands/REAL_EXAMPLE.spec.ts`

## Overview

This test demonstrates a complete end-to-end workflow for logging into Katalon's demo CURA appointment booking system. It combines multiple locator strategies, form interactions, and assertions to validate the login flow and verify successful navigation to the appointment booking page. The test showcases best practices for interacting with real-world web applications, including navigation, input value extraction, form submission, and assertion validation.

---

## Main Concept

Real-world Playwright tests often need to interact with multiple page elements using different locator strategies (ID selectors, placeholder text, etc.) and perform sequential operations like navigation, form filling, and submission. This test exemplifies a complete user journey: accessing the application, extracting pre-filled credentials from a login form, authenticating with those credentials, and verifying successful authentication by checking the appointment booking page header.

### Code Example

```javascript
import {test,expect} from '@playwright/test';

test('Login to the herokuapp',async ({page})=>{
    // Navigate to the application with explicit wait condition
    await page.goto("https://katalon-demo-cura.herokuapp.com/",{
        waitUntil: "domcontentloaded"
    });
    
    // Click button to navigate to login page
    await page.locator("#btn-make-appointment").click();
    
    // Extract pre-filled credentials from the login form
    let username=await page.getByPlaceholder('Username').first().inputValue();
    let password=await page.getByPlaceholder('Password').first().inputValue();
    
    // Fill username and password fields using different locator strategies
    await page.locator('#txt-username').fill(username);
    await page.locator('#txt-password').fill(password);
    
    // Submit the login form
    await page.locator('#btn-login').click();
    
    // Assert successful login by verifying header text
    const makeAppointmentHeader = page.locator('#appointment h2');
    await expect(makeAppointmentHeader).toHaveText("Make Appointment");
});
```

### Key Points

- **Mixed Locator Strategies:** The test combines ID selectors (`#txt-username`), placeholder text (`getByPlaceholder`), and descendant selectors (`#appointment h2`) to handle different HTML structures
- **Input Value Extraction:** Uses `inputValue()` to retrieve pre-filled values from form inputs before submitting, common when forms contain default credentials for demo purposes
- **Navigation Flow:** Demonstrates page traversal across multiple views (home → login → appointment booking)
- **Wait Conditions:** Uses `waitUntil: "domcontentloaded"` to ensure the page has loaded before interacting with elements
- **Assertion at End:** Validates test success through assertion of expected header text rather than just checking if navigation occurred
- **Locator Reuse:** Stores locator references in variables (`makeAppointmentHeader`) for assertions when elements need to be verified

---

## Common Mistakes

- **Not extracting credentials dynamically:** Hardcoding username/password violates DRY principle; always extract from the page if available
- **Skipping wait conditions on navigation:** Without `waitUntil` or explicit waits, tests may interact with elements before the page has fully loaded
- **Mixing locator strategies without documentation:** When a single form uses both IDs and placeholder text, unclear variable names lead to maintenance issues
- **Asserting navigation instead of page content:** Checking URL or page title is weaker than asserting actual business-domain content (like "Make Appointment" header)
- **Not handling multiple matching elements:** Using `.first()` when `getByPlaceholder` matches multiple inputs is necessary but can hide design issues

---

## Summary

**Key Takeaway:** Real-world E2E tests must combine multiple locator strategies, extract dynamic data, and assert on business-critical page content to validate complete user journeys. The test demonstrates a production-ready pattern: navigate → interact → extract → fill → submit → verify, handling both structural variations in HTML and dynamic pre-filled values.
