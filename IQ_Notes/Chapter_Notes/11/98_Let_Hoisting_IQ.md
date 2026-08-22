# 98_Let_Hoisting — Let and the Temporal Dead Zone

**File:** `11_chapter_Function/98_Let_Hoisting.js`

## Overview
This file contrasts `let` hoisting against `var` hoisting, illustrating the Temporal Dead Zone (TDZ) error that prevents using a variable before it is initialized.

## Main Concept
Variables declared with `let` (and `const`) *are* hoisted to the top of their block scope. However, unlike `var`, they are not initialized with `undefined`. They are placed in a "Temporal Dead Zone" (TDZ). Attempting to access them before the execution reaches their declaration line throws a `ReferenceError`.

### Code Example

```javascript
// Trying to access 'username' before initialization
console.log(username); // ❌ ReferenceError: Cannot access 'username' before initialization

let username = "Dutta";

console.log(username); // ✅ "Dutta"
```

### Key Points
- `let` declarations are hoisted, but remain inaccessible in the TDZ.
- The TDZ ends exactly on the line where `let username = "Dutta";` is evaluated.
- This is a deliberate language design choice in ES6 to catch errors early.

---

## Common Mistakes
- **Believing let is not hoisted:** Many developers mistakenly think `let` isn't hoisted at all because it throws an error. It *is* hoisted, which is why the engine knows it exists, but it blocks access due to the TDZ.

---

## Summary
**Key Takeaway:** `let` is hoisted but not initialized, placing it in a Temporal Dead Zone where any access prior to declaration throws a ReferenceError.
