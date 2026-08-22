# 114_Extracting_String — Extracting Substrings

**File:** `13_chapter_String/114_Extracting_String.js`

## Overview
This file demonstrates how to extract portions of a string using the `slice()` and `substring()` methods, and how to access single characters with the modern `.at()` method.

## Main Concept
JavaScript strings are immutable, but you can extract parts of them to create new strings. The most robust method is `slice(start, end)`, which supports negative indices (counting backwards from the end of the string). 

### Code Example

```javascript
let str = "Login_Test_Pass_001";

// slice(start, end) — negative indexes supported ( start, end-1)
console.log(str.slice(0, 5)); // "Login"
console.log(str.slice(-3));   // "001" (Last 3 characters)

// substring(start, end) — NO negative support
console.log(str.substring(6, 10)); // "Test"

// .at() for single chars
console.log(str.at(-1)); // "1"
```

### Key Points
- `slice(start, end)` includes the `start` index but excludes the `end` index.
- If you omit the `end` parameter, `slice` will extract until the end of the string.
- `substring` behaves similarly but treats any negative index as `0`. 

---

## Common Mistakes
- **Using substring with negative numbers:** If you try `str.substring(-3)`, JavaScript treats it as `str.substring(0)`, returning the entire string instead of the last three characters! Always use `slice()` when you need negative indexing.

---

## Summary
**Key Takeaway:** Use `slice()` as your default method for extracting substrings, as it handles negative indexing predictably and safely.
