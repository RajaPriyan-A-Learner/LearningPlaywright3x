# 111_String — String Declarations and Template Literals

**File:** `13_chapter_String/111_String.js`

## Overview
This file covers the basics of creating strings in JavaScript, including single quotes, double quotes, and the highly versatile template literals.

## Main Concept
JavaScript strings can be defined in three ways. Single (`'`) and double (`"`) quotes are largely identical in behavior. Backticks (`` ` ``), however, create "Template Literals," which allow for multi-line strings and embedded expressions without awkward concatenation.

### Code Example

```javascript
// Single and Double Quotes
let a = 'hello';
let b = "world";

// Template literals (backticks)
let name1 = "Alice";
let msg = `Hello, ${name1}! 2 + 2 = ${2 + 2}`;
console.log(msg); // "Hello, Alice! 2 + 2 = 4"

// Multiline support out-of-the-box
let report = `
  Test: Login
  Status: Pass
  Duration: 320ms
`;

// Explicit String casting
console.log(String(true));   // "true"
console.log(String([1, 2])); // "1,2"
```

### Key Points
- Template literals use `${expression}` to inject variables or evaluate logic directly inside the string.
- The `String()` constructor can be used to explicitly cast non-string values (like booleans, null, or arrays) into their string representations.

---

## Common Mistakes
- **Using single/double quotes for multi-line strings:** Doing `let a = "line1 \n line2"` works but is ugly. Doing `let a = "line1` (hitting enter) `line2"` will throw a SyntaxError. Always use backticks for actual multi-line formatting.

---

## Summary
**Key Takeaway:** Template literals (backticks) are the modern, preferred way to construct strings in JavaScript due to their support for embedded expressions and multi-line formatting.
