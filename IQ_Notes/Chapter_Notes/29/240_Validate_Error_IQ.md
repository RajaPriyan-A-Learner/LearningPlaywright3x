# 240_Validate_Error — Form Error Message Validation in E2E Tests

**File:** `29_Playwright/e2e_tests/03_Locator_Commands/240_Validate_Error.spec.ts`

## Overview
This test demonstrates end-to-end validation of form error handling on the Wingify free trial page. It fills invalid email input, checks required checkboxes, submits the form, and verifies that the appropriate error message displays to the user.

---

## Main Concept

Error message validation is critical in QA testing to ensure applications provide meaningful user feedback. This test exercises a real-world scenario: navigating multi-step forms, handling invalid input, and asserting error states.

### Code Example

```typescript
import {test, expect} from '@playwright/test';

test('Validate the error for wingify app', async({page}) => {
    // Navigate to form
    await page.goto("https://wingify.com/free-trial/", {
        waitUntil: "domcontentloaded"
    });
    
    // Verify page load
    await expect(page).toHaveURL("https://wingify.com/free-trial/");
    
    // Fill form with invalid email
    await page.locator("//input[@class='WInput']").fill("abcded");
    
    // Click consent checkboxes
    await page.locator("//label[@for='free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox']/../input[2]").click();
    await page.locator("//label[@for='free-trial-step1-gdpr-consent-checkboxcu-gdpr-consent-checkbox']/../input[1]").click();
    
    // Click submit button
    await page.locator("//a[text()='Terms']//following::button[1]").nth(0).click();
    
    // Assert error message
    const errorMessage = page.locator("//input[contains(@class,'WInput')]//following::div[1]").nth(0);
    await expect(errorMessage).toHaveText("The email address you entered is incorrect.");
});
```

### Key Points

- **Invalid Email Submission:** Tests form behavior with malformed email ("abcded"), not a valid email format
- **GDPR Consent Workflow:** Demonstrates locating and checking multiple consent checkboxes via dynamic label-to-input navigation
- **Following Sibling Traversal:** Uses XPath `//following::` axis to locate submit button relative to Terms link
- **Error Element Selection:** Captures error message using sibling traversal from the input field
- **Assertion Pattern:** `expect(errorMessage).toHaveText()` validates exact error message text

---

## Common Mistakes

- **Fragile Selectors:** XPath with label-for navigation breaks if label text or checkbox IDs change
- **No Explicit Waits:** Assumes form submission is instant; real apps may delay error rendering
- **Hard-coded Strings:** Error message text in assertion will fail if messaging changes (i18n, updates)
- **Ignoring Tooltip/Loading States:** Form may show loading spinner before error appears
- **Not Verifying Input State:** Should check if invalid email is rejected at form validation layer

---

## Summary

**Key Takeaway:** Always validate both positive (success) and negative (error) user workflows in E2E tests. Test against real applications to catch subtle timing, selector, and UX issues early.
