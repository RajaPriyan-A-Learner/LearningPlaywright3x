# 74_Sorting_IQ — Array.sort()

**File:** `74_Sorting.js`

## Overview

Array sorting with a critical gotcha: the default `sort()` uses lexicographic (string-based) comparison, not numeric. Custom comparators enable proper numeric sorting in ascending or descending order.

## Default sort() is Lexicographic, Not Numeric

⚠️ **Gotcha:** calling `sort()` with no callback converts elements to strings and sorts alphabetically, even for numbers.

```javascript
let fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry"] — alphabetical order

let nums = [10, 1, 21, 2];
console.log(nums.sort()); // [1, 10, 2, 21] — NOT numeric order!
// Why? 10 < 2 alphabetically ("1" comes before "2"), so [10, 2, 21, 1] is reordered
// But the console shows [1, 10, 2, 21] due to how string comparison works
```

**In effect:** numbers are stringified before comparison, so `"10"` comes **before** `"2"` (first character "1" vs "2"), yielding the counterintuitive `[1, 10, 2, 21]`.

## Custom Comparator — Numeric Sorting

Pass a comparator function returning:
- **Negative** if `a` should come before `b`
- **Positive** if `b` should come before `a`
- **Zero** if equal

```javascript
let nums = [10, 1, 21, 2];
nums.sort((a, b) => a - b);      // Ascending: [1, 2, 10, 21]
nums.sort((a, b) => b - a);      // Descending: [21, 10, 2, 1]
nums.reverse();                  // Also reverses: [1, 2, 10, 21]
```

---

## Summary

Always provide a comparator for numeric arrays. **Never rely on default `sort()` for numbers** — it will silently produce wrong results by doing string comparison.
