# IQ_Questions — Practice Notes

## Overview

Covers `JS_Practise/Loops_Practice/IQ_Questions.js` — demonstrates three loop gotchas: accidental empty loop bodies, NaN comparison behavior, and do-while loop semantics with decrement operators.

## Source

```javascript
var sum = 0;
for (var i = 1; i <= 5; i++);
  sum += i;
console.log(sum);


let i = 0;
while (i < NaN) {
  i++;
}
console.log(i);

let i = 3, count = 0;
do {
  count++;
} while (i-- > 0);
console.log(count + " " + i);
```

---

## Notes

### Loop 1: Accidental Empty Loop Body

```javascript
var sum = 0;
for (var i = 1; i <= 5; i++);  // ← semicolon here creates empty loop!
  sum += i;
console.log(sum);  // 6 (not 15)
```

The semicolon after `for (...)` terminates the loop statement, leaving `sum += i;` as a separate statement outside the loop. Result: `sum` is only incremented once (when `i = 6`), after the loop finishes.

**Gotcha:** always visually check for stray semicolons after `for`, `while`, `if` statements.

### Loop 2: NaN Comparison

```javascript
let i = 0;
while (i < NaN) {  // ← NaN < x always returns false
  i++;
}
console.log(i);  // 0 (loop never executes)
```

Any comparison with `NaN` returns `false`, including `i < NaN`. The loop condition is always false, so the loop never runs.

### Loop 3: Do-While with Postfix Decrement

```javascript
let i = 3, count = 0;
do {
  count++;
} while (i-- > 0);
console.log(count + " " + i);  // "4 -1"
```

The do-while executes the body first, then checks the condition. Postfix `i--` evaluates the condition with the current value, then decrements. Loop runs while `3 > 0`, `2 > 0`, `1 > 0`, `0 > 0`; exits when `i = -1` (no longer > 0). Total 4 iterations.

---

## Summary

**Key Takeaway:** Three common loop pitfalls — accidental empty bodies from stray semicolons, NaN comparisons that always fail, and the interaction of postfix decrement with loop conditions. Always double-check loop syntax and condition logic.
