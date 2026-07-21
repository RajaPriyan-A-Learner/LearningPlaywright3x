# Marks_Grade_system — Practice Notes

## Overview

Covers `JS_Practise/HackerRank_If_else/Marks_Grade_system.js` — a HackerRank-style if/else-if grading ladder that reads a numeric mark from stdin (via `fs.readFileSync(0, "utf8")`, the same technique documented in [[51_Node_Fs_Stdin_Input_IQ]]) and prints a letter grade.

## Source

```javascript
console.log("Enter the number!");
const data = require('fs').readFileSync(0, 'utf8');
processData(data);

function processData(data) {
  let mark = Number(data);
  if (mark > 90) { console.log("AA"); }
  else if (mark > 80 && mark <= 90) { console.log("AB"); }
  else if (mark > 70 && mark <= 80) { console.log("BB"); }
  else if (mark > 60 && mark <= 70) { console.log("BC"); }
  else if (mark > 50 && mark <= 60) { console.log("CC"); }
  else if (mark > 40 && mark <= 50) { console.log("CD"); }
  else if (mark > 30 && mark <= 40) { console.log("DD"); }
  else { console.log("FF"); }
}
```

---

## Notes

**Hoisting:** `processData(data)` is called on line 4, three lines *before* its `function processData(...)` declaration. This works because function *declarations* (not expressions) are hoisted — the whole function body is available at the top of its scope before execution starts, unlike `const`/`let`, which would throw a temporal-dead-zone error if called this early.

**Boundary behavior:** each branch uses a half-open range `(lower, upper]` — e.g. `mark > 80 && mark <= 90` — so a mark of exactly `90` fails the first `mark > 90` check and falls through to land in the `"AB"` bucket, not `"AA"`. Every boundary in the ladder is deliberately exclusive-on-the-low-end, inclusive-on-the-high-end.

**`NaN` swallows silently:** `Number(data)` on non-numeric input (or an empty/whitespace-only stdin payload) produces `NaN`. Every comparison against `NaN` (`NaN > 90`, `NaN <= 90`, etc.) evaluates to `false`, so the whole if/else-if chain falls through every branch and lands on the final `else` — printing `"FF"` for genuinely invalid input with no distinguishing error message. `Number()` does correctly trim a trailing newline from piped stdin (e.g. `"85\n"` → `85`), so this only bites on truly non-numeric input, not normal piped usage.

**Reading stdin:** because this uses `readFileSync(0, ...)`, it blocks until EOF rather than Enter — see [[51_Node_Fs_Stdin_Input_IQ]] for why that makes it hang forever under VS Code's Code Runner (which offers no interactive stdin) and requires `Ctrl+Z`+Enter (Windows terminal) or piping input (`echo 85 | node Marks_Grade_system.js`) to terminate.

---

## Summary

**Key Takeaway:** A standard if/else-if grading ladder, notable for calling its own function before the declaration (safe due to hoisting) and for silently misreporting any non-numeric input as the lowest grade (`"FF"`) rather than erroring, since every comparison against `NaN` is `false`.

**Related notes:** [[51_Node_Fs_Stdin_Input_IQ]], [[37_If_Else_Statement_Basics_IQ]], [[38_If_Else_If_Ladder_Grade_Calculator_IQ]]
