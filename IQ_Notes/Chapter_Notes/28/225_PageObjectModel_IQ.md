# 225 — Protected Members and Encapsulation in Page Object Models

**File:** `28_chapter_access modifiers/225_PageObjectModel.ts`

## Overview
This file demonstrates the use of the **`protected` Access Modifier** in building enterprise **Page Object Models (POM)** using a `BasePage` and `LoginPage` hierarchy. It illustrates how internal navigation helpers (`navigate()`) and configuration base URLs (`baseURL`) are safely shared with concrete page subclasses while remaining hidden from test specification files.

---

## Main Concept

In the Page Object Model design pattern, tests should only interact with business-level actions (`page.login("admin")`), rather than low-level driver navigations (`page.navigate("/login")`).

### Protected Base Page Architecture
```typescript
class BasePage {
    protected baseURL: string;

    constructor(url: string) {
        this.baseURL = url;
    }

    protected navigate(path: string): void {
        console.log("Navigating to: " + this.baseURL + path);
    }
}
```
- `LoginPage extends BasePage` has full access to `this.baseURL` and `this.navigate()`.
- External test files creating `let page = new LoginPage()` cannot call `page.navigate(...)` or mutate `page.baseURL`.

### Code Example

```typescript
class BasePage {
    protected baseURL: string;

    constructor(url: string) {
        this.baseURL = url;
    }
    protected navigate(path: string): void {
        console.log("Navigating to: " + this.baseURL + path);
    }
}

class LoginPage extends BasePage {
    constructor() {
        super("https://app.staging.com");
    }

    login(user: string): void {
        this.navigate("/login"); // Allowed: navigate is protected
        console.log("Typing " + user + " into #username");
        console.log("Clicking #login-btn");
    }
}

let page = new LoginPage();
page.login("admin"); // Allowed: login is public

// ❌ TypeScript Prevents Test Scripts from Calling Internal Base Helpers:
// page.navigate("/secret"); // Error: Property 'navigate' is protected
// page.baseURL = "evil.com"; // Error: Property 'baseURL' is protected
```

### Key Points
- **Clean Test Abstractions:** Tests only see public page workflows, preventing tests from bypassing Page Object encapsulation.
- **Single Point of Navigation:** If browser navigation logic needs retry handlers or telemetry logging, updating `BasePage.prototype.navigate` enhances all page objects without breaking tests.
- **Hierarchy Security:** Subclasses inherit capabilities without exposing internal plumbing to outside consumers.

---

## Common Mistakes
- **Marking navigation methods as `private` in `BasePage`:** If `navigate()` were marked `private`, `LoginPage` would be unable to call `this.navigate("/login")`.
- **Exposing raw Playwright locators publicly:** Locators should ideally remain `private` or `protected` inside the page object, exposing public action methods instead.

---

## Summary
**Key Takeaway:** The `protected` modifier enables base Page Objects to share internal navigation and driver infrastructure with derived pages while keeping test scripts cleanly encapsulated.
