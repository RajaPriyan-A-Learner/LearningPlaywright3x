# Ternary (Conditional) Operator — Basics

## Overview

Covers `05_chapter_Operator/22_Ternary_Op.js` — the ternary operator `?:`, JavaScript's only operator that takes three operands, used as a compact `if/else` **expression**.

---

## 1. Reference Code

```javascript
let age = 20;
let is_pramod_will_go_to_goa = age > 18 ? "Yes" : "No";
console.log("This person can go goa ? ", is_pramod_will_go_to_goa); // "Yes"

// condition ? value(if true) : value(if false)
```

---

## 2. Syntax

```
condition ? expressionIfTrue : expressionIfFalse
```

- `condition` is evaluated for truthiness.
- If truthy, the whole expression evaluates to `expressionIfTrue`.
- If falsy, it evaluates to `expressionIfFalse`.

```javascript
let age = 20;
let result = age > 18 ? "Yes" : "No"; // "Yes", since 20 > 18
```

---

## 3. Ternary vs `if/else` — Expression vs Statement

The key distinction: `if/else` is a **statement** (controls flow, produces no value); the ternary is an **expression** (produces a value that can be assigned, returned, or passed as an argument directly).

```javascript
// if/else — needs a variable declared beforehand, then assigned inside each branch
let result;
if (age > 18) {
  result = "Yes";
} else {
  result = "No";
}

// ternary — the assignment IS the expression, one line
let result2 = age > 18 ? "Yes" : "No";
```

Ternaries shine for short, single-value conditional assignments; `if/else` is usually clearer once the branches contain multiple statements.

---

## Summary

**Key Takeaway:** The ternary operator `condition ? a : b` is a compact expression-form of `if/else` — useful for assigning one of two values based on a condition in a single line. See [[Nested_Ternary_Two_Level_IQ]] for what happens when ternaries are chained/nested, and [[Ternary_Redundant_Boolean_Antipattern_IQ]] for a common misuse to avoid.

**Related notes:** [[Operators_IQ]]
