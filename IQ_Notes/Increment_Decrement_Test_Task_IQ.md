# Increment/Decrement Test Task — Worked Solutions (and a Real `SyntaxError`)

## Overview

Covers `Increment_decrement_operator_TestTask/Test.js` — four increment/decrement trace-the-output exercises (a step up in difficulty from [[34_Increment_Multiple_Expressions_IQ]]), including a ternary condition that itself contains a side-effecting `i++`. The file also demonstrates a **real, reproducible `SyntaxError`** as written — covered first since it's the most important takeaway.

---

## 1. The File Doesn't Actually Run As-Is

```javascript
let a = 100;
console.log(a++ + ++a + a++ + ++a);
console.log(a);

let a = 37;   // <-- SyntaxError here
console.log(--a + a--);
```

Running it fails immediately:

```
$ node Test.js
let a = 37;
    ^
SyntaxError: Identifier 'a' has already been declared
```

**Why:** all four exercises declare `let a` (or reuse `a`/`i`) at the **same top-level scope**, one after another. `let` forbids re-declaring the same identifier in the same scope — this is exactly the rule documented in [[Let_Keyword_and_Loops_IQ]]. Unlike `var` (which would silently allow it), `let` throws a `SyntaxError` at **parse time**, before any code runs at all — which is why even the very first `console.log` never executes; the whole file fails to load.

**The fix** — wrap each exercise in its own block (`{ }`) so each `a`/`i` gets a fresh scope:

```javascript
{
  let a = 100;
  console.log(a++ + ++a + a++ + ++a);
  console.log(a);
}
{
  let a = 37;
  console.log(--a + a--);
  console.log(a);
}
// ...and so on
```

This is the same fix implied by the file's own commented-out header block at the top, which lists the four exercises separately under an "Answer:" heading — the intent was clearly four independent problems, not one continuous script.

---

## 2. Worked Solution — Exercise 1

```javascript
let a = 100;
console.log(a++ + ++a + a++ + ++a); // 408
console.log(a);                      // 104
```

| Step | Operand | Side effect | Value used |
|---|---|---|---|
| 1 | `a++` | `a` → 101 | `100` (old) |
| 2 | `++a` | `a` → 102 | `102` (new) |
| 3 | `a++` | `a` → 103 | `102` (old) |
| 4 | `++a` | `a` → 104 | `104` (new) |

```
Sum = 100 + 102 + 102 + 104 = 408
Final a = 104
```

Same left-to-right, immediate-side-effect rule as [[33_Advanced_Increment_Expression_IQ]] and [[34_Increment_Multiple_Expressions_IQ]] — just with four operands instead of two or three.

---

## 3. Worked Solution — Exercise 2

```javascript
let a = 37;
console.log(--a + a--); // 72
console.log(a);          // 35
```

| Step | Operand | Side effect | Value used |
|---|---|---|---|
| 1 | `--a` | `a` → 36 | `36` (new) |
| 2 | `a--` | `a` → 35 | `36` (old, i.e. the value *just* set by step 1) |

```
Sum = 36 + 36 = 72
Final a = 35
```

The two operands happen to produce the *same* value (`36`) here purely by coincidence — `--a` sets `a` to 36 and returns it, then `a--` immediately reads that same `36` before decrementing.

---

## 4. Worked Solution — Exercise 3

```javascript
let a = 5;
let b = a-- - --a;
console.log(b, a); // 2 3
```

| Step | Operand | Side effect | Value used |
|---|---|---|---|
| 1 | `a--` | `a` → 4 | `5` (old) |
| 2 | `--a` | `a` → 3 | `3` (new) |

```
b = 5 - 3 = 2
Final a = 3
```

---

## 5. Worked Solution — Exercise 4 (Ternary Condition With a Side Effect)

```javascript
let i = 1;
let r = i++ > 1 ? i++ : ++i;
console.log(r, i); // 3 3
```

This is the most subtle one: the ternary's **condition itself** contains `i++`, so evaluating the condition mutates `i` *before* either branch is chosen.

| Step | Expression | Side effect | Value used |
|---|---|---|---|
| 1 | `i++` (inside condition) | `i` → 2 | `1` (old value, used for the comparison) |
| 2 | `1 > 1` | — | `false` |
| 3 | (false branch) `++i` | `i` → 3 | `3` |

```
r = 3
Final i = 3
```

**The trap:** it's easy to assume the condition check doesn't "count" as a mutation, and to evaluate `i++ > 1` using `i`'s original value of `1` throughout. But `i++` inside the condition already advanced `i` to `2` — by the time the `:` (false) branch's `++i` runs, it's incrementing from `2`, not `1`, landing on `3`. See [[28_Nested_Ternary_Two_Level_IQ]] for ternary nesting in general — this exercise adds a side-effecting condition on top of that.

---

## Summary

**Key Takeaway:** This file's biggest lesson isn't actually about increment/decrement math — it's that redeclaring `let a` multiple times in the same scope is a hard `SyntaxError`, not a soft warning, and it prevents the whole file from running at all (see [[Let_Keyword_and_Loops_IQ]]). Once each exercise is isolated in its own block, all four resolve to deterministic answers by applying the same rule throughout: operands evaluate strictly left to right, and each `++`/`--` side effect is visible immediately to everything evaluated after it — including a ternary's own condition.

**Related notes:** [[Let_Keyword_and_Loops_IQ]], [[32_Increment_Decrement_Operators_IQ]], [[33_Advanced_Increment_Expression_IQ]], [[34_Increment_Multiple_Expressions_IQ]], [[35_Decrement_Operator_Pre_Post_IQ]], [[28_Nested_Ternary_Two_Level_IQ]], [[JavaScript_Quirks_and_Known_Bugs_IQ]]
