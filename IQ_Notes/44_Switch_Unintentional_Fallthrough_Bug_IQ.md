# `switch` Unintentional Fall-Through — The Interview Trap

## Overview

Covers `07_chapter_switch/44_IQ.js` — structurally identical mistake to [[40_Switch_Fallthrough_No_Break_IQ]] (no `break` anywhere), but framed to test whether you can predict cascading output on a string switch.

---

## 1. Reference Code

```javascript
let fruit = "banana";
switch (fruit) {
    case "apple":
        console.log("Apple selected");
    case "banana":
        console.log("Banana selected");
    case "cherry":
        console.log("Cherry selected");
    case "date":
        console.log("Date selected");
    default:
        console.log("Default reached");
}
```

---

## 2. What Actually Prints

```
Banana selected
Cherry selected
Date selected
Default reached
```

`fruit === "banana"` matches the second `case`, and — with zero `break` statements in the whole switch — execution just keeps running every line below it, including `default`. `"Apple selected"` never prints (its case wasn't matched and it's *above* the match), but everything from the matched case downward does.

---

## 3. Intentional vs. Unintentional Fall-Through

Compare this file directly to [[43_Switch_Case_Grouping_IQ]]:
- **Intentional** (43): empty `case` labels stacked *before* a single body — a deliberate grouping technique, always paired with a `break` at the end of the group.
- **Unintentional** (this file, 44 / and 40): every `case` has its **own** body, but none of them terminate with `break` — so a single match unintentionally cascades through unrelated branches. This is the pattern linters like ESLint's `no-fallthrough` rule exist to catch.

---

## Summary

**Key Takeaway:** A `case` with its own executable body that lacks `break` is almost always a bug, not a design choice — contrast with grouped *empty* case labels (used deliberately) in [[43_Switch_Case_Grouping_IQ]]. When in doubt, terminate every case explicitly with `break`, `return`, or `throw`.

**Related notes:** [[40_Switch_Fallthrough_No_Break_IQ]], [[43_Switch_Case_Grouping_IQ]], [[39_Switch_Statement_Basics_IQ]]
