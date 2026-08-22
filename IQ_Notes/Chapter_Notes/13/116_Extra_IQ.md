# 116_Extra — Splitting and Joining Strings

**File:** `13_chapter_String/116_Extra.js`

## Overview
This file explores how to break strings apart into arrays and how to fuse arrays back into strings.

## Main Concept
The `.split()` method is arguably the most powerful way to parse string data. It splits a string into an array of substrings based on a provided separator. Conversely, `.join()` on an array reconstructs a string.

### Code Example

```javascript
// Splitting
let csvData = "pass,fail,skip";
let statuses = csvData.split(","); 
console.log(statuses); // ["pass", "fail", "skip"]

// Splitting into individual characters
let chars = "hello".split(""); 
console.log(chars); // ["h", "e", "l", "l", "o"]

// Joining an array back into a string
let parts = ["2024", "03", "07"];
let date = parts.join("-");
console.log(date); // "2024-03-07"
```

### Key Points
- `split(",")` is perfect for parsing CSV rows or URL query parameters.
- `split("")` (with an empty string) will separate a string into an array of its individual characters.
- `.join(separator)` is an Array method, not a String method, but it is the direct counterpart to `.split()`.

---

## Common Mistakes
- **Splitting Emojis:** Using `split("")` on a string containing emojis can split the surrogate pairs of the emoji, resulting in broken/unreadable characters. (Modern approach: `[...str]`).

---

## Summary
**Key Takeaway:** The `.split()` and `.join()` methods are a powerful duo for converting strings to arrays (for complex manipulation) and then back to formatted strings.
