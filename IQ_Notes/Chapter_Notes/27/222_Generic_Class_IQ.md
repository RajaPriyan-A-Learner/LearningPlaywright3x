# 222 — Generic Classes and Type-Safe In-Memory Stores

**File:** `27_chapter_Generics/222_Generic_Class.ts`

## Overview
This file demonstrates **Generic Classes** in TypeScript through `TestDataStorage<T>`. It shows how class definitions can accept a type parameter (`<T>`) to manage in-memory collections (such as HTTP response codes or test suite names) with complete compile-time type safety, private encapsulation (`private items: T[]`), and reusable methods (`add`, `getFirst`, `getAll`, `count`).

---

## Main Concept

A generic class defines a reusable blueprint where the type of managed data is parameterized. Multiple distinct instances of the class can be created for different data types while sharing a single implementation.

### Generic Class Architecture
```typescript
class TestDataStorage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }
    getFirst(): T {
        return this.items[0]!;
    }
    getAll(): T[] {
        return this.items;
    }
    count(): number {
        return this.items.length;
    }
}
```

### Code Example

```typescript
class TestDataStorage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }
    getFirst(): T {
        return this.items[0]!;
    }
    getAll(): T[] {
        return this.items;
    }
    count(): number {
        return this.items.length;
    }
}

let statuscodeStore = new TestDataStorage<number>();
let testNameStore = new TestDataStorage<string>();

statuscodeStore.add(200);
statuscodeStore.add(404);
statuscodeStore.add(500);

testNameStore.add("Login Test");
testNameStore.add("Checkout Test");

console.log("Codes:", statuscodeStore.getAll());
console.log("First code:", statuscodeStore.getFirst());
console.log("Tests:", testNameStore.getAll());
console.log("Test count:", testNameStore.count());

// ❌ TypeScript Prevents Type Poisoning:
// statuscodeStore.add("500"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### Key Points
- **Homogeneous Storage:** `statuscodeStore` only accepts numbers; `testNameStore` only accepts strings. Crossing them is flagged by the compiler.
- **Encapsulation:** The internal array `private items: T[]` cannot be directly mutated or replaced from the outside.
- **Automation Use Case:** Ideal for in-memory test data fixtures, execution queue managers, and API token caches across automated test runners.

---

## Common Mistakes
- **Attempting to parameterize static members:** Static members of a class cannot use the class's type parameter (`<T>`) because static members exist on the constructor function, not on instances.
- **Forgetting type parameters on instantiation:** Writing `new TestDataStorage()` without type arguments infers `TestDataStorage<unknown>`, restricting operations on stored items.

---

## Summary
**Key Takeaway:** Generic classes (`class Store<T>`) encapsulate data management operations while tailoring collection types to numbers, strings, or complex domain objects with compile-time type safety.
