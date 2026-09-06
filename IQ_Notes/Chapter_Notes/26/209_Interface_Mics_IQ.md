# 209 — Index Signatures and Dynamic Key Dictionaries

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/209_Interface_Mics.ts`

## Overview
This file demonstrates **Index Signatures** in TypeScript interfaces using a `StringDictionary` interface (`[key: string]: string`). Index signatures allow modeling open-ended objects where the exact property names are unknown ahead of time, but the types of keys and values are strictly defined.

---

## Main Concept

When building test automation frameworks, certain data structures—such as environment variables (`process.env`), HTTP headers, test data lookup tables, and query parameter maps—have dynamic property names that cannot be enumerated in advance.

### Index Signature Syntax
```typescript
interface StringDictionary {
    [key: string]: string;
}
```
- `[key: string]`: Any string key is permitted as an index.
- `: string`: The value corresponding to any key must be a string.

### Code Example

```typescript
interface StringDictionary {
    [key: string]: string;
}

const dict: StringDictionary = {
    hello: "world",
    foo: "bar"
};

// Adding dynamic keys safely
dict["authHeader"] = "Bearer eyJhbGci...";
dict["environment"] = "staging";

console.log(dict["hello"]); // "world"
console.log(dict.foo);       // "bar"

// ❌ TypeScript Compiler Error:
// dict["port"] = 8080; // Error: Type 'number' is not assignable to type 'string'
```

### Key Points
- **Strict Value Typing:** Any property assigned to `dict` must match the value type specified in the index signature (`string`).
- **Mixed Explicit and Index Properties:** If an interface has both explicit properties and an index signature, all explicit property return types must be assignable to the index signature return type:
  ```typescript
  interface Config {
      name: string;
      [key: string]: string; // Valid because 'name: string' matches '[key: string]: string'
  }
  ```
- **Test Automation Applications:** Ideal for typing HTTP request headers, page element locator maps, and dynamic test data fixtures.

---

## Common Mistakes
- **Assuming undefined safety by default:** In standard TypeScript, accessing a non-existent key (`dict["missing"]`) is typed as `string`, even though it evaluates to `undefined` at runtime. (Enabling `"noUncheckedIndexedAccess": true` in `tsconfig.json` fixes this by typing lookups as `string | undefined`).
- **Using invalid index types:** In JavaScript/TypeScript, object keys can only be of type `string` or `number` (and `symbol`).

---

## Summary
**Key Takeaway:** Index signatures (`[key: string]: string`) allow TypeScript interfaces to enforce strict value types on dynamic, open-ended key-value collections such as HTTP headers and test data maps.
