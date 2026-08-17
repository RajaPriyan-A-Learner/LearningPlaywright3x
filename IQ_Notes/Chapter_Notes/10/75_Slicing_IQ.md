# 75_Slicing_IQ — Array.slice()

**File:** `75_Slicing.js`

## Overview

The `slice()` method extracts a shallow copy of a portion of an array without mutating the original. Supports both positive indices (from start) and negative indices (from end).

## slice(start, end) — Non-Mutating Substring

`slice()` returns a **shallow copy** of elements from `start` up to (but not including) `end`.

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 3));    // [2, 3]  — indices 1, 2 (not including 3)
console.log(arr);                // [1, 2, 3, 4, 5] — original unchanged
```

**Parameters:**
- `start` (optional): starting index (default `0`)
- `end` (optional): stopping index (exclusive); if omitted, slices to end

## Negative Indices — Count From the End

Negative indices count backward from the end:

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.slice(-2));      // [4, 5] — last 2 elements
console.log(arr.slice(-3));      // [3, 4, 5] — last 3 elements
console.log(arr.slice(-3, -1));  // [3, 4] — from index -3 up to (not including) -1
```

## Edge Cases

```javascript
arr.slice(0);          // [1, 2, 3, 4, 5] — copy of entire array
arr.slice(2);          // [3, 4, 5] — from index 2 to end
arr.slice(-5);         // [1, 2, 3, 4, 5] — -5 is the first element
arr.slice(-3, -5);     // [] — invalid range (start after end) returns empty
```

---

## Summary

`slice()` never mutates; it always returns a new array. Use negative indices for "from the end" logic.
