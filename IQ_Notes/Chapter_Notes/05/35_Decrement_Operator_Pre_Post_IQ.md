# Decrement Operator — Pre vs Post

## Overview

Covers `05_chapter_Operator/35_Decrement.js` — the `--` operator, the exact mirror of `++` covered in [[32_Increment_Decrement_Operators_IQ]]: postfix (`a--`) returns the old value, prefix (`--a`) returns the new value.

---

## 1. Reference Code

```javascript
// let a = 10;
// let b = --a;
// console.log(b);
// console.log(a);

let a = 10;
let b = a--;
console.log(b); // 10  <-- old value
console.log(a); // 9   <-- a WAS decremented, just not reflected in b
```

---

## 2. Postfix Decrement (`a--`)

```javascript
let a = 10;
let b = a--; // b = 10 (value BEFORE decrementing), THEN a becomes 9
console.log(b); // 10
console.log(a); // 9
```

## 3. Prefix Decrement (`--a`) — the Commented-Out Alternative

```javascript
let a = 10;
let b = --a; // a becomes 9 FIRST, THEN b = 9
console.log(b); // 9
console.log(a); // 9
```

---

## 4. Side-by-Side

| Form | `b` gets | `a` after |
|---|---|---|
| `let b = a--;` | `10` (old) | `9` |
| `let b = --a;` | `9` (new) | `9` |

Both forms leave `a` at `9` — they only differ in what value gets assigned to `b`, exactly as with `++`/postfix covered in [[32_Increment_Decrement_Operators_IQ]].

---

## Summary

**Key Takeaway:** `--` behaves identically to `++` in terms of pre/post semantics — postfix (`a--`) hands back the old value before decrementing, prefix (`--a`) decrements first and hands back the new value.

**Related notes:** [[32_Increment_Decrement_Operators_IQ]], [[33_Advanced_Increment_Expression_IQ]]
