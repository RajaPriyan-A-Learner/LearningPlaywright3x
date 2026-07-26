# Array Searching — `indexOf`, `lastIndexOf`, `includes`

## Overview

Covers `10_chapter_Arrays/70_Array_searching.js` — demonstrates three array search methods: `indexOf` (first occurrence position), `lastIndexOf` (last occurrence position from end), and `includes` (boolean existence check). None of the results are printed, making this a reference/exploration file.

---

## 1. Reference Code

```javascript
//Searching

let results = ["pass", "fail", "pass", "error", "fail"];

// indexOf — returns first index, or -1 if not found
results.indexOf("fail"); //1
results.indexOf("skip");  // -1

// lastIndexOf — searches from the end
results.lastIndexOf("fail");

// includes — returns boolean
results.includes("error"); // true
```

---

## 2. Method Reference Table

For `results = ["pass", "fail", "pass", "error", "fail"]`:

| Method | Call | Return | Explanation |
|--------|------|--------|-------------|
| `indexOf` | `indexOf("fail")` | `1` | First `"fail"` is at index 1 |
| `indexOf` | `indexOf("skip")` | `-1` | `"skip"` not found → -1 |
| `lastIndexOf` | `lastIndexOf("fail")` | `4` | Last `"fail"` is at index 4 |
| `includes` | `includes("error")` | `true` | `"error"` exists in array |

---

## 3. When to Use Each

| Method | Use when you need |
|--------|-----------------|
| `indexOf` | The **position** of the first match (or `-1` to detect absence) |
| `lastIndexOf` | The **position** of the last/most-recent match |
| `includes` | Just a **yes/no** — does this value exist? |

---

## 4. Common Pattern — Check Before Act

```javascript
if (results.includes("fail")) {
    console.log("Test suite has failures!");
}

const failIndex = results.indexOf("fail");
if (failIndex !== -1) {
    console.log("First failure at index:", failIndex);
}
```

Always compare `indexOf` against `-1`, not just truthiness (index `0` is falsy but valid!).

---

## 5. Playwright Relevance

```javascript
const browsers = ["chromium", "firefox", "webkit"];
if (browsers.includes("webkit")) { /* run Safari test */ }
```

---

## Summary

**Key Takeaway:** `indexOf` returns the first position (or -1); `lastIndexOf` returns the last position; `includes` returns a boolean. Never use `indexOf` result as a boolean — index `0` is falsy but means "found at start".

**Related notes:** [[68_Array_adding_removing_IQ]], [[71_IQ_IQ]], [[69_Array_REAL_IQ]]
