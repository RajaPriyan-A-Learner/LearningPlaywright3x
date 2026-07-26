# While — `for` Loop vs `while` Loop Side-by-Side

## Overview

Covers `09_chapter_Loops/57_While.js` — shows the `while` loop introduced by first writing an equivalent `for` loop with the init moved outside. Makes it clear that `for` and `while` are interchangeable; the choice is a matter of style and intent.

---

## 1. Reference Code

```javascript
let i = 0;
for (; i < 10; i++) {
    console.log(i);
}

let j = 0;
while (j < 10) {
    console.log(j);
    j++;
}
```

---

## 2. Equivalence Table

| Part | `for` version | `while` version |
|------|--------------|-----------------|
| Init | `let i = 0` (before loop) | `let j = 0` (before loop) |
| Condition | `i < 10` (in `for` header) | `j < 10` (in `while` header) |
| Update | `i++` (in `for` header) | `j++` (inside loop body) |
| Output | 0 – 9 | 0 – 9 |

Both produce **identical** output: 0 through 9.

---

## 3. The `for` Loop with Missing Init

The first snippet intentionally writes `for (; i < 10; i++)` — the init slot is empty because `i` was already declared before the loop. This is valid JavaScript but unusual. It visually bridges toward the `while` loop pattern where init always lives outside.

---

## 4. When to Use Each

- **`for`** — when you know the exact number of iterations upfront (counted loop).
- **`while`** — when the number of iterations depends on a condition that may change unpredictably (event/retry loops).

---

## Summary

**Key Takeaway:** `for` and `while` are equivalent in power. The difference is style: `for` keeps init/condition/update in one line; `while` spreads them out — init before, update inside the body.

**Related notes:** [[53_For_Loop_IQ]], [[58_While2_IQ]], [[60_While_Vs_for_IQ]]
