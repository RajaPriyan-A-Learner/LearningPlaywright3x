# 214 — Method Signatures in Interfaces and Object Implementation

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/214_Method_Interface.ts`

## Overview
This file demonstrates **Method Signatures in Interfaces** using a `Calculator` contract (`add`, `subtract`) and an `India` interface (`standUpNationalAnthem`). It illustrates how interfaces define operations with parameter and return types that can be satisfied directly by object literals using arrow functions.

---

## Main Concept

Interfaces can define operations by specifying method names, parameter lists, and return types. Object literals implementing the interface must supply matching functions.

### Method Signature Syntax
```typescript
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}
```
An object conforming to `Calculator` can implement these methods using standard function expressions or arrow functions.

### Code Example

```typescript
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const calc: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
};

const calc2: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
};

console.log("Sum (3 + 4):", calc.add(3, 4)); // 7
console.log("Difference (10 - 4):", calc.subtract(10, 4)); // 6

interface India {
    standUpNationalAnthem(a: string): string;
}

const citizen: India = {
    standUpNationalAnthem: (a) => "Respect shown: " + a
};
```

### Key Points
- **Parameter Type Inference:** When implementing an interface method via an arrow function (`(a, b) => a + b`), TypeScript automatically infers the types of `a` and `b` from the interface definition (`number`).
- **Method Syntax vs Property Syntax:** In interfaces, `add(a: number, b: number): number;` (method syntax) is bivariant in parameters, whereas `add: (a: number, b: number) => number;` (property syntax) is contravariant under `"strictFunctionTypes": true`.
- **Interchangeable Engines:** Different calculation, parsing, or locator strategies can implement the same interface and be swapped without changing client code.

---

## Common Mistakes
- **Returning wrong type:** If `add` returns a string or omits a return value, TypeScript immediately flags a type mismatch error.
- **Forgetting required methods:** If `calc` defines `add` but omits `subtract`, the object literal fails compilation.

---

## Summary
**Key Takeaway:** Method signatures in interfaces define operational contracts that object literals or classes must fulfill, enabling parameter type inference and interchangeable implementations.
