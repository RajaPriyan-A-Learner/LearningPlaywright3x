# 202 — Inline Object Type Annotations and Structural Typing

**File:** `25_chapter_TypeScript/202.ts`

## Overview
This file demonstrates **Inline Object Type Annotations** in TypeScript using a `user` object with `{ name: string; age: number }`. It introduces TypeScript's **Structural Type System**, showing how object shapes are explicitly defined, checked for required properties, and protected against invalid property assignments.

---

## Main Concept

In JavaScript, objects are dynamic collections of key-value pairs where any property can be added, modified, or deleted at runtime. TypeScript allows developers to enforce an exact structural contract on an object literal using an object type annotation.

### Object Type Anatomy
```typescript
let user: { name: string; age: number } = {
    name: "John",
    age: 30
};
```
- `name: string`: Property `name` is mandatory and must be of type string.
- `age: number`: Property `age` is mandatory and must be of type number.
- Semicolons `;` or commas `,` can be used to separate properties within the type literal.

### Structural Typing ("Duck Typing" at Compile Time)
TypeScript cares about the *shape* that a value has. If two objects have the same property names and types, TypeScript treats them as compatible regardless of how they were defined.

### Code Example

```typescript
// Object annotations: specifying required property names and types
let user: { name: string; age: number } = {
    name: "John",
    age: 30
};

console.log(`User: ${user.name}, Age: ${user.age}`);

// ❌ TypeScript Compiler Errors:
// user.name = 123; // Error: Type 'number' is not assignable to type 'string'
// user.isAdmin = true; // Error: Property 'isAdmin' does not exist on type '{ name: string; age: number; }'
// let invalidUser: { name: string; age: number } = { name: "Bob" }; // Error: Property 'age' is missing
```

### Key Points
- **Excess Property Checks:** When assigning an object literal directly, TypeScript forbids extra properties not declared in the type definition.
- **Optional Properties:** Adding `?` makes a property optional (e.g., `email?: string`).
- **Readonly Properties:** Adding `readonly` prevents property reassignment after initialization (e.g., `readonly id: number`).

---

## Common Mistakes
- **Typos in property names:** In vanilla JS, accessing `user.nage` silently evaluates to `undefined`. In TypeScript, the compiler instantly flags that `nage` does not exist on `{ name: string; age: number }`.
- **Forgetting required properties:** Missing even one declared property without `?` produces a compiler error.

---

## Summary
**Key Takeaway:** Inline object type annotations define structural contracts for JavaScript objects, guaranteeing that required properties exist with the correct data types.
