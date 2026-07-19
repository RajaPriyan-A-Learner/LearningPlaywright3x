# Nested Ternary — Two-Level Condition

## Overview

Covers `05_chapter_Operator/28_Nested_Ternary_Op.js` — a ternary placed *inside* another ternary's branch, to express a condition that depends on a second condition ("if A, then check B; otherwise C").

---

## 1. Reference Code

```javascript
// Multiple Condition
let age = 26;
//   age > 18 -> he will goa, else not else
// drink > 25  yes, else no
let is_pramod_enjoy = age > 18 ? (age > 26 ? "Drink" : "No") : false;
console.log(`Can pramod Drink? : ${is_pramod_enjoy}`); // "Can pramod Drink? : No"
```

---

## 2. How This Evaluates

Read it like a nested `if/else`:

```javascript
if (age > 18) {
  if (age > 26) {
    result = "Drink";
  } else {
    result = "No";
  }
} else {
  result = false;
}
```

With `age = 26`:
- `age > 18` → `true`, so evaluate the inner ternary.
- `age > 26` → `false` (26 is not *greater than* 26), so the result is `"No"`.

This is a common off-by-one trap: the author's intent ("25+ can drink") doesn't match the code's actual condition (`age > 26`, i.e., 27+) — worth double-checking boundary conditions (`>` vs `>=`) whenever a ternary encodes a business rule.

---

## 3. Mixed Return Types — A Readability Smell

Notice the three possible results are `"Drink"`, `"No"`, and `false` — two strings and a boolean. This works fine at runtime (JS doesn't enforce a single return type), but it's a **smell**: calling code has to handle three different types of "no," which invites bugs like `if (is_pramod_enjoy)` treating `"No"` (a truthy non-empty string!) the same as `"Drink"`.

```javascript
if (is_pramod_enjoy) {
  console.log("allowed"); // fires for BOTH "Drink" and "No" — "No" is a truthy string!
}
```

A safer version keeps the return type consistent:

```javascript
let canDrink = age > 18 && age > 26; // just a boolean
```

---

## 4. Parenthesizing the Nested Branch

```javascript
age > 18 ? (age > 26 ? "Drink" : "No") : false
```

The parentheses around the inner ternary aren't strictly required (the ternary operator is right-associative, so `a ? b ? c : d : e` parses the same way), but they make the nesting visually explicit — recommended once you have more than one level.

---

## Summary

**Key Takeaway:** Nesting a ternary inside another ternary's branch encodes "if A then (if B then C else D) else E" in one line — legal, but readability drops fast, and mixing return types (`string`/`boolean`) across branches is a common bug source once the result is used in a condition. See [[Nested_Ternary_HTTP_Status_Category_IQ]] and [[Nested_Ternary_Temperature_Scale_IQ]] for the "chained" nested-ternary style, which reads more like a switch/else-if ladder.

**Related notes:** [[Ternary_Operator_Basics_IQ]]
