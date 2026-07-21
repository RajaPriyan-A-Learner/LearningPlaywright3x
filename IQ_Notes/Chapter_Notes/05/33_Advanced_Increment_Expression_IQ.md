# Prefix Increment Combined with a Later Read (`++a + a`)

## Overview

Covers `05_chapter_Operator/33_Advance_Inc.js` — what happens when a variable is incremented with `++a` and then read *again* later in the **same expression**. Builds directly on [[32_Increment_Decrement_Operators_IQ]].

---

## 1. Reference Code

```javascript
let a = 10;
console.log(++a + a); // 22
console.log(a);        // 11
```

---

## 2. Step-by-Step Evaluation

JavaScript evaluates the operands of `+` **left to right**, and any side effect (like `++a` incrementing `a`) happens **immediately**, before the next operand is evaluated — not deferred to the end of the statement.

```javascript
let a = 10;

// Step 1: left operand `++a`
//   - a is incremented first: a becomes 11
//   - the expression `++a` evaluates to the NEW value: 11

// Step 2: right operand `a`
//   - a is read AGAIN, and by now it's already 11 (from step 1's side effect)
//   - evaluates to 11

// Step 3: sum
//   11 + 11 = 22
```

So `++a + a` is **not** "increment once, then add the old and new value" — it's "increment, then read the *already-updated* variable a second time." Both operands end up seeing `11` because the increment's side effect completed before the second `a` was ever read.

---

## 3. Why This Trips People Up

It's tempting to mentally read `++a + a` as "(a+1) + a" using the *original* `a = 10`, expecting `11 + 10 = 21`. That's wrong — the actual result is `22`, because the second `a` is read **after** the increment already happened, not from a frozen snapshot of the original value.

```javascript
let a = 10;
console.log(++a + a); // 22, NOT 21 — the second `a` sees the incremented value
console.log(a);        // 11 — only incremented once total
```

---

## Summary

**Key Takeaway:** Within a single expression, `++a`'s side effect (incrementing `a`) happens immediately at the point `++a` is evaluated — any later read of `a` in that same expression sees the already-updated value, not the original. See [[34_Increment_Multiple_Expressions_IQ]] for even more combinations of this same left-to-right, immediate-side-effect evaluation rule.

**Related notes:** [[32_Increment_Decrement_Operators_IQ]], [[JavaScript_Quirks_and_Known_Bugs_IQ]]
