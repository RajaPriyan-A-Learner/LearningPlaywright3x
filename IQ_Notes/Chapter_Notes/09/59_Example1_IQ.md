# Example 1 — `while` Loop Practice

## Overview

Covers `09_chapter_Loops/59_Example1.js` — a short practice exercise using a `while` loop with a numeric counter. The loop prints the same string 15 times, reinforcing the init-outside / increment-inside pattern.

---

## 1. Reference Code

```javascript
let modi = 1;
while (modi <= 15) {
    console.log("Modi will do 15+ years");
    modi++;
}
```

---

## 2. Trace Summary

- Starts at `modi = 1`, runs while `modi <= 15` → **15 iterations**.
- Prints `"Modi will do 15+ years"` each iteration.
- `modi++` ensures termination; without it, infinite loop.

---

## 3. `<= 15` vs `< 15`

| Condition | Iterations | Range |
|-----------|-----------|-------|
| `modi <= 15` (this file) | **15** | 1 – 15 inclusive |
| `modi < 15` | **14** | 1 – 14 inclusive |

Starting from 1 and using `<=` is the natural human-counting style.

---

## 4. Common Gotcha

If you forget `modi++`:
```javascript
let modi = 1;
while (modi <= 15) {
    console.log("Modi will do 15+ years");
    // modi++ missing → INFINITE LOOP
}
```
Always verify the update step is present and moves the counter toward the exit condition.

---

## Summary

**Key Takeaway:** Practice example confirming the `while` loop pattern: init before, condition in the header, increment inside. Using `<= N` with init at `1` gives exactly N iterations.

**Related notes:** [[57_While_IQ]], [[58_While2_IQ]]
