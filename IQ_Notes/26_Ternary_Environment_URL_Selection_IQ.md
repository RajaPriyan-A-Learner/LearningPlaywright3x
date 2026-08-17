# Ternary for Environment-Based Config (Base URL Selection)

## Overview

Covers `05_chapter_Operator/26_Q2.js` — a ternary written across multiple lines to pick a base URL based on the current environment, a pattern extremely common in test-automation config files (choosing between prod/staging/dev endpoints).

---

## 1. Reference Code

```javascript
let environment = "staging";
let baseUrl = environment === "prod"
    ? "https://api.example.com"
    : "https://staging-api.example.com";
console.log(baseUrl); // "https://staging-api.example.com"
```

---

## 2. Multi-Line Ternary Formatting

JavaScript doesn't care about the line breaks — this is purely a readability convention. Splitting `?` and `:` onto their own indented lines keeps long ternaries scannable instead of producing one dense line:

```javascript
// All on one line — works, but harder to scan once the branches get long
let baseUrl = environment === "prod" ? "https://api.example.com" : "https://staging-api.example.com";

// Split across lines — same result, easier to read
let baseUrl = environment === "prod"
    ? "https://api.example.com"
    : "https://staging-api.example.com";
```

---

## 3. Why `===` Matters Here Too

Comparing `environment === "prod"` with strict equality avoids the same coercion risk covered in [[23_Ternary_Test_Assertion_Pattern_IQ]] — if `environment` were ever accidentally a non-string value (e.g., `1` from a misconfigured env var parser), `===` correctly falls through to the `else` branch instead of silently coercing and possibly matching the wrong environment.

---

## 4. Real-World Extension — More Than Two Environments

This two-branch ternary only handles "prod" vs "everything else." A real config typically needs three or more environments, which is exactly the nested-ternary chain pattern shown in [[29_Nested_Ternary_HTTP_Status_Category_IQ]]:

```javascript
let baseUrl =
  environment === "prod" ? "https://api.example.com" :
  environment === "staging" ? "https://staging-api.example.com" :
  "http://localhost:3000"; // dev fallback
```

---

## Summary

**Key Takeaway:** Multi-line ternary formatting is just a style convention — the engine evaluates it identically to a single-line ternary. This is a standard pattern for environment-based config, and belongs with `===` to avoid accidental environment-string coercion bugs.

**Related notes:** [[23_Ternary_Test_Assertion_Pattern_IQ]], [[29_Nested_Ternary_HTTP_Status_Category_IQ]], [[13_Operators_IQ]]
