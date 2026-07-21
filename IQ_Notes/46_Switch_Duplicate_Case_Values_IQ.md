# `switch` Duplicate `case` Values — No Compile-Time Check

## Overview

Covers `07_chapter_switch/46_IQ3.js` — two `case` labels with the **identical** value (`10`). JS does not enforce case-value uniqueness, so this is valid syntax, but the second occurrence is permanently unreachable dead code.

---

## 1. Reference Code

```javascript
let x = 10;
switch (x) {
    case 10:
        let b1 = 1;
        console.log(b1);
        break;
    case 10:
        let b2 = 2;
        console.log(b2);
        break;
    default:
        console.log("d");
}
// x = 10 -> prints 1 (only the FIRST "case 10" ever runs)
```

---

## 2. Why It Doesn't Throw a `SyntaxError`

Unlike duplicate `let` declarations in the same scope (see [[39_Switch_Statement_Basics_IQ]] §2), duplicate `case` **values** aren't a language-level uniqueness violation — the spec treats `switch` as a plain top-to-bottom sequence of `===` comparisons against the switch expression, evaluated one at a time, stopping at the **first** match. It never checks "is this case value already used elsewhere" — it just runs comparisons in order and jumps to the first `true`.

For `x = 10`, the very first comparison (`x === 10`, the first `case 10`) already succeeds, so the switch jumps there and `break`s before the second `case 10` is ever reached — `let b2` never executes, `console.log(b2)` never runs.

---

## 3. Why This Is a Bug, Not a Feature

Some engines/linters (TypeScript, ESLint with `no-duplicate-case`) will flag this as a warning or error, but vanilla JavaScript will not — the file runs silently, with the second block permanently unreachable. This is a common copy-paste mistake (duplicating a `case` block and forgetting to update the label) that produces no runtime error at all, just quietly wrong behavior.

---

## Summary

**Key Takeaway:** JS `switch` never checks for duplicate `case` values — it evaluates cases top-to-bottom and commits to the first strict (`===`) match, silently making any later duplicate case unreachable. Static analysis tools (TS/ESLint), not the JS engine itself, are what catch this.

**Related notes:** [[39_Switch_Statement_Basics_IQ]], [[47_Switch_Strict_Equality_IQ]], [[38_If_Else_If_Ladder_Grade_Calculator_IQ]]
