# 121_Object_IQ2 — Modifying and Accessing Properties

**File:** `14_chapter_Objects/121_Object_IQ2.js`

## Overview
This file demonstrates the fundamental ways to interact with object properties: creating, reading, updating, and dynamically accessing them using bracket notation.

## Main Concept
Objects in JavaScript are dynamic; you can add or modify properties at any time after the object is created. You can use dot notation (`user.name`) for standard property names, or bracket notation (`user["age"]`) when property names are dynamic or contain special characters.

### Code Example

```javascript
const user = {
    name: "John",
    age: 30,
    email: "john@example.com"
};

// Reading
console.log(user.name); // "John"
console.log(user["age"]); // 30

// Updating existing properties
user.age = 31;

// Adding completely new properties
user.city = "NYC";

console.log(user); 
// { name: 'John', age: 31, email: 'john@example.com', city: 'NYC' }
```

### Key Points
- Even though `user` is declared with `const`, you can still modify its properties! `const` only prevents you from completely reassigning the `user` variable to a different object in memory.
- Bracket notation is especially useful when iterating through keys dynamically (e.g., `user[dynamicKeyName]`).

---

## Common Mistakes
- **Assuming `const` makes the object immutable:** A widespread misconception is that `const user = {}` means the object cannot be changed. The properties CAN be modified. If you want true immutability, you must use `Object.freeze(user)`.

---

## Summary
**Key Takeaway:** You can dynamically read, add, and modify object properties using dot or bracket notation, even if the object was initialized with the `const` keyword.
