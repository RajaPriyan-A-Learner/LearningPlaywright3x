# 119_Object_Person — Complex Nested Objects

**File:** `14_chapter_Objects/119_Object_Person.js`

## Overview
This file provides a massive, comprehensive example of a deeply nested JSON-like object representing a user's profile, including arrays, nested objects, and object methods.

## Main Concept
Real-world data (like API payloads) is rarely flat. Objects can contain properties that are strings, numbers, arrays, nested objects, or even functions (methods). 

### Code Example

```javascript
const user = {
    id: 1001,
    fullName: "Pramod Dutta",
    
    // Nested Object
    address: {
        city: "Bengaluru",
        state: "Karnataka"
    },
    
    // Arrays inside object
    skills: ["JavaScript", "Playwright"],
    
    // Object Method using 'this'
    getIntroduction() {
        return `Hi, I am ${this.fullName} from ${this.address.city}.`;
    }
};

console.log(user.skills[1]); // "Playwright"
console.log(user.address.city); // "Bengaluru"
console.log(user.getIntroduction()); // "Hi, I am Pramod Dutta from Bengaluru."
```

### Key Points
- You navigate nested objects by chaining dot notation (e.g., `user.address.city`).
- Methods (functions inside objects) can use the `this` keyword to access sibling properties belonging to the same object.
- This structure closely mimics the JSON payloads you receive from REST APIs, forming the backbone of data-driven UI testing.

---

## Common Mistakes
- **Forgetting `this` in methods:** Inside `getIntroduction()`, writing `return fullName` instead of `this.fullName` will throw a ReferenceError, as `fullName` is not a local variable.

---

## Summary
**Key Takeaway:** JavaScript objects can be deeply nested with complex types; you must master chaining dot notation and bracket notation to extract specific data from large API responses.
