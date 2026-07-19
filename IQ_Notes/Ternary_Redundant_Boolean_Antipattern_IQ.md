# Anti-Pattern: `condition ? true : false`

## Overview

Covers `05_chapter_Operator/27_IQ5.js` — a ternary whose two branches are literally `true` and `false`. This is legal and runs fine, but it's a textbook redundancy worth recognizing (and avoiding) in real code.

---

## 1. Reference Code

```javascript
let condition = true;
let isSKMale = condition ? true : false;
console.log(isSKMale); // true
```

---

## 2. Why This Is Redundant

`condition` is already a boolean. Running it through `condition ? true : false` produces exactly the same value as `condition` itself — the ternary does nothing but re-state the input.

```javascript
let condition = true;

let isSKMale = condition ? true : false; // redundant
let isSKMale2 = condition;               // identical result, no ternary needed
```

If `condition` is **not** already guaranteed to be a strict boolean (e.g., it's a truthy/falsy value like a string or `0`), the fix is `Boolean(condition)` or `!!condition` — not a ternary:

```javascript
let raw = "yes"; // truthy, but not literally `true`
let flag1 = raw ? true : false; // still redundant
let flag2 = Boolean(raw);        // idiomatic
let flag3 = !!raw;               // idiomatic (double negation)
```

---

## 3. When a Ternary Returning Booleans IS Justified

The moment either branch is **not** simply `true`/`false`, the redundancy disappears and the ternary earns its place:

```javascript
// Legitimate — branches aren't trivial true/false, there's real logic
let canVote = age >= 18 && isCitizen ? true : false; // still redundant! same issue
let canVote2 = age >= 18 && isCitizen;               // just use the boolean expression directly
```

Even compound boolean expressions don't need the ternary — `&&`/`||`/comparison chains already evaluate to booleans. The only time `? true : false` isn't redundant is if `condition` genuinely isn't boolean-typed and isn't safely coercible — a case better solved with `Boolean()`/`!!`, not a ternary.

---

## Summary

**Key Takeaway:** `condition ? true : false` is functionally identical to just `condition` (or `Boolean(condition)`/`!!condition` if `condition` isn't already a strict boolean) — this is a style smell, not a bug, but recognizing it prevents unnecessary code. Contrast with [[Ternary_CI_Browser_Mode_IQ]], where the branches return genuinely different string values and the ternary is doing real work.

**Related notes:** [[Ternary_Operator_Basics_IQ]], [[Ternary_CI_Browser_Mode_IQ]]
