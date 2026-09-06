# 197 — Function Parameter Typing and the Void Return Type

**File:** `25_chapter_TypeScript/197.ts`

## Overview
This file demonstrates **Function Parameter Type Annotations** and the **`void` Return Type** in TypeScript through a helper function `sayHello(msg: string): void`. It showcases how TypeScript enforces that required parameters are supplied with the correct type while explicitly denoting functions that perform side-effects without returning a value.

---

## Main Concept

In TypeScript, every function signature can explicitly define:
1. **Parameter Types:** Restricts the type of values the function accepts (`msg: string`).
2. **Return Type:** Defines what the function yields to its caller (`: void`).

### The `void` Return Type
The `void` type signifies the absence of having any type at all. In functions, `void` indicates that the function returns nothing of value—typically because it performs an action or side-effect such as logging to the console, clicking a button, or navigating a page.

### Code Example

```typescript
console.log("Hi");

function sayHello(msg: string): void {
    console.log("Hi, How are you", msg);
}

sayHello("pramod"); // Output: "Hi, How are you pramod"

// ❌ Compiler Error: Argument of type 'number' is not assignable to parameter of type 'string'.
// sayHello(12345);

// ❌ Compiler Error: Type 'void' is not assignable to type 'string'.
// let result: string = sayHello("pramod");
```

### Key Points
- **Parameter Contract:** Omitting arguments (`sayHello()`) or supplying arguments of the wrong type triggers compiler errors.
- **`void` vs `undefined`:** Under the hood in JavaScript, calling a function that doesn't return anything yields `undefined`. In TypeScript, `: void` communicates intent: the caller must not rely on or consume the return value.
- **Automation Helpers:** Helper methods in Page Object Models (e.g., `clickLogin()`, `enterUsername()`) are typically typed as returning `void` (or `Promise<void>` when asynchronous).

---

## Common Mistakes
- **Attempting to use the result of a `void` function:** Assigning `let res = sayHello("pramod")` and attempting to access properties on `res` causes TypeScript compiler errors.
- **Forgetting asynchronous returns:** If an automation function uses `async`, its return type must be `Promise<void>`, not plain `void`.

---

## Summary
**Key Takeaway:** Parameter typing enforces valid inputs at compile time, while `: void` explicitly communicates that a function is intended for side effects and produces no consumable return value.
