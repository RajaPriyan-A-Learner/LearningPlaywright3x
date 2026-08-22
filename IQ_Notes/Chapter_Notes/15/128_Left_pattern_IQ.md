# 128_Left_pattern — Inverted Triangle Star Pattern

**File:** `15_chapter_Multi_Dimensional_Array/128_Left_pattern.js`

## Overview
This file demonstrates how to build an inverted (upside-down) Right Triangle star pattern by manipulating the outer loop to count backward.

## Main Concept
While a standard triangle grows in size, an inverted triangle shrinks. The easiest way to accomplish this is to reverse the outer loop so it starts at the maximum size `n` and decrements down to `1`.

### Code Example

```javascript
let n = 5;

// Outer loop counts downwards from 5 to 1
for (let i = n; i >= 1; i--) {       
    
    // Inner loop prints stars equal to the current 'i'
    for (let j = 1; j <= i; j++) {
        process.stdout.write("*");
    }
    
    // Move to the next line
    console.log("");
}

/* Output:
*****
****
***
**
*
*/
```

### Key Points
- The inner loop remains largely the same logic as a standard triangle (`j <= i`), but because `i` is starting large and getting smaller, the number of stars printed decreases each row.
- You could also achieve this by making the outer loop count up (`i = 0` to `n`) and the inner loop count down (`j = n - i`), but decrementing the outer loop is often more readable.

---

## Common Mistakes
- **Infinite Loops:** When reversing a loop (`i--`), a common mistake is forgetting to flip the condition (e.g., writing `i <= 1` instead of `i >= 1`), which causes the loop to either not run at all or run infinitely depending on the initialization.

---

## Summary
**Key Takeaway:** You can easily invert a shape or traverse a multi-dimensional array backwards by reversing the direction of your outer loop iteration (`i--` instead of `i++`).
