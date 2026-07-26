# Array Creation — Four Ways to Create Arrays

## Overview

Covers `10_chapter_Arrays/66_Array_Creation.js` — demonstrates four methods of creating arrays in JavaScript: array literal, `new Array()` constructor, `Array.of()`, and `Array.from()`. Also highlights the confusing behaviour of `new Array(n)` with a single numeric argument.

---

## 1. Reference Code

```javascript
// Array literal (preferred)
let browsers = ["Chrome", "Firefox", "Safari"];

// Array constructor
let scores = new Array(3); // creates [empty x 3]
scores[0] = "1";
let scores2 = new Array(1, 2, 3); // creates [1, 2, 3]

let numbers = new Array(100, 200, 300, 400);

let test = Array.of(10, 20, 30, 40, 50);
console.log(test.length);

// Array.from()
let chars = Array.from("hello");
// ["h", "e", "l", "l", "o"]
```

---

## 2. The Four Methods

| Method | Example | Result | Notes |
|--------|---------|--------|-------|
| **Literal** | `["Chrome", "Firefox"]` | `["Chrome", "Firefox"]` | ✅ Preferred, most readable |
| **`new Array(n)`** | `new Array(3)` | `[empty × 3]` | ⚠️ Creates *holes*, not `undefined` values |
| **`new Array(v1, v2)`** | `new Array(1, 2, 3)` | `[1, 2, 3]` | Works, but avoid for clarity |
| **`Array.of()`** | `Array.of(10, 20, 30)` | `[10, 20, 30]` | Fixes the single-arg ambiguity |
| **`Array.from()`** | `Array.from("hello")` | `["h","e","l","l","o"]` | Converts iterables to arrays |

---

## 3. The `new Array(n)` Gotcha

```javascript
new Array(3)  // → [empty × 3]  — sparse array of length 3
new Array(1, 2, 3)  // → [1, 2, 3]  — array with 3 elements
```

One argument = length; two or more = elements. This ambiguity is why `Array.of()` exists:
```javascript
Array.of(3)  // → [3]  — always treats args as elements, never as length
```

---

## 4. Active Output

```
5
```

(`test.length` is the only `console.log` — `Array.of(10, 20, 30, 40, 50)` creates 5 elements.)

---

## Summary

**Key Takeaway:** Prefer array literals `[]` for clarity. Use `Array.from()` to convert iterables/strings to arrays. Avoid `new Array(n)` with a single number — use `Array.of(n)` instead to avoid the sparse-array trap.

**Related notes:** [[64_Array_IQ]], [[65_Array2_IQ]], [[67_Array_Access_Modifies_IQ]]
