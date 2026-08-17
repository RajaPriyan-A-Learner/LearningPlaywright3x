# 63_Nested_For_Loops — Nested Loop Structures

**File:** `09_chapter_Loops/63_Nested_For_Loops.js`

## Overview

Nested loops execute one loop inside another, with the inner loop completing all iterations for each outer loop iteration. This pattern is fundamental for processing multi-dimensional data (matrices, grids, 2D arrays), generating combinations, and algorithms requiring nested iteration. Nested loops introduce complexity in execution order and performance considerations, making them a frequent interview topic for testing algorithmic thinking and loop understanding.

---

## Main Concept

Nested loops create hierarchical iteration patterns. The outer loop controls major iterations; for each outer iteration, the inner loop runs completely. This structure enables processing rectangular data (rows and columns), generating all combinations of two sets, and implementing algorithms like bubble sort and matrix operations. Understanding execution order and performance is critical.

### Code Example

```javascript
// Basic nested loops (3x3 grid)
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        console.log(i, j);
    }
}
// Output:
// (0,0) (0,1) (0,2)
// (1,0) (1,1) (1,2)
// (2,0) (2,1) (2,2)

// Nested loops creating matrix output
for (let row = 0; row < 3; row++) {
    let line = "";
    for (let col = 0; col < 3; col++) {
        line += "*";
    }
    console.log(line);
}
// Output:
// ***
// ***
// ***

// Nested loops for 2D array processing
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
        console.log(matrix[row][col]);
    }
}
// Output: 1,2,3,4,5,6,7,8,9

// Nested loops with conditions (triangle pattern)
for (let i = 0; i < 5; i++) {
    let pattern = "";
    for (let j = 0; j <= i; j++) {
        pattern += "*";
    }
    console.log(pattern);
}
// Output:
// *
// **
// ***
// ****
// *****

// Nested loops for combinations
const arr1 = ["A", "B"];
const arr2 = [1, 2];
for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
        console.log(arr1[i] + arr2[j]);
    }
}
// Output: A1, A2, B1, B2

// Bubble sort using nested loops
const nums = [64, 34, 25, 12, 22, 11, 90];
for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
        if (nums[j] > nums[j + 1]) {
            [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        }
    }
}

// Breaking from nested loops
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log("Found target, breaking all");
            break outerLoop;  // Breaks both loops
        }
        console.log(i, j);
    }
}
```

### Key Points

- **Iteration Nesting**: For each outer loop iteration, inner loop completes all iterations before moving to next outer iteration
- **Coordinate Thinking**: Nested loops naturally represent 2D coordinates (row, column) or grid positions
- **Execution Order**: Inner loop completes before outer increments; critical for understanding output and debugging
- **Performance Impact**: N nested loops = O(N^n) complexity; 2D is O(N^2), 3D is O(N^3). Quickly becomes expensive
- **Variable Naming**: Use meaningful names (row/col, i/j) to clarify nesting levels; avoid confusion with single-letter variables
- **Break with Labels**: Use labeled breaks to exit multiple nesting levels when needed (less common in modern code)

---

## Common Mistakes

- **Wrong Loop Order**: Confusing which loop controls rows vs columns; transposed output results
- **Off-by-One in Inner Loop**: Error in inner loop condition cascades across many iterations (outer × inner times), making bugs hard to spot
- **Forgetting Variable Change**: Not incrementing inner loop variable or not resetting when needed
- **Performance Blindness**: Creating 3+ nested loops without considering O(N^3) complexity; becomes unusable with large inputs

---

## Definitions

- **Nested Loop**: Loop contained within another loop; inner loop executes completely for each outer iteration
- **Outer Loop**: Larger iteration structure; controls major loop cycles
- **Inner Loop**: Smaller iteration structure; runs completely within each outer iteration
- **Iteration Coordinates**: Position tracking using multiple loop variables (e.g., row and column)
- **Time Complexity**: O(N^2) for 2D nested loops (scales quadratically with input size)
- **Labeled Break**: Breaking from specific nesting level using labeled statements

