# 207 — Configuration Interfaces with Mandatory and Optional Properties

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/207_REAL.ts`

## Overview
This file demonstrates **Configuration Interfaces with Optional Properties** in TypeScript using a realistic test automation `TestConfig` interface. It showcases how interfaces define required properties (`browser`, `headless`, `baseURL`) while accommodating optional configuration overrides (`timeout?`, `retries?`) for local and CI/CD testing environments.

---

## Main Concept

In enterprise test frameworks (such as Playwright configuration files), test runs require standard core options but allow optional tuning. TypeScript's optional property syntax (`property?: type`) marks fields that can be omitted during object creation.

### Mandatory vs Optional Properties
```typescript
interface TestConfig {
    browser: string;   // Required
    headless: boolean; // Required
    baseURL: string;   // Required
    timeout?: number;  // Optional (number | undefined)
    retries?: number;  // Optional (number | undefined)
}
```
- `localConfig`: Omits `timeout` and `retries`, relying on defaults.
- `ciConfig`: Explicitly provides `timeout: 10000` and `retries: 3` for robust remote execution.

### Code Example

```typescript
interface TestConfig {
    browser: string;
    headless: boolean;
    baseURL: string;
    timeout?: number;
    retries?: number;
}

let localConfig: TestConfig = {
    browser: "Chrome",
    headless: true,
    baseURL: "https://staging.app.com"
};

let ciConfig: TestConfig = {
    browser: "Firefox",
    headless: false,
    baseURL: "http://localhost:3000",
    timeout: 10000,
    retries: 3
};

console.log("CI:", ciConfig.browser, "| timeout:", ciConfig.timeout);
console.log("Local:", localConfig.browser, "| timeout:", localConfig.timeout); // undefined
```

### Key Points
- **Type Safety on Defaults:** Omitted optional properties evaluate to `undefined` at runtime. Consumers can use nullish coalescing: `const timeout = config.timeout ?? 30000`.
- **Typo Prevention:** If a developer accidentally writes `retriess: 3`, TypeScript immediately throws a compile-time error: `Object literal may only specify known properties`.
- **Environment Parity:** Enables strongly-typed environment configurations across local dev, staging CI, and production smoke suites.

---

## Common Mistakes
- **Assuming optional properties have default values in the interface:** An interface only defines shapes, not values. It does not provide fallback values at runtime.
- **Accessing nested optional properties without optional chaining:** If an interface has optional nested objects, always use optional chaining (`config.auth?.token`) to avoid `TypeError: Cannot read properties of undefined`.

---

## Summary
**Key Takeaway:** Optional property annotations (`?`) in TypeScript interfaces allow clean, flexible configuration objects while strictly enforcing mandatory options and guarding against typos.
