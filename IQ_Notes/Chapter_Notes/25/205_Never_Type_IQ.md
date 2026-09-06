# 205 — The Never Type: Unreachable Code and Non-Returning Functions

**File:** `25_chapter_TypeScript/205.ts`

## Overview
This file introduces the **`never` Type** in TypeScript through two canonical examples: an infinite loop (`infiniteLoop(): never`) and an error-throwing helper (`throwError(message: string): never`). It explains the concept of the "bottom type" in type theory and contrasts `never` with `void`.

---

## Main Concept

The `never` type represents the type of values that **never occur**. In function return positions, `never` indicates that the function will never return normally to its caller.

### Scenarios Where `never` Occurs
1. **Unconditional Exception:** The function always throws an error before reaching an exit point.
2. **Infinite Loop:** The function enters an endless loop (`while (true) {}`) and never reaches an end point.
3. **Exhaustiveness Checking:** In switch statements or union type discrimination, when all possible union members have been handled, the remaining type in the `default` branch narrows to `never`.

### `never` vs `void`
- **`void`:** The function finishes executing and returns normally, but produces no meaningful value (under the hood it returns `undefined`).
- **`never`:** The function **never returns**; control flow never reaches the line following the function call.

### Code Example

```typescript
function infiniteLoop(): never {
    while (true) { }
}
// never - function never returns (throws or infinite loop)

function throwError(message: string): never {
    throw new Error(message);
}

// Example usage in test assertions:
function failTest(reason: string): never {
    throw new Error(`[TEST FAILURE] ${reason}`);
}

function processStatus(code: number): string {
    if (code === 200) return "OK";
    if (code === 404) return "Not Found";
    return failTest(`Unexpected status code: ${code}`); // Valid because failTest never returns!
}
```

### Key Points
- **Bottom Type:** `never` is a subtype of every type, meaning a function returning `never` can be returned from inside a function expected to return `string`, `number`, or any other type!
- **Dead Code Detection:** Any code placed immediately after a function call returning `never` is flagged by the TypeScript compiler as unreachable.
- **Exhaustive Pattern Matching:** Used in TypeScript to ensure all cases of a union (e.g., `type Action = "click" | "hover" | "type"`) are handled in a switch statement.

---

## Common Mistakes
- **Confusing `void` with `never`:** Annotating a function that returns nothing with `: never` causes a compiler error if the function actually completes and exits.
- **Thinking `never` has values:** No value can ever have the type `never` (except `never` itself). You cannot assign anything (not even `null`, `undefined`, or `any`) to a variable of type `never`.

---

## Summary
**Key Takeaway:** The `never` type models functions that never complete normally (due to throwing errors or infinite loops), serving as TypeScript's bottom type and the foundation for exhaustive type checking.
