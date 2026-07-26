# For Loop 3 — Conditional Logic Inside a Loop

## Overview

Covers `09_chapter_Loops/56_For_Loops3.js` — demonstrates embedding `if/else` logic inside a `for` loop to produce different output per iteration. Also comments out an infinite-loop edge case (empty condition) and a condition that never runs.

---

## 1. Reference Code

```javascript
// for (let _1 = 0; _1 <= 10; _1++) {
//     console.log(_1);
// }

// for (let pramod = 0; pramod > 1; pramod++) {
//     console.log(pramod);
// }   // Never runs: 0 > 1 is false immediately

// for (let pramod = 0; ; pramod++) {
//     console.log(pramod);
// }   // INFINITE LOOP: missing condition is always true

for (let somya = 0; somya < 18; somya++) {
    if (somya > 15) {
        console.log("Gift from papa, iphone this year")
    } else {
        console.log("No Gift, iphone only barbie doll")
    }
}
```

---

## 2. Active Loop Trace

- Runs `somya` from `0` to `17` (18 iterations total).
- When `somya` is **0–15** (16 times): prints `"No Gift, iphone only barbie doll"`.
- When `somya` is **16 or 17** (2 times): prints `"Gift from papa, iphone this year"`.

---

## 3. Edge Cases in Commented Code

| Version | What happens |
|---------|-------------|
| `pramod > 1` with init `0` | Condition is `false` immediately — loop body **never executes** |
| Empty condition `;  ;` | Treated as always `true` — **infinite loop**, requires a `break` to exit |

Both are common bugs to watch out for.

---

## Summary

**Key Takeaway:** You can place any statement — including `if/else` — inside a loop body. A condition that is never true means zero iterations; an omitted condition means an infinite loop. Both are easy to write accidentally.

**Related notes:** [[53_For_Loop_IQ]], [[55_For_Loops2_IQ]], [[60_While_Vs_for_IQ]]
