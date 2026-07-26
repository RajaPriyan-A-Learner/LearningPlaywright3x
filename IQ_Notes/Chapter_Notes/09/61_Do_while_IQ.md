# Do-While — Syntax Reference (Commented-Out Example)

## Overview

Covers `09_chapter_Loops/61_Do_while.js` — the entire file is commented out, serving as a syntax stub/reference for the `do...while` loop. The key difference from `while` is that the body executes **at least once** before the condition is checked.

---

## 1. Reference Code

```javascript
// let retry = 0;
// do {
//     console.log("Execute a Code!");
//     console.log("RETRYing.......", retry);
//     retry++;
// } while (retry < 3);
```

*(All lines are commented out — no live output.)*

---

## 2. `do...while` Syntax

```
do {
    // body — runs FIRST, before condition is checked
} while (condition);
```

Note the **semicolon** after the closing parenthesis — it is required and is a common syntax mistake to omit it.

---

## 3. At-Least-Once Guarantee

With a `while` loop, if `retry = 5` and the condition is `retry < 3`, the body never runs.  
With a `do...while`, the body **always runs once** regardless of the initial condition:

```javascript
let retry = 5;
do {
    console.log("This runs once even though condition is false");
} while (retry < 3);
// Prints once, then exits
```

---

## 4. When to Use `do...while`

- **User input validation** — ask once, then keep asking until valid.
- **Initial handshake/connection** — try once, then retry if needed.
- Any situation where one execution before the check makes semantic sense.

---

## Summary

**Key Takeaway:** `do...while` guarantees the body executes **at least once** — the condition is checked *after* the first run. Don't forget the semicolon after `while(condition)`.

**Related notes:** [[57_While_IQ]], [[62_DoWhile_Vs_While_IQ]]
