# 211 — Readonly Properties in Interfaces

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/211_Readonly.ts`

## Overview
This file demonstrates **Readonly Properties** in TypeScript interfaces using a 2D geometric `Point` contract (`readonly x: number`, `readonly y: number`). Readonly properties enforce immutability on object properties after initialization, safeguarding critical test coordinates, locator references, and immutable environment settings.

---

## Main Concept

By prefixing a property with the `readonly` modifier, TypeScript prevents reassignment of that property once the object is created.

### Immutability Enforcement
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = {
    x: 10,
    y: 20
};

// ❌ Cannot assign to 'x' because it is a read-only property:
// point.x = 5;
```

### Code Example

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = {
    x: 10,
    y: 20
};

console.log(`Point coordinates: (${point.x}, ${point.y})`);

// ❌ TypeScript Compiler Error:
// point.x = 50; // Error: Cannot assign to 'x' because it is a read-only property.
```

### Key Points
- **Compile-Time Immutability:** `readonly` prevents property mutation during compilation, but note that emitted JavaScript will still have standard mutable properties unless frozen with `Object.freeze()`.
- **Shallow Immutability:** `readonly` only makes the immediate reference read-only. Nested objects inside a `readonly` property remain mutable unless they too are marked `readonly`.
- **Use Cases in Testing:** Ideal for fixed screen resolution bounds, canvas click coordinates, and baseline configuration constants.

---

## Common Mistakes
- **Confusing `const` with `readonly`:** `const` prevents reassigning the variable identifier (`point = ...`), whereas `readonly` prevents modifying a property on the object (`point.x = ...`).
- **Expecting deep immutability:** If a readonly property holds an array (`readonly tags: string[]`), calling `tags.push("new")` is still permitted unless typed as `readonly string[]`.

---

## Summary
**Key Takeaway:** The `readonly` modifier in TypeScript interfaces establishes compile-time property immutability, preventing unintentional modifications to key data structures.
