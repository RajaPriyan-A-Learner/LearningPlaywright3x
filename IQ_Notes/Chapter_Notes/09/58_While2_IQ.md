# While 2 — Counted Retry Loop with `while`

## Overview

Covers `09_chapter_Loops/58_While2.js` — a clean, minimal example of a counted `while` loop used to simulate retries. Highlights that the init variable (`attempts`) must be declared and initialised outside the loop and incremented inside the body, otherwise the loop runs forever.

---

## 1. Reference Code

```javascript
let attempts = 0; // Init

while (attempts < 3) {
    console.log("Attempt", attempts);
    attempts++;
}
```

---

## 2. Trace Table

| Iteration | `attempts` (entry) | Condition `< 3` | Output | `attempts` (exit) |
|-----------|-------------------|-----------------|--------|-------------------|
| 1 | 0 | ✅ true | `"Attempt 0"` | 1 |
| 2 | 1 | ✅ true | `"Attempt 1"` | 2 |
| 3 | 2 | ✅ true | `"Attempt 2"` | 3 |
| — | 3 | ❌ false | loop exits | — |

**Output:** `Attempt 0`, `Attempt 1`, `Attempt 2`

---

## 3. The Init Comment is a Hint

The comment `// Init` on the first line deliberately mirrors the "I" from the for-loop ICU mnemonic. It reminds you that in a `while` loop, the init step lives *outside* — forget it and you'll reference an undeclared variable; forget `attempts++` inside and you have an infinite loop.

---

## 4. Playwright Relevance

This pattern directly maps to retry logic in Playwright helpers:

```javascript
let retries = 0;
while (retries < 3) {
    // attempt the action
    retries++;
}
```

---

## Summary

**Key Takeaway:** In a `while` loop, init lives before the loop and update lives inside the body — both are easy to forget. Missing the update creates an infinite loop.

**Related notes:** [[57_While_IQ]], [[59_Example1_IQ]], [[60_While_Vs_for_IQ]]
