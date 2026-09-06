# ex5 — Multi-Tier Super Delegation and Method Call Chains

**File:** `24_chapter_OOPS_Interview/ex5.JS`

## Overview
This file demonstrates **Multi-Tier Super Method Delegation** across a 3-level class hierarchy: `class C extends B`, where `class B extends A`. It explores how `super.who()` resolves methods up the prototype chain sequentially, concatenating string results across every inheritance layer to produce `"C>B>A"`.

---

## Main Concept

The `super` keyword inside a method allows a child class to call the parent class's version of that method. When chained across multiple levels of inheritance, each class can augment the result of its parent, establishing a bottom-up delegation chain.

### The Resolution Chain
1. `new C().who()` is called.
2. `C.prototype.who()` executes: `"C>" + super.who()`.
3. `super.who()` resolves to `B.prototype.who()`.
4. `B.prototype.who()` executes: `"B>" + super.who()`.
5. `super.who()` resolves to `A.prototype.who()`.
6. `A.prototype.who()` returns `"A"`.
7. Unwinding produces: `"C>" + ("B>" + "A")` = `"C>B>A"`.

### Code Example

```javascript
class A { 
    who() { 
        return "A"; 
    } 
}

class B extends A { 
    who() { 
        return "B>" + super.who(); 
    } 
}

class C extends B { 
    who() { 
        return "C>" + super.who(); 
    } 
}

console.log(new C().who()); // Output: "C>B>A"
```

### Key Points
- **Static Binding of `super`:** The target of `super` is bound statically when the class is defined (based on `[[HomeObject]]`), while `this` remains dynamically bound to the calling instance `new C()`.
- **Hierarchical Enrichment:** Useful in test automation for cascading breadcrumb trails, hierarchical logging, or accumulating configuration parameters across base and derived pages.
- **Predictable Execution:** Each level controls when and how the ancestor method is called—before, after, or combined with child logic.

---

## Common Mistakes
- **Skipping a level with `super.super`:** JavaScript does NOT support `super.super.method()`. You can only access the immediate superclass's method; the superclass must delegate further if needed.
- **Infinite recursion:** Writing `this.who()` instead of `super.who()` inside `C.prototype.who()` causes infinite recursion (`RangeError: Maximum call stack size exceeded`).

---

## Summary
**Key Takeaway:** Calling `super.method()` across multi-tier inheritance structures executes ancestor methods sequentially, allowing derived classes to systematically layer behaviors on top of base logic.
