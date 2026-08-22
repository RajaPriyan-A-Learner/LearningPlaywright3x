# 108_Scope_function — Lexical Scope

**File:** `12_chapter_function_Closure/108_Scope_function.js`

## Overview
This file explores lexical scoping rules in JavaScript, showing how inner functions can access outer variables, but outer functions cannot access inner variables.

## Main Concept
JavaScript uses Lexical Scoping (also known as Static Scoping). This means a variable's scope is determined by its physical location within the source code. Inner scopes have access to outer scopes (all the way up to the global scope), but outer scopes cannot look inwards.

### Code Example

```javascript
let g_x = 10;

function outer() {
    let x = 10;

    function inner() {
        let y = 20;
        console.log(x);  // ✅ inner can access outer's 'x'
    }

    inner();
    // console.log(y); // ❌ ReferenceError: outer cannot access inner's 'y'
}
```

### Key Points
- Variables declared at the top level are in the **Global Scope**.
- Variables declared inside `{}` or functions are in **Local Scope**.
- The scope chain only works outwards. An inner function can reach out to grab `x`, but `outer()` cannot reach into `inner()` to grab `y`.

---

## Common Mistakes
- **Assuming sibling scope access:** Variables inside `inner()` are completely hidden from `outer()`. Trying to access `y` from `outer()` will crash the script with a ReferenceError.

---

## Summary
**Key Takeaway:** Lexical scoping allows inner functions to access outer variables, establishing a one-way scope chain from the innermost block outwards to the global scope.
