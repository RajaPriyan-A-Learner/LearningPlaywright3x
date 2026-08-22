# 97_Function_Hoisting — Function Scope and Hoisting

**File:** `11_chapter_Function/97_Function_Hoisting.js`

## Overview
This file demonstrates how `var` hoisting behaves specifically inside a function's local scope, confirming that `var` is function-scoped.

## Main Concept
When a `var` is declared inside a function, it is hoisted to the top of *that function's scope*, not to the global scope. Before the assignment happens inside the function, it evaluates to `undefined`.

### Code Example

```javascript
// Step 1 - Definition of functions
function getUserStatus(){
    // Behind the scenes:
    // var status_code = undefined; 

    console.log(status_code); // Outputs: undefined
    var status_code = "Active";
    console.log(status_code); // Outputs: "Active"
}

// Step 2 - Calling of the functions
getUserStatus();
```

### Key Points
- Variables declared with `var` inside a function are completely hidden from the outside world.
- The hoisting of `var` inside `getUserStatus` stops at the function boundary. It doesn't leak out to the global execution context.

---

## Common Mistakes
- **Expecting global hoisting:** A common error is assuming a `var` declared inside a function will be hoisted globally and accessible outside. It won't. It is strictly hoisted to the top of the function.

---

## Summary
**Key Takeaway:** `var` declarations inside a function are hoisted to the top of that specific function's scope, resulting in local `undefined` values before assignment.
