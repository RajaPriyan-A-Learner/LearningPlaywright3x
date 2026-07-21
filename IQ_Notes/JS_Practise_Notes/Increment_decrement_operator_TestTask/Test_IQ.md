# Test — Practice Notes

## Overview

Covers `JS_Practise/Increment_decrement_operator_TestTask/Test.js` — four increment/decrement trace-the-output exercises, relocated here from the project root. This is the same file already analyzed in full in [[Increment_Decrement_Test_Task_IQ]]; see that note for the complete walkthrough. This page gives the short version plus the pointer.

## Source

```javascript
/*let a=100;
console.log(a++ + ++a + a++ + ++a);
console.log(a);
...
Answer:
let a = 5;
let b = a-- - --a;
console.log(b, a);
let i = 1;
let r = i++ > 1 ? i++ : ++i;
console.log(r, i);*/

let a = 100;
console.log(a++ + ++a +a++ + ++a);
console.log(a);

let a = 37;
console.log(--a + a--);
console.log(a);

let a = 5;
let b = a-- - --a;
console.log(b, a);

let i = 1;
let r = i++ > 1 ? i++ : ++i;
console.log(r, i);
```

---

## Notes

The commented-out block at the top lists four separate exercises under an "Answer:" heading, but the live code below runs them all in one continuous top-level scope — and re-declares `let a` three times (`100`, `37`, `5`). `let` forbids re-declaring the same identifier in the same scope, so this file throws a `SyntaxError: Identifier 'a' has already been declared` at **parse time** and never actually executes, not even the first `console.log`. See [[Let_Keyword_and_Loops_IQ]] for why `let` behaves this way (unlike `var`, which would silently allow it).

Each exercise, if isolated in its own `{ }` block, resolves as follows:

| Exercise | Expression | Result | Final value |
|---|---|---|---|
| 1 | `a++ + ++a + a++ + ++a` (a=100) | `408` | `a = 104` |
| 2 | `--a + a--` (a=37) | `72` | `a = 35` |
| 3 | `a-- - --a` (a=5) | `2` | `a = 3` |
| 4 | `i++ > 1 ? i++ : ++i` (i=1) | `r = 3` | `i = 3` |

Exercise 4 is the subtlest: the ternary's own **condition** contains `i++`, so evaluating the condition already mutates `i` before either branch runs — full step-by-step trace in [[Increment_Decrement_Test_Task_IQ]].

---

## Summary

**Key Takeaway:** The file as written doesn't run at all — redeclaring `let a` in the same scope is a hard `SyntaxError`, not a soft warning. Once each exercise is wrapped in its own block, all four resolve deterministically via left-to-right evaluation with immediate side effects.

**Related notes:** [[Increment_Decrement_Test_Task_IQ]], [[Let_Keyword_and_Loops_IQ]], [[32_Increment_Decrement_Operators_IQ]]
