# 76_Array_Concat_IQ — concat(), Spread Operator, join()

**File:** `76_Array_Concat.js`

## Overview

Methods for combining arrays and converting arrays to strings. `concat()` and the spread operator combine arrays, while `join()` converts arrays into formatted strings.

## concat() — Combine Arrays (Non-Mutating)

`concat()` returns a **new array** merging the original and arguments, without mutating the original.

```javascript
let a = [1, 2];
let b = [3, 4];
let c = a.concat(b);
console.log(c);   // [1, 2, 3, 4]
console.log(a);   // [1, 2] — a unchanged
```

## Spread Operator `...` — Modern Alternative

`...` unpacks array elements, providing a more readable syntax:

```javascript
let a = [1, 2];
let b = [3, 4];
let d = [...a, ...b];  // [1, 2, 3, 4]
```

**Advantages:**
- More readable and familiar to ES6+ developers
- Can interleave elements: `[...a, 5, ...b]`
- Works with any iterable

## join() — Convert Array to String

`join()` concatenates all elements into a single string, inserting a separator between them.

```javascript
let s = ["pass", "fail", "skip"].join(" | ");
console.log(s);  // "pass | fail | skip"
```

- Default separator is `","` if omitted
- Calls `toString()` on each element
- Non-mutating

---

## Summary

Use `concat()` or spread `...` to combine arrays. Use `join()` to create a formatted string from array elements.
