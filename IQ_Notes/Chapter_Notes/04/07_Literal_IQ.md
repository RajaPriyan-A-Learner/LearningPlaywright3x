# 07_Literal — JavaScript Literals and Type Detection with typeof

**File:** `04_chapter_Literal/07_Literal.js`

## Overview

Literals are fixed values written directly in code (numbers, strings, booleans, null, undefined). The `typeof` operator identifies the data type of any value or expression. Understanding both is essential for type-aware programming—knowing what data you have and how to handle it safely.

---

## Main Concept

A **literal** is a value that appears directly in code (you literally write it). The **typeof operator** examines that value and returns a string describing its type.

### Code Example

```javascript
let age = "raja";               // String literal
let isStudent = true;           // Boolean literal
let pi = 3.14;                  // Numeric literal
let name = 'Alice';             // String literal
let nullValue = null;           // Null literal
let undefinedValue;             // Undefined (no assignment)
let pi2 = 3;                    // Numeric literal

console.log(typeof age);            // "string"
console.log(typeof pi);             // "number"
console.log(typeof pi2);            // "number"
console.log(typeof isStudent);      // "boolean"
console.log(typeof nullValue);      // "object" (famous quirk!)
console.log(typeof undefinedValue); // "undefined"
```

### Key Points

- **Literals are values written in code:** Numbers (42, 3.14), strings ("hello"), booleans (true/false), null, undefined
  ```javascript
  let x = 42;         // 42 is numeric literal
  let y = "hello";    // "hello" is string literal
  let z = true;       // true is boolean literal
  ```

- **typeof returns type as string:** Always returns a string (never undefined, number, or other type)
  ```javascript
  typeof 42 === "number"        // true
  typeof "hello" === "string"   // true
  typeof true === "boolean"     // true
  ```

- **All number types return "number":** No distinction between int, float, decimal, hex, octal, exponential
  ```javascript
  typeof 42 === "number"           // true
  typeof 3.14 === "number"         // true
  typeof 0xFF === "number"         // true (hex)
  typeof 1e6 === "number"          // true (exponential)
  ```

- **typeof null returns "object" — famous bug:** Not a bug in behavior but naming. null is primitive, not object. Historical quirk from JS design.
  ```javascript
  typeof null === "object"         // true (quirk!)
  typeof undefined === "undefined" // true
  ```

- **typeof for undefined is safe:** Accessing undefined variable throws ReferenceError, but typeof handles it gracefully
  ```javascript
  typeof doesNotExist === "undefined"  // true (safe check!)
  console.log(doesNotExist);           // ReferenceError! Would crash
  ```

---

## Common Mistakes

- **Mistake 1: Assuming typeof null returns "null"**
  ```javascript
  // WRONG - checking null
  if (typeof value === "null") {  // Never true!
    console.log("Value is null");
  }
  
  // RIGHT - use === null
  if (value === null) {
    console.log("Value is null");
  }
  ```

- **Mistake 2: Confusing typeof with instanceof**
  ```javascript
  // WRONG - typeof for object instances
  let arr = [];
  typeof arr === "array"   // false! Returns "object"
  
  // RIGHT - use instanceof or Array.isArray()
  arr instanceof Array     // true
  Array.isArray(arr)       // true (best for arrays)
  ```

- **Mistake 3: Treating typeof result as anything but string**
  ```javascript
  // WRONG - typeof always returns string
  if (typeof x) {  // "string" always truthy!
    // Runs even if x is 0, false, null
  }
  
  // RIGHT - compare to string literal
  if (typeof x === "number") {
    // Runs only if x is actually a number
  }
  ```

- **Mistake 4: Using typeof with loose equality**
  ```javascript
  // RISKY - loose equality can mislead
  if (typeof x == "number") {  // Works but bad habit
  
  // GOOD - strict equality always
  if (typeof x === "number") {  // Clear, strict
  ```

---

## Interview-Ready Definitions

