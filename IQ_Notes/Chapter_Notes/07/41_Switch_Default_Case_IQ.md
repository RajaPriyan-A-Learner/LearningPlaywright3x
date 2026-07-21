# `switch` `default` as the Catch-All Branch

## Overview

Covers `07_chapter_switch/41_IQ2.js` — same day-of-week switch as [[39_Switch_Statement_Basics_IQ]], but every case now has a `break`, and the value (`day = 10`) matches none of them.

---

## 1. Reference Code

```javascript
let day = 10;
switch (day) {
    case 0: console.log("Sunday — Rest Day"); break;
    case 1: console.log("Monday — Sprint Planning"); break;
    // ... case 2-6 ...
    default: console.log("Invalid day value");
}
// day = 10 -> "Invalid day value"
```

---

## 2. `default` Doesn't Have to Be Last

`default` behaves like `else` in an `if/else` chain: it only runs if **no** `case` matched. Its *position* in source doesn't matter for that rule — JS still checks every `case` label first, and only falls into `default` if none matched, wherever it's written. (Position only matters if `default` lacks a `break` and cases are written after it, since fall-through is purely positional — see [[40_Switch_Fallthrough_No_Break_IQ]].)

---

## 3. `break` Makes Every Case (Including `default`) Mutually Exclusive

Because every case here ends in `break`, `day = 10` cleanly skips all seven `case` labels (none strictly `===` 10) and lands only on `default` — none of the other `console.log`s run. This is the well-behaved counterpart to [[40_Switch_Fallthrough_No_Break_IQ]], where the missing `break`s caused every branch to run regardless of match.

---

## Summary

**Key Takeaway:** `default` is `switch`'s catch-all, equivalent to the final `else` in an `if/else if` ladder — it fires only when no `case` label strictly (`===`) matches the switch expression, provided every case is properly terminated with `break`.

**Related notes:** [[39_Switch_Statement_Basics_IQ]], [[40_Switch_Fallthrough_No_Break_IQ]], [[47_Switch_Strict_Equality_IQ]]
