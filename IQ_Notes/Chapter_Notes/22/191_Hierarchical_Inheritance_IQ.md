# 191 — Hierarchical Inheritance in JavaScript

**File:** `22_chapter_Inheritance/Hierarchical Inheritance/191.js`

## Overview
This file introduces **Hierarchical Inheritance** in JavaScript. In hierarchical inheritance, one single parent class acts as the common base for multiple independent child classes (`Son1`, `Son2`, `Son3`). In software architecture and test frameworks, this pattern models sibling classes (such as `LoginPage`, `CheckoutPage`, and `DashboardPage`) sharing common core infrastructure from a single `BasePage`.

---

## Main Concept

Hierarchical inheritance forms a tree-like hierarchy branching outward from a central ancestor:
```
         Father (BasePage)
       /        |        \
    Son1       Son2      Son3
(LoginPage) (CartPage) (ProfilePage)
```

Each child class extends `Father`, receiving all base methods and properties while remaining completely decoupled from its sibling classes.

### Code Example

```javascript
class Father {
    shareWisdom() {
        console.log("Common father knowledge");
    }
}

class Son1 extends Father {
    career() {
        console.log("Doctor");
    }
}

class Son2 extends Father {
    career() {
        console.log("Engineer");
    }
}

class Son3 extends Father {
    career() {
        console.log("Artist");
    }
}

const s1 = new Son1();
const s2 = new Son2();
const s3 = new Son3();

s1.shareWisdom(); // Inherited from Father
s1.career();      // "Doctor"

s2.shareWisdom(); // Inherited from Father
s2.career();      // "Engineer"

s3.shareWisdom(); // Inherited from Father
s3.career();      // "Artist"
```

### Key Points
- **Independent Siblings:** Changes to `Son1` do not affect `Son2` or `Son3`. They share common ancestry without coupling to each other.
- **Centralized Base Maintenance:** Any bugfix or enhancement in `Father` (e.g., adding a global wait helper or logging method) is immediately available to all sibling classes.
- **Polymorphic Interface:** Sibling classes can override base methods to provide specialized versions while honoring a shared public contract.

---

## Common Mistakes
- **Assuming siblings inherit from each other:** `Son1` cannot call methods defined on `Son2` or `Son3`. They share a parent, not each other's prototypes.
- **Overloading the base class with sibling-specific logic:** Putting checkout logic into `BasePage` pollutes `LoginPage`. Keep the shared base clean and general.

---

## Summary
**Key Takeaway:** Hierarchical inheritance links multiple distinct child classes to a single parent class, establishing shared base functionality while allowing independent child specialization.
