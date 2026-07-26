# Array 2 — `length`, Out-of-Bounds, and Mixed-Type Arrays

## Overview

Covers `10_chapter_Arrays/65_Array2.js` — explores array `length`, what happens when you access an index beyond the array's bounds (returns `undefined`, not an error), and shows that JavaScript arrays can hold mixed types in a single array.

---

## 1. Reference Code

```javascript
let arr = [10, 20, 30, 40];
console.log(arr.length);
// 0 to 3
console.log(arr[4]); // undefined

let testResults = ["pass", "fail", "pass", "skip"];
let mixed = [1, "hello", true, null];
```

---

## 2. Output

```
4
undefined
```

(`testResults` and `mixed` are declared but not printed — no output for them.)

---

## 3. Key Concepts

### `array.length`
- Always equals the number of elements.
- For `arr = [10, 20, 30, 40]`: `arr.length` → `4`, valid indexes are `0` to `3`.

### Out-of-Bounds Access
- `arr[4]` → `undefined` (no error thrown).
- JavaScript never throws a RangeError for reading out-of-bounds — it silently returns `undefined`.
- This can cause silent bugs if you forget to check `arr.length` first.

### Mixed-Type Arrays
JavaScript arrays are **not typed** — they can hold any combination of values:
```javascript
let mixed = [1, "hello", true, null];
```
Types: number, string, boolean, null — all valid in one array.

---

## 4. The Comment: `// 0 to 3`

This is a reminder that for a 4-element array, valid indexes are **0, 1, 2, 3** — the last valid index is always `length - 1`.

---

## Summary

**Key Takeaway:** Accessing an index beyond `length - 1` returns `undefined` silently — no error. Always guard with `arr.length` when the index could be out of range. JS arrays can hold mixed types freely.

**Related notes:** [[64_Array_IQ]], [[66_Array_Creation_IQ]], [[67_Array_Access_Modifies_IQ]]
