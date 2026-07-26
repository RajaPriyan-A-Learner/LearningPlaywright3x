# Array Access & Modify — Index, `.at()`, Mutation, and `.length`

## Overview

Covers `10_chapter_Arrays/67_Array_Access_Modifies.js` — demonstrates reading elements by positive index, using `.at()` with negative indexes (including out-of-bounds), mutating an element in-place, and reading `.length` after mutation.

---

## 1. Reference Code

```javascript
// Accessing & Modifying

let statuses = ["pass", "fail", "skip"];

console.log(statuses[0]);
console.log(statuses[2]);

console.log(statuses.at(-1));
console.log(statuses.at(-2));

console.log(statuses.at(-4));

// Modify
statuses[1] = "blocked";
console.log(statuses);

// Length
console.log(statuses.length);
```

---

## 2. Output

```
pass
skip
skip
fail
undefined
[ 'pass', 'blocked', 'skip' ]
3
```

---

## 3. `.at()` Negative Index Table

For `statuses = ["pass", "fail", "skip"]` (length 3):

| Call | Index formula | Resolved index | Result |
|------|--------------|----------------|--------|
| `.at(-1)` | 3 + (-1) = 2 | 2 | `"skip"` |
| `.at(-2)` | 3 + (-2) = 1 | 1 | `"fail"` |
| `.at(-4)` | 3 + (-4) = -1 | -1 (out of range) | `undefined` |

Negative offset beyond the array length → `undefined` (no error).

---

## 4. Mutating an Element

```javascript
statuses[1] = "blocked";
```

Arrays are **mutable** — you can overwrite any index directly. The array itself is the same reference; only the value at that index changes. After mutation: `["pass", "blocked", "skip"]`.

---

## 5. `.length` Does Not Change After Mutation

Replacing `statuses[1]` does not add or remove elements, so `length` stays `3`.

---

## Summary

**Key Takeaway:** Use `array[i]` to read/write by positive index; use `array.at(-n)` to count from the end. Direct assignment (`array[i] = value`) mutates in-place. Out-of-range `.at()` returns `undefined`.

**Related notes:** [[64_Array_IQ]], [[65_Array2_IQ]], [[68_Array_adding_removing_IQ]]
