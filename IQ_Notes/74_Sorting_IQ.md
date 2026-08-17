# 74_Sorting — Arrays

**File:** ${jsFile.Name}

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

\\\javascript
let fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits);
//  alphabetical by default 

let score = [4,3,2];
console.log(score.sort());

let nums = [10,1,21,2];
// nums.sort();
console.log(nums); //  1,2,10,21 -
// Natural Sorting - Lexicographic / string sort 

// Proper Sorting, Asc , Desc
// nums.sort((a,b) => a-b);

nums.sort((a,b) => b-a); // Desc
console.log(nums);
nums.reverse();
console.log(nums);
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
