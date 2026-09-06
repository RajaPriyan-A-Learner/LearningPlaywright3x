# 206 — Callable Interfaces and Test Hook Signatures

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/206_Test_hooks.ts`

## Overview
This file demonstrates **Callable Interfaces (Function Type Interfaces)** in TypeScript using a `TestHook` interface. Callable interfaces allow developers to define the signature of executable functions as an interface contract, standardizing lifecycle hooks such as `beforeEachHook` and `afterEachHook` across automated testing suites.

---

## Main Concept

While interfaces in TypeScript are most commonly used to describe object shapes, they can also describe function call signatures. By placing a parameter list and return type without a method name inside the interface body, the interface acts as a contract for callable functions.

### Defining a Callable Interface
```typescript
interface TestHook {
    (testName: string): void;
}
```
Any function variable typed with `: TestHook` must accept a string parameter and return `void`.

### Code Example

```typescript
interface TestHook {
    (testName: string): void;
}

let beforeEachHook: TestHook = function (testName: string): void {
    console.log("[BEFORE] Setting up: " + testName);
};

let afterEachHook: TestHook = function (testName: string): void {
    console.log("[AFTER] Tearing down: " + testName);
};

beforeEachHook("Login Test"); // [BEFORE] Setting up: Login Test
afterEachHook("Login Test");  // [AFTER] Tearing down: Login Test

// ❌ TypeScript Compiler Errors:
// beforeEachHook(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
// let badHook: TestHook = (testName: string) => "done"; // Allowed, but return value is ignored by void contract
```

### Key Points
- **Standardized Signatures:** Test runners (like Playwright, Jest, and Mocha) use callable interfaces to ensure custom fixture and hook callbacks adhere to expected argument types.
- **Interchangeability:** Different hook implementations (e.g., database reset, browser restart, network mock reset) can all be assigned to variables of type `TestHook`.
- **Hybrid Types:** Callable interfaces can also declare properties alongside the call signature (useful for functions with attached metadata or properties).

---

## Common Mistakes
- **Confusing Method Signatures with Call Signatures:** Writing `{ testHook(testName: string): void; }` describes an *object* with a method named `testHook`, whereas `{ (testName: string): void; }` describes the *function itself*.
- **Overusing interfaces when type aliases suffice:** `type TestHook = (testName: string) => void;` is functionally equivalent and often preferred for simple function types.

---

## Summary
**Key Takeaway:** Callable interfaces define strict contracts for function signatures, enabling uniform test fixture and lifecycle hook implementations in test automation frameworks.
