# IQ (Array) — find, findIndex, findLast, findLastIndex

## Overview

Covers `10_chapter_Arrays/71_IQ.js` — explores the four predicate-based array search methods: `find`, `findIndex`, `findLast`, and `findLastIndex`. Unlike `indexOf`, these accept a **callback function** (predicate) so you can search by any condition, not just exact equality.

---

## 1. Reference Code

```javascript
let nums = [10, 25, 30, 45];
let result = nums.find(temp => temp > 20);
console.log(result);

// findIndex
let index = nums.findIndex(n => n > 20);
console.log(index);

nums.findLast(n => n > 20); //  45
nums.findLastIndex(n => n > 20); // 3
```

---

## 2. Output

```
25
1
```

(`findLast` and `findLastIndex` results are not logged — values noted in comments.)

---

## 3. Method Reference Table

For `nums = [10, 25, 30, 45]`:

| Method | Callback | Searches | Returns | Result |
|--------|----------|---------|---------|--------|
| `find(n => n > 20)` | `temp => temp > 20` | Left → right | **First matching value** | `25` |
| `findIndex(n => n > 20)` | `n => n > 20` | Left → right | **First matching index** | `1` |
| `findLast(n => n > 20)` | `n => n > 20` | Right → left | **Last matching value** | `45` |
| `findLastIndex(n => n > 20)` | `n => n > 20` | Right → left | **Last matching index** | `3` |

---

## 4. `find` vs `indexOf`

| | `indexOf` | `find` |
|-|-----------|--------|
| Match type | **Exact value** (`===`) | Any **predicate/condition** |
| Use for | Simple equality | Complex conditions (e.g., `> 20`, `item.active === true`) |
| Returns | Index or -1 | Value or `undefined` |

---

## 5. Return When Not Found

- `find` → `undefined`
- `findIndex` → `-1`
- `findLast` → `undefined`
- `findLastIndex` → `-1`

Always check for `-1` / `undefined` before using the result.

---

## Summary

**Key Takeaway:** Use `find`/`findIndex` for condition-based searching (not just equality). `findLast`/`findLastIndex` search from the end. All four return `undefined` or `-1` when no match is found.

**Related notes:** [[70_Array_searching_IQ]], [[72_Array_iterate_IQ]]
