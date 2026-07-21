# Chained Ternary — Temperature Scale (Parenthesized Style)

## Overview

Covers `05_chapter_Operator/30_NT_IQ2.js` — another chained ternary, this time with each condition wrapped in parentheses, mapping a numeric temperature to a descriptive label across 5 buckets.

---

## 1. Reference Code

```javascript
let temp = 35;
let feel = (temp >= 40) ? "Very Hot" :
    (temp >= 30) ? "Hot" :
        (temp >= 20) ? "Warm" :
            (temp >= 10) ? "Cool" : "Cold";
console.log("7. Temperature:", temp, "| Feel:", feel); // "7. Temperature: 35 | Feel: Hot"
```

---

## 2. Parenthesized Conditions — Style Choice, Not Required

Compare with [[29_Nested_Ternary_HTTP_Status_Category_IQ]], which wrote conditions bare (`statusCode < 300`). Here every condition is wrapped: `(temp >= 40)`. Functionally identical — parentheses around a condition never change how a ternary evaluates, they're purely for visual grouping/readability, same role as the parentheses around an `if` condition.

```javascript
(temp >= 40) ? "Very Hot" : ...   // parenthesized
temp >= 40 ? "Very Hot" : ...     // equivalent, unparenthesized
```

---

## 3. Order of Buckets Matters

Because this is a chain of `else if`-equivalent checks (see [[29_Nested_Ternary_HTTP_Status_Category_IQ]] for the right-associativity explanation), the buckets **must** be ordered from most-restrictive to least-restrictive (highest threshold first). With `temp = 35`:

- `35 >= 40` → false
- `35 >= 30` → **true** → `"Hot"`

If the order were reversed (lowest threshold first), every temperature above 10 would incorrectly match the first `>= 10` branch and never reach the higher buckets — a classic bug when converting a "greater than" ladder to code.

```javascript
// WRONG order — "Cool" would win for almost every input ≥ 10
let feel = (temp >= 10) ? "Cool" :
    (temp >= 20) ? "Warm" :
        (temp >= 30) ? "Hot" :
            (temp >= 40) ? "Very Hot" : "Cold";
```

---

## Summary

**Key Takeaway:** Threshold-based chained ternaries must be ordered from the most specific/highest condition down to the most general — the first branch whose condition is `true` wins, and later branches are never reached. Parenthesizing each condition is a style choice with zero effect on evaluation.

**Related notes:** [[29_Nested_Ternary_HTTP_Status_Category_IQ]], [[28_Nested_Ternary_Two_Level_IQ]]
