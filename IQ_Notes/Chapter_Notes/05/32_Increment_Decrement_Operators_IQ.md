# Increment / Decrement Operators — Pre vs Post

## Overview

Covers `05_chapter_Operator/32_In_De_Op.js` — the `++`/`--` operators, and the critical difference between their **prefix** (`++a`) and **postfix** (`a++`) forms: both increment the variable, but they evaluate to *different values* in the expression they're used in.

---

## 1. Reference Code

```javascript
// Pre Increment
// let a = 10;
// let b = ++a;
// console.log(b); // would print 11

// Post Increment
let a = 10;
let b = a++;
console.log(b); // 10   <-- NOT 11!
console.log(a); // 11 (a itself did get incremented — just not visible in this file's log)
```

---

## 2. Prefix (`++a`) vs Postfix (`a++`)

Both forms increment `a` by 1 as a side effect. They differ in **what value the expression itself evaluates to**:

| Form | Side effect | Expression evaluates to |
|---|---|---|
| `++a` (prefix) | `a` incremented first | the **new** (incremented) value |
| `a++` (postfix) | `a` incremented after | the **old** (pre-increment) value |

```javascript
let a = 10;
let b = ++a;   // a becomes 11 FIRST, then b = 11
console.log(a, b); // 11 11

let x = 10;
let y = x++;   // y = 10 FIRST (old value), THEN x becomes 11
console.log(x, y); // 11 10
```

This is exactly what the reference file demonstrates: `let b = a++;` assigns `b` the value `10` (what `a` was *before* incrementing), even though `a` itself is now `11` after the line runs.

---

## 3. Why This Trips People Up

The variable and the expression's value are **decoupled** in the postfix form — a very common interview trap and off-by-one source, especially inside loops or chained expressions:

```javascript
let i = 0;
console.log(i++); // logs 0, but i is now 1
console.log(i);   // logs 1

let j = 0;
console.log(++j); // logs 1 — j incremented before being read
console.log(j);   // logs 1
```

### Classic Gotcha: Using the Result and the Variable Together

```javascript
let arr = [10, 20, 30];
let i = 0;
console.log(arr[i++]); // reads arr[0] (10), THEN increments i to 1 — very common in array iteration
console.log(i);        // 1
```

This "use old value, then increment" behavior is precisely why `a[i++]` is such a common idiom for sequential array access — you get the current element *and* advance the index in one expression.

---

## 4. Same Rule Applies to `--`

```javascript
let n = 5;
console.log(n--);  // logs 5 (old value), n becomes 4
console.log(--n);  // n becomes 3 first, logs 3
```

---

## Summary

**Key Takeaway:** `++a`/`--a` (prefix) increment/decrement *then* return the new value; `a++`/`a--` (postfix) return the *old* value *then* increment/decrement. The variable's final value is the same either way — only what the surrounding expression sees differs. This is a distinct quirk from anything covered in [[JavaScript_Quirks_and_Known_Bugs_IQ]] so far and has been added there.

**Related notes:** [[13_Operators_IQ]], [[JavaScript_Quirks_and_Known_Bugs_IQ]]
