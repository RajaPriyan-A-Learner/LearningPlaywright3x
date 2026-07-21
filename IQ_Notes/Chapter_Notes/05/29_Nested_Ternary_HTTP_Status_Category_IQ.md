# Chained Ternary — HTTP Status Code Categorization

## Overview

Covers `05_chapter_Operator/29_IQ_NT.js` — a "chained" ternary (multiple `condition ? a : condition ? b : ...` in sequence), which reads like a compact `else if` ladder. Classic use case: bucketing HTTP status codes into categories.

---

## 1. Reference Code

```javascript
let statusCode = 404;
let category =
    statusCode < 300 ? "Success" :
        statusCode < 400 ? "Redirect" :
            statusCode < 500 ? "Client Error" : "Server Error";

console.log(`Status ${statusCode}: ${category}`);       // "Status 404: Client Error"
console.log("Status :" + statusCode, category);          // "Status :404 Client Error"
```

---

## 2. How Chained Ternaries Evaluate

The ternary operator is **right-associative**, so `a ? x : b ? y : c ? z : w` parses as `a ? x : (b ? y : (c ? z : w))` — each `:` opens a new ternary that's only evaluated if the previous condition was false. This makes it behave exactly like a cascading `if / else if / else if / else`:

```javascript
if (statusCode < 300) {
  category = "Success";
} else if (statusCode < 400) {
  category = "Redirect";
} else if (statusCode < 500) {
  category = "Client Error";
} else {
  category = "Server Error";
}
```

With `statusCode = 404`:
- `404 < 300` → false
- `404 < 400` → false
- `404 < 500` → **true** → `category = "Client Error"`

---

## 3. Indentation Convention for Chained Ternaries

The staircase indentation (`statusCode < 400 ?` indented one level deeper than the line above) is a common style convention to visually signal "this is the else-branch of the previous condition, not a new independent statement":

```javascript
let category =
    statusCode < 300 ? "Success" :
        statusCode < 400 ? "Redirect" :
            statusCode < 500 ? "Client Error" : "Server Error";
```

Without the staircase, a long chain reads as one undifferentiated line and is much harder to trace. Some teams instead ban chained ternaries entirely in favor of `if/else if` or a lookup table once there are more than 2–3 branches — readability trade-off, not a language requirement.

---

## 4. Two Ways to Log the Same Values

```javascript
console.log(`Status ${statusCode}: ${category}`);   // template literal — interpolated
console.log("Status :" + statusCode, category);      // + concatenation, then a separate comma-arg
```

The second line mixes two different techniques: `"Status :" + statusCode` concatenates into one string (numbers are coerced to strings by `+`), while `category` is passed as a *separate* `console.log` argument — so the output has a comma-driven space between `404` and `Client Error` that isn't part of either string. See [[21_String_Operator_IQ]] for why multi-argument `console.log` behaves differently from `+`.

---

## Summary

**Key Takeaway:** Chained ternaries (`a ? x : b ? y : c ? z : w`) work like a compact `if/else if/else` ladder thanks to right-associativity — useful for categorizing a value into 3+ buckets, but readability degrades fast without consistent staircase indentation.

**Related notes:** [[28_Nested_Ternary_Two_Level_IQ]], [[30_Nested_Ternary_Temperature_Scale_IQ]], [[21_String_Operator_IQ]]
