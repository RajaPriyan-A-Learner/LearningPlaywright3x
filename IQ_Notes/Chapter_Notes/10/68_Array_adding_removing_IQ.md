# 68_Array_adding_removing — Push, Pop, Shift, Unshift, and Splice

**File:** `10_chapter_Arrays/68_Array_adding_removing.js`

## Overview

This file demonstrates the essential array mutation methods for adding and removing elements from arrays. The `.push()` and `.pop()` methods operate on the end of an array, while `.shift()` and `.unshift()` operate on the beginning. The `.splice()` method provides powerful, flexible in-place modification capabilities for removing, inserting, or replacing elements at any position. These methods are fundamental to array manipulation in real-world applications, from managing lists to implementing data structures like stacks and queues.

---

## Main Concept

Arrays in JavaScript provide specialized methods for adding and removing elements at different positions. The `.push()` method adds elements to the end and returns the new length, while `.pop()` removes and returns the last element. The `.unshift()` method adds elements to the beginning and returns the new length, while `.shift()` removes and returns the first element. The `.splice()` method is the most versatile, allowing you to remove elements at any position and optionally insert replacement elements, returning an array of removed elements. All these methods mutate the original array.

### Code Example

```javascript
let arr = [1, 2, 3];

// Add to END
arr.push(4);           // arr = [1, 2, 3, 4], returns 4
arr.push(5, 6);        // arr = [1, 2, 3, 4, 5, 6], returns 6

// Remove from END
arr.pop();             // arr = [1, 2, 3, 4, 5], returns 6

// Add to BEGINNING
arr.unshift(0);        // arr = [0, 1, 2, 3, 4, 5], returns 6

// Remove from BEGINNING
arr.shift();           // arr = [1, 2, 3, 4, 5], returns 0

// splice(start, deleteCount, item1, item2, ...)
arr.splice(2, 1);      // Remove 1 element at index 2: arr = [1, 2, 4, 5]
arr.splice(2, 0, 99);  // Insert 99 at index 2: arr = [1, 2, 99, 4, 5]
arr.splice(1, 2, 10, 20); // Replace 2 elements starting at index 1
                           // arr = [1, 10, 20, 99, 4, 5]
```

### Key Points

- `.push()` and `.pop()` are O(1) operations (constant time) at the end of an array
- `.shift()` and `.unshift()` are O(n) operations at the beginning because all remaining elements must be re-indexed
- `.splice()` is O(n) because it requires shifting elements after the modification point
- All these methods mutate the original array; they return values but don't create new arrays
- `.splice()` accepts negative indices, interpreting them relative to the array's end

---

## Common Mistakes

- Confusing `.push()` with spread operator or `.concat()`; push mutates while spread/concat create new arrays
- Using `.shift()` or `.unshift()` in loops on large arrays, causing performance degradation
- Forgetting that `.splice()` returns an array of removed elements, not the modified array

---

## Definitions

- **Mutation:** Modifying the original array directly rather than creating a new array
- **Push Operation:** Adding elements to the end of an array and returning the new length
- **Pop Operation:** Removing and returning the last element of an array
- **Shift Operation:** Removing and returning the first element and re-indexing all remaining elements
- **Unshift Operation:** Adding elements to the beginning and re-indexing all existing elements
- **Splice Operation:** Removing elements at a specific position and optionally inserting replacements
- **Return Value:** What a method gives back; for `.push()` it's length, for `.pop()` it's the removed element

---

## Tricky Questions

**Q1: What does `.push()` return, and is it the modified array?**
A: `.push()` returns the new length of the array, not the array itself. For example, `[1, 2].push(3)` returns 3, not `[1, 2, 3]`. This is different from some other array methods.

**Q2: What is the time complexity of `.shift()`, and why is it different from `.pop()`?**
A: `.shift()` is O(n) because all remaining elements must be re-indexed. `.pop()` is O(1) because it simply removes the last element without re-indexing. For large arrays, repeatedly using `.shift()` is inefficient.

