# 94_Var_Let_Const_Function — Scope and Declarations

**File:** `11_chapter_Function/94_Var_Let_Const_Function.js`

## Overview
This file contrasts the scoping rules, re-declaration behaviors, and reassignment rules of `var`, `let`, and `const` inside functions and blocks.

## Main Concept
JavaScript handles variable scope differently depending on the keyword used. `var` is function-scoped (or globally scoped), meaning it ignores block boundaries like `if` statements. `let` and `const` are strictly block-scoped. Additionally, `const` prevents variable reassignment but does not make objects or arrays immutable.

### Code Example

```javascript
let b = 20; // Global Scope

function printHello() {
    let b = 30; // Local Scope shadows global
    if (true) {
        let b = 5; // Block scope shadows local
        console.log(b); // Prints 5
    }
    console.log("let ->", b); // Prints 30
}
printHello();

// var allows re-declaration, let does not
var a = 11;
var a = 100; // Allowed

const pi = 3.14;
// pi = 3.14159; // TypeError: Assignment to constant variable.

const arr = [1, 2, 3];
arr.push(10); // Allowed: The contents can be modified
```

### Key Points
- **Scope Leakage:** `var` ignores `{}` block boundaries. `let` and `const` respect them, which prevents bugs.
- **Shadowing:** A block-scoped variable with the same name as an outer variable will "shadow" it within that block.
- **Const Mutability:** `const` prevents reassignment of the variable binding, but properties of an object or elements of an array assigned to a `const` can still be mutated.

---

## Common Mistakes
- **Assuming const implies deep immutability:** Developers often think `const arr = []` means the array can't change. You can still use `.push()` or `.pop()`.
- **Leaking loop variables:** Using `var` in a `for` loop causes the variable to leak into the surrounding function scope.

---

## Summary
**Key Takeaway:** Always prefer `const` by default and `let` when reassignment is needed; avoid `var` completely to prevent scope leakage and accidental re-declarations.
