# `if/else` Statement — Basics

## Overview

Covers `06_chapter_Statement/37_IQ.js` — the standard `if/else` **statement** form of conditional logic, the block-based counterpart to the ternary **expression** covered in [[22_Ternary_Operator_Basics_IQ]].

---

## 1. Reference Code

```javascript
let age = 16;
if (age > 18) {
    console.log("Go Goa");
} else {
    console.log("Not Goa");
}
// "Not Goa" — 16 is not greater than 18
```

---

## 2. Syntax

```
if (condition) {
  // runs when condition is truthy
} else {
  // runs when condition is falsy
}
```

Unlike the ternary (`condition ? a : b`), `if/else` doesn't produce a value — it's purely about **which block of statements executes**. Each branch can contain multiple statements, side effects, further nested logic, etc., which a ternary branch technically can too but quickly becomes unreadable for anything beyond a single expression.

---

## 3. `if/else` vs Ternary — When to Use Which

| | `if/else` | Ternary (`? :`) |
|---|---|---|
| Produces a value? | No — it's a statement | Yes — it's an expression |
| Best for | Branching logic, multiple statements per branch, side effects | Assigning one of two values in a single line |
| Readability at scale | Better for complex/nested logic | Better for simple, single-value conditionals |

```javascript
// Ternary — good fit: single value, single line
let status = age > 18 ? "Adult" : "Minor";

// if/else — good fit: multiple actions per branch
if (age > 18) {
  console.log("Go Goa");
  bookFlight();
  sendConfirmation();
} else {
  console.log("Not Goa");
  logRejection();
}
```

---

## Summary

**Key Takeaway:** `if/else` is a statement that controls which block of code runs — it doesn't evaluate to a value the way a ternary does. Reach for `if/else` once a branch needs more than a single expression's worth of logic. See [[38_Nested_If_Else_Statement_IQ]] for nesting `if/else` blocks inside each other.

**Related notes:** [[22_Ternary_Operator_Basics_IQ]]
