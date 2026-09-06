# 190 — Multi-Level Inheritance in Test Framework Modeling

**File:** `22_chapter_Inheritance/Multi Level Inheritance/190.js`

## Overview
This file demonstrates **Multi-Level Inheritance** in JavaScript, modeled through a 3-tier hierarchy: `BasePage -> AuthPage -> AdminPage`. Multi-level inheritance forms an inheritance chain where a child class inherits from a parent class, which in turn inherits from a grandparent class. This pattern is commonly used in test automation to build progressively specialized Page Object Models (e.g., General Page -> Authenticated Page -> Role-Specific Admin Page).

---

## Main Concept

In Multi-Level Inheritance, each derived class accumulates the methods and properties of every ancestor above it in the prototype chain.

### The Prototype Chain Hierarchy
- `BasePage` defines generic page capabilities (`open()`).
- `AuthPage extends BasePage` adds authentication behavior (`login(user)`).
- `AdminPage extends AuthPage` adds administrative permissions (`manageUsers()`).

Instances of `AdminPage` therefore possess access to `open()` (from `BasePage`), `login()` (from `AuthPage`), and `manageUsers()` (from `AdminPage`).

### Code Example

```javascript
// Grand Father -> Father -> Son
// BasePage -> AuthPage -> AdminPage

class BasePage {
    constructor(name) {
        this.name = name;
    }
    open() {
        console.log("[OPEN] " + this.name);
    }
}

class AuthPage extends BasePage {
    login(user) {
        console.log("[LOGIN] " + user);
    }
}

class AdminPage extends AuthPage {
    constructor() {
        super("Admin Panel");
    }

    manageUsers() {
        console.log("[ADMIN] Managing users");
    }
}

let admin = new AdminPage();
admin.open();        // [OPEN] Admin Panel (from BasePage)
admin.login("superadmin"); // [LOGIN] superadmin (from AuthPage)
admin.manageUsers(); // [ADMIN] Managing users (from AdminPage)
```

### Key Points
- **Constructor Delegation:** `AdminPage` calls `super("Admin Panel")`. Because `AuthPage` does not declare a custom constructor, JavaScript automatically delegates the `super()` call up to `BasePage`'s constructor.
- **`instanceof` Verification:** An `AdminPage` instance satisfies `admin instanceof AdminPage`, `admin instanceof AuthPage`, and `admin instanceof BasePage`.
- **Specialization Principle:** Ancestor classes hold universal logic; descendant classes layer on domain-specific capabilities.

---

## Common Mistakes
- **Excessively deep hierarchies:** Hierarchies deeper than 3-4 levels create fragile base classes where modifying `BasePage` might unexpectedly break downstream leaf classes.
- **Forgetting constructor forwarding:** If an intermediate class like `AuthPage` adds its own constructor without passing parent arguments via `super(name)`, parent initialization will fail.

---

## Summary
**Key Takeaway:** Multi-level inheritance creates a multi-tier prototype chain where leaf classes inherit behaviors from all upstream ancestors, providing progressive specialization for enterprise Page Object Models.
