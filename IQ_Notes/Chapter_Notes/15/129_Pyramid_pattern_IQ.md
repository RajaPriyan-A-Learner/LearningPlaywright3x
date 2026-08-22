# 129_Pyramid_pattern — Pyramid Star Pattern

**File:** `15_chapter_Multi_Dimensional_Array/129_Pyramid_pattern.js`

## Overview
This file demonstrates how to build a centered pyramid star pattern. This requires a slightly more complex approach using two separate inner loops per row.

## Main Concept
To center a pyramid, you must pad the left side of the stars with whitespace. For any given row `i` (where rows are 1-indexed), you need `n - i` spaces, followed by `2*i - 1` stars to maintain symmetry.

### Code Example

```javascript
let n = 3;

// Outer loop for rows
for (let i = 1; i <= n; i++) {
    let row = ""; // String building approach
    
    // First inner loop: Add spaces
    for (let j = 1; j <= n - i; j++) {
        row += " ";
    }
    
    // Second inner loop: Add stars
    for (let j = 1; j <= 2 * i - 1; j++) {
        row += "*";
    }
    
    // Print the fully built string
    console.log(row);
}

/* Output:
  *
 ***
*****
*/
```

### Key Points
- This code uses a "String Building" approach (`row += "*"`). This is a great alternative to `process.stdout.write()` because it works in any JavaScript environment (like browsers), whereas `process.stdout` is specific to Node.js.
- The formula for spaces is `Total Rows - Current Row`.
- The formula for odd numbers (to ensure a single point at the top of the pyramid) is `2*i - 1`.

---

## Common Mistakes
- **Miscalculating the star formula:** If you just use `j <= i` for the stars, you will get a right-leaning triangle shifted by spaces, not a symmetrical pyramid. It must be an odd sequence (1, 3, 5...).

---

## Summary
**Key Takeaway:** Complex shapes often require building a string by running multiple sequential inner loops (one for padding spaces, one for the visible characters) before outputting the final row.
