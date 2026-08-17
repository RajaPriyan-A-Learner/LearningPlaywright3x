# 79_Destructing — Array Destructuring and Pattern Matching

**File:** `10_chapter_Arrays/79_Destructing.js`

## Overview

This file demonstrates array destructuring, a modern JavaScript feature that extracts values from arrays and assigns them to variables in a single, concise operation. Destructuring simplifies code by eliminating repetitive element access patterns and enables powerful patterns like the rest operator (`...`), default values, skipping elements, and swapping values without temporary variables. Understanding destructuring syntax and patterns is essential for writing clean, modern JavaScript and working effectively with APIs that return arrays and tuples.

---

## Main Concept

Array destructuring uses square brackets on the left side of assignment to extract array elements into individual variables. The pattern matches positional order, so the first variable gets the first element, the second variable gets the second element, and so on. The rest operator (`...`) collects remaining elements into a new array. Default values provide fallback values when array slots are `undefined`. Elements can be skipped by leaving spaces in the pattern. Destructuring works in variable declarations, reassignments, and function parameters, making it versatile across JavaScript code.

### Code Example

```javascript
// Basic destructuring — extract array elements to variables
let [first, second, third] = [10, 20, 30];
console.log(first);   // 10
console.log(second);  // 20
console.log(third);   // 30

// Rest pattern (...) — collects remaining elements into a new array
let [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a);       // 10
console.log(b);       // 20
console.log(rest);    // [30, 40, 50]

// Default values — used when array slot is undefined
let [x = 1, y = 2, z = 99] = [10, 20];
console.log(x, y, z); // 10, 20, 99 (z uses default)

// Skipping elements — leave spaces in the pattern
let [, , thirdOnly] = [10, 20, 30];
console.log(thirdOnly); // 30

// Swapping values without a temporary variable
let p = 1, q = 2;
[p, q] = [q, p];
console.log(p, q);    // 2, 1

// Destructuring in function parameters
function processArray([first, second]) {
    console.log(first, second);
}
processArray([100, 200]); // 100, 200

// Nested destructuring
let [outer, [inner1, inner2]] = [1, [2, 3]];
console.log(outer, inner1, inner2); // 1, 2, 3

// Rest in function arguments
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

### Key Points

- Destructuring extracts array elements into variables based on position
- The rest operator (`...`) collects remaining elements into a new array
- Default values provide fallbacks when array positions are `undefined`
- Elements can be skipped by leaving empty positions in the pattern
- Destructuring works in declarations, reassignments, function parameters, and for...of loops
- Nested arrays can be destructured recursively for complex patterns

---

## Common Mistakes

- Attempting to destructure beyond the array length, forgetting that excess variables become `undefined` unless defaults are provided
- Confusing the rest operator (`...`) in destructuring with the spread operator (they use the same syntax but different contexts)
- Using destructuring in loops without understanding scoping rules and the immutability of destructured values
- Forgetting that destructuring creates new variable bindings; previously declared variables can be reassigned but must use different patterns

---

## Definitions

- **Destructuring:** Unpacking values from arrays into distinct variables using pattern matching
- **Rest Operator:** The `...` syntax that collects remaining elements into a new array
- **Default Value:** A fallback value used when the array slot is `undefined`
- **Skipping Elements:** Omitting variables in the pattern to ignore array elements
- **Pattern Matching:** Mapping array structure to variable assignments based on position

---

## Tricky Questions

**Q1: What is the difference between `[a, b, ...rest]` and `[a, b, c]` in destructuring?**
A: `[a, b, ...rest]` collects remaining elements (c, d, e...) into an array called rest. `[a, b, c]` assigns exactly three variables. The rest operator is flexible for variable-length arrays.

**Q2: If you destructure `let [x, y] = [1, 2, 3]`, what happens to the third element?**
A: The third element (3) is ignored. Destructuring only extracts the number of variables specified. Extra array elements don't cause errors.

**Q3: What is the value of `z` in `let [x = 1, y = 2, z = 99] = [10, 20]`?**
A: It's 99. The array has only two elements, so the third slot is `undefined`, triggering the default value.

**Q4: Can you skip elements in destructuring, and if so, how?**
A: Yes, by leaving empty spaces: `let [, , third] = [1, 2, 3]` extracts only the third element (3).

**Q5: How does destructuring work with `for...of` loops?**
A: Each iteration unpacks the array: `for (let [i, val] of [[0, 'a'], [1, 'b']]) { }` iterates with both indices and values.

**Q6: Can you reassign variables with destructuring, or only declare new ones?**
A: Both. `let [a, b] = [1, 2]` declares new variables. `[a, b] = [2, 1]` reassigns existing variables, but requires parentheses to avoid syntax errors.

**Q7: What is the difference between rest in destructuring (`[a, ...rest]`) and rest in function parameters (`function(a, ...args)`)?**
A: Both collect remaining values, but destructuring applies to array unpacking while function rest parameters collect arguments. They use the same `...` syntax but in different contexts.

**Q8: Can rest operator appear in the middle of a pattern, like `[a, ...rest, b]`?**
A: No, rest must be the last element. `[a, ...rest, b]` is a syntax error. Rest captures all remaining elements, so nothing can come after it.

**Q9: What does `let [x = 5] = []` result in?**
A: `x` is 5 (the default). The array is empty, so the first slot is `undefined`, triggering the default.

**Q10: How would you extract the first and last elements while skipping the middle?**
A: `let [first, ..._, last] = arr; last = arr[arr.length - 1]` or use destructuring and .at(): `let [first] = arr; let last = arr.at(-1)`.

**Q11: Can you use complex expressions as default values, like `let [x = someFunction()] = []`?**
A: Yes, default expressions are evaluated lazily only when needed. If the slot is not `undefined`, the default function never runs.

**Q12: What is the relationship between destructuring and spread operator?**
A: Spread (`...arr`) expands an array into individual elements. Destructuring (`let [a, b] = arr`) extracts elements into variables. They're inverses—spread flattens, destructuring unpacks.

**Q13: Can you destructure strings like arrays?**
A: Yes, strings are iterable: `let [first, second] = "hello"` gives first = 'h', second = 'e'. This works because strings support the iterable protocol.

**Q14: What happens if you try to destructure a non-iterable value?**
A: TypeError. Only iterables (arrays, strings, sets, maps) can be destructured. Attempting `let [a, b] = 42` throws an error.

**Q15: How would you swap two variables using destructuring?**
A: `[a, b] = [b, a]` swaps without a temporary variable. This is one of destructuring's elegant features.

---

## Deep Insights

- **Destructuring as Pattern Matching:** Destructuring is more than unpacking—it's pattern matching that enables sophisticated variable extraction from complex structures. This pattern is borrowed from languages like Haskell and Rust.
- **Performance Considerations:** Destructuring has minimal performance overhead. Modern JavaScript engines optimize it well. The readability benefit far outweighs any performance concerns for typical code.
- **Functional Programming Integration:** Destructuring enables functional patterns like extracting tuple values, enabling arguments as arrays, and parameter passing. Combined with arrow functions and rest parameters, it forms powerful functional constructs.

---

## Summary

**Key Takeaway:** Array destructuring extracts elements into variables using pattern matching, with rest operators for remaining elements, defaults for missing values, and element skipping enabling powerful assignment patterns unavailable through traditional element access.
