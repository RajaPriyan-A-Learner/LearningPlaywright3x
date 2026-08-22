# 123_Call_ByVal_Call_ByRef — Value vs. Reference

**File:** `14_chapter_Objects/123_Call_ByVal_Call_ByRef.js`

## Overview
This file demonstrates one of the most critical concepts in JavaScript: the difference between passing data by Value (primitives) and passing data by Reference (objects and arrays).

## Main Concept
Primitive types (Numbers, Strings, Booleans, Null, Undefined) are copied by **Value**. When you assign them to a new variable, a completely independent copy of the data is made.
Objects and Arrays are passed by **Reference**. When you assign them to a new variable, only the memory address (reference) is copied, meaning both variables point to the exact same object.

### Code Example

```javascript
// Primitive (Call by Value)
let a = 10;
let b = a; // A fresh copy of '10' is created in memory
b = 99;    // Modifying 'b' does nothing to 'a'
console.log(a); // 10
console.log(b); // 99

console.log("-----")

// Objects (Call by Reference)
let obj1 = { val: 10 };
let obj2 = obj1; // Copies the memory pointer! Both look at the same object.
obj2.val = 99;   // Modifying 'obj2' mutates the shared object.
console.log(obj1.val); // 99 (Affected by the change to obj2)
```

### Key Points
- **Primitives are isolated:** Changing one primitive variable never affects another.
- **Objects are shared:** Changing a nested property of a copied object variable affects the original object.
- To create a truly independent copy of an object, you must clone it (e.g., using the Spread operator `{...obj1}` or `structuredClone()`).

---

## Common Mistakes
- **Accidental State Mutation:** A frequent bug in testing frameworks is defining a baseline config object, copying it for a specific test case (`let testConfig = baseConfig`), and changing a value. Because it's passed by reference, the `baseConfig` is ruined for all subsequent tests!

---

## Summary
**Key Takeaway:** Primitives are copied completely (by value), ensuring independence, while Objects and Arrays are copied by memory address (by reference), meaning mutations affect all variables holding that reference.
