# 23_IQ — Ternary Operators for Comparison Testing

**File:** `05_chapter_Operator/23_IQ.js`

## Overview

This file demonstrates using ternary operators to evaluate strict equality in test assertions, showing a practical pattern where the ternary checks if actual values match expected values and returns a clear pass/fail status. This is common in testing frameworks and condition-based messaging.

---

## Main Concept

Using ternary operators to evaluate conditions and return informative results is a key pattern in testing and assertion logic. When comparing values with strict equality (`===`), the ternary returns a human-readable result indicating pass or fail status. This pattern is used in test assertions, validation logic, and status reporting.

### Code Example

```javascript
// Test assertion with ternary
let actualStatusCode = 200;
let expectedStatusCode = 200;
let testResult = actualStatusCode === expectedStatusCode ? "✅ PASS" : "❌ FAIL";
console.log(testResult);  // "✅ PASS"

// Real-world pattern
function runTest(actual, expected) {
  return actual === expected ? "✅ PASS" : "❌ FAIL";
}

// Validation pattern
let userAge = 25;
let isValid = userAge >= 18 ? "✅ Valid Age" : "❌ Invalid Age";

// Configuration pattern
let testMode = true;
let config = testMode ? "Test Configuration" : "Production Configuration";
```

### Key Points

- **Strict equality in ternaries prevents coercion bugs**: Using `===` in the condition ensures accurate comparison without type coercion surprises.
- **Ternary returns meaningful status strings**: Returning "PASS"/"FAIL" or emoji indicators is more informative than true/false.
- **Pattern is useful for assertions and validations**: This ternary pattern is widely used in test frameworks (Jest, Mocha) and validation logic.
- **Single-line conditional assignment**: The ternary keeps the code concise while maintaining readability.
- **Both branches should return similar types**: Returning strings in both branches ensures consistent return values.

---

## Common Mistakes

**Mistake 1: Using loose equality in test ternaries**
```javascript
// Wrong: loose equality can pass unexpectedly
let result = actual == expected ? "✅ PASS" : "❌ FAIL"; // "5" == 5 would pass

// Right: use strict equality for accurate testing
let result = actual === expected ? "✅ PASS" : "❌ FAIL";
```

**Mistake 2: Forgetting to compare values in ternaries**
```javascript
// Wrong: ternary doesn't compare
let result = expected ? "✅ PASS" : "❌ FAIL"; // Checks if expected is truthy

// Right: explicitly compare actual and expected
let result = actual === expected ? "✅ PASS" : "❌ FAIL";
```

**Mistake 3: Returning inconsistent types from branches**
```javascript
// Wrong: mixed types make code unpredictable
let result = condition ? "PASS" : false; // String or boolean

// Right: return consistent types
let result = condition ? "✅ PASS" : "❌ FAIL"; // Both strings
```

**Mistake 4: Nesting too many ternaries for complex assertions**
```javascript
// Wrong: deeply nested is hard to read
let result = a === b ? "Equal" : a > b ? "Greater" : "Lesser";

// Right: use if/else for clarity
let result;
if (a === b) result = "Equal";
else if (a > b) result = "Greater";
else result = "Lesser";
```

---

## Interview-Ready Definitions

1. **Test Assertion Pattern**: Using ternary operators to evaluate a condition and return a pass/fail or success/failure message, commonly used in testing frameworks.

2. **Strict Equality Test**: Comparing two values with `===` to ensure both value and type match, without relying on type coercion.

3. **Meaningful Return Values**: Returning descriptive strings or messages instead of just true/false, making code more readable and diagnostic.

4. **Single-Line Conditional**: Ternary operators allow conditional logic to be expressed on a single line, reducing boilerplate if/else code.

5. **Validation Logic**: Using ternary patterns to validate input values and return status messages indicating whether input is valid or invalid.

---

## Tricky Interview Questions

1. **Why use `actualStatusCode === expectedStatusCode` instead of `==`?**
   - Answer: Strict equality prevents coercion bugs. `200 == "200"` is true (coercion), but `200 === "200"` is false (correct for comparing a number to a string).

2. **What's the result of `actualStatusCode === expectedStatusCode ? "✅ PASS" : "❌ FAIL"` if actual is 200 and expected is 200?**
   - Answer: "✅ PASS". Both are strictly equal (same value and type).

3. **What if actual is 200 and expected is "200"?**
   - Answer: "❌ FAIL". Strict equality requires both value and type to match; numbers and strings are different types.

4. **Can you use ternary for complex multi-condition testing?**
   - Answer: Technically yes, but it gets hard to read. Better to use if/else or separate ternaries for clarity: `condition1 ? result1 : condition2 ? result2 : result3`.

5. **What's the difference between `condition ? true : false` and just `condition` in a test?**
   - Answer: `condition ? true : false` returns boolean true/false. `condition` returns the actual value (could be truthy object or falsy value). Use `!!condition` to convert to boolean.

6. **Can you chain ternaries for multiple test conditions?**
   - Answer: Yes, but only up to a point before readability suffers. `cond1 ? res1 : cond2 ? res2 : res3` is readable; more than that should use if/else.

7. **What does `actualStatusCode === expectedStatusCode ? "✅" : "❌"` return for different values?**
   - Answer: If they differ (e.g., 200 vs 404), returns "❌".

8. **Can you pass functions as ternary branches?**
   - Answer: Yes: `condition ? functionA() : functionB()`. Only the selected function executes due to short-circuiting.

9. **Is `result = test ? "PASS" : "FAIL"` the same as `result = test && "PASS" || "FAIL"`?**
   - Answer: No. The `&&` with `||` approach can fail if "PASS" is falsy. Ternary is safer and more explicit.

10. **What's the result of `NaN === NaN ? "PASS" : "FAIL"`?**
    - Answer: "FAIL". NaN is not equal to itself; `NaN === NaN` is false.

11. **Can you use ternary in function parameters?**
    - Answer: Yes: `testAssertion(actualStatusCode === expectedStatusCode ? "PASS" : "FAIL")`.

12. **What if both branches of the ternary are identical?**
    - Answer: The ternary is pointless. Simplify: `"PASS"` instead of `true ? "PASS" : "PASS"`.

13. **How do you test multiple properties with ternary?**
    - Answer: Use `&&` to combine conditions: `(a === b && c === d) ? "PASS" : "FAIL"`.

14. **Can ternary operators be used in assertions frameworks?**
    - Answer: Yes, frameworks like Jest use them or similar patterns internally: `expect(actual).toBe(expected)` is a helper that ternary-like logic replaces with automatic messaging.

15. **What's the result of `undefined === undefined ? "PASS" : "FAIL"`?**
    - Answer: "PASS". undefined is strictly equal to itself.

---

## Deep Insights & Gotchas

- **Test ternaries shouldn't replace proper testing frameworks**: While ternary-based testing works for simple cases, frameworks like Jest provide better error messages, reporting, and assertions.

- **Strict equality is essential in ternary tests**: Loose equality (`==`) can hide bugs by allowing type coercion. Always use `===` for accurate test comparisons.

- **Single-line ternary tests reduce code but reduce debuggability**: Complex ternaries are harder to set breakpoints on. Keep them simple or extract to functions for testing.

---

## Summary

**Key Takeaway:** Using ternary operators with strict equality (`===`) to return pass/fail messages is a practical pattern for testing and validation logic, but keep ternaries simple and use proper testing frameworks for complex assertions.
