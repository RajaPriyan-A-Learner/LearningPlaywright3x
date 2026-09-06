# 212 — Interface Inheritance and Page Object Architecture

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/212_Interface_PageObjects.ts`

## Overview
This file demonstrates **Interface Inheritance** (`extends`) in TypeScript applied to the **Page Object Model (POM)**. It models a common base interface (`BasePage`) extended by specialized pages (`LoginPage`, `FreeTrailPage`), enforcing that all pages share common navigation properties while defining page-specific locator selectors.

---

## Main Concept

Interfaces can extend other interfaces using the `extends` keyword, copying member declarations and building a hierarchical contract. This avoids code duplication and ensures all page definitions share foundational fields like `url` and `title`.

### Interface Hierarchy
- `BasePage`: Defines universal page attributes (`url`, `title`).
- `LoginPage extends BasePage`: Adds login-specific selectors (`usernameSelector`, `passwordSelector`, `loginButtonSelector`).
- `FreeTrailPage extends BasePage`: Adds registration-specific selectors (`usernameSelector`, `submitButtonSelector`).

### Code Example

```typescript
interface BasePage {
    url: string;
    title: string;
}

interface LoginPage extends BasePage {
    usernameSelector: string;
    passwordSelector: string;
    loginButtonSelector: string;
}

interface FreeTrailPage extends BasePage {
    usernameSelector: string;
    submitButtonSelector: string;
}

let loginPage: LoginPage = {
    url: "/login",
    title: "Login Page",
    usernameSelector: "#username",
    passwordSelector: "#password",
    loginButtonSelector: "#login-btn"
};

let freeTrialPage: FreeTrailPage = {
    url: "/free-trial",
    title: "Free Page",
    usernameSelector: "#username",
    submitButtonSelector: "#submit",
};

console.log("URL:", loginPage.url);
console.log("Title:", loginPage.title);
console.log("Username field:", loginPage.usernameSelector);
```

### Key Points
- **Multiple Interface Inheritance:** An interface can extend multiple parent interfaces: `interface AdminPage extends BasePage, SecurePage, AuditablePage`.
- **Structural Polymorphism:** Any function accepting `page: BasePage` can accept `loginPage` or `freeTrialPage` because both satisfy `BasePage`'s structural requirements.
- **Maintainable Locators:** Centralizing selectors in strongly-typed interfaces eliminates fragile raw selector strings scattered across test cases.

---

## Common Mistakes
- **Redeclaring inherited properties with incompatible types:** If `BasePage` defines `url: string`, a child interface cannot redeclare `url: number`.
- **Typos in locator keys:** Strong typing catches misspelled selectors (`submitBtnSelector` vs `submitButtonSelector`) at compile time.

---

## Summary
**Key Takeaway:** Interface inheritance (`extends`) builds structured hierarchies for Page Object Models, combining shared base page properties with specialized page selectors.
