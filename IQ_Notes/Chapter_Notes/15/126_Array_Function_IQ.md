# 126_Array_Function — Functional array methods on 2D arrays

**File:** `15_chapter_Multi_Dimensional_Array/126_Array_Function.js`

## Overview
This file explores applying advanced functional array methods (like `.map()` and `.reduce()`) to 2D arrays, as well as searching inside nested arrays.

## Main Concept
Since a 2D array is just an array of arrays, you can chain functional methods. By using `.map()` on the outer array, you isolate each row. Then, you can apply `.reduce()` to that specific row to aggregate its data (like finding the sum of all elements in that row).

### Code Example

```javascript
let scores = [
    [85, 90, 78],
    [60, 45, 70],
    [95, 88, 92]
];

// Calculates the sum for each student (row)
let rowSums = scores.map(row => row.reduce((a, b) => a + b));
console.log(rowSums); // [253, 175, 275]

// Searching for failures across a test suite matrix
let suiteResults = [
    ["login-pass", "register-pass", "logout-pass"],
    ["search-pass", "filter-fail", "sort-pass"]
];

for (let i = 0; i < suiteResults.length; i++) {
    for (let j = 0; j < suiteResults[i].length; j++) {
        if (suiteResults[i][j].includes("fail")) {
            console.log("Failed test found:", suiteResults[i][j]);
        }
    }
}
```

### Key Points
- `scores.map(row => ...)` iterates over the outer array, passing the inner array as the `row` variable.
- `.reduce((a,b) => a+b)` executes on the inner array, collapsing it into a single sum.
- You can combine nested loops with string methods (like `.includes()`) to search multi-dimensional tabular data.

---

## Common Mistakes
- **Forgetting that `.map()` returns an array:** When you do `rowSums = scores.map(...)`, you are creating a new 1D array where each element corresponds to the result of the operation performed on that specific row.

---

## Summary
**Key Takeaway:** You can easily collapse 2D arrays into 1D arrays (or single values) by chaining array methods like `.map()` to iterate over rows, and `.reduce()` to process the items within those rows.
