# EX2 — Configurable Test Environments with Default Parameters

**File:** `24_chapter_OOPS_Interview/EX2.js`

## Overview
This file demonstrates the usage of **Default Constructor Parameters** in JavaScript OOP through an `Environment` class. Default parameters enable robust configuration management in test automation, allowing classes to instantiate with sensible default values (`staging`, port `3000`) or accept customized overrides (`production`, port `8080`).

---

## Main Concept

Default parameters in class constructors provide fallback values if arguments are omitted or passed as `undefined`. This eliminates boilerplate guard clauses (`this.name = name || "staging"`) while preserving explicit configuration flexibility.

### Constructor Parameter Defaults
```javascript
constructor(name = "staging", port = 3000) {
    this.name = name;
    this.port = port;
}
```
- `new Environment()`: Uses `"staging"` and `3000`.
- `new Environment("production", 8080)`: Overrides both parameters with the provided arguments.

### Code Example

```javascript
class Environment {
    constructor(name = "staging", port = 3000) {
        this.name = name;
        this.port = port;
    }

    getURL() {
        return "http://" + this.name + ":" + this.port;
    }
}

let env1 = new Environment();
let env2 = new Environment("production", 8080);

console.log(env1.getURL()); // "http://staging:3000"
console.log(env2.getURL()); // "http://production:8080"
```

### Key Points
- **Falsy Value Handling:** Default parameters trigger only when an argument is `undefined` (or missing). Passing `null` will assign `null`, not the default value.
- **Computed Method Returns:** `getURL()` computes the endpoint URL dynamically using the instance properties `this.name` and `this.port`.
- **Framework Configuration:** Highly applicable to CI/CD test execution where local runners use defaults while pipelines inject environment variables.

---

## Common Mistakes
- **Passing `null` expecting the default value:** `new Environment(null, 4000)` assigns `this.name = null`, resulting in `"http://null:4000"`. Defaults only trigger on `undefined`.
- **Hardcoding URLs across test suites:** Centralizing URL construction within an `Environment` class prevents configuration duplication.

---

## Summary
**Key Takeaway:** Default constructor parameters simplify object instantiation by supplying sensible test defaults while allowing seamless environment overrides for CI/CD pipelines.
