# 75_Slicing — Arrays

**File:** ${jsFile.Name}

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

\\\javascript
// Slice & Combining

let arr = [1, 2, 3, 4, 5];
// slice(start, end) — returns new array, 
// does NOT mutate actual -> ( start, end-1) . index = 0
//Don't give the end, it will automatically 
// take from start to end.

console.log(arr.slice(1, 3));
console.log(arr);

console.log(arr.slice(2));


console.log(arr.slice(-2)); // Right side.
console.log(arr.slice(-3));

console.log(arr.slice(0));

console.log(arr.slice(-5));

console.log(arr.slice(-3, -5));
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
