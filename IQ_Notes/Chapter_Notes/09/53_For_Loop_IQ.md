# For Loop — The ICU Pattern (Init / Condition / Update)

## Overview

Covers `09_chapter_Loops/53_For_Loop.js` — introduces the `for` loop using the **ICU mnemonic** (Init, Condition, Update). Also shows that `++i` (pre-increment) and `i++` (post-increment) are interchangeable when used as the update expression of a for loop.

---

## 1. Reference Code

```javascript
// For Loop
// Help you to repeat a block of code.

// ICU
// INIT - let i=0
// CONDITION - i < 10

// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }

for (let i = 0; i < 10; ++i) {
    console.log(i);
}
```

---

## 2. ICU Breakdown

| Part | Example | Purpose |
|------|---------|---------|
| **I**nit | `let i = 0` | Runs once before the loop starts; sets the counter |
| **C**ondition | `i < 10` | Checked before every iteration; if `false`, loop exits |
| **U**pdate | `++i` | Runs after every iteration; advances the counter |

---

## 3. `i++` vs `++i` in a For Loop Update

- `i++` — post-increment: returns the old value, **then** increments.
- `++i` — pre-increment: increments **first**, then returns the new value.

In the **update slot** of a `for` loop the returned value is discarded, so both produce identical behaviour — `i` ends up incremented by 1 either way. The commented-out version uses `i++` and the final version uses `++i`; output is the same: `0` through `9`.

---

## Summary

**Key Takeaway:** The three parts of a `for` loop — Init, Condition, Update (ICU) — each play a distinct role. `i++` and `++i` are equivalent when used only as the loop update expression because the return value is never used.

**Related notes:** [[52_Loops_IQ]], [[54_Increment_IQ]], [[55_For_Loops2_IQ]]
