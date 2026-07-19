# Ternary for Test Pass/Fail Assertions

## Overview

Covers `05_chapter_Operator/23_IQ.js` — a common QA/test-automation pattern: comparing an actual value against an expected value with `===` and using a ternary to produce a human-readable pass/fail result. Directly relevant to this repo's Playwright test-automation context.

---

## 1. Reference Code

```javascript
let actualStatusCode = 200;
let expectedStatusCode = 200;
let testResult = actualStatusCode === expectedStatusCode ? "✅ PASS" : "❌ FAIL";
console.log(testResult); // "✅ PASS"
```

---

## 2. Why `===`, Not `==`, for Assertions

Test assertions should never allow type coercion to mask a real bug. If `actualStatusCode` came back as the **string** `"200"` (e.g., from an unparsed HTTP header or JSON field) instead of the **number** `200`, a loose-equality assertion would silently report a false PASS:

```javascript
"200" == 200;    // true  — coerced, hides the type mismatch
"200" === 200;   // false — correctly flags the type mismatch as a real failure
```

Using `===` here means a test fails loudly if either the *value* or the *type* is wrong — exactly the behavior you want from an assertion. See [[Operators_IQ]] for the full `==` vs `===` breakdown.

---

## 3. The Pattern Generalized

```javascript
const assertEqual = (actual, expected) =>
  actual === expected ? "✅ PASS" : "❌ FAIL";

console.log(assertEqual(response.status, 200));
console.log(assertEqual(response.body.userId, 42));
```

This is essentially a miniature, hand-rolled version of what assertion libraries (`expect(actual).toBe(expected)` in Jest/Playwright) do internally — compare strictly, then report a clear result.

---

## Summary

**Key Takeaway:** `actual === expected ? "PASS" : "FAIL"` is a minimal but real assertion pattern — strict equality is what makes it trustworthy, since loose equality (`==`) could coerce a wrong-typed value into a false pass.

**Related notes:** [[Operators_IQ]], [[Ternary_Operator_Basics_IQ]]
