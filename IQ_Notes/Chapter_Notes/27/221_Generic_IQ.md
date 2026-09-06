# 221 — Generic Functions and the Non-Null Assertion Operator

**File:** `27_chapter_Generics/221_Generic.ts`

## Overview
This file introduces **Generic Functions** in TypeScript through `getFirstResult<T>(result: T[]): T`. It demonstrates how type variables (`<T>`) enable reusable algorithms that preserve exact type identity across varied inputs (numbers, strings, booleans), contrasting generics with restrictive single-type functions or unsafe `any` parameters. It also highlights the non-null assertion operator (`!`).

---

## Main Concept

Without generics, a developer must either rewrite the same function for each type (`getNumber()`, `getString()`) or use `any`, which destroys type safety. Generics capture the argument type provided by the caller and return that exact same type.

### Generic Type Parameter `<T>`
```typescript
function getFirstResult<T>(result: T[]): T {
    return result[0]!; // ! = non-null assertion operator
}
```
- `<T>` is a type variable placeholder.
- `result: T[]` specifies an array where every item is of type `T`.
- `: T` ensures the return value has the exact type of the array's elements.
- `!` (Non-null assertion operator): Tells the compiler that `result[0]` is guaranteed to be non-null/non-undefined at runtime.

### Code Example

```typescript
function getFirstResult<T>(result: T[]): T {
    return result[0]!;
}

let firstNumber = getFirstResult<number>([200, 400, 500]);
let firstString = getFirstResult<string>(["Login", "Signup", "Cart"]);
let firstBoolean = getFirstResult<boolean>([true, false, true]);

console.log("First code:", firstNumber);    // 200 (type: number)
console.log("First test:", firstString);     // "Login" (type: string)
console.log("First flag:", firstBoolean);    // true (type: boolean)

// Type Inference also works automatically:
let inferred = getFirstResult([10, 20, 30]); // TypeScript infers T as number
```

### Key Points
- **Type Identity Preservation:** `firstNumber` has all `number` methods, `firstString` has all `string` methods (`.toUpperCase()`), with zero typecasting required.
- **Non-Null Assertion (`!`):** In strict mode (`noUncheckedIndexedAccess: true`), array indexing returns `T | undefined`. The `!` operator asserts to the compiler that the element exists.
- **Type Argument Inference:** Explicitly writing `<number>` is optional when the compiler can deduce `T` from the arguments.

---

## Common Mistakes
- **Using `any` instead of `T`:** `function getFirst(arr: any[]): any` loses type checking; callers can invoke non-existent methods on the result without compiler warnings.
- **Abusing the `!` operator:** Using `!` on an empty array (`[]`) will result in `undefined` at runtime despite the assertion, potentially causing downstream crashes.

---

## Summary
**Key Takeaway:** Generics (`<T>`) enable type-safe, reusable functions that adapt to multiple data types while preserving exact type information, eliminating code duplication and unsafe `any` casting.
