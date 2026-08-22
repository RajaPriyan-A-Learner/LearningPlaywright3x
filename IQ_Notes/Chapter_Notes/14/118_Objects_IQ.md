# 118_Objects — Object Basics and References

**File:** `14_chapter_Objects/118_Objects.js`

## Overview
This file introduces the basics of defining JavaScript objects, accessing properties, understanding key case-sensitivity, and how object assignment works by reference rather than by value.

## Main Concept
Objects are collections of key-value pairs. They can be accessed using dot notation (`obj.key`) or bracket notation (`obj["key"]`). Crucially, when you assign an object to a new variable, you are copying the *memory reference*, not the object itself.

### Code Example

```javascript
// Basic Object and Case Sensitivity
let a22 = { status: "pass", Status: "fail" };
console.log(a22["status"]); // "pass"
console.log(a22["Status"]); // "fail" (Keys are case-sensitive)

// Assignment by Reference
let a = { status: "pass" };
let b = a;  // 'b' points to the exact same object in memory as 'a'
b.status = "fail";
console.log(a.status); // "fail" (Modifying 'b' mutates the shared object)

// Comparing References
let c = { status: "pass" };
let d = { status: "pass" };
console.log(c === d); // false (Different objects in memory, despite identical contents)
```

### Key Points
- Keys in objects are strings (or Symbols). `name` and `Name` are two completely different keys.
- Comparing two distinct objects with `===` always evaluates to `false` because they occupy different addresses in memory.
- JS Object literals have unquoted keys (`name: "John"`), whereas strict JSON requires quoted keys (`"name": "John"`).

---

## Common Mistakes
- **Accidental Mutations:** Creating `let user2 = user1` and modifying `user2.age`, expecting `user1` to remain untouched. Because objects are passed by reference, modifying one affects the other.

---

## Summary
**Key Takeaway:** Objects are mutable reference types; variables hold a pointer to the object in memory, so copying a variable copies the pointer, not the underlying data.
