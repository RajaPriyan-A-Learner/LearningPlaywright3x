# For Loop 2 — `<` vs `<=` and Custom Variable Names

## Overview

Covers `09_chapter_Loops/55_For_Loops2.js` — explores the difference between `<` and `<=` in the loop condition, and shows that any valid identifier (not just `i`) can be used as the loop counter. The final active version prints 1 through 10 inclusive.

---

## 1. Reference Code

```javascript
// for (let somya = 0; somya < 10; somya++) {
//     console.log(somya);
// }

// for (let somya = 0; somya <= 10; somya++) {
//     console.log(somya);
// }

for (let somya = 1; somya <= 10; somya++) {
    console.log(somya);
}
```

---

## 2. Three Variations Compared

| Version | Init | Condition | Output |
|---------|------|-----------|--------|
| Commented v1 | `somya = 0` | `somya < 10` | 0 – 9 (10 values, excludes 10) |
| Commented v2 | `somya = 0` | `somya <= 10` | 0 – 10 (11 values, includes 10) |
| **Active v3** | `somya = 1` | `somya <= 10` | **1 – 10** (10 values, human-friendly) |

---

## 3. `<` vs `<=` — Rule of Thumb

- **`< length`** — most common when iterating arrays (index 0 to length-1).
- **`<= max`** — use when you want to include the upper boundary (e.g., counting from 1 to N naturally).

The choice of `somya` as the counter name is valid JavaScript — identifiers don't have to be `i`, `j`, `k`. Using descriptive names can improve readability in non-trivial loops.

---

## Summary

**Key Takeaway:** `<` excludes the boundary value; `<=` includes it. Start the init at `1` (not `0`) when you want the output to naturally read as "1 to 10". Any valid identifier works as a loop counter.

**Related notes:** [[53_For_Loop_IQ]], [[56_For_Loops3_IQ]]
