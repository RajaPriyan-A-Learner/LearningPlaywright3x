# 127_Right_pattern — Right Triangle Star Pattern

**File:** `15_chapter_Multi_Dimensional_Array/127_Right_pattern.js`

## Overview
This file demonstrates how to build a basic Right Triangle star pattern using nested loops, which is a classic programming exercise to understand 2D iteration logic.

## Main Concept
To print shapes in the console, you use an outer loop to control the rows (the height) and an inner loop to control the columns (what is printed on that specific row). For a right triangle, the number of stars printed on a row is equal to the current row number.

### Code Example

```javascript
const process = require("process");

let n = 3;

// Outer loop controls the rows (i = 0, 1, 2)
for (let i = 0; i < n; i++) {
    
    // Inner loop controls columns. 
    // It runs 'i + 1' times because j goes from 0 to i.
    for(let j = 0; j <= i; j++) {
        process.stdout.write("*");
    }
    
    // Move to the next line after finishing the row
    console.log("");  
}

/* Output:
*
**
***
*/
```

### Key Points
- `process.stdout.write("*")` is used because standard `console.log()` automatically adds a newline character at the end of the output. 
- The condition of the inner loop (`j <= i`) is what creates the triangle shape, as the inner loop runs one extra time for each subsequent row.

---

## Common Mistakes
- **Using `console.log` for the inner loop:** If you use `console.log("*")` inside the inner loop, every single star will print on a new line vertically, rather than forming a shape horizontally.

---

## Summary
**Key Takeaway:** You create simple growing patterns by linking the condition of the inner loop directly to the iteration variable of the outer loop (`j <= i`).
