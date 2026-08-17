# 13_DataType — JavaScript Data Types Fundamentals

**File:** `05_chapter_Operator/13_DataType.js`

## Overview

JavaScript has 7 primitive data types and several object types that define how data is stored and manipulated. Understanding data types is critical for operators, type coercion, and writing correct code. JavaScript's dynamic typing and implicit type conversions create both power and pitfalls that appear frequently in coding interviews.

---

## Main Concept

JavaScript data types fall into two categories: **primitives** (immutable values stored directly) and **objects** (mutable reference types). The 7 primitive types are: string, number, boolean, bigint, undefined, null, and symbol. NaN (Not-a-Number) is a special number type, and arrays are objects.

### Code Example

```javascript
// Primitive data types
let str = "Hello";           // string
let num = 42;               // number
let bool = true;            // boolean
let bigNum = 9007199254740991n; // bigint
let notDefined;              // undefined (declared but no value)
let empty = null;           // null (explicit "no value")
let id = Symbol("id");      // symbol (unique identifier)

// Object types
let arr = [1, 2, 3];        // array (typeof = "object")
let obj = { name: "John" }; // object
let nan = NaN;              // number (but "Not-a-Number")

// Type checking
console.log(typeof str);    // "string"
console.log(typeof num);    // "number"
console.log(typeof nan);    // "number" (gotcha!)
console.log(typeof arr);    // "object" (not "array")
console.log(typeof null);   // "object" (famous JS quirk)
```

### Key Points

- **Primitives are immutable**: Once created, primitive values cannot be changed. String methods return new strings, not modify originals.
- **typeof operator is unreliable**: `typeof null` returns "object" (legacy bug), `typeof []` returns "object", `typeof undefined` returns "undefined".
- **NaN is a number**: Despite its name, `typeof NaN` returns "number"; it's the only value that's not equal to itself (`NaN === NaN` is false).
- **Symbols are unique**: Each Symbol is unique even if created with the same description; useful for object property keys and avoiding collisions.
- **BigInt for large integers**: Numbers safely hold integers up to 2^53-1; beyond that use BigInt (indicated by trailing 'n'), but BigInt cannot be mixed with regular numbers in arithmetic.

---

## Common Mistakes

**Mistake 1: Assuming typeof is reliable**
```javascript
// Wrong: treating typeof as foolproof
if (typeof value === "array") { } // NEVER returns true

// Right: use Array.isArray() for arrays
if (Array.isArray(value)) { }
```

**Mistake 2: Confusing null with undefined**
```javascript
// Wrong: treating them interchangeably
let val = null;
console.log(val === undefined); // false, they're different

// Right: understand null (intentional absence) vs undefined (accidental/declared-no-value)
let declared;                   // undefined
let nothing = null;             // null (programmer set it)
```

**Mistake 3: Relying on NaN equality**
```javascript
// Wrong: comparing NaN directly
let result = 0 / 0; // NaN
if (result === NaN) { } // Always false!

// Right: use Number.isNaN()
if (Number.isNaN(result)) { } // Correct
```

**Mistake 4: Mixing BigInt with numbers**
```javascript
// Wrong: mixing types in arithmetic
let big = 100n;
let small = 50;
let sum = big + small; // TypeError: Cannot mix BigInt and other types

// Right: convert explicitly
let sum = big + BigInt(small); // 150n
```

---

## Interview-Ready Definitions

1. **Primitive Type**: An immutable value type that holds data directly (string, number, boolean, bigint, undefined, null, symbol). Primitives are compared by value, not reference.

2. **Reference Type**: An object-based type (arrays, objects, functions) that stores a reference to memory location where data lives. Multiple variables can point to the same object reference.

3. **Type Coercion**: Automatic conversion of values from one type to another during operations. JavaScript performs implicit coercion in comparisons and arithmetic (e.g., "5" + 3 → "53", "5" - 3 → 2).

4. **NaN**: A special numeric value meaning "Not-a-Number", returned when arithmetic operations fail (0/0, Math.sqrt(-1)). Unique in that it's the only value not equal to itself.

5. **Symbol**: A primitive type introduced in ES6 representing unique, immutable identifiers. Symbols are never equal to any other value, making them useful for object keys that won't collide.

---

## Tricky Interview Questions

1. **What does `typeof null` return and why is it wrong?**
   - Answer: It returns "object" (not "null"). This is a famous JS bug from early implementations where `null` was incorrectly identified as an object type. The spec kept it for backward compatibility. Always use `val === null` for null checks.

