# 112_String_function — String Properties and Basic Access

**File:** `13_chapter_String/112_String_function.js`

## Overview
This file demonstrates how to access individual characters within a string and how to retrieve the overall length of the string.

## Main Concept
Strings in JavaScript behave similarly to arrays in that they are zero-indexed and have a `length` property. You can access specific characters using bracket notation or built-in methods like `charAt` and the modern `.at()` method.

### Code Example

```javascript
let str = "Hello, World!";

// Length
console.log(str.length); // 13

// Bracket Notation (Zero-indexed)
console.log(str[0]); // "H"

// Modern .at() method (Supports negative indices)
console.log(str.at(-1)); // "!" (last character)
console.log(str.at(-2)); // "d" 

// Legacy methods
console.log(str.charAt(0));      // "H"
console.log(str.charCodeAt(0));  // 72 (ASCII code for 'H')
```

### Key Points
- `str.length` returns the total number of characters, but indices go from `0` to `length - 1`.
- The newer `String.prototype.at()` method is highly recommended over bracket notation when you need to access elements from the end of the string, as `str[-1]` yields `undefined`, whereas `str.at(-1)` correctly yields the last character.

---

## Common Mistakes
- **Assuming str[-1] works like Python:** In JavaScript, bracket notation with negative numbers looks for a property named `"-1"` on the string object, returning `undefined`. You MUST use `.at(-1)` to get the last character.

---

## Summary
**Key Takeaway:** Access string characters via zero-based indices; use the `length` property for total size and the modern `.at()` method for elegant reverse indexing.
