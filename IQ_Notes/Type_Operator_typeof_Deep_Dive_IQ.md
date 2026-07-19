# The `typeof` Operator — Deep Dive

## Overview

Covers `05_chapter_Operator/31_Type_Op.js` — a focused look at `typeof` across primitives and arrays, reinforcing the array/object quirk already flagged in [[Literals_and_Numbers_IQ]] and [[Operators_IQ]].

---

## 1. Reference Code

```javascript
console.log(typeof "hello");   // "string"
console.log(typeof 123);       // "number"   (int -> number)
console.log(typeof 31.4);      // "number"   (float -> number)
// typeof true                 // "boolean"
// typeof undefined            // "undefined"
// typeof null                 // "object"  <-- quirk
console.log(typeof []);        // "object"
```

---

## 2. `typeof` Result Reference Table

| Expression | Result | Note |
|---|---|---|
| `typeof "hello"` | `"string"` | |
| `typeof 123` | `"number"` | int and float share one type |
| `typeof 31.4` | `"number"` | same as above — no separate `float` type |
| `typeof true` | `"boolean"` | |
| `typeof undefined` | `"undefined"` | |
| `typeof null` | `"object"` | historic bug, see [[Null_vs_Undefined]] |
| `typeof []` | `"object"` | arrays are objects, not their own type |
| `typeof {}` | `"object"` | |
| `typeof function(){}` | `"function"` | the one exception — functions get their own typeof result despite being objects |
| `typeof Symbol()` | `"symbol"` | |
| `typeof 10n` | `"bigint"` | see [[Literals_and_Numbers_IQ]] |

---

## 3. Why `typeof []` Is `"object"`, Not `"array"`

Arrays are just objects with numeric keys, a `length` property, and `Array.prototype` methods bolted on — `typeof` only distinguishes at the level of "primitive vs. object vs. function," and arrays fall on the object side of that line. This is why `typeof` alone can't tell an array apart from a plain object:

```javascript
console.log(typeof []);           // "object"
console.log(typeof {});           // "object" — same result!
```

**Correct way to check for an array:**

```javascript
Array.isArray([]);        // true  — the reliable check
[] instanceof Array;      // true  — works, but fails across different realms (iframes, workers)
typeof [] === "object";   // true, but tells you nothing array-specific
```

---

## Summary

**Key Takeaway:** `typeof` distinguishes primitives (`string`, `number`, `boolean`, `undefined`, `bigint`, `symbol`) from everything else, which all report `"object"` — except functions, which get their own `"function"` result despite technically being callable objects. Never use `typeof` to detect arrays; use `Array.isArray()`.

**Related notes:** [[Literals_and_Numbers_IQ]], [[Operators_IQ]], [[Null_vs_Undefined]], [[JavaScript_Quirks_and_Known_Bugs_IQ]]
