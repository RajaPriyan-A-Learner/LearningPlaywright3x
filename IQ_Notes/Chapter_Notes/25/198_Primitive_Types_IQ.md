# 198 — TypeScript Primitive Types, Arrays, and Any vs Unknown

**File:** `25_chapter_TypeScript/198.ts`

## Overview
This file provides a comprehensive tour of TypeScript's **Primitive Data Types**, array declaration syntaxes (`number[]` and `Array<string>`), and introduces the fundamental distinction between the unsafe `any` type and the type-safe `unknown` type.

---

## Main Concept

TypeScript includes direct type representations for all core JavaScript primitives, plus specialized top types (`any`, `unknown`) to handle dynamic or unverified data safely.

### Primitive Types
- `string`: Textual data (`"John"`).
- `number`: Floating-point and integer numbers (`30`, `3.14`, `398765434567`). Note: TypeScript does not have a separate `float` or `int` keyword; all numbers are typed as `number`.
- `boolean`: `true` or `false`.
- `null`: Intentional absence of any object value.
- `undefined`: Variable declared but not assigned a value.

### Arrays
- Array square-bracket syntax: `number[] = [1, 2, 3]`
- Generic array syntax: `Array<string> = ["John", "Jane"]`

### `any` vs `unknown`
- `any`: Disables all type checking. You can call arbitrary methods or access non-existent properties on an `any` variable without compiler warnings.
- `unknown`: Safe counterpart to `any`. Represents any value, but TypeScript forbids reading properties or calling methods on it without first performing type narrowing (e.g., via `typeof`).

### Code Example

```typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let pi: number = 3.14; // Note: TypeScript has no 'float' type; uses 'number'
let distance_to_moon: number = 398765434567;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Any (avoid when possible - turns off type safety)
let anything: any = "hello";
anything.nonExistentMethod(); // No compile error, crashes at runtime!

// Unknown (type-safe top type - requires narrowing)
let unknownVal: unknown = "hello";
// unknownVal.toUpperCase(); // ❌ Compile error: Object is of type 'unknown'
if (typeof unknownVal === "string") {
    console.log(unknownVal.toUpperCase()); // ✅ Allowed: TypeScript narrowed it to string
}
```

### Key Points
- **Single Numeric Type:** Unlike C# or Java which distinguish `int`, `long`, `float`, and `double`, TypeScript uses a single `number` type based on IEEE 754 double-precision floats.
- **Top Types:** Both `any` and `unknown` accept any value, but `unknown` enforces compile-time safety by requiring verification before operations.
- **Strict Null Checks:** When `"strict": true` (or `"strictNullChecks": true`) is enabled, `null` and `undefined` cannot be assigned to `string` or `number` variables without a union type (e.g., `string | null`).

---

## Common Mistakes
- **Overusing `any`:** Defeating the purpose of using TypeScript by annotating messy data structures as `any`.
- **Looking for `float` or `int`:** Attempting `let pi: float = 3.14` produces a compiler error because TypeScript only recognizes `number`.

---

## Summary
**Key Takeaway:** TypeScript mirrors JavaScript primitives under static types (`string`, `number`, `boolean`, `null`, `undefined`) while offering typed arrays and distinguishing between unrestricted `any` and type-safe `unknown`.
