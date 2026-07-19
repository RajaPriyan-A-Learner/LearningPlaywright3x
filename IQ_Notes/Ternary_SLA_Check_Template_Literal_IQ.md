# Ternary + Template Literals (SLA Check Example)

## Overview

Covers `05_chapter_Operator/25_IQ4.js` — combines a ternary comparison with **template literals** (`` `...${}...` ``), a very common pairing in real code (build a conditional label, then interpolate it into a message).

---

## 1. Reference Code

```javascript
let responseTime = 850;  // ms
let sla = 1000;          // ms
let slaStatus = responseTime <= sla ? "Within SLA ✅" : "SLA breached ❌";
console.log(`Response: ${responseTime}ms — ${slaStatus}`); // "Response: 850ms — Within SLA ✅"

// Template Literal
console.log(`What is the SLA time ? - ${sla}`); // "What is the SLA time ? - 1000"
```

---

## 2. Two Concepts Working Together

**Step 1 — Ternary produces a value:**
```javascript
let slaStatus = responseTime <= sla ? "Within SLA ✅" : "SLA breached ❌";
```
`<=` is a relational comparison operator (see [[Operators_IQ]]) — evaluates to `true`/`false`, and the ternary converts that boolean into a human-readable label.

**Step 2 — Template literal interpolates it:**
```javascript
console.log(`Response: ${responseTime}ms — ${slaStatus}`);
```
Backtick strings (`` ` `` `...` `` ` ``) allow `${expression}` placeholders that are evaluated and inserted directly into the string — no manual `+` concatenation needed.

```javascript
// Old way, without template literals — more error-prone (easy to miss a space or a +)
console.log("Response: " + responseTime + "ms — " + slaStatus);

// Template literal — cleaner, and whitespace/punctuation stays exactly as written
console.log(`Response: ${responseTime}ms — ${slaStatus}`);
```

---

## 3. Why This Combination Is Common in Real Code

Computing a status ternary *first*, storing it in a named variable, then interpolating that variable is more readable than nesting the ternary directly inside the template literal:

```javascript
// Nested inside the template literal — works, but harder to read at a glance
console.log(`Response: ${responseTime}ms — ${responseTime <= sla ? "Within SLA ✅" : "SLA breached ❌"}`);

// Named intermediate variable — same result, clearer intent
let slaStatus = responseTime <= sla ? "Within SLA ✅" : "SLA breached ❌";
console.log(`Response: ${responseTime}ms — ${slaStatus}`);
```

---

## Summary

**Key Takeaway:** Ternaries compute a value; template literals interpolate values into strings. Combining them — compute the label with a ternary, then drop it into a `` `${...}` `` — is cleaner than manual `+` string-building and is a very common real-world pairing.

**Related notes:** [[Operators_IQ]], [[Ternary_Operator_Basics_IQ]], [[String_Operator_IQ]]
