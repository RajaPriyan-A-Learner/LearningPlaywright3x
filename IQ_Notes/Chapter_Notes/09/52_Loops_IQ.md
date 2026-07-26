# Loops — Why Loops Exist (The Problem They Solve)

## Overview

Covers `09_chapter_Loops/52_Loops.js` — introduces the motivation for loops by showing what happens when you repeat the same statement manually. This is the "before loops" picture that makes the `for`/`while` payoff obvious.

---

## 1. Reference Code

```javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log("...");
console.log(10);
```

---

## 2. The Problem

Every `console.log` is written by hand. If you needed to print 1 to 1000, you'd need 1000 lines. Changing the range (e.g., start at 0) means editing every single line. This is the textbook case for **DRY** (Don't Repeat Yourself).

The `"..."` in the middle highlights the gap — even the author skipped writing lines 6–9 manually, which is exactly why loops exist.

---

## 3. What Loops Replace

A loop collapses the above into:

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

One change to the condition changes the entire output. No manual repetition needed.

---

## Summary

**Key Takeaway:** Manually repeating `console.log` is the problem; loops are the solution — they let you express "repeat this N times" in a single, maintainable block.

**Related notes:** [[53_For_Loop_IQ]], [[57_While_IQ]]
