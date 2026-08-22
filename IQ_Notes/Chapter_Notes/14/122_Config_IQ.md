# 122_Config — Overwriting and Deleting Properties

**File:** `14_chapter_Objects/122_Config.js`

## Overview
This file illustrates how to construct an object incrementally from scratch, overwrite its existing properties, and remove properties entirely using the `delete` operator.

## Main Concept
You don't need to define an object completely upfront. You can create an empty object (`{}`) and populate it line-by-line. Reassigning a property overwrites its old value. If a property is no longer needed, the `delete` keyword removes it completely.

### Code Example

```javascript
let config = {};

// Adding properties
config.browser = "Chrome";
config.timeout = 3000;

// Overwriting
config.timeout = 5000; // Overwrites 3000 with 5000

console.log(config); // { browser: 'Chrome', timeout: 5000 }

// Deleting
delete config.browser;

console.log(config); // { timeout: 5000 }
```

### Key Points
- `delete obj.property` physically removes the key-value pair from the object, so checking `if ("browser" in config)` will return `false`.
- This is very common in QA automation when building dynamic request payloads or configuration objects where some fields are optional.

---

## Common Mistakes
- **Setting to null instead of deleting:** Doing `config.browser = null` is NOT the same as `delete config.browser`. Setting it to null means the key still exists on the object (it just holds a null value), which might cause validation failures if an API strictly rejects unexpected keys.

---

## Summary
**Key Takeaway:** Objects can be built dynamically, properties can be easily overwritten, and the `delete` operator permanently removes a property entirely from the object.
