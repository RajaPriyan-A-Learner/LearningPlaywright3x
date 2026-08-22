# 113_String_Searching — String Searching and Checking Methods

**File:** `13_chapter_String/113_String_Searching.js`

## Overview
This file explores several built-in String methods used to check for the presence of substrings or to find their specific indices within a string.

## Main Concept
JavaScript strings provide multiple utility methods for searching. Modern ES6 methods like `includes()`, `startsWith()`, and `endsWith()` return booleans (true/false) and make code highly readable. Older methods like `indexOf()` and `lastIndexOf()` return the numeric index where the substring starts, or `-1` if it is not found.

### Code Example

```javascript
let url = "https://staging.vwo.com/api/login?retry=true";

// Boolean Checkers
console.log(url.includes("staging"));    // true
console.log(url.includes("production")); // false

console.log(url.startsWith("https"));    // true
console.log(url.endsWith("true"));       // true

// Index Checkers
console.log(url.indexOf("a"));           // 10 (first occurrence)
console.log(url.lastIndexOf("a"));       // 25 (last occurrence)
console.log(url.indexOf("nothere"));     // -1 (not found)
```

### Key Points
- `includes("str")` is the most direct way to check if a string contains a specific substring.
- `indexOf()` is useful when you need to know *where* the substring is, not just *if* it exists.
- Remember that `indexOf()` returns `-1` if missing. In older JS code, you often see `if (str.indexOf("x") !== -1)` used as a hack before `includes()` existed.

---

## Common Mistakes
- **Treating `indexOf` as a boolean:** `if (url.indexOf("https"))` will fail to execute the block if the string starts with "https", because `indexOf` returns `0`, which is a falsy value in JavaScript. Always explicitly check `!== -1` or `>= 0`.

---

## Summary
**Key Takeaway:** Use `includes`, `startsWith`, and `endsWith` for simple boolean truth checks, and reserve `indexOf` and `lastIndexOf` for when you specifically need the numeric position of a substring.
