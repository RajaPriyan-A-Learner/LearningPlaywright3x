# 194 — Typed Arrays and Predicate Callbacks in TypeScript

**File:** `24_chapter_OOPS_Interview/194.ts`

## Overview
This file demonstrates **Typed Arrays** (`number[]`) and strictly-typed callback predicates within higher-order array methods like `Array.prototype.filter()` in TypeScript. It illustrates how API response validation logic (filtering failed HTTP status codes `>= 400`) benefits from compile-time type enforcement.

---

## Main Concept

TypeScript extends JavaScript's built-in array operations with strict element type definitions. Declaring `number[]` ensures that only numeric values can be stored in the array and that callback functions passed to methods like `.filter()` receive strongly-typed elements.

### Typing the Callback Predicate
In `getFailedCodes`:
```typescript
function getFailedCodes(codes: number[]): number[] {
    return codes.filter(function (code: number): boolean {
        return code >= 400;
    });
}
```
- `codes: number[]`: Function argument must be an array of numbers.
- `code: number`: The filter callback receives each element typed as a `number`.
- `: boolean`: The predicate return type must be boolean (used to retain or exclude elements).
- `: number[]`: The resulting filtered collection is typed as a `number[]`.

### Code Example

```typescript
let responseCode: number[] = [200, 201, 404, 500, 302, 403];

function getFailedCodes(codes: number[]): number[] {
    return codes.filter(function (code: number): boolean {
        return code >= 400;
    });
}

console.log("All Codes", responseCode);
console.log("Failed Codes", getFailedCodes(responseCode));
```

### Key Points
- **Homogeneous Collections:** `number[]` rejects strings, objects, or `null` values at compile time, eliminating defensive `typeof code === "number"` checks inside the filtering logic.
- **Predicate Safety:** Ensuring the filter callback returns a boolean prevents subtle bugs where truthy/falsy coercion might lead to unexpected filter outcomes.
- **Array Immutability:** `.filter()` returns a brand-new array, leaving the original `responseCode` array unaltered.

---

## Common Mistakes
- **Using `Array<any>` or `any[]`:** Negates TypeScript's type protection, allowing invalid elements to sneak into the collection.
- **Mutating input arrays inside filter callbacks:** Predicates should be pure functions with zero side effects.

---

## Summary
**Key Takeaway:** Typed arrays (`number[]`) combined with strictly typed predicate functions ensure compile-time integrity for array operations like filtering API response codes.
