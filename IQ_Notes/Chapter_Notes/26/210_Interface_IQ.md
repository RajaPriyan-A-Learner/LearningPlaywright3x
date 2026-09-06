# 210 — User Interface Modeling and Object Literal Contracts

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/210_Interface.ts`

## Overview
This file demonstrates basic **Interface Modeling** in TypeScript using a `User` contract (`name: string`, `age: number`, `email: string`). It shows how an interface enforces structural consistency across multiple independent object instances (`user1`, `user2`, `user3`), standardizing entity modeling in test automation and application development.

---

## Main Concept

An interface defines the syntax for an object's structure. By annotating an object literal with an interface type (`const user1: User = { ... }`), TypeScript ensures that all required properties exist and adhere to their declared types.

### Structural Enforcement
In `User`:
- `name: string`: Must be a textual string.
- `age: number`: Must be a numeric value.
- `email: string`: Must be a textual string.

Any missing property or type discrepancy results in an immediate compile-time error.

### Code Example

```typescript
// Abstraction via Interface
interface User {
  name: string;
  age: number;
  email: string;
}

const user1: User = {
    name: "John",
    age: 30,
    email: "abc@gmail.com"
};

const user2: User = {
    name: "John2",
    age: 56,
    email: "abc@gmail.com"
};

const user3: User = {
    name: "John3",
    age: 23,
    email: "abc@gmail.com"
};

console.log(`User: ${user1.name} (${user1.age}) - ${user1.email}`);

// ❌ Compiler Error if property missing or wrong type:
// const badUser: User = { name: "Invalid", age: "thirty", email: "bad" };
```

### Key Points
- **Shared Data Contracts:** Reusable across mock data generators, API payload builders, and test user personas.
- **Excess Property Checks:** Passing undeclared properties directly in an object literal causes a compiler error.
- **Type Erasure:** The `User` interface is completely removed upon compilation to JavaScript, incurring zero runtime overhead.

---

## Common Mistakes
- **Assuming interfaces exist at runtime:** Calling `typeof user1 === "User"` throws a syntax error because `User` only exists at compile time.
- **Omitting mandatory properties:** Forgetting to supply `email` causes TypeScript to reject the assignment.

---

## Summary
**Key Takeaway:** The `User` interface standardizes object shapes, ensuring all user entities across test fixtures and services adhere to an identical structural contract.
