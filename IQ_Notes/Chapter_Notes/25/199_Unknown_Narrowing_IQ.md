# 199 — Type Narrowing with Unknown and Uninitialized Declarations

**File:** `25_chapter_TypeScript/199.ts`

## Overview
This file demonstrates **Type Narrowing** using JavaScript's runtime `typeof` guard against a variable of type `unknown`. It also demonstrates uninitialized typed variable declarations (`let username: string`, `let userId: number`), illustrating how TypeScript tracks variable assignment and type constraints before usage.

---

## Main Concept

The `unknown` type is the type-safe counterpart of `any`. Anything is assignable to `unknown`, but `unknown` is not assignable to anything else without a type assertion or control flow based **Type Narrowing**.

### Type Guard Narrowing with `typeof`
Inside an `if` statement checking `typeof unknownVal === "string"`, TypeScript's compiler automatically refines the type of `unknownVal` from `unknown` to `string`. Within that block, all string methods (e.g., `.length`, `.toUpperCase()`) become accessible with full autocomplete and type safety.

### Uninitialized Variable Declarations
```typescript
let username: string;
let userId: number;
```
Declaring a variable with a type annotation before assigning a value instructs TypeScript what type of data the variable must hold when it is initialized later. Under `"strictNullChecks": true`, reading `username` before assigning it triggers `Variable 'username' is used before being assigned`.

### Code Example

```typescript
let unknownVal: unknown = "hello";

// Type narrowing using typeof guard
if (typeof unknownVal === "string") {
    console.log("Hi - value is string:", unknownVal.toUpperCase());
}

let message: string = "Hello";
let username: string;
let userId: number;

username = "test_user";
userId = 101;

console.log(`${username} (ID: ${userId}): ${message}`);
```

### Key Points
- **Control Flow Analysis:** TypeScript examines the execution path and narrows types accordingly inside conditional blocks.
- **Safe Parsing:** Perfect for handling deserialized JSON, third-party API payloads, or external test configurations where the data shape is uncertain at compile time.
- **Defensive Programming:** Forces developers to perform explicit checks rather than making blind assumptions about object shapes.

---

## Common Mistakes
- **Accessing properties on `unknown` without narrowing:** Writing `unknownVal.trim()` without an `if (typeof unknownVal === "string")` guard triggers `Object is of type 'unknown'`.
- **Using `any` when `unknown` is safer:** Resorting to `any` bypasses the compiler, leading to preventable runtime errors.

---

## Summary
**Key Takeaway:** The `unknown` type mandates type narrowing before property access or operations, pairing with `typeof` checks to handle uncertain data with complete type safety.
