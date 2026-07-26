# While vs For — `while(true)` with `break`

## Overview

Covers `09_chapter_Loops/60_While_Vs_for.js` — demonstrates `while(true)` (an intentional infinite loop) controlled by a `break` statement inside an `if`. This is a common pattern when the exit condition is best expressed *inside* the loop body rather than in the loop header.

---

## 1. Reference Code

```javascript
let age = 7;
while (true) {
    if (age > 10) {
        break;
    }
    else {
        console.log(age);
    }
    age++;
}
```

---

## 2. Trace Table

| `age` | `age > 10`? | Action |
|-------|------------|--------|
| 7 | ❌ | prints `7`, increments |
| 8 | ❌ | prints `8`, increments |
| 9 | ❌ | prints `9`, increments |
| 10 | ❌ | prints `10`, increments |
| 11 | ✅ | `break` — exits loop |

**Output:** `7  8  9  10`

---

## 3. Why `while(true)` + `break`?

Sometimes the exit condition is complex or checked mid-loop. `while(true)` + `break` is cleaner than writing an awkward condition in the header. This pattern is common in:
- Interactive read loops (`while(true) { ... if(done) break; }`)
- Retry loops where success/failure is determined inside the body
- Game loops

---

## 4. Equivalent `for` Version

```javascript
for (let age = 7; age <= 10; age++) {
    console.log(age);
}
```

When the exit condition is simple and known upfront, the `for` version is cleaner. Use `while(true)` only when the condition is best evaluated inside the body.

---

## Summary

**Key Takeaway:** `while(true)` with `break` is a valid and readable pattern for loops where the exit condition belongs inside the body. It is not a mistake — it's a deliberate idiom. Always ensure `break` is reachable to avoid a true infinite loop.

**Related notes:** [[57_While_IQ]], [[56_For_Loops3_IQ]], [[61_Do_while_IQ]]