2. **Why is `NaN !== NaN` true?**
   - Answer: NaN is defined such that it's not equal to any value, including itself. This is per IEEE 754 floating-point standard. Use `Number.isNaN()` or `Object.is(val, NaN)` to check for NaN.

3. **What's the difference between `undefined` and `null`?**
   - Answer: `undefined` means a variable was declared but not assigned (also returned by functions with no return). `null` means the programmer explicitly set "no value". Use `==` and you get `null == undefined` true, but `===` returns false.

4. **Will `typeof Symbol("id") === typeof Symbol("id")` be true or false?**
   - Answer: True. The typeof both symbols returns "symbol". However, the symbols themselves are not equal: `Symbol("id") === Symbol("id")` is false because each symbol is unique.

5. **What happens when you do `"5" - 3` vs `"5" + 3`?**
   - Answer: `"5" - 3` returns `2` (number), because `-` only works with numbers, forcing string "5" to coerce to 5. `"5" + 3` returns `"53"` (string) because `+` works for both addition and concatenation, favoring concatenation when one operand is a string.

6. **Can you mix BigInt and regular numbers in arithmetic?**
   - Answer: No, it throws TypeError. You must explicitly convert: `100n + BigInt(50)`. This strict separation prevents silent data loss, as BigInt can represent larger integers precisely.

7. **What's the safe integer limit in JavaScript?**
   - Answer: `Number.MAX_SAFE_INTEGER` is 2^53 - 1 (9,007,199,254,740,991). Beyond this, integer arithmetic becomes unsafe with regular numbers. This is why BigInt was introduced.

8. **Why is `typeof []` equal to `"object"` but `Array.isArray([])` is true?**
   - Answer: Arrays are objects (they inherit from Object.prototype). The `typeof` operator can't distinguish arrays from plain objects, both returning "object". For reliable array detection, use `Array.isArray()`.

9. **What's the result of `0 / 0` and why?**
   - Answer: It returns `NaN`. Division by zero for non-zero numerators (like `5 / 0`) returns `Infinity`, but zero divided by zero is mathematically undefined, so JavaScript returns NaN.

10. **If you do `let x;` and then `x == null`, what's the result?**
    - Answer: True. With `==` (loose equality), both `undefined == null` and `undefined == undefined` are true. With `===`, it would be false since the type of `undefined` is "undefined".

11. **What's the purpose of Symbol in JavaScript?**
    - Answer: Symbols create unique, immutable values that are often used as object property keys to avoid accidental name collisions. They don't appear in for...in loops or Object.keys(), providing "hidden" properties.

12. **What does `1 / 0` return and why?**
    - Answer: It returns `Infinity` (not NaN, not an error). JavaScript follows IEEE 754 standard where positive finite number / positive zero = Infinity. Negative would give -Infinity.

13. **Why would you use BigInt instead of Number for large integers?**
    - Answer: Numbers lose precision above 2^53-1 due to floating-point representation. BigInt guarantees precision for arbitrarily large integers, essential for cryptography, financial calculations, or big number operations.

14. **What's the result of `("" == 0) && ("0" == 0) && ("" == "0")`?**
    - Answer: False. With `==`, "" coerces to 0 (true), "0" coerces to 0 (true), but "" and "0" are both strings and compared as-is (false). Transitivity breaks with loose equality.

15. **How do you reliably check if a value is actually a number (not NaN)?**
    - Answer: Use `typeof val === "number" && !Number.isNaN(val)` or `typeof val === "number" && val === val` (since NaN !== NaN).

---

## Deep Insights & Gotchas

- **Type coercion is context-dependent**: The `+` operator treats "5" + 3 as concatenation (string precedence), while `-` forces numeric coercion. This inconsistency is a major source of bugs; prefer explicit conversion.

- **The typeof operator has known false positives**: It reports `typeof null === "object"` and `typeof [] === "object"`. You need Array.isArray(), Object.prototype.toString.call(), or instanceof for accurate type checking.

- **BigInt creates a type boundary**: BigInt values cannot be mixed with numbers, preventing silent precision loss. This is intentional strictness—operations must cross the boundary explicitly, making bugs obvious.

---

## Summary

**Key Takeaway:** JavaScript has 7 primitives and object types; use `typeof` cautiously (it has bugs with null and arrays), understand loose equality's coercion rules, and know that NaN, undefined, and null are each unique in their own way—the foundation for all type-related interview questions.
