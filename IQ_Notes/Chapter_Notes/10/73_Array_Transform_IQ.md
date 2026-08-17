# 73_Array_Transform_IQ — map() & filter()

**File:** `73_Array_Transform.js`

## Overview

Array transformation methods that create new arrays without mutating the original. `map()` transforms every element by applying a callback, while `filter()` creates a new array containing only elements that pass a test.

## map() — Transform Each Element

`map()` creates a **new array** of the same size by applying a callback to every element.

```javascript
let scores = [45, 82, 91, 60, 73];
let grades = scores.map(item_score => item_score > 70 ? "Pass" : "Fail");
console.log(grades); // ["Fail", "Pass", "Pass", "Fail", "Pass"]
```

- Original `scores` array is **not mutated**.
- New array has one element per original element.
- Common use: type conversion, formatting, extraction.

## filter() — Keep Elements That Pass a Test

`filter()` creates a **new array** containing only elements where the callback returns a truthy value.

```javascript
let passing = scores.filter(s => s >= 70);
console.log(passing); // [82, 91, 73]
```

- Original array is **not mutated**.
- Result array size is **less than or equal to** the input size.
- Callback receives `(element, index, array)` in order.

---

## Summary

Both `map()` and `filter()` are **non-mutating** transformations — they always return a fresh array, leaving the original untouched. This is why they're the default choice over imperative loops when you need to transform data.
