# `if / else if / else` Ladder — Grade Calculator

## Overview

Covers `06_chapter_Statement/38_Multiple_Condition.js` — a chained `else if` ladder bucketing a numeric score into letter grades, the statement-form equivalent of the chained ternary in [[29_Nested_Ternary_HTTP_Status_Category_IQ]] and [[30_Nested_Ternary_Temperature_Scale_IQ]].

---

## 1. Reference Code

```javascript
let score = 78;

if (score >= 90) {
    console.log("Grade: A — Excellent");
}
else if (score >= 80 && score < 90) {
    console.log("Grade: B — Good");
}
else if (score >= 70 && score < 80) {
    console.log("Grade: C — Can do better");
}
else if (score >= 60 && score < 70) {
    console.log("Grade: D — Needs Improvement");
}
else if (score >= 50 && score < 60) {
    console.log("Grade: E : Bring Paranets");
} else {
    console.log("You can sell momos, pizza!")
}
// score = 78 -> "Grade: C — Can do better"
```

---

## 2. How the Ladder Evaluates

Each `else if` is only checked if every condition **above** it was false — the first branch whose condition is `true` runs, and the rest are skipped entirely (short-circuit down the ladder):

```
score = 78
  score >= 90            -> false
  score >= 80 && < 90     -> false
  score >= 70 && < 80     -> TRUE  -> "Grade: C — Can do better" (rest never checked)
```

---

## 3. The Upper-Bound Checks Are Redundant Here — Why They're Still Useful

Notice each middle branch checks *both* bounds: `score >= 80 && score < 90`. Because this is an `else if` chain, the upper bound is technically redundant — by the time you reach that branch, you already know `score < 90` (otherwise the first branch would have caught it). A shorter, equivalent version:

```javascript
if (score >= 90) {
    console.log("Grade: A — Excellent");
} else if (score >= 80) {          // no need for `&& score < 90`
    console.log("Grade: B — Good");
} else if (score >= 70) {
    console.log("Grade: C — Can do better");
} else if (score >= 60) {
    console.log("Grade: D — Needs Improvement");
} else if (score >= 50) {
    console.log("Grade: E : Bring Paranets");
} else {
    console.log("You can sell momos, pizza!");
}
```

Both versions produce identical results for every input. The explicit upper bound isn't wrong — it can make each branch's range self-documenting/readable in isolation — but it's extra code that adds no behavioral difference in an `else if` chain specifically (unlike a `switch` or independent `if` statements, where omitting bounds could actually change behavior).

---

## 4. Same Pattern as the Chained Ternary — Order Still Matters

Exactly like [[30_Nested_Ternary_Temperature_Scale_IQ]], the branches **must** be ordered from highest threshold to lowest. Checking `score >= 50` before `score >= 90` would incorrectly catch every high score in the first low-bar branch.

---

## Summary

**Key Takeaway:** An `if / else if / else` ladder checks conditions top-to-bottom and stops at the first match — order must go from most-restrictive/highest threshold to least, same rule as chained ternaries. Explicit upper-bound checks in each `else if` are often redundant (the chain structure already guarantees it) but can aid readability.

**Related notes:** [[37_If_Else_Statement_Basics_IQ]], [[38_Nested_If_Else_Statement_IQ]], [[29_Nested_Ternary_HTTP_Status_Category_IQ]], [[30_Nested_Ternary_Temperature_Scale_IQ]]