**Literal:** Fixed value written directly in code. Examples: numbers (42, 3.14), strings ("hello", 'world'), booleans (true, false), null, undefined.

**typeof operator:** Unary operator returning string indicating type of operand. Returns "number", "string", "boolean", "undefined", "object", "function", or "bigint".

**Type quirk:** Unexpected behavior in type system. Classic: `typeof null === "object"` because null misclassified in original JavaScript design.

**Primitive type:** Basic data type in JavaScript: number, string, boolean, undefined, null, symbol, bigint. Cannot have properties added (unlike objects).

**Type checking:** Determining or verifying value type. Can use typeof (operator), instanceof (for objects), Array.isArray() (for arrays), or constructor property.

---

## Tricky Interview Questions

1. **What does typeof always return?**
   - Answer: A string. typeof 42 returns "number" (string), not a number type. Always compare to string: `typeof x === "number"`.

2. **Why does typeof null return "object"?**
   - Answer: Historical bug in original JavaScript specification. null should return "null", but can't fix without breaking existing code.

3. **How do you safely check for undefined without throwing ReferenceError?**
   ```javascript
   if (typeof x === "undefined") { }  // Safe
   if (x === undefined) { }           // May throw error
   ```
   - Answer: Use typeof. Direct comparison throws ReferenceError if variable never declared.

4. **What's the difference between undefined and null?**
   - Answer: undefined = JavaScript auto-sets when variable uninitialized. null = developer explicitly sets to mean "intentionally empty".

5. **Can you check array type with typeof?**
   ```javascript
   typeof [] === "array"  // false!
   typeof [] === "object" // true
   ```
   - Answer: No. Arrays return "object". Use Array.isArray() or instanceof Array.

6. **What's the practical use of typeof?**
   - Answer: Type guards in conditionals, API validation, optional parameter checking. Example: `if (typeof callback === "function") callback();`

7. **Does typeof work on undefined variables?**
   ```javascript
   typeof nonExistent === "undefined"  // true (safe!)
   nonExistent                         // ReferenceError!
   ```
   - Answer: Yes, typeof is safe. Direct access throws error, but typeof prevents it.

8. **Which typeof result is most dangerous for type checking?**
   - Answer: "object". Returns for arrays, null, and objects. Can't distinguish with typeof alone; need Array.isArray() or instanceof.

9. **How many types does typeof return?**
   - Answer: 7 types: "number", "string", "boolean", "undefined", "object", "function", "bigint" (ES2020).

10. **Why is this code problematic?**
    ```javascript
    if (typeof value) { }  // Checking truthiness, not type
    ```
    - Answer: Checks truthiness, not type. 0, "", false, null, undefined all fail but aren't undefined.

11. **What's the fastest way to check multiple types?**
    - Answer: Use multiple typeof checks for 2-3 types. For many: switch or object map {number: handler, string: handler}.

12. **Can typeof ever return "array"?**
    - Answer: No, never. typeof never returns "array". Arrays return "object". Use Array.isArray() specifically.

---

## Deep Insights & Gotchas

- **typeof null === "object" is unfixable:** Changing it breaks all existing websites. Legendary design mistake now locked in forever.

- **typeof doesn't distinguish object types:** Objects, arrays, functions blurred. Functions return "function" in modern JS, but historically inconsistent.

- **typeof undefined doesn't throw error:** Unique safety property. Only typeof allows checking undeclared variables safely.

- **typeof NaN returns "number":** NaN means "Not-a-Number" but typeof says "number". Check with isNaN() or Object.is(NaN, value).

- **typeof with no operand returns "undefined":** Edge case. If you call typeof without expression, returns "undefined".

---

## Summary

**Key Takeaway:** Literals are fixed values in code (numbers, strings, booleans, null, undefined). typeof operator returns string describing type. Recognize typeof null returns "object" (famous quirk). Use typeof for safe undefined checks; use Array.isArray() or instanceof for specific object types.
