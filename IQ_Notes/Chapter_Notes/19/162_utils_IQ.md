# 162_utils — Exporting Multiple Utilities and Page Object Foundations

**File:** `19_chapter_Import_Export/162_utils.js`

## Overview
This file demonstrates exporting multiple related utility functions and constants, highlighting standard architectural patterns in automated testing like Page Object Models (POM) and test suite helpers.

---

## Main Concept
A single module can export multiple functions and variables representing a cohesive domain utility. For example, test automation frameworks typically group URL configuration, string transformers, locator helpers, and Page Object classes within dedicated utility modules.

### Code Example

```javascript
// Environment / Endpoint configuration
export let BASE_URL = "https://api.example.com";

// Test suite naming formatter
export function formatTestName(name) {
    return "TC_" + name.toUpperCase();
}

// Alternative formatter
export function formatTestName2(name) {
    return "TC_" + name.toUpperCase();
}

// Foundation for Page Object Model class export
// export class LoginPage {
//   constructor(page) { this.page = page; }
//   async login(u, p) { /* ... */ }
//   async openBrowser() { /* ... */ }
//   async closeBrowser() { /* ... */ }
//   async clickElement(selector) { /* ... */ }
// }
```

### Key Points
- Named exports scale seamlessly when modularizing large test repositories with dozens of helper utilities.
- Classes can be exported with `export class ClassName` or `export default class ClassName`.
- Automated testing frameworks like Playwright and Cypress leverage exported classes and fixture functions to implement clean Page Object Model patterns.

---

## Common Mistakes
- **Creating monolithic utility files:** Dumping unrelated utilities into one gigantic `utils.js` file harms maintainability and modular structure. Prefer domain-focused modules like `string_utils.js`, `api_utils.js`, and `auth_utils.js`.
- **Exporting mutable shared state:** Exporting mutable variables that get modified across tests can lead to flaky test runs due to shared state pollution.

---

## Summary
**Key Takeaway:** Exporting utility functions and POM classes establishes reusable, clean building blocks for scalable test automation architectures.
