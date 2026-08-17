# 31_Type_Op — typeof Operator for Type Detection

**File:** `05_chapter_Operator/31_Type_Op.js`

## Overview

The `typeof` operator returns a string indicating the type of its operand. It's fundamental for type checking and guarding in JavaScript, though it has some quirks (notably returning "object" for null and arrays). Understanding typeof's behavior and limitations is essential for defensive programming and type validation.

---

## Main Concept

The `typeof` operator evaluates its operand and returns one of seven strings: "string", "number", "boolean", "bigint", "undefined", "symbol", "function", or "object". While useful for primitive type detection, it has known false positives (null is "object") and cannot distinguish between different object types (arrays, objects, dates all return "object").

### Code Example

```javascript
// String type
console.log(typeof "hello");      // "string"
console.log(typeof '');           // "string"

// Number types
console.log(typeof 123);          // "number"
console.log(typeof 31.4);         // "number"
console.log(typeof NaN);          // "number" (gotcha!)
console.log(typeof Infinity);     // "number"

// Boolean
console.log(typeof true);         // "boolean"
console.log(typeof false);        // "boolean"

// Undefined
console.log(typeof undefined);    // "undefined"

// Objects (all return "object")
console.log(typeof {});           // "object"
console.log(typeof []);           // "object" (arrays are objects!)
console.log(typeof null);         // "object" (famous bug)

// Functions
console.log(typeof function() {}); // "function"
console.log(typeof (() => {}));    // "function"

// Symbols
console.log(typeof Symbol("id")); // "symbol"

// BigInt
console.log(typeof 100n);         // "bigint"
```

### Key Points

- **typeof returns a string**: The result is always a string like "string", "number", etc., not a type itself.
- **null returns "object" (bug)**: This is a famous JavaScript quirk from early implementations. Always use `val === null` for null checks.
- **Arrays return "object"**: Use `Array.isArray(val)` for reliable array detection, not `typeof`.
- **NaN is a number**: Despite its name, `typeof NaN` returns "number"; it's a special numeric value.
- **Functions have their own type**: `typeof function() {}` returns "function", making function detection reliable.
- **Symbols are unique**: `typeof Symbol()` returns "symbol"; symbols are primitives introduced in ES6.
- **BigInt is distinct**: `typeof 100n` returns "bigint"; BigInt is for large integers beyond Number.MAX_SAFE_INTEGER.

---

## Common Mistakes

**Mistake 1: Using typeof to check for null**
```javascript
// Wrong: typeof null returns "object"
if (typeof value === "object" && value !== null) { } // Necessary guard

// Right: check for null explicitly
if (value === null) { }
if (value == null) { } // Includes undefined
```

**Mistake 2: Using typeof to check if value is an array**
```javascript
// Wrong: typeof array returns "object"
if (typeof arr === "array") { } // Never true!

// Right: use Array.isArray()
if (Array.isArray(arr)) { }
```

**Mistake 3: Forgetting that NaN is a number**
```javascript
// Wrong: checking for NaN with typeof
if (typeof result === "number" && isNaN(result)) { }

// Right: use Number.isNaN()
if (Number.isNaN(result)) { }
```

**Mistake 4: Using typeof to distinguish object types**
```javascript
// Wrong: can't distinguish Date, RegExp, Map, etc.
let obj = new Date();
console.log(typeof obj); // "object" (not helpful)

// Right: use instanceof or other methods
console.log(obj instanceof Date); // true
console.log(Object.prototype.toString.call(obj)); // "[object Date]"
```

---

## Interview-Ready Definitions

1. **typeof Operator**: A unary operator that returns a string indicating the type of its operand. One of seven values: "string", "number", "boolean", "bigint", "undefined", "symbol", "function", "object".

2. **Type Guarding**: Using typeof or similar checks to ensure an operand is a specific type before performing operations on it.

3. **Primitive Types**: Basic types (string, number, boolean, bigint, undefined, symbol, null) detected by typeof (except null, which has a bug).

4. **Object Types**: Complex types (objects, arrays, functions, dates) that return "object" or "function" from typeof.

5. **Type Coercion Prevention**: Using typeof to guard against operations that would trigger unwanted type coercion.

---

## Tricky Interview Questions

1. **What does `typeof "hello"` return?**
   - Answer: "string". The typeof operator returns a string representing the type.

2. **What does `typeof 123` return?**
   - Answer: "number". Both integers and floats return "number".

3. **Why does `typeof null` return "object"?**
   - Answer: It's a famous bug in JavaScript from early implementations where null was incorrectly typed as an object. The spec maintains it for backward compatibility.

4. **What does `typeof []` return?**
   - Answer: "object". Arrays are objects; use `Array.isArray([])` for reliable array detection.

5. **What does `typeof NaN` return?**
   - Answer: "number". NaN is a special number value. Use `Number.isNaN()` to check for NaN.

6. **What does `typeof undefined` return?**
   - Answer: "undefined". It's the only value that returns this string.

7. **What does `typeof function() {}` return?**
   - Answer: "function". Functions have their own typeof return value, making them easy to detect.

8. **Can typeof distinguish between different object types?**
   - Answer: No, `typeof {}`, `typeof []`, `typeof new Date()` all return "object". Use `instanceof` or other methods.

9. **What does `typeof Symbol("id")` return?**
   - Answer: "symbol". Symbols are a primitive type introduced in ES6.

10. **What does `typeof 100n` return?**
    - Answer: "bigint". BigInt literals end with 'n' and have their own typeof return value.

11. **Is `typeof` safe to use on undefined variables?**
    - Answer: Yes, unlike accessing undefined variables directly, `typeof undefinedVar` returns "undefined" without throwing an error.

12. **What's the result of `typeof (1 + 2)`?**
    - Answer: "number". The addition is evaluated first (result is 3), then typeof is applied.

13. **What does `typeof typeof 5` return?**
    - Answer: "string". `typeof 5` returns "number" (a string), then `typeof "number"` returns "string".

14. **Can typeof be used to check if a variable is declared?**
    - Answer: Yes, `typeof undeclaredVar` returns "undefined" without throwing ReferenceError, making it useful for existence checks.

15. **What's a more reliable way to check if a value is an object (including arrays)?**
    - Answer: `typeof value === "object" && value !== null`. But for specific types (arrays, dates, etc.), use `instanceof`.

---

## Deep Insights & Gotchas

- **typeof is unreliable for complex type checking**: For anything beyond primitives and functions, prefer `instanceof`, `Array.isArray()`, or `Object.prototype.toString.call()`.

- **typeof doesn't trigger getter side effects**: Unlike accessing properties, `typeof` doesn't invoke getters, making it safe for checking undefined variables.

- **The null bug is permanent**: The spec will never change this for backward compatibility. Always remember `typeof null === "object"` is a bug.

---

## Summary

**Key Takeaway:** The typeof operator returns a string indicating type but has quirks (null is "object", arrays are "object"); use it for primitives and functions, but prefer instanceof or Array.isArray() for complex type checking.
