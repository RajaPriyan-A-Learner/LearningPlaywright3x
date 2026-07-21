# `switch (true)` — Range Conditions in a `switch`

## Overview

Covers `07_chapter_switch/45_IQ2.js` — the `switch (true)` idiom, which lets `switch` express range/boolean conditions the way a plain `switch (value)` normally can't. This is the switch-statement analog of the `else if` ladder in [[38_If_Else_If_Ladder_Grade_Calculator_IQ]] and the chained ternary in [[30_Nested_Ternary_Temperature_Scale_IQ]].

---

## 1. Reference Code

```javascript
let testScore = 85;
switch (true) {
    case (testScore >= 95):
        console.log("Outstanding — Top performer");
        break;
    case (testScore >= 85):
        console.log("Excellent — Above expectations");
        break;
    case (testScore >= 70):
        console.log("Good — Meets expectations");
        break;
    case (testScore >= 50):
        console.log("Needs Improvement");
        break;
    default:
        console.log("Unsatisfactory — Requires training");
}
// testScore = 85 -> "Excellent — Above expectations"
```

---

## 2. How It Works

Normally a `switch(expr)` compares `expr` against each `case` **value** with `===`. Here, `expr` is the literal `true`, and each `case` is itself a *boolean expression* (`testScore >= 95`, etc.) — so the engine is really doing `true === (testScore >= 95)`, `true === (testScore >= 85)`, and so on, top to bottom, stopping at the first one that evaluates `true`.

For `testScore = 85`: `testScore >= 95` is `false` (skip), `testScore >= 85` is `true` (match) → prints `"Excellent..."` and `break`s before reaching the `>= 70` / `>= 50` branches.

---

## 3. Order Still Matters — Same Rule as Chained Ternaries/If-Else

Exactly like [[38_If_Else_If_Ladder_Grade_Calculator_IQ]], the ranges must be listed from the **highest** threshold down to the lowest. If `testScore >= 50` were checked first, every score of 50+ would incorrectly match that branch and never reach the more specific `>= 85`/`>= 95` checks.

---

## Summary

**Key Takeaway:** `switch (true)` repurposes `switch` as an alternative syntax for an `if/else if` ladder by putting boolean expressions in the `case` labels instead of the switch expression. Functionally identical to chained `if/else`, purely a stylistic choice — and it inherits the exact same "order from most to least restrictive" requirement.

**Related notes:** [[38_If_Else_If_Ladder_Grade_Calculator_IQ]], [[30_Nested_Ternary_Temperature_Scale_IQ]], [[47_Switch_Strict_Equality_IQ]]
