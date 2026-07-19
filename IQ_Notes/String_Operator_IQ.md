# String Operator (`+`, `+=`) and `console.log` Argument Behavior

## Overview

Covers `05_chapter_Operator/21_String_Op.js` — string concatenation with `+`/`+=`, and how `console.log` handles multiple comma-separated arguments versus a single concatenated string.

---

## 1. Reference Code

```javascript
let s = "Hi, ";
console.log(typeof s);   // "string"
s += "Dev";
console.log(s);          // "Hi, Dev"

console.log("Hello" + "World");           // "HelloWorld"
console.log("HELLO", "Prrammod");         // HELLO Prrammod
console.log(1, 2, 3, 4, "Hello", true);   // 1 2 3 4 Hello true
```

---

## 2. String Concatenation with `+` and `+=`

`+` is overloaded in JS: it does numeric addition for numbers, but **string concatenation** when either operand is a string.

```javascript
let s = "Hi, ";
s += "Dev";   // shorthand for s = s + "Dev"
console.log(s); // "Hi, Dev"
```

No space is inserted automatically — `"Hello" + "World"` produces `"HelloWorld"`, not `"Hello World"`. Any spacing has to be included explicitly in the literal (as `s`'s trailing `", "` was here).

---

## 3. `console.log` with Multiple Arguments ≠ Concatenation

This is the detail worth internalizing: passing multiple comma-separated values to `console.log` is **not** the same as using `+`.

```javascript
console.log("HELLO", "Prrammod");        // prints: HELLO Prrammod  (space-joined, still two separate values)
console.log("Hello" + "Prrammod");       // prints: HelloPrrammod  (one concatenated string)
```

`console.log(a, b, c, ...)` accepts a variable number of arguments and prints each one space-separated — it doesn't coerce or concatenate them into a single string first. That's also why mixed types work without error:

```javascript
console.log(1, 2, 3, 4, "Hello", true); // 1 2 3 4 Hello true
```

No type coercion happens here because nothing is being combined with `+` — each argument is logged independently, in its own native representation.

---

## Summary

**Key Takeaway:** `+`/`+=` on strings concatenate (no automatic spacing); `console.log(a, b, c)` logs each argument separately, space-joined by the console itself, regardless of type — the two are easy to conflate but behave differently.

**Related notes:** [[Operators_IQ]]
