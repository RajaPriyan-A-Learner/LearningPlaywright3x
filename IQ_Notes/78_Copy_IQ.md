# 78_Copy — Arrays

**File:** ${jsFile.Name}

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

\\\javascript
// Shallow Copy
// Original array will not change if you change the copy. 

let original = [1, 2, 3];
let copy1 = [...original]; // spread
// console.log(original);
// console.log(copy1);

let copy2 = original.slice();
// console.log(copy2);

let copy3 = Array.from(original);
//  console.log(copy3);

let copy4 = original.concat();
// console.log(copy4);

console.log(" ---- ");
copy1.push(99);
console.log(original);
console.log(copy1);

// Deep cOPY
let deep_copy_array = original;
// Deep copy

deep_copy_array.push(91);
console.log(original);
console.log(deep_copy_array);
\\\

### Key Points

- Point 1
- Point 2
- Point 3

---

## Common Mistakes

- Mistake 1
- Mistake 2

---

## Summary

**Key Takeaway:** Write the most important takeaway from this lesson in one sentence.
