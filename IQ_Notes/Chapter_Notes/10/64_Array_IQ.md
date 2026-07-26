# Array — Introduction, `.at()`, and Negative Indexing

## Overview

Covers `10_chapter_Arrays/64_Array.js` — introduces JavaScript arrays: creating an empty array, a populated array, accessing elements by positive index, using `.at()` for negative indexing, and the key gotcha that bracket notation with a negative number does **not** work (returns `undefined`).

---

## 1. Reference Code

```javascript
let fruit = [];
let browsers = ["chrome", "firefox", "webkit"];
console.log(browsers[0]);
console.log(browsers.at(-1));
console.log(browsers.length);
console.log(fruit.length);

// For the Negative indexedDB, use the at
console.log(browsers[-1]); // undefined
console.log(browsers.at(0));
```

---

## 2. Output

```
chrome
webkit
3
0
undefined
chrome
```

---

## 3. Key Concepts

| Expression | Result | Why |
|-----------|--------|-----|
| `browsers[0]` | `"chrome"` | 0-based positive index |
| `browsers.at(-1)` | `"webkit"` | Negative index counts from end |
| `browsers.length` | `3` | Total elements |
| `fruit.length` | `0` | Empty array |
| `browsers[-1]` | `undefined` | JS treats `-1` as a string property key, not an index |
| `browsers.at(0)` | `"chrome"` | `.at()` works for positive indexes too |

---

## 4. The Negative Index Gotcha

`array[-1]` does **not** give the last element. Arrays are objects; `-1` becomes the string key `"-1"` which doesn't exist as a property — so you get `undefined`. Use `array.at(-1)` for negative indexing (ES2022+).

---

## Summary

**Key Takeaway:** Use `array[i]` for positive indexes and `array.at(-i)` for counting from the end. `array[-1]` always returns `undefined` — it's looking for a string key, not the last element.

**Related notes:** [[65_Array2_IQ]], [[67_Array_Access_Modifies_IQ]]
