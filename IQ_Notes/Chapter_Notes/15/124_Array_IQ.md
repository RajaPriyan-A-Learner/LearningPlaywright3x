# 124_Array — Intro to Multi-Dimensional Arrays

**File:** `15_chapter_Multi_Dimensional_Array/124_Array.js`

## Overview
This file introduces the concept of Multi-Dimensional Arrays ( specifically 2D arrays). It compares a standard 1D array to a 2D array, which acts like a grid or matrix.

## Main Concept
A Multi-Dimensional array is simply an array where each element is another array. In a 2D array, you can think of the outer array as rows and the inner arrays as columns. You iterate over them using nested loops.

### Code Example

```javascript
// 2D Array representing a 3x3 grid
let grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Iterating over the 2D array
for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        process.stdout.write(grid[i][j] + " ");
    }
    console.log("");
}
```

### Key Points
- In `grid[i][j]`, `i` represents the row index and `j` represents the column index.
- To print a row on a single line in Node.js without the automatic newline provided by `console.log`, use `process.stdout.write()`.

---

## Common Mistakes
- **Confusing Row and Column indices:** When accessing `grid[y][x]`, `y` (the outer array) is the vertical position (row), and `x` (the inner array) is the horizontal position (column). It is the opposite of traditional (x,y) Cartesian coordinates.

---

## Summary
**Key Takeaway:** Multi-dimensional arrays are nested arrays (arrays inside arrays), and they are perfectly suited for representing grids, matrices, or tabular data, usually requiring nested loops to traverse.
