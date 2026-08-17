# `switch` for HTTP Response Code Routing

## Overview

Covers `07_chapter_switch/42_REAL_API_Testing.js` — a realistic QA/testing use case: branching test assertions on an HTTP response status code.

---

## 1. Reference Code

```javascript
let responseCode = 404;

switch (responseCode) {
    case 200:
        console.log("200 Ok");
        break;
    case 404:
        console.log("404 Not found!");
        break;
    default:
        console.log("Not status code match");
}
// responseCode = 404 -> "404 Not found!"
```

---

## 2. Why `switch` Fits This Pattern

API status-code handling is a classic "one value, many discrete outcomes" shape — exactly what `switch` is designed for, and more readable here than an `if/else if` chain of `responseCode === 200`, `responseCode === 404`, etc. In real test automation this pattern typically expands to route different assertions, retries, or error logs per status family (2xx, 4xx, 5xx) — see the grouped-case technique in [[43_Switch_Case_Grouping_IQ]] for how to handle whole families without repeating logic.

---

## 3. Numeric Case Values Use Strict Comparison

Like every `switch` in JS, `responseCode` is compared to each `case` value with `===` (see [[47_Switch_Strict_Equality_IQ]]) — `"404" ` (a string) would **not** match `case 404` here. Since `responseCode` is already a `number` literal, this isn't an issue in this file, but it's a common bug when the value comes from `fetch()`/`JSON.parse()` output that wasn't coerced.

---

## Summary

**Key Takeaway:** `switch` is a natural fit for status-code-style routing (one input, many discrete known outcomes) — but because matching is strict (`===`), always ensure the switched value's type matches the `case` literals, especially when the value originates from an API response.

**Related notes:** [[41_Switch_Default_Case_IQ]], [[47_Switch_Strict_Equality_IQ]], [[43_Switch_Case_Grouping_IQ]]
