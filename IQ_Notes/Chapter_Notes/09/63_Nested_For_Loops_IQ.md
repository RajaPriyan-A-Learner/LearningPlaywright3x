# Nested For Loops — 2D Iteration (i, j Pairs)

## Overview

Covers `09_chapter_Loops/63_Nested_For_Loops.js` — introduces nested `for` loops where an outer loop controls rows and an inner loop controls columns. Produces every `(i, j)` pair in a 3×3 grid pattern.

---

## 1. Reference Code

```javascript
// Nested the For Loop
// 1 Array - W

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        console.log(i, j);
    }
}
```

---

## 2. Output

```
0 0
0 1
0 2
1 0
1 1
1 2
2 0
2 1
2 2
```

Total: **9 lines** (3 × 3). The inner loop completes fully for each value of the outer loop.

---

## 3. How Nested Loops Work

```
Outer i=0 → inner j runs: 0, 1, 2
Outer i=1 → inner j runs: 0, 1, 2
Outer i=2 → inner j runs: 0, 1, 2
```

The inner loop is completely reset and re-run for **every** iteration of the outer loop.

---

## 4. Complexity

- Iterations = outer-count × inner-count = 3 × 3 = **9**
- For nested loops over arrays of size N: **O(N²)** — grows quadratically. Avoid nesting deeply over large datasets.

---

## 5. Real-World Use Cases

- Iterating a 2D matrix/grid
- Comparing every element of two arrays (brute-force search)
- Generating multiplication tables
- In Playwright: nested loops over rows/columns of a data table

---

## Summary

**Key Takeaway:** Nested `for` loops produce every combination of the two counters. Total iterations = outer × inner. Use nested loops for 2D structures, but be aware of the O(N²) performance cost.

**Related notes:** [[53_For_Loop_IQ]], [[55_For_Loops2_IQ]], [[72_Array_iterate_IQ]]
