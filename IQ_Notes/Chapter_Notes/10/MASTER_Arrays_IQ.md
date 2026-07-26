# 10 — Arrays: Complete Interview & Reference Guide

> Arrays are JavaScript's primary ordered collection type — zero-indexed, dynamically-sized, and capable of holding mixed types. This chapter covers every aspect of working with arrays: creation methods, element access and mutation, adding and removing items, searching, and all five iteration patterns. For testers, arrays are everywhere — test data sets, browser lists, assertion collections, and API response payloads.

---

## Table of Contents

1. [Syntax Reference — End to End](#1-syntax-reference--end-to-end)
2. [Built-in Functions & Methods](#2-built-in-functions--methods)
3. [Deep Insights & Gotchas](#3-deep-insights--gotchas)
4. [Interview-Ready Definitions](#4-interview-ready-definitions)
5. [Tricky Interview Questions](#5-tricky-interview-questions)
6. [Controversial Topics & Ongoing Debates](#6-controversial-topics--ongoing-debates)
7. [Quick Reference Cheat Sheet](#7-quick-reference-cheat-sheet)
8. [Memory Map & Visual Flowchart](#8-memory-map--visual-flowchart)
9. [LinkedIn-Style Post](#9-linkedin-style-post)
10. [Summary & Individual Notes Index](#10-summary--individual-notes-index)

---

## 1. Syntax Reference — End to End

### 1.1 Creating Arrays

```javascript
// ✅ Array literal — preferred
let browsers = ["chrome", "firefox", "webkit"];
let empty = [];

// new Array(n) — creates sparse array of length n
let sparse = new Array(3);        // [empty × 3]  — NOT [undefined, undefined, undefined]
let filled = new Array(1, 2, 3);  // [1, 2, 3]

// Array.of() — always treats args as elements (fixes new Array(n) ambiguity)
let single = Array.of(3);         // [3]  (NOT a sparse array of length 3)
let nums    = Array.of(1, 2, 3);  // [1, 2, 3]

// Array.from() — converts any iterable or array-like
let chars   = Array.from("hello");           // ["h","e","l","l","o"]
let fromSet = Array.from(new Set([1,2,2,3])); // [1, 2, 3]
let range   = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

### 1.2 Accessing Elements

```javascript
let arr = ["a", "b", "c", "d"];

// Positive index
arr[0];      // "a"
arr[3];      // "d"
arr[99];     // undefined (no error)

// .at() — supports negative indexes
arr.at(0);   // "a"
arr.at(-1);  // "d" (last)
arr.at(-2);  // "c"
arr.at(-99); // undefined (out of range, no error)

// Destructuring
let [first, second, ...rest] = arr;
// first = "a", second = "b", rest = ["c", "d"]

// Length
arr.length;  // 4
```

### 1.3 Modifying Elements

```javascript
let statuses = ["pass", "fail", "skip"];

// Direct assignment (mutates in place)
statuses[1] = "blocked";
console.log(statuses); // ["pass", "blocked", "skip"]

// Extend beyond length — creates sparse array
statuses[10] = "error";
console.log(statuses.length); // 11 (with empty slots 3–9)
```

### 1.4 Adding & Removing

```javascript
let arr = [1, 2, 3];

arr.push(4);         // add to END    → [1, 2, 3, 4]
arr.push(5, 6);      // add multiple  → [1, 2, 3, 4, 5, 6]
arr.pop();           // remove END    → [1, 2, 3, 4, 5]

arr.unshift(0);      // add to START  → [0, 1, 2, 3, 4, 5]
arr.shift();         // remove START  → [1, 2, 3, 4, 5]

// splice(startIndex, deleteCount, ...itemsToInsert)
arr.splice(2, 1);          // remove 1 at index 2  → [1, 2, 4, 5]
arr.splice(2, 0, 99);      // insert 99 at index 2  → [1, 2, 99, 4, 5]
arr.splice(1, 2, 10, 20);  // replace 2 items       → [1, 10, 20, 4, 5]
```

### 1.5 Searching

```javascript
let results = ["pass", "fail", "pass", "error", "fail"];

results.indexOf("fail");         // 1   (first occurrence)
results.indexOf("skip");         // -1  (not found)
results.lastIndexOf("fail");     // 4   (last occurrence)
results.includes("error");       // true
results.includes("skip");        // false

// Predicate-based search (ES2015+)
let nums = [10, 25, 30, 45];
nums.find(n => n > 20);          // 25  (first matching value)
nums.findIndex(n => n > 20);     // 1   (first matching index)
nums.findLast(n => n > 20);      // 45  (last matching value, ES2023)
nums.findLastIndex(n => n > 20); // 3   (last matching index, ES2023)
```

### 1.6 Iterating

```javascript
let tests = ["login", "checkout", "search"];

// Classic for loop
for (let i = 0; i < tests.length; i++) {
    console.log(i, tests[i]);
}

// for...of — cleanest for values only
for (let test of tests) {
    console.log(test);
}

// forEach — functional, index available
tests.forEach((test, index) => {
    console.log(`${index}: ${test}`);
});

// entries() — index + value destructured
for (let [i, test] of tests.entries()) {
    console.log(i, test);
}

// for...in — AVOID on arrays (gives string keys)
for (let key in tests) {
    console.log(typeof key, key); // "string" "0", "string" "1", ...
}
```

---

## 2. Built-in Functions & Methods

### Array Creation

| Method | Signature | Returns | Notes |
|--------|-----------|---------|-------|
| `Array.of` | `Array.of(...items)` | New array | Always treats args as elements |
| `Array.from` | `Array.from(iterable[, mapFn])` | New array | Converts strings, Sets, Maps, NodeLists |
| `Array.isArray` | `Array.isArray(value)` | Boolean | Only reliable way to check for array |

```javascript
Array.isArray([1, 2, 3]); // true
Array.isArray("hello");   // false
typeof [];                // "object" — don't use typeof for arrays!
```

### Adding / Removing (Mutating)

| Method | What it does | Returns |
|--------|-------------|---------|
| `push(...items)` | Add to end | New length |
| `pop()` | Remove from end | Removed element |
| `unshift(...items)` | Add to start | New length |
| `shift()` | Remove from start | Removed element |
| `splice(start, delCount, ...items)` | Remove/insert at any index | Array of removed items |

### Searching (Non-mutating)

| Method | Returns if found | Returns if not found |
|--------|-----------------|---------------------|
| `indexOf(value)` | First index | `-1` |
| `lastIndexOf(value)` | Last index | `-1` |
| `includes(value)` | `true` | `false` |
| `find(predicate)` | First matching value | `undefined` |
| `findIndex(predicate)` | First matching index | `-1` |
| `findLast(predicate)` | Last matching value | `undefined` |
| `findLastIndex(predicate)` | Last matching index | `-1` |

### Access (Non-mutating)

```javascript
let arr = [10, 20, 30, 40, 50];

arr.at(-1);           // 50 — negative index
arr.slice(1, 3);      // [20, 30] — copy from index 1 to 3 (exclusive)
arr.slice(-2);        // [40, 50] — last 2 elements
arr.concat([60, 70]); // [10,20,30,40,50,60,70] — new merged array
arr.join(" | ");      // "10 | 20 | 30 | 40 | 50"
arr.reverse();        // [50,40,30,20,10] — MUTATES the original!
arr.flat();           // flattens one level of nesting
arr.flat(Infinity);   // flattens all levels
```

### Iteration & Transformation

```javascript
let arr = [1, 2, 3, 4, 5];

arr.forEach(n => console.log(n));      // side effects only, returns undefined
arr.map(n => n * 2);                   // [2, 4, 6, 8, 10] — new array
arr.filter(n => n % 2 === 0);          // [2, 4] — new filtered array
arr.reduce((acc, n) => acc + n, 0);    // 15 — single accumulated value
arr.every(n => n > 0);                 // true — all match predicate
arr.some(n => n > 4);                  // true — at least one matches
arr.sort((a, b) => a - b);             // [1,2,3,4,5] ascending — MUTATES!
```

---

## 3. Deep Insights & Gotchas

### 3.1 `arr[-1]` Is NOT the Last Element

```javascript
let arr = [10, 20, 30];
console.log(arr[-1]);    // undefined — "-1" is a string property key
console.log(arr.at(-1)); // 30 ✅ — use .at() for negative indexing
```

JavaScript arrays are objects. `arr[-1]` looks for a property with key `"-1"` which doesn't exist.

### 3.2 `new Array(3)` Creates a Sparse Array, Not `[undefined, undefined, undefined]`

```javascript
let a = new Array(3);
console.log(a);           // [ <3 empty items> ]
console.log(a[0]);        // undefined (but slot doesn't exist)
console.log(0 in a);      // false — the slot is empty, not set to undefined

let b = [undefined, undefined, undefined];
console.log(0 in b);      // true — explicitly set
```

Sparse arrays can cause unexpected behaviour with `.map()`, `.forEach()`, and `.filter()` — they skip empty slots.

### 3.3 `sort()` Default Is Lexicographic, Not Numeric

```javascript
[10, 9, 2, 1, 100].sort();
// → [1, 10, 100, 2, 9]  — sorted as strings!

[10, 9, 2, 1, 100].sort((a, b) => a - b);
// → [1, 2, 9, 10, 100] ✅ — numeric sort
```

**Always pass a comparator to `.sort()` when sorting numbers.**

### 3.4 `reverse()` and `sort()` Mutate the Original Array

```javascript
let original = [3, 1, 2];
let sorted = original.sort((a, b) => a - b);
console.log(original); // [1, 2, 3] — original is also sorted!
console.log(sorted === original); // true — same reference

// Safe copy before sort:
let safeSorted = [...original].sort((a, b) => a - b);
```

### 3.5 Out-of-Bounds Access Returns `undefined`, Not an Error

```javascript
let arr = [1, 2, 3];
console.log(arr[100]); // undefined — no RangeError
console.log(arr[-1]);  // undefined — property not found
```

This can silently mask bugs. Always validate the index against `arr.length` when the index is dynamic.

### 3.6 `length` Can Be Manually Set — and It Truncates

```javascript
let arr = [1, 2, 3, 4, 5];
arr.length = 3;
console.log(arr); // [1, 2, 3] — elements 3 and 4 are gone!

// Setting length to 0 empties the array
arr.length = 0;
console.log(arr); // []
```

### 3.7 `includes()` Handles `NaN` Correctly; `indexOf()` Does Not

```javascript
let arr = [1, NaN, 3];
arr.includes(NaN);   // true ✅ — uses SameValueZero comparison
arr.indexOf(NaN);    // -1 ❌ — uses strict equality (NaN !== NaN)
```

### 3.8 `.at()` Is ES2022 — Check Compatibility

`.at()` was introduced in ES2022. In older environments, `arr[arr.length - 1]` is the safe fallback for the last element.

---

## 4. Interview-Ready Definitions

### Array
> **Definition (say this):** "An array in JavaScript is an ordered, zero-indexed, dynamically-sized collection that can hold values of any type, including mixed types, in a single variable."
> **Follow-up:** "Is JavaScript's array a true array?"
> **Answer:** "Not in the traditional computer-science sense. JS arrays are objects with numeric string keys and a special `length` property. They behave like arrays but don't have contiguous memory allocation."

### `.at()` Method
> **Definition (say this):** "`.at(index)` is an array method introduced in ES2022 that accepts both positive and negative integers. Negative indexes count from the end — `.at(-1)` gives the last element."
> **Follow-up:** "Why was `.at()` introduced? Wasn't `arr[arr.length - 1]` enough?"
> **Answer:** "Yes, but `arr.at(-1)` is much more readable and composable, especially in chained expressions where you can't easily reference the array variable twice."

### Sparse Array
> **Definition (say this):** "A sparse array is an array where some index slots have no value set — they are 'holes', not `undefined`. Created by `new Array(n)` or by setting an index beyond the current length. Many array methods skip holes."
> **Follow-up:** "How is a hole different from `undefined`?"
> **Answer:** "`0 in arr` returns `false` for a hole and `true` for `arr = [undefined]`. Iteration methods like `.map()` skip holes but process explicit `undefined` values."

### `splice`
> **Definition (say this):** "`splice(start, deleteCount, ...items)` is a mutating method that removes elements from any position in an array and optionally inserts new ones at that position in a single operation."
> **Follow-up:** "What does it return?"
> **Answer:** "An array of all removed elements. If nothing was removed, it returns an empty array."

### `find` vs `indexOf`
> **Definition (say this):** "`indexOf` searches by exact strict equality — you pass a value. `find` searches by a predicate function — you describe a condition. Use `find` when you need to match by a property or condition, not just a primitive value."
> **Follow-up:** "What does `find` return when nothing matches?"
> **Answer:** "`undefined`. `findIndex` returns `-1` in the same case."

---

## 5. Tricky Interview Questions

---

**Q1:** What is the output?
```javascript
let arr = ["a", "b", "c"];
console.log(arr[-1]);
console.log(arr.at(-1));
```
**A:** `undefined` then `"c"`. `arr[-1]` looks for string property `"-1"` (not found); `arr.at(-1)` correctly gives the last element.
**Difficulty:** Medium

---

**Q2:** What is the output?
```javascript
let a = new Array(3);
let b = [undefined, undefined, undefined];
console.log(a.length, b.length);
console.log(0 in a, 0 in b);
```
**A:** `3  3` then `false  true`. `a` is sparse (holes); `b` has explicit `undefined` at index 0.
**Difficulty:** Hard

---

**Q3:** What is the output?
```javascript
let arr = [10, 9, 2, 1, 100];
arr.sort();
console.log(arr);
```
**A:** `[1, 10, 100, 2, 9]`. Default sort is lexicographic (string comparison). Always pass `(a, b) => a - b` for numeric sort.
**Difficulty:** Medium

---

**Q4:** What is the output?
```javascript
let arr = [1, 2, 3, 4, 5];
arr.length = 3;
console.log(arr);
```
**A:** `[1, 2, 3]`. Setting `length` to a smaller value truncates the array — elements 3 and 4 are permanently removed.
**Difficulty:** Medium

---

**Q5 — Spot the Bug:**
```javascript
let results = ["pass", "fail", "pass"];
if (results.indexOf("pass")) {
    console.log("Test passed!");
}
```
**A:** The bug is subtle — `indexOf("pass")` returns `0` (index of first "pass"). `0` is falsy, so the `if` block never runs even though "pass" exists. Fix: `if (results.indexOf("pass") !== -1)` or `if (results.includes("pass"))`.
**Difficulty:** Hard

---

**Q6:** What does `splice` return?
```javascript
let arr = [1, 2, 3, 4, 5];
let removed = arr.splice(1, 2);
console.log(arr);
console.log(removed);
```
**A:** `arr = [1, 4, 5]`, `removed = [2, 3]`. `splice` mutates the original and returns the removed elements as a new array.
**Difficulty:** Medium

---

**Q7:** What is the output?
```javascript
let arr = [1, NaN, 3];
console.log(arr.indexOf(NaN));
console.log(arr.includes(NaN));
```
**A:** `-1` then `true`. `indexOf` uses strict equality (`NaN !== NaN` is always true), so it can never find NaN. `includes` uses SameValueZero which correctly identifies NaN.
**Difficulty:** Hard

---

**Q8:** What is the output?
```javascript
let a = [1, 2, 3];
let b = a;
b.push(4);
console.log(a);
```
**A:** `[1, 2, 3, 4]`. Arrays are reference types — `b = a` doesn't copy the array, both variables point to the same object. To copy: `let b = [...a]` or `let b = a.slice()`.
**Difficulty:** Medium

---

**Q9 — Spot the Bug:**
```javascript
let arr = [3, 1, 4, 1, 5];
let copy = arr;
copy.sort((a, b) => a - b);
console.log(arr);
```
**A:** `arr` is also sorted — `[1, 1, 3, 4, 5]`. `copy` and `arr` are the same reference. `.sort()` mutates. Fix: `let copy = [...arr].sort(...)`.
**Difficulty:** Medium

---

**Q10:** What is the difference between `forEach` and `map`?
**A:** `forEach` iterates for side effects — it always returns `undefined`. `map` transforms — it returns a new array of the same length where each element is the result of the callback. Never use `map` if you don't use the returned array; use `forEach` instead.
**Difficulty:** Easy

---

**Q11:** How do you safely check if a value is an array?
```javascript
typeof [];             // "object" ❌
[] instanceof Array;   // true but fails across iframes
Array.isArray([]);     // true ✅ — the reliable way
```
**A:** Use `Array.isArray(value)`. It is the only method that reliably identifies arrays across different JavaScript environments (iframes, realms).
**Difficulty:** Medium

---

**Q12:** What is the output?
```javascript
let arr = [1, 2, 3];
arr[10] = 99;
console.log(arr.length);
console.log(arr[5]);
```
**A:** `11` then `undefined`. Setting an index beyond the current length extends `arr.length` to `index + 1`. Slots 3–9 are empty (sparse), reading them gives `undefined`.
**Difficulty:** Hard

---

**Q13:** When would you use `find` vs `filter`?
**A:** `find` returns the **first matching element** (or `undefined`) — use when you want a single item. `filter` returns **all matching elements** as a new array — use when you want every match. `find` is more efficient when you only need the first result because it stops at the first match.
**Difficulty:** Easy

---

## 6. Controversial Topics & Ongoing Debates

### Mutating Methods vs Returning New Arrays

**The debate:** `sort()`, `reverse()`, `splice()`, `push()`, `pop()` all mutate the original array. Should JavaScript have made them return new arrays instead?

**One side:** Mutation is efficient — no memory allocation for a new array. For large arrays this matters.

**Other side:** Mutation causes bugs when you don't expect it (Q9 above). Functional programming advocates prefer immutability.

**Current state:** TC39 added **non-mutating alternatives** in ES2023:
```javascript
arr.toSorted((a, b) => a - b); // new sorted array — original unchanged
arr.toReversed();               // new reversed array — original unchanged
arr.toSpliced(1, 2);            // new spliced array — original unchanged
arr.with(index, value);         // new array with one element replaced
```
**Best practice today:** Use `toSorted`, `toReversed`, `toSpliced` when you need to preserve the original. Check browser support.

---

### `for...in` vs `for...of` on Arrays

**The debate:** `for...in` works on arrays — should it be used?

**Problem:** `for...in` gives string keys, includes inherited enumerable properties, and has no guaranteed order (though in practice V8 preserves insertion order for integer-like keys).

**Current consensus:** **Never use `for...in` on arrays.** It's designed for plain objects. Use `for...of` for values, or `for...of entries()` for index+value pairs.

---

### `Array.prototype.sort()` Stability

**The debate:** Is JavaScript's `sort()` stable? (Does it preserve relative order of equal elements?)

**History:** The ECMAScript spec did not require a stable sort until **ES2019**. Before that, V8 used an unstable sort for arrays longer than 10 elements.

**Current state:** ES2019 mandates a stable sort. All modern engines comply. But code running in very old environments may experience unstable sort — a gotcha for legacy test runners.

---

### Checking Array Emptiness

```javascript
arr.length === 0   // ✅ idiomatic
arr.length == 0    // works but == is weak
!arr.length        // ✅ concise but can surprise (falsy coercion)
arr == []          // ❌ NEVER — object reference comparison, always false
JSON.stringify(arr) === "[]" // ❌ overkill and wrong for sparse arrays
```

---

## 7. Quick Reference Cheat Sheet

### Creation Methods

| Method | Example | Result | Use when |
|--------|---------|--------|---------|
| Literal | `[1, 2, 3]` | `[1, 2, 3]` | Always — default |
| `Array.of` | `Array.of(3)` | `[3]` | Single-number element |
| `Array.from` | `Array.from("hi")` | `["h","i"]` | Convert iterable |
| `new Array(n)` | `new Array(3)` | `[empty×3]` | ⚠️ Avoid — use `Array.from` |

### Access

| Expression | Result |
|-----------|--------|
| `arr[0]` | First element |
| `arr[arr.length-1]` | Last element (classic) |
| `arr.at(-1)` | Last element (ES2022) |
| `arr[99]` on 3-element array | `undefined` (no error) |

### Mutation Methods

| Method | Effect | Returns |
|--------|--------|---------|
| `push(v)` | Add to end | New length |
| `pop()` | Remove from end | Removed value |
| `unshift(v)` | Add to start | New length |
| `shift()` | Remove from start | Removed value |
| `splice(i, n, ...v)` | Remove/insert at `i` | Removed items array |
| `sort(fn)` | Sort in-place | Same array |
| `reverse()` | Reverse in-place | Same array |

### Non-mutating ES2023 Alternatives

| Mutating | Non-mutating (safe copy) |
|---------|------------------------|
| `sort(fn)` | `toSorted(fn)` |
| `reverse()` | `toReversed()` |
| `splice(...)` | `toSpliced(...)` |
| `arr[i] = v` | `with(i, v)` |

### Search Decision Tree

```
Need position?
  ├─ Yes, exact value → indexOf / lastIndexOf
  └─ Yes, by condition → findIndex / findLastIndex

Need value?
  ├─ Just first → find
  └─ Just last → findLast

Just yes/no?
  └─ includes  (also works for NaN!)
```

### Iteration Comparison

| Method | Gives | Can break? | Returns |
|--------|-------|-----------|---------|
| `for (i=0;...)` | index + value | ✅ break | — |
| `for...of` | value | ✅ break | — |
| `for...of entries()` | index + value | ✅ break | — |
| `forEach` | value + index | ❌ | `undefined` |
| `map` | value + index | ❌ | New array |
| `filter` | value + index | ❌ | Filtered array |
| `for...in` | string keys ⚠️ | ✅ break | — |

---

---

## 8. Memory Map & Visual Flowchart

### A) Mind Map

```
[JavaScript Arrays]
  ├── Creation
  │     ├── [] literal → preferred ✅
  │     ├── new Array(n) → sparse array ⚠️ (not undefined-filled)
  │     ├── Array.of(n) → always element, never length ✅
  │     └── Array.from(iterable) → converts strings, Sets, NodeLists ✅
  ├── Access
  │     ├── arr[0] → positive index (0-based)
  │     ├── arr[-1] → undefined ❌ (not last element!)
  │     ├── arr.at(-1) → last element ✅ (ES2022)
  │     └── arr[99] on 3-element array → undefined (no error)
  ├── Mutation
  │     ├── push / pop → END of array
  │     ├── unshift / shift → START of array
  │     ├── splice(i, n, ...v) → ANY position — remove + insert
  │     ├── sort() → MUTATES ⚠️ + lexicographic by default ⚠️
  │     └── reverse() → MUTATES ⚠️ | use toReversed() ✅ (ES2023)
  ├── Search
  │     ├── indexOf / lastIndexOf → exact value, returns index or -1
  │     ├── includes → boolean, handles NaN correctly ✅
  │     ├── find / findIndex → predicate, left→right
  │     └── findLast / findLastIndex → predicate, right→left (ES2023)
  └── Iteration
        ├── for (i=0;i<len;i++) → index + value, can break ✅
        ├── for...of → values only, can break ✅
        ├── for...of entries() → index + value, can break ✅
        ├── forEach → functional, cannot break ❌
        └── for...in → string keys, avoid on arrays ❌
```

### B) Flowchart — Which Array Method Should I Use?

```mermaid
flowchart TD
    A[Need to work with array?] --> B{What do you need?}
    B -- Add/Remove --> C{Where?}
    C -- End --> D[push / pop]
    C -- Start --> E[unshift / shift]
    C -- Middle --> F[splice]
    B -- Search --> G{Do you need?}
    G -- Position --> H{Exact value?}
    H -- Yes --> I[indexOf / lastIndexOf]
    H -- No --> J[findIndex / findLastIndex]
    G -- Value --> K{Exact value?}
    K -- Yes --> L[includes]
    K -- No --> M[find / findLast]
    B -- Iterate --> N{Need index?}
    N -- Yes --> O[for loop or entries()]
    N -- No --> P[for...of or forEach]
    B -- Transform --> Q[map / filter / reduce]
```

### C) Execution Trace — `sort()` Trap (The Most Common Bug)

```javascript
let nums = [10, 9, 2, 1, 100];
nums.sort();
```

| Step | What JS does | Result |
|------|-------------|--------|
| Convert to strings | `"10"`, `"9"`, `"2"`, `"1"`, `"100"` | — |
| Sort lexicographically | Compare first char: `"1" < "2" < "9"` | — |
| Final array | `[1, 10, 100, 2, 9]` | ⚠️ Not numeric! |

**Fix:** `nums.sort((a, b) => a - b)` → `[1, 2, 9, 10, 100]` ✅

---

## 9. LinkedIn-Style Post

### 📢 LinkedIn Post

> **I've seen this bug in production code more than once.** 😬
>
> ```javascript
> let scores = [10, 9, 2, 1, 100];
> scores.sort();
> console.log(scores); // [1, 10, 100, 2, 9]  ← Wrong!
> ```
>
> JavaScript's default `.sort()` converts values to **strings** first.
> So `100` comes before `2` because `"1" < "2"` alphabetically.
>
> Fix it with a comparator:
> ```javascript
> scores.sort((a, b) => a - b); // [1, 2, 9, 10, 100] ✅
> ```
>
> While we're at it — three more Array traps that catch everyone:
>
> ❌ `arr[-1]` → returns `undefined` (use `arr.at(-1)` instead)
>
> ❌ `arr.indexOf(NaN)` → returns `-1` always (use `arr.includes(NaN)` instead)
>
> ❌ `let copy = arr; copy.sort(...)` → ALSO sorts the original!
> Arrays are reference types. Always spread first: `[...arr].sort(...)`
>
> ⚠️ And `.sort()` mutates the original. So does `.reverse()`.
> Use `.toSorted()` and `.toReversed()` (ES2023) if you need a safe copy.
>
> **Key Takeaway:** Never trust `.sort()` without a comparator function. And always remember — arrays are objects. Assigning one to another variable doesn't copy it.
>
> #JavaScript #Arrays #WebDev #CodeQuality #ProgrammingTips

---

## 10. Summary & Individual Notes Index

| File | Topic |
|------|-------|
| [64_Array_IQ.md](./64_Array_IQ.md) | Array intro, `.at()`, negative index gotcha |
| [65_Array2_IQ.md](./65_Array2_IQ.md) | `length`, out-of-bounds `undefined`, mixed types |
| [66_Array_Creation_IQ.md](./66_Array_Creation_IQ.md) | 4 creation methods, `new Array(n)` sparse trap |
| [67_Array_Access_Modifies_IQ.md](./67_Array_Access_Modifies_IQ.md) | Index access, `.at(-n)`, mutation, out-of-range |
| [68_Array_adding_removing_IQ.md](./68_Array_adding_removing_IQ.md) | push/pop/unshift/shift/splice with full trace |
| [69_Array_REAL_IQ.md](./69_Array_REAL_IQ.md) | Real-world browser array, pop+shift+for loop |
| [70_Array_searching_IQ.md](./70_Array_searching_IQ.md) | indexOf/lastIndexOf/includes — when to use each |
| [71_IQ_IQ.md](./71_IQ_IQ.md) | find/findIndex/findLast/findLastIndex |
| [72_Array_iterate_IQ.md](./72_Array_iterate_IQ.md) | All 5 iteration styles compared, for...in gotcha |
