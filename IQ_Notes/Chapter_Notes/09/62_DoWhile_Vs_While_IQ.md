# Do-While vs While — At-Least-Once Execution Demo

## Overview

Covers `09_chapter_Loops/62_DoWhile_Vs_While.js` — side-by-side demonstration of `while` and `do...while` with the **same initial condition that is immediately false** (`a = 10`, condition `a < 10`). Shows that `while` runs zero times while `do...while` always runs once.

---

## 1. Reference Code

```javascript
// let a = 10;
// while (a < 10) {
//     console.log(a);
//     a++;
// }

let a = 10;
do {
    console.log(a);
    a++;
} while (a < 10);
```

---

## 2. Comparison — Same Starting Value, Different Behaviour

| Loop type | Init | Condition check | Body executes? | Output |
|-----------|------|-----------------|---------------|--------|
| `while` (commented) | `a = 10` | **Before** body — `10 < 10` → `false` | ❌ Never | *(nothing)* |
| `do...while` (active) | `a = 10` | **After** body | ✅ Once, then exits | `10` |

**Active output:** `10`

After the body runs: `a` becomes `11`. Condition `11 < 10` is `false` → exits. Body ran exactly once.

---

## 3. The Golden Rule

> `while` checks **first** — body may never run.
> `do...while` runs **first** — body always runs at least once.

---

## 4. Common Mistake

```javascript
let a = 10;
do {
    console.log(a);
    a++;
} while (a < 10)   // ← Missing semicolon — SyntaxError in strict mode
```

Always add `;` after the closing `)` of a `do...while`.

---

## Summary

**Key Takeaway:** `do...while` is the only JS loop that guarantees **at least one execution** regardless of the condition. This file proves it: starting with `a = 10` and `condition a < 10` (already false) still prints `10` once before exiting.

**Related notes:** [[57_While_IQ]], [[61_Do_while_IQ]], [[63_Nested_For_Loops_IQ]]
