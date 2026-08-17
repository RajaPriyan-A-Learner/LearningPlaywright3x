# 73_Array_Transform — Map, Filter, and Array Transformation

**File:** `10_chapter_Arrays/73_Array_Transform.js`

## Overview

This file demonstrates the powerful array transformation methods `.map()` and `.filter()`, which are foundational to functional programming in JavaScript. The `.map()` method transforms each element and returns a new array of the same size, while `.filter()` creates a new array containing only elements that match a condition. These methods are essential for data transformation, validation, and filtering operations in modern JavaScript applications. They enable clean, readable code for complex data manipulations without mutation of the original array.

---

## Main Concept

`.map()` and `.filter()` are higher-order functions that operate on arrays using callback predicates. `.map()` transforms each element by applying a callback function, returning a new array with the same length but transformed values. This is perfect for converting data—like transforming scores to grades, IDs to objects, or numbers to strings. `.filter()` selects elements that pass a test, returning a new array with only matching elements. Both methods create new arrays without mutating the original, following functional programming principles. Chaining these methods enables complex data transformations in clean, declarative code.

### Code Example

```javascript
let scores = [45, 82, 91, 60, 73];

// map() — transform each element, returns new array of same length
let grades = scores.map(item_score => item_score > 70 ? "Pass" : "Fail");
console.log(grades);           // ["Fail", "Pass", "Pass", "Fail", "Pass"]

// More complex map examples
let doubled = scores.map(s => s * 2);
console.log(doubled);          // [90, 164, 182, 120, 146]

let asStrings = scores.map(s => String(s));
console.log(asStrings);        // ["45", "82", "91", "60", "73"]

// filter() — select elements matching a condition
let passing = scores.filter(s => s >= 70);
console.log(passing);          // [82, 91, 73]

// More complex filter examples
let failing = scores.filter(s => s < 70);
console.log(failing);          // [45, 60]

// Chaining map and filter
let passingGrades = scores
    .filter(s => s >= 70)
    .map(s => s > 80 ? "A" : "B");
console.log(passingGrades);    // ["A", "A", "B"]
```

### Key Points

- `.map()` returns a new array with the same length, applying a transformation to each element
- `.filter()` returns a new array with only elements that match the condition, potentially smaller
- Both create new arrays without mutating the original array
- Both methods accept callbacks with (element, index, array) parameters, though usually only element is used
- Methods can be chained for complex transformations: `arr.filter(...).map(...).filter(...)`

---

## Common Mistakes

- Using `.map()` when you only need side effects; `.forEach()` is clearer for that purpose
- Forgetting that `.map()` and `.filter()` return new arrays; the original is unchanged
- Confusing the order when chaining—filter first to reduce elements, then map to transform
- Using `.filter()` to find a single element when `.find()` would be more efficient

---

## Definitions

- **Transformation:** Converting each element from one form to another while maintaining array structure
- **Predicate:** A function that returns true/false to determine if an element matches a condition
- **Immutability:** Creating new arrays without modifying the original
- **Chaining:** Calling multiple array methods in sequence, with each method's output as the next method's input
- **Callback Function:** A function passed to `.map()` or `.filter()` that processes each element

---

## Tricky Questions

**Q1: What is the difference between `.map()` and `.forEach()`?**
A: `.map()` returns a new array with transformed elements. `.forEach()` returns `undefined` and is used for side effects only. If you need a transformed array, use `.map()`.

**Q2: Does `.map()` always return an array with the same length as the original?**
A: Yes, `.map()` always returns an array with the same length. Each element is transformed, but the count remains unchanged. To change the length, use `.filter()` or `.reduce()`.

**Q3: If you call `.map()` on an empty array, what is returned?**
A: An empty array `[]`. The callback is never executed because there are no elements to transform.

**Q4: Can `.filter()` return an array larger than the original?**
A: No, `.filter()` can only maintain or reduce the array size. Each element is either included or excluded; it cannot duplicate elements. To increase size, use `.map()` or `.flatMap()`.

**Q5: What does `.map()` return if the callback doesn't explicitly return anything?**
A: It returns an array of `undefined` values. If a callback doesn't return a value, JavaScript implicitly returns `undefined`. This creates `[undefined, undefined, ...]`.

**Q6: Can you use both map and filter on the same array simultaneously?**
A: You can chain them: `arr.filter(predicate).map(transform)`. This is efficient because filter reduces the number of elements before mapping. Alternatively, `.map()` followed by `.filter()` works but is less efficient.

**Q7: What is the order of parameters in the `.map()` callback function?**
A: The callback receives three parameters: (element, index, array). Most commonly, only the first parameter is used, but the others are available.

**Q8: If `.filter()` matches all elements, what happens?**
A: It returns a copy of the entire array with all elements included. If no elements match, it returns an empty array `[]`.

**Q9: Are `.map()` and `.filter()` suitable for sparse arrays with empty slots?**
A: Both skip empty slots. `.map([, , 3].map(x => x))` returns `[, , 3]`, preserving the sparse structure. `.filter()` skips empty slots entirely.

**Q10: What is the time complexity of `.map()` followed by `.filter()` on an array of size n?**
A: O(n) for `.map()` plus O(n) for `.filter()`, totaling O(2n) which simplifies to O(n). Both operations are linear.

**Q11: Can you modify the original array inside a `.map()` callback?**
A: While technically possible (if the array contains objects), it's not recommended. `.map()` suggests transformation into a new array, not mutation. To modify the original, use `.forEach()` or a traditional for loop.

**Q12: If you need to transform an array and then filter it, which order is more efficient?**
A: Filter first to reduce the number of elements, then map. Filtering first from 1000 to 100 elements, then mapping 100 elements is more efficient than mapping all 1000 elements then filtering.

**Q13: What does chaining `.map().filter().map()` accomplish?**
A: This applies one transformation, filters based on a condition, then applies another transformation. Each step creates a new array, though only the final result is kept. It's readable but creates intermediate arrays.

**Q14: Can you break out of a `.map()` loop?**
A: No, you cannot use break in `.map()`. All elements are processed. If you need to stop early, use a traditional for loop or .find().

**Q15: What is the difference between `.map(x => [x])` and `.flatMap(x => [x])`?**
A: `.map(x => [x])` creates nested arrays: `[1, 2]` becomes `[[1], [2]]`. `.flatMap(x => [x])` returns `[1, 2]` (flattened). `.flatMap()` is useful when the callback might return multiple elements per input.

---

## Deep Insights

- **Functional Programming Paradigm:** `.map()` and `.filter()` embody functional programming principles—pure functions without side effects, creating new data rather than mutating old. This leads to more predictable, testable, and composable code.
- **Performance of Method Chaining:** While chaining `.map().filter().map()` looks elegant, it creates intermediate arrays consuming memory. For large datasets or performance-critical code, consider using `.reduce()` to perform all operations in a single pass.
- **Immutability Benefits:** Creating new arrays via `.map()` and `.filter()` means the original data is never changed. This prevents accidental mutations and makes it easier to reason about code flow, especially in applications with complex state management.

---

## Summary

**Key Takeaway:** `.map()` transforms each element into a new array of the same length, `.filter()` selects matching elements into a potentially smaller array, and both create new arrays supporting immutable functional programming patterns.
