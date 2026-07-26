# Array Adding & Removing — push / pop / unshift / shift / splice

## Overview

Covers `10_chapter_Arrays/68_Array_adding_removing.js` — comprehensive walkthrough of the five core array mutation methods: `push`, `pop`, `unshift`, `shift`, and `splice`. Each is shown with console output to trace the array state at every step.

---

## 1. Reference Code

```javascript
let arr = [1, 2, 3];
console.log(arr);

// Add to END
arr.push(4);
console.log(arr);

// Remove from END
arr.pop();
console.log(arr);

arr.push(5, 6);
console.log(arr);

// Add to BEGINNING
arr.unshift(0);
console.log(arr);

// Remove from BEGINNING
arr.shift();
console.log(arr);

// [ 1, 2, 3, 5, 6 ]

arr.splice(2, 1);
console.log(arr);

arr.splice(2, 0, 99);
console.log(arr);

arr.splice(1, 2, 10, 20);
console.log(arr);
```

---

## 2. Step-by-Step State Trace

| Step | Operation | `arr` after |
|------|-----------|------------|
| Start | — | `[1, 2, 3]` |
| `push(4)` | Add 4 at end | `[1, 2, 3, 4]` |
| `pop()` | Remove last | `[1, 2, 3]` |
| `push(5, 6)` | Add 5, 6 at end | `[1, 2, 3, 5, 6]` |
| `unshift(0)` | Add 0 at start | `[0, 1, 2, 3, 5, 6]` |
| `shift()` | Remove first | `[1, 2, 3, 5, 6]` |
| `splice(2, 1)` | Remove 1 item at index 2 | `[1, 2, 5, 6]` |
| `splice(2, 0, 99)` | Insert 99 at index 2 (0 removed) | `[1, 2, 99, 5, 6]` |
| `splice(1, 2, 10, 20)` | Replace 2 items from index 1 with 10, 20 | `[1, 10, 20, 5, 6]` |

---

## 3. Method Cheat Sheet

| Method | Where | Adds/Removes | Returns |
|--------|-------|-------------|---------|
| `push(...items)` | End | Adds | New length |
| `pop()` | End | Removes | Removed element |
| `unshift(...items)` | Start | Adds | New length |
| `shift()` | Start | Removes | Removed element |
| `splice(start, deleteCount, ...items)` | Any index | Both | Array of removed items |

---

## 4. `splice` Signature

```
arr.splice(startIndex, deleteCount, item1, item2, ...)
```
- `deleteCount = 0` → pure insert, no removal
- No replacement items → pure removal
- With replacement items → remove and insert simultaneously

---

## Summary

**Key Takeaway:** `push`/`pop` work on the end; `unshift`/`shift` work on the start. `splice` is the Swiss army knife — it can remove, insert, or replace at any position. All five mutate the original array.

**Related notes:** [[67_Array_Access_Modifies_IQ]], [[69_Array_REAL_IQ]], [[70_Array_searching_IQ]]