**Q3: Can `.splice()` be used with negative indices, and how do they work?**
A: Yes, `.splice()` accepts negative indices. Negative indices are relative to the end of the array. For example, `.splice(-2, 1)` removes 1 element starting 2 positions from the end.

**Q4: What does `.splice(2, 0, 99)` do without a delete count?**
A: It deletes 0 elements (a deleteCount of 0) and inserts 99 at index 2. This is the clean way to insert an element without removing anything.

**Q5: What does `.pop()` return on an empty array?**
A: It returns `undefined`. Calling `.pop()` on an empty array doesn't throw an error; it simply returns `undefined` and leaves the array unchanged.

**Q6: If you chain `.push()` calls like `arr.push(1).push(2)`, what happens?**
A: This throws an error because `.push()` returns a number (the new length), not an array. You cannot call `.push()` on a number. You must call them separately or use `arr.push(1, 2)`.

**Q7: What is the difference between `arr.splice(0, 2)` and `arr.slice(0, 2)`?**
A: `.splice(0, 2)` mutates the original array, removing the first 2 elements and returning them. `.slice(0, 2)` creates a new array with the first 2 elements, leaving the original unchanged.

**Q8: Can `.unshift()` add multiple elements at once, like `.push()`?**
A: Yes, `.unshift()` accepts multiple arguments. `arr.unshift(1, 2, 3)` adds all three elements to the beginning in that order.

**Q9: What happens when you call `.splice()` with a negative delete count?**
A: A negative delete count is treated as 0, meaning no elements are deleted. Only the insertion part (if any elements are provided) is executed.

**Q10: If `.push()` and `.unshift()` both add elements, which is preferred for performance?**
A: `.push()` is preferred for performance because it's O(1), while `.unshift()` is O(n) due to re-indexing. When building arrays, use `.push()` and reverse if necessary.

**Q11: What does `.splice()` return, and is it the modified array?**
A: `.splice()` returns an array of the deleted elements, not the modified array. If you delete nothing, it returns an empty array `[]`. The original array is modified in place.

**Q12: Can you use `.splice()` to replace elements without removing them?**
A: Yes, by setting the delete count to 0. `.splice(2, 0, 'x', 'y')` inserts 'x' and 'y' at index 2 without deleting anything.

**Q13: What happens if you call `.shift()` on an array with one element?**
A: It removes and returns that element, leaving an empty array. For example, `[5].shift()` returns 5 and leaves an empty array.

**Q14: If you `.push()` an array as an element, does it flatten?**
A: No, `.push()` adds the array as a single element without flattening. `[1, 2].push([3, 4])` results in `[1, 2, [3, 4]]`, not `[1, 2, 3, 4]`.

**Q15: What is the performance difference between `arr.splice(arr.length - 1, 1)` and `arr.pop()`?**
A: `.pop()` is O(1) and directly optimized. `.splice(arr.length - 1, 1)` calculates the index and is O(1) in terms of operations but with more overhead. `.pop()` is the better choice for removing the last element.

---

## Deep Insights

- **Queue vs. Stack Implementations:** `.push()` and `.pop()` create stack behavior (LIFO). Combining `.push()` with `.shift()` creates queue behavior (FIFO), though `.shift()` is expensive. For true queues, consider using a circular buffer or different data structure.
- **Performance in Loops:** Using `.shift()` in loops on large arrays creates O(n²) complexity. For example, repeatedly `.shift()`-ing a 1000-element array is much slower than `.pop()`-ing. Reverse iteration or different approaches are often better.
- **Immutability Patterns:** Modern JavaScript often favors immutability. Instead of `.push()`, use spread: `[...arr, newElement]`. This creates clarity about what operations don't mutate the original array.

---

## Summary

**Key Takeaway:** `.push()` and `.pop()` efficiently add/remove from the end (O(1)), `.shift()` and `.unshift()` add/remove from the beginning (O(n)), and `.splice()` provides flexible in-place modification at any position; all mutate the original array.
