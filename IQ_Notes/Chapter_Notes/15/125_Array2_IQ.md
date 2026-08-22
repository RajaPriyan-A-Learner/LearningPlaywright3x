# 125_Array2 — Accessing and Iterating 2D Arrays

**File:** `15_chapter_Multi_Dimensional_Array/125_Array2.js`

## Overview
This file demonstrates how to access specific elements dynamically, modify values, and iterate through a matrix using `for...of` loops and `forEach` methods instead of traditional index-based loops.

## Main Concept
You can retrieve the number of rows dynamically using `grid.length`, and the number of columns using `grid[0].length`. This allows you to write flexible loops that adapt to grids of any size. Furthermore, modern ES6 loops provide much cleaner syntax for traversing multi-dimensional structures.

### Code Example

```javascript
let testMatrix = [
    ["login", "pass", 200],
    ["checkout", "fail", 404],
    ["search", "pass", 180]
];

// Modifying an element
testMatrix[0][0] = "login_retry";

// Dynamic iteration using length
for(let i=0; i < testMatrix.length; i++){
    for(let j=0; j < testMatrix[i].length; j++){
        process.stdout.write(testMatrix[i][j] + " ");
    }
    console.log("");
}

// Elegant iteration using for...of
for (let row of testMatrix) {
    for (let cell of row) {
        process.stdout.write(cell + " ");
    }
    console.log();
}
```

### Key Points
- `grid[grid.length - 1][grid[0].length - 1]` accesses the very last element of the 2D array.
- `for...of` loops abstract away the `i` and `j` variables, making the code much more readable when you don't specifically need the index numbers.

---

## Common Mistakes
- **Assuming all inner arrays are the same length:** While `grid[0].length` works for a perfect matrix (like a grid), JavaScript arrays can be "jagged" (meaning row 0 could have 3 elements, and row 1 could have 5 elements). Using `testMatrix[i].length` in your inner loop protects against `undefined` errors.

---

## Summary
**Key Takeaway:** Use `array.length` for the row count, `array[i].length` for the column count, and prefer modern `for...of` or `.forEach()` loops for cleaner traversal of 2D data.
