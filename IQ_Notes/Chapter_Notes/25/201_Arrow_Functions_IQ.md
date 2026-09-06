# 201 — Arrow Function Annotations and Concise Body Typing

**File:** `25_chapter_TypeScript/201.ts`

## Overview
This file demonstrates **Arrow Function Type Annotations** in TypeScript using the `multiply` arithmetic helper (`(a: number, b: number): number => a * b`). It highlights how concise-body arrow expressions integrate parameter and return type annotations cleanly without multiline block syntax.

---

## Main Concept

Arrow functions introduced in ES6 provide a concise syntax for function expressions. In TypeScript, parameters inside the parentheses are annotated with `: type`, followed by the return type annotation `: type` placed before the fat arrow (`=>`).

### Syntax Anatomy
```typescript
const multiply = (a: number, b: number): number => a * b;
//                \___________________/  \_____/    \___/
//                     parameters        return     concise
//                                        type       body
```

### Function Type Signatures vs Inline Annotations
An arrow function can be typed inline as above, or typed via a separate function type signature:
```typescript
type BinaryOp = (a: number, b: number) => number;
const multiply: BinaryOp = (a, b) => a * b;
```

### Code Example

```typescript
// Arrow function annotations: parameters and explicit return type
const multiply = (a: number, b: number): number => a * b;

console.log("Product (5 * 4):", multiply(5, 4)); // 20

// ❌ TypeScript Compiler Error:
// multiply("5", 4); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### Key Points
- **Concise Body Return:** In concise body syntax (`=> expression`), the result of the expression is returned implicitly. The explicit `: number` guarantees that this expression evaluates to a numeric type.
- **Lexical `this` Binding:** Arrow functions preserve the lexical `this` of the enclosing scope, making them standard for array transformation callbacks (`.map()`, `.filter()`, `.reduce()`).
- **Higher-Order Callbacks:** Essential for test automation assertions and custom matcher predicates.

---

## Common Mistakes
- **Confusing the return arrow with the fat arrow:** In standalone type signatures, the arrow is `=>` (e.g., `(x: number) => number`), whereas in function declarations, the return type uses a colon `:` (e.g., `(x: number): number => x * 2`).
- **Returning object literals in concise bodies:** Writing `(id: string) => { id: id }` is parsed as a block body, not an object. Wrap in parentheses: `(id: string) => ({ id: id })`.

---

## Summary
**Key Takeaway:** Arrow functions support inline parameter and return type annotations, ensuring type safety in concise expressions and higher-order callbacks.
