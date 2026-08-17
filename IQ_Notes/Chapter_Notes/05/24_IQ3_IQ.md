# 24_IQ3 — Ternary Operators for Configuration Selection

**File:** `05_chapter_Operator/24_IQ3.js`

## Overview

This file demonstrates using ternary operators to select between different configuration values based on a boolean flag. This is a common pattern for feature toggles, environment-based configuration, and runtime behavior selection.

---

## Main Concept

Ternary operators are frequently used to select between two configuration values based on a runtime condition. This pattern is useful for feature flags, environment selection (CI vs local), browser mode selection (headless vs headed), and other binary choice scenarios.

### Code Example

```javascript
// Configuration selection pattern
let isCI = true;
let browserMode = isCI ? "headless" : "headed";
console.log("Launching browser in:", browserMode, "mode");  // "headless"

// Feature flag pattern
let isDevelopment = false;
let apiBaseUrl = isDevelopment ? "http://localhost:3000" : "https://api.example.com";

// Environment-based configuration
let env = "production";
let logLevel = env === "production" ? "error" : "debug";

// Performance optimization pattern
let enableCaching = true;
let cacheStrategy = enableCaching ? "memory" : "none";
```

### Key Points

- **Ternary is ideal for binary configuration choices**: When selecting between two options based on a boolean or condition, ternary is concise and readable.
- **Configuration patterns are extremely common**: Feature flags, environment selection, and mode toggles frequently use ternary in production code.
- **Keep configuration expressions simple**: If configuration logic becomes complex, extract to a helper function or use a switch statement.
- **Boolean flags make configuration explicit**: Using clear boolean flags (isCI, isDevelopment) makes the ternary's intention obvious.
- **Document the configuration choice**: Add comments explaining why the configuration choice matters or what the two modes do.

---

## Common Mistakes

**Mistake 1: Using obscure variable names in configuration**
```javascript
// Wrong: unclear what the modes mean
let x = isCI ? "a" : "b";
console.log("Launching browser in:", x, "mode");

// Right: explicit configuration values
let browserMode = isCI ? "headless" : "headed";
console.log("Launching browser in:", browserMode, "mode");
```

**Mistake 2: Complex logic inside ternary**
```javascript
// Wrong: logic is hard to follow
let mode = isCI && !debugMode ? "headless" : debugMode ? "headed-debug" : "headed";

// Right: simpler ternary or helper function
let mode = isCI ? "headless" : "headed";
let debugOption = debugMode ? "-debug" : "";
```

**Mistake 3: Forgetting to update all configuration points**
```javascript
// Wrong: configuration split across code
let url1 = isDev ? "localhost" : "api.example.com";
let url2 = isDev ? "localhost" : "api.example.com";  // Duplicate!

// Right: centralize configuration
const CONFIG = {
  apiUrl: isDev ? "localhost" : "api.example.com"
};
let url1 = CONFIG.apiUrl;
let url2 = CONFIG.apiUrl;
```

**Mistake 4: Configuration ternary in the wrong place**
```javascript
// Wrong: configuration buried in function
function launchBrowser() {
  let mode = isCI ? "headless" : "headed";
  // ...
}

// Right: configuration at the top level
const BROWSER_MODE = isCI ? "headless" : "headed";
function launchBrowser() {
  // use BROWSER_MODE
}
```

---

## Interview-Ready Definitions

1. **Configuration Selection**: Using a ternary operator to select between two configuration values based on a runtime condition or feature flag.

2. **Feature Flag**: A boolean variable that controls whether a feature is enabled or disabled at runtime. Often used with ternary operators to select behavior.

3. **Environment-Based Configuration**: Different configuration values for different environments (development, staging, production) selected using ternary operators.

4. **Runtime Condition**: A condition evaluated at runtime (not compile time) that determines which configuration to use.

5. **Mode Selection**: Choosing between two operational modes (e.g., headless vs headed browser, verbose vs silent logging) using conditional logic.

---

## Tricky Interview Questions

1. **What's the result of `let browserMode = isCI ? "headless" : "headed"` if isCI is true?**
   - Answer: browserMode is "headless". isCI is truthy, so the true branch is returned.

2. **Can you use ternary to select between more than two configuration values?**
   - Answer: You can nest ternaries, but better to use a helper function or object mapping: `{ prod: "a", dev: "b", test: "c" }[env]`.

3. **Is `browserMode = isCI ? "headless" : "headed"` efficient?**
   - Answer: Yes, ternary short-circuits and executes in constant time. It's one of the most efficient ways to select between two values.

4. **Can you use ternary inside object literals for configuration?**
   - Answer: Yes: `{ mode: isCI ? "headless" : "headed" }`.

5. **What if the configuration values are functions instead of strings?**
   - Answer: Yes: `let logger = isDev ? console.log : () => {}`. However, both functions are evaluated (not called), so this is efficient.

6. **Does ternary configuration get evaluated every time or once?**
   - Answer: Each time the code executes. If configuration is expensive to compute, cache the result: `const MODE = isCI ? "headless" : "headed"`.

7. **Can you use ternary with environment variables?**
   - Answer: Yes: `let apiUrl = process.env.NODE_ENV === "production" ? "https://api.com" : "http://localhost:3000"`.

8. **Is `isCI ? "headless" : "headed"` readable or should I use if/else?**
   - Answer: Ternary is fine for simple, binary choices. If the choice is complex or has side effects, if/else is clearer.

9. **Can you use ternary to select between configuration objects?**
   - Answer: Yes: `let config = isDev ? devConfig : prodConfig`.

10. **What's the result if isCI is a string instead of a boolean?**
    - Answer: The string is evaluated for truthiness. Non-empty strings are truthy, so `"" ? "headless" : "headed"` returns "headed", `"true" ? "headless" : "headed"` returns "headless".

11. **Can ternary configuration be used in switch statements?**
    - Answer: Yes, ternary can provide the switch value: `switch(isCI ? "ci" : "local") { ... }`.

12. **Is configuration selection with ternary testable?**
    - Answer: Yes, test both branches: mock `isCI = true` and `isCI = false`, then verify the correct configuration is selected.

13. **Can you use ternary inside arrow functions for configuration?**
    - Answer: Yes: `const getMode = () => isCI ? "headless" : "headed"`.

14. **What if both configuration options are identical?**
    - Answer: The ternary is pointless; use just the value: `let mode = "headed"` instead of `isCI ? "headed" : "headed"`.

15. **Can ternary select between different data types?**
    - Answer: Yes, but this can cause bugs. `let value = condition ? 42 : "string"` mixes types. Keep types consistent: `condition ? 42 : 0` or `condition ? "yes" : "no"`.

---

## Deep Insights & Gotchas

- **Configuration ternaries should be idempotent**: The result should be the same every time the code runs (unless the flag changes). Avoid using side effects in ternary branches.

- **Extract configuration to constants for reusability**: Instead of repeating `isCI ? "headless" : "headed"` in multiple places, define once: `const BROWSER_MODE = isCI ? "headless" : "headed"`.

- **Ternary configuration is easier to test than passing configuration as arguments**: Mock the boolean flag and verify the correct configuration is selected, rather than passing different objects to functions.

---

## Summary

**Key Takeaway:** Ternary operators are ideal for selecting between two configuration values based on a runtime condition; extract to constants for reusability and keep the expressions simple for maintainability.
