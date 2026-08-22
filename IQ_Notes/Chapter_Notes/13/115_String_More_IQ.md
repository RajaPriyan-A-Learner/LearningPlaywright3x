# 115_String_More — Transformation and Replacement

**File:** `13_chapter_String/115_String_More.js`

## Overview
This file covers standard string transformations including casing (`toUpperCase`, `toLowerCase`), whitespace trimming, string replacements, and concatenation.

## Main Concept
Data cleansing is a massive part of QA automation. Strings often have trailing spaces or mixed casing. Methods like `trim()`, `replace()`, and `toUpperCase()` allow you to normalize data before performing assertions. 

### Code Example

```javascript
let str = "  Hello, World!  ";

// Trimming
console.log(str.trim()); // "Hello, World!"

// Replace vs ReplaceAll
let msg = "Test: FAIL. Retry: FAIL.";
console.log(msg.replace("FAIL", "PASS"));    // "Test: PASS. Retry: FAIL." (First only)
console.log(msg.replaceAll("FAIL", "PASS")); // "Test: PASS. Retry: PASS." (All)

// Regex replacement
console.log(msg.replace(/FAIL/g, "PASS"));   // "Test: PASS. Retry: PASS."

// Concatenation
console.log(`${"Hello"} ${"World"}`); // Template literals are best practice
```

### Key Points
- `.trim()` removes whitespace from both ends. You can also use `.trimStart()` or `.trimEnd()`.
- `.replace()` only replaces the **first** occurrence of a match unless a global Regular Expression (`/pattern/g`) is used.
- `.replaceAll()` is modern and replaces all occurrences without needing regex.

---

## Common Mistakes
- **Expecting `.replace` to act globally:** Developers frequently do `str.replace("-", "")` expecting it to strip all hyphens, but it only strips the first one. Use `.replaceAll("-", "")` instead.

---

## Summary
**Key Takeaway:** Always use `.replaceAll()` (or a global regex with `.replace()`) when you want to replace multiple instances of a substring, and rely on `.trim()` to normalize messy UI text before asserting.
