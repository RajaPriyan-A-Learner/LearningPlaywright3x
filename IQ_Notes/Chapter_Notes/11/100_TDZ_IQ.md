# 100_TDZ — Temporal Dead Zone Lifecycle

**File:** `11_chapter_Function/100_TDZ.js`

## Overview
This file breaks down the exact lifecycle of a `let` variable as it enters a block, demonstrating precisely where the Temporal Dead Zone begins and ends.

## Main Concept
When execution enters a block containing a `let` or `const` declaration, the variable is immediately created in memory, but it has no value (it is uninitialized). Any attempt to read or write to it during this period—the Temporal Dead Zone (TDZ)—throws an error.

### Code Example

```javascript
{
    // Enter Block -> 'a' is created in memory but uninitialized
    
    // console.log(a);  // ❌ ReferenceError (TDZ)
    
    let a = 10;         // ✅ TDZ ends here. 'a' is initialized to 10
}
```

### Key Points
- The TDZ starts at the very beginning of the block scope.
- The TDZ ends the moment the actual `let` or `const` declaration is executed.
- Accessing the variable before initialization throws a `ReferenceError`.

---

## Common Mistakes
- **Confusing TDZ with "not defined":** If you get a "not defined" error, the variable doesn't exist anywhere. A TDZ error specifically says "Cannot access 'a' before initialization", meaning the engine knows about the variable, but you're trying to use it too early.

---

## Summary
**Key Takeaway:** The Temporal Dead Zone is the period between the start of a block and the initialization of a `let` or `const` variable, designed to prevent the use of uninitialized data.
