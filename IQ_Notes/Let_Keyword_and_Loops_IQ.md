# The `let` Keyword in JavaScript

## Overview

`let` is a block-scoped variable declaration introduced in ES6 (2015). It replaced many of the pitfalls of `var`, especially around scoping inside loops and blocks. This note is based on `02_chapter_javascript/let_concept.js`.

---

## 1. Reference Code

```javascript
let a = 9;
console.log(a);

for (let i = 0; ; i++) {
    console.log(i);
    badCode();
}

function badCode() {
    console.log("This is a bad code");
}
```

---

## 2. Key Characteristics of `let`

- **Block-scoped** — a `let` variable only exists within the `{ }` block it's declared in, unlike `var` which is function-scoped.
- **Not hoisted the same way as `var`** — `let` variables exist in a "temporal dead zone" (TDZ) from the start of the block until their declaration is evaluated. Accessing them earlier throws a `ReferenceError`.
- **No re-declaration** in the same scope — declaring `let a` twice in the same block is a `SyntaxError`.
- **Re-assignable** — unlike `const`, the value can change after declaration.

```javascript
console.log(x); // ReferenceError (TDZ)
let x = 5;

let a = 9;
let a = 10; // SyntaxError: Identifier 'a' has already been declared
```

---

## 3. `let` Inside Loops — Per-Iteration Scoping

The most important interview-relevant behavior: `let` creates a **new binding for each loop iteration**, whereas `var` shares a single binding across all iterations.

```javascript
// var - single shared binding
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3 (all callbacks see the final value of i)

// let - new binding per iteration
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}
// Output: 0, 1, 2 (each callback captures its own i)
```

This is why `let` is the standard choice for loop counters in closures/async code.

---

## 4. Why the Loop in `let_concept.js` Runs Infinitely

A `for` loop has three parts: `for (init; condition; update)`.

```javascript
for (let i = 0; ; i++)
```

- `init`: `let i = 0`
- **`condition`: left empty**
- `update`: `i++`

When the condition slot is omitted, JavaScript treats it as always truthy — there is nothing to evaluate to `false`, so the loop never terminates. `i` keeps incrementing forever, and the loop body (`console.log(i)` and `badCode()`) keeps executing indefinitely.

### Fix

```javascript
for (let i = 0; i < 10; i++) {
    console.log(i);
    badCode();
}
```

Always ensure the condition expression can eventually evaluate to `false`.

---

## 5. `let` vs `var` vs `const` Summary

| Aspect | `var` | `let` | `const` |
|--------|-------|-------|---------|
| **Scope** | Function-scoped | Block-scoped | Block-scoped |
| **Hoisting** | Hoisted, initialized as `undefined` | Hoisted, but in TDZ | Hoisted, but in TDZ |
| **Re-declaration** | Allowed | Not allowed (same scope) | Not allowed (same scope) |
| **Re-assignment** | Allowed | Allowed | Not allowed |
| **Loop binding** | Shared across iterations | New binding per iteration | New binding per iteration (if used as counter) |

---

## Summary

**Key Takeaway:** `let` gives each block — and each loop iteration — its own variable binding, which fixes classic `var` closure bugs. But `let` doesn't protect you from logic errors like an empty loop condition; that's still on the developer to get right, as seen in the infinite loop in `let_concept.js`.