---

## Tricky Questions & Answers

**Q1: How many times does the inner loop execute in a 3x3 nested loop?**
A: Inner loop executes 3 times per outer iteration, outer loop runs 3 times: 3×3 = 9 total inner executions.

**Q2: What's the output of this nested loop?**
```javascript
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        console.log(i, j);
    }
}
```
A: (0,0) (0,1) (1,0) (1,1). Inner loop completes for i=0, then outer increments to i=1.

**Q3: How do you access a 2D array element at row 2, column 3?**
A: `matrix[2][3]` or with variables: `matrix[row][col]` using nested loop indices.

**Q4: How many total iterations occur with `for(i=0;i<4;i++)` and `for(j=0;j<5;j++)`?**
A: 4×5 = 20 total inner iterations. Outer loop 4 times, inner loop 5 times each.

**Q5: What's the time complexity of nested loops processing an N×N matrix?**
A: O(N^2)—linear in both dimensions. With 1000×1000 matrix, 1 million iterations.

**Q6: How would you create a 5×5 multiplication table?**
A: 
```javascript
for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
        console.log(i * j);
    }
}
```

**Q7: How do you break out of both an inner and outer loop?**
A: Use labeled break:
```javascript
outer: for(...) {
    for(...) {
        if (condition) break outer;
    }
}
```

**Q8: Can you nest more than 2 loops?**
A: Yes, but complexity grows exponentially. 3 nested loops is O(N^3); 4 nested is O(N^4). Quickly becomes inefficient for large inputs.

**Q9: What does `continue` do in a nested loop?**
A: Skips remaining inner loop body, moves to next inner iteration. Does NOT skip outer loop.

**Q10: How would you sum all elements in a 2D array?**
A: 
```javascript
let sum = 0;
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        sum += matrix[i][j];
    }
}
```

**Q11: What's the output of this?**
```javascript
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === j) console.log(i, j);
    }
}
```
A: (0,0) (1,1) (2,2). Prints diagonal elements.

**Q12: Can you use `break` to exit multiple levels of nesting?**
A: Yes, with labeled break. Without labels, break exits only innermost loop. Unlabeled break cannot skip multiple nesting levels.

**Q13: What's the performance impact of nesting loops?**
A: Each nesting multiplies iterations. O(N) × O(N) = O(N^2). Three nested loops become O(N^3), making 1000-element inputs execute 1 billion iterations—often too slow.

**Q14: How would you detect a duplicate pair in a 2D grid?**
A: 
```javascript
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === searchValue) {
            console.log(`Found at ${i},${j}`);
        }
    }
}
```

**Q15: Why would an interviewer ask about nested loops?**
A: Nested loops test algorithmic complexity understanding, execution flow visualization, and real-world data processing patterns (matrices, grids, combinations). They separate candidates who think about performance from those who don't.

---

## Deep Insights

- **Quadratic Complexity Blindness**: Developers often write nested loops without realizing O(N^2) implications. A loop over 10 items seems fine (100 operations), but 1000 items becomes 1 million operations (suddenly slow). Interview questions about nested loops often test whether candidates consider complexity.

- **Cache Locality and Modern CPU Optimization**: Row-major order (iterating rows as outer loop) vs column-major (columns as outer) affects CPU cache performance. Writing nested loops in row-major order (varying column in inner loop) improves memory cache hit rate, a subtle but real performance factor in large-scale data processing.

- **Loop Fusion and Loop Transformation**: Compiler optimizations can sometimes merge nested loops or transform them to reduce complexity. However, most transformations are language and context-specific. Understanding when manual optimization (breaking loops) is necessary vs relying on compiler is an advanced skill.

---

## Summary

**Key Takeaway:** Nested loops process multi-dimensional data (matrices, grids, combinations) through hierarchical iteration, but each nesting level multiplies time complexity—understanding O(N^2/N^3) implications is essential for writing performant algorithms.
