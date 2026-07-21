# `switch` Case Grouping — Intentional Fall-Through

## Overview

Covers `07_chapter_switch/43_Switch_Group.js` — stacking multiple empty `case` labels back-to-back so they all share **one** body. This is fall-through used deliberately as a feature, the counterpart to the *unintentional* fall-through bugs in [[40_Switch_Fallthrough_No_Break_IQ]] and [[44_Switch_Unintentional_Fallthrough_Bug_IQ]].

---

## 1. Reference Code

```javascript
let browser = "Brave";

switch (browser) {
    case "Chrome":
    case "Edge":
    case "Brave":
    case "Opera":
        console.log("Chromium Project!");
        break;
    case "Firefox":
        console.log("Mozilla Project!");
        break;
    case "Safari":
        console.log("Apple browser — uses JavaScriptCore engine");
        break;
    default:
        console.log("Unknown browser — manual testing needed");
}
// browser = "Brave" -> "Chromium Project!"
```

---

## 2. How the Grouping Works

An empty `case` label (no statements before the next `case`) has nothing to "fall through" — it just passes control straight to the next label. So `case "Chrome":` through `case "Opera":` are four separate match points that all funnel into the **same** `console.log("Chromium Project!")` + `break`. Any one of those four string values produces identical behavior — this is the cleanest way to express "these N values should be treated the same" without repeating the body or writing `||` conditions.

---

## 3. Why Not `if` With `||` Instead?

```javascript
if (browser === "Chrome" || browser === "Edge" || browser === "Brave" || browser === "Opera") {
    console.log("Chromium Project!");
}
```

Both work. The grouped-`case` version scales better visually once you have many buckets (as here: Chromium family / Firefox / Safari / unknown) since each group's members are vertically listed rather than chained with `||`, and it stays consistent with strict (`===`) matching semantics — see [[47_Switch_Strict_Equality_IQ]].

---

## Summary

**Key Takeaway:** Stacking empty `case` labels before a shared body is the idiomatic way to group multiple values under one outcome in a `switch` — it's fall-through, but used intentionally, unlike the bug pattern in [[44_Switch_Unintentional_Fallthrough_Bug_IQ]].

**Related notes:** [[40_Switch_Fallthrough_No_Break_IQ]], [[44_Switch_Unintentional_Fallthrough_Bug_IQ]], [[42_Switch_API_Status_Code_IQ]]
