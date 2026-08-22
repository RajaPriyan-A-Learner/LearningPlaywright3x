# 117_String_Conversion — Conversions and Immutability

**File:** `13_chapter_String/117_String_Conversion.js`

## Overview
This file covers converting numeric values to strings, converting strings to numbers (parsing), and highlights the core concept of string immutability in JavaScript.

## Main Concept
Data types in JavaScript can be coerced or explicitly converted. `toString()` converts numbers/booleans to strings. `parseInt()` and `parseFloat()` do the reverse. Crucially, primitive strings are completely immutable.

### Code Example

```javascript
// Converting to String
console.log((200).toString()); // "200"
console.log(true.toString());  // "true"

// Converting String to Number
console.log(Number("42"));     // 42
console.log(parseInt("42px")); // 42 (stops at 'p')
console.log(parseFloat("3.14rem")); // 3.14

// String Immutability
let str = "hello";
str[0] = "H"; // ❌ Silently fails, strings are immutable
console.log(str); // "hello"

let upper = str.toUpperCase(); // ✅ Returns a NEW string
console.log(str); // "hello"
console.log(upper); // "HELLO"
```

### Key Points
- `Number()` is strict; if the string has letters, it returns `NaN`. 
- `parseInt/parseFloat` are lenient; they parse until they hit a non-numeric character (great for CSS values like "42px").
- **Immutability:** You cannot change characters of a string using bracket notation (`str[0] = "H"`). You must reassign the variable to a new string.

---

## Common Mistakes
- **Trying to mutate strings:** Attempting to manipulate characters directly via indices (e.g., `str[1] = "x"`) is a classic bug. The operation fails silently, leaving the string unchanged.

---

## Summary
**Key Takeaway:** Use `parseInt`/`parseFloat` for scraping numbers out of UI text, and always remember that string methods return *new* strings because the original string can never be mutated.
