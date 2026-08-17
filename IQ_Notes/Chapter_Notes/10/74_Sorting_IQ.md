# 74_Sorting — Sort, Reverse, and Numeric Sorting

**File:** `10_chapter_Arrays/74_Sorting.js`

## Overview

This file demonstrates array sorting methods and their critical quirks in JavaScript. The `.sort()` method performs lexicographic (string-based) sorting by default, which causes unexpected behavior with numbers since they're converted to strings for comparison. Understanding the difference between default string sorting and custom numeric sorting is essential to avoid common bugs. The `.reverse()` method flips array order. This file highlights why providing a comparator function is crucial when sorting numbers and shows how to implement proper ascending and descending sorts.

---

## Main Concept

JavaScript's `.sort()` method mutates the array in place and uses lexicographic (alphabetical) comparison by default. This causes unintuitive behavior with numbers: `[10, 1, 21, 2].sort()` produces `[1, 10, 2, 21]` (not `[1, 2, 10, 21]`) because "10" comes before "2" alphabetically. To sort numbers correctly, you must provide a comparator function. The comparator receives two elements and should return a negative number (a < b), zero (a === b), or positive (a > b). The `.reverse()` method simply flips the array order. Both methods mutate the original array.

### Code Example

```javascript
// String sorting (default) — lexicographic
let fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits);           // ["apple", "banana", "cherry"]

// Numeric sorting (GOTCHA) — default is still lexicographic!
let nums = [10, 1, 21, 2];
console.log(nums.sort());      // [1, 10, 2, 21] — NOT sorted numerically!
// This happens because "10" < "2" alphabetically

// Proper numeric sorting — ascending
let nums1 = [10, 1, 21, 2];
nums1.sort((a, b) => a - b);
console.log(nums1);            // [1, 2, 10, 21]

// Numeric sorting — descending
let nums2 = [10, 1, 21, 2];
nums2.sort((a, b) => b - a);
console.log(nums2);            // [21, 10, 2, 1]

// Reverse — flip order
let arr = [1, 2, 3];
arr.reverse();
console.log(arr);              // [3, 2, 1]

// Sorting objects
let users = [
    { name: 'Charlie', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];
users.sort((a, b) => a.age - b.age);
// Sorted by age: 25, 30, 35
```

### Key Points

- `.sort()` uses lexicographic (string-based) comparison by default, causing unexpected behavior with numbers
- Numbers must be sorted with a comparator: `(a, b) => a - b` for ascending or `(a, b) => b - a` for descending
- Both `.sort()` and `.reverse()` mutate the original array; they don't create new arrays
- The comparator function receives pairs of elements and should return a number indicating their order
- For sorting objects, extract numeric properties or use string comparisons in the comparator

---

## Common Mistakes

- Calling `.sort()` on numeric arrays without a comparator, leading to unexpected results
- Forgetting that `.sort()` mutates the original array, causing confusion when the original is needed later
- Using string comparison for sorting objects when numeric properties should be compared
- Attempting to use `.sort()` with a boolean return value instead of numeric

---

## Definitions

- **Lexicographic Sort:** String-based alphabetical sorting, where "10" comes before "2"
- **Comparator Function:** A function that determines the order of two elements by returning negative, zero, or positive
- **Mutation:** Modifying the original array rather than creating a new one
- **Ascending Order:** Smallest to largest (for numbers) or A to Z (for strings)
- **Descending Order:** Largest to smallest (for numbers) or Z to A (for strings)
- **Stable Sort:** A sort that maintains the relative order of elements with equal values (JavaScript engines implement this)

---

## Tricky Questions

**Q1: Why does `[10, 1, 21, 2].sort()` produce `[1, 10, 2, 21]` instead of numerical order?**
A: `.sort()` converts elements to strings and compares them lexicographically. Alphabetically, "10" < "2", so the order is alphabetical: "1", "10", "2", "21".

**Q2: What is the correct comparator function for sorting numbers in ascending order?**
A: `(a, b) => a - b`. If a > b, the subtraction is positive (swap); if a < b, it's negative (don't swap).

**Q3: How do you sort an array in descending order using a comparator?**
A: `(a, b) => b - a`. This reverses the comparison, placing larger numbers first.

**Q4: Does `.sort()` return the sorted array or undefined?**
A: It returns the sorted array (the same reference as the original). The array is mutated in place and also returned.

**Q5: Can you sort an array of strings in reverse alphabetical order?**
A: Yes, use `.sort((a, b) => b.localeCompare(a))`. For simple reverse alphabetical, you can also sort then call `.reverse()`.

**Q6: What does a comparator returning 0 mean?**
A: It means the two elements are equal in sort order. They maintain their original relative position (stable sort).

**Q7: Can you sort an array of objects by multiple properties?**
A: Yes, in the comparator, first compare one property, then check if they're equal before comparing the next: `(a, b) => a.age !== b.age ? a.age - b.age : a.name.localeCompare(b.name)`.

**Q8: Is the `.reverse()` method the same as sorting in descending order?**
A: No, `.reverse()` just flips the order. It doesn't sort; it reorders. For example, `[3, 1, 2].reverse()` produces `[2, 1, 3]`, not `[3, 2, 1]`.

**Q9: What is the time complexity of `.sort()`?**
A: O(n log n) in most JavaScript engines using efficient algorithms like quicksort or merge sort. Worst case can be O(n²) depending on the engine and pivot selection.

**Q10: If you call `.sort()` on a sorted array, does it remain in order?**
A: Yes, sorting an already sorted array maintains the order (with O(n) or O(n log n) depending on the algorithm).

**Q11: Can you sort an array alphabetically and then by length?**
A: Use a comparator: `(a, b) => a.localeCompare(b) || a.length - b.length`. This sorts alphabetically first, then by length if alphabetically equal.

**Q12: What happens if the comparator function throws an error?**
A: The sort operation fails and throws the error. The array may be in a partially sorted state.

**Q13: Does `.sort()` affect empty array slots (sparse arrays)?**
A: `.sort()` preserves empty slots in their positions. Sorting a sparse array results in a sparse array with slots in the same positions.

**Q14: Can you sort an array of mixed types (numbers and strings) with a numeric comparator?**
A: Yes, but it can produce unexpected results. Subtracting a string from a number results in NaN, which breaks sorting. It's best to ensure type consistency.

**Q15: Is the JavaScript sort stable, meaning it preserves the relative order of equal elements?**
A: Yes, modern JavaScript (ES2019+) guarantees stable sorting. However, older browser implementations might not. Equal elements maintain their original relative positions.

---

## Deep Insights

- **Lexicographic Gotcha:** The default string-based sorting is the most common source of bugs for developers new to JavaScript. Always provide a comparator for numeric arrays. This is a favorite interview question.
- **Comparator Best Practices:** For numeric comparisons, `a - b` is standard. For complex comparisons, consider readability over cleverness. Extraction of sort keys into a preprocessing step might be clearer than complex comparators.
- **Stability Implications:** Since JavaScript sort is stable, if you sort by age and then by name, elements with the same age maintain their name-sorted order. Understanding stability is crucial for multi-level sorting.

---

## Summary

**Key Takeaway:** Default `.sort()` uses lexicographic comparison causing numeric arrays to sort incorrectly; always provide a comparator function `(a, b) => a - b` for numbers, and remember both `.sort()` and `.reverse()` mutate the original array.
