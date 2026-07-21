# `switch` Fall-Through — No `break` At All

## Overview

Covers `07_chapter_switch/40_IQ.js` — every `case` is missing `break`, so matching one case runs **every** case body below it, in source order, down through `default`.

---

## 1. Reference Code

```javascript
let day = 2;
switch (day) {
    case 0: console.log("Sunday — Rest Day");
    case 1: console.log("Monday — Sprint Planning");
    case 2: console.log("Tuesday — Development");
    case 3: console.log("Wednesday — Code Review");
    case 4: console.log("Thursday — Testing");
    case 5: console.log("Friday — Deployment & Retro");
    case 6: console.log("Saturday — Rest Day");
    default: console.log("Invalid day value");
}
```

---

## 2. What Actually Prints for `day = 2`

```
Tuesday — Development
Wednesday — Code Review
Thursday — Testing
Friday — Deployment & Retro
Saturday — Rest Day
Invalid day value
```

`switch` finds the **first** matching `case` label (`case 2`) and then just keeps executing statements top-to-bottom — it does **not** re-check any later case's condition. Every subsequent `case`/`default` body runs unconditionally until a `break` or the closing `}` is hit. Since none exist here, execution runs all the way through `default` too, even though `day` clearly isn't an "invalid" value.

---

## 3. Why This Matters

This is the textbook interview trap: people assume `default` only runs when nothing else matches. That's only true when `break` is present in every other branch. Without `break`, `default` is just "the last case in the list" and executes like any other once control reaches it by falling through.

---

## Summary

**Key Takeaway:** `switch` does not re-evaluate the condition per case — after the first match, it runs every subsequent statement until a `break`. Omitting `break` everywhere makes the whole switch behave like one long uninterrupted block. Contrast with the *intentional* use of this behavior in [[43_Switch_Case_Grouping_IQ]].

**Related notes:** [[39_Switch_Statement_Basics_IQ]], [[44_Switch_Unintentional_Fallthrough_Bug_IQ]], [[41_Switch_Default_Case_IQ]]
