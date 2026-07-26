# Increment — Pre-increment (`++a`) Trace Table

## Overview

Covers `09_chapter_Loops/54_Increment.js` — demonstrates pre-increment (`++a`) with a step-by-step trace table embedded in the comments. Shows that pre-increment mutates the variable before the expression is evaluated, so both `a` and the assigned `b` end up with the incremented value.

---

## 1. Reference Code

```javascript
let a = 10;
let b = ++a;
console.log(a);
console.log(b);

// Exp and Result Table
// Line No | a   | Result b
// 1       |  10 |  NA
// 2       |  11 |  11
// 3       | 11 - print | 11
// 4       | 11  | 11 - print
```

---

## 2. Trace Walkthrough

| Line | What happens | `a` | `b` |
|------|-------------|-----|-----|
| 1 | `let a = 10` — a is initialised | 10 | — |
| 2 | `++a` increments `a` to 11 first, then assigns that value to `b` | 11 | 11 |
| 3 | `console.log(a)` — prints 11 | 11 | 11 |
| 4 | `console.log(b)` — prints 11 | 11 | 11 |

**Output:** `11` then `11`.

---

## 3. Pre-increment vs Post-increment — The Key Difference

```javascript
let a = 10;
let b = a++;  // POST: b = 10, then a becomes 11
```

```javascript
let a = 10;
let b = ++a;  // PRE: a becomes 11 first, then b = 11
```

Use pre-increment (`++a`) when you need the new value immediately in the same expression. Use post-increment (`a++`) when the current value must be used before incrementing.

---

## Summary

**Key Takeaway:** `++a` (pre-increment) increments the variable before the expression is evaluated — both `a` and any variable assigned from it get the new value. This differs from `a++` (post-increment), where the old value is used in the expression first.

**Related notes:** [[53_For_Loop_IQ]], [[55_For_Loops2_IQ]]
