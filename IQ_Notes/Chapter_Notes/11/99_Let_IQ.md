# 99_Let — Block Scoping and TDZ Shadowing

**File:** `11_chapter_Function/99_Let.js`

## Overview
This file demonstrates how the Temporal Dead Zone (TDZ) works in a block scope when shadowing an outer global variable. 

## Main Concept
When you declare a `var` globally and then declare a `var` or `let` with the same name inside a block (`if (true) { ... }`), the inner declaration shadows the outer one. If the inner declaration is `let` (or if it's `var` trying to be used before declaration), the block scope takes precedence.

### Code Example

```javascript
var a = "Pramod";

if(true){
    // The engine sees `var a = "temp"` below, hoisting it to the top of the function/global scope.
    // Wait, in this exact code, it is a `var` shadowing a `var`.
    console.log(a); // prints "Pramod" (if `var`), or throws TDZ if inner was `let a`.
    var a = "temp";
}

// NOTE: If the inner declaration was `let a = "temp";`, the console.log(a) would throw a ReferenceError 
// because the block-scoped `let a` would be hoisted to the top of the `if` block, shadowing the global "Pramod".
```

### Key Points
- A `let` inside a block immediately takes ownership of that variable name for the entire block. 
- Even if a global variable exists with the same name, accessing it inside the block before the `let` declaration results in a TDZ ReferenceError.

---

## Common Mistakes
- **Assuming fallback to global:** Developers often assume that if a block-scoped `let` hasn't been initialized yet, calling that variable name will fall back to the global variable. It does not; the block-scoped `let` intercepts the reference and throws a TDZ error.

---

## Summary
**Key Takeaway:** Block-scoped variables shadow outer variables of the same name for the entire block; accessing them before initialization triggers the Temporal Dead Zone.
