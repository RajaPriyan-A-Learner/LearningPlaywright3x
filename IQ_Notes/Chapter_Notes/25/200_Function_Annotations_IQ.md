# 200 — Function Parameter and Return Type Annotations

**File:** `25_chapter_TypeScript/200.ts`

## Overview
This file demonstrates explicit **Function Annotations** in TypeScript using the `greet(name: string): string` function. It illustrates how annotating both input parameters and the output return value creates an immutable contract for function execution.

---

## Main Concept

In TypeScript, function declarations can annotate both:
1. **Input Parameter Types:** `(name: string)` ensures callers only provide strings.
2. **Output Return Type:** `: string` ensures that the function implementation always returns a string, preventing unintended return paths.

### Template Literals and Return Enforcement
```typescript
function greet(name: string): string {
    return `Hello, ${name}!`;
}
```
The template literal expression `` `Hello, ${name}!` `` evaluates to a primitive `string`. Because the declared return type is `: string`, TypeScript confirms that every execution branch fulfills this contract.

### Code Example

```typescript
// Function annotations: parameter typed as string, return typed as string
function greet(name: string): string {
    return `Hello, ${name}!`;
}

const greeting = greet("Alice");
console.log(greeting); // "Hello, Alice!"

// ❌ TypeScript Compiler Errors:
// greet(123);           // Error: Argument of type 'number' is not assignable to parameter of type 'string'
// let n: number = greet("Bob"); // Error: Type 'string' is not assignable to type 'number'
```

### Key Points
- **Contract Guarantee:** The caller can trust that `greeting` has all `string` methods (`.length`, `.toUpperCase()`, `.includes()`) without defensive runtime checks.
- **Exhaustive Return Checks:** Under `"noImplicitReturns": true`, if a function with `: string` has conditional branches where one branch misses a `return` statement, the compiler flags an error.
- **Refactoring Safety:** Renaming or restructuring function logic is protected because return type discrepancies are caught immediately.

---

## Common Mistakes
- **Relying solely on return type inference:** While TypeScript can infer `: string` from `` `Hello, ${name}!` ``, explicit return annotations prevent accidental changes in return types during refactoring.
- **Missing return statements:** If a function declared to return `: string` omits a return statement in some branch, TypeScript flags a compilation error.

---

## Summary
**Key Takeaway:** Function annotations explicitly define the contract between a function and its callers, ensuring type correctness for inputs and outputs alike.
