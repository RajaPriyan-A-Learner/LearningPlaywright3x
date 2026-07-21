# `switch` Uses Strict (`===`) Comparison, Not Loose (`==`)

## Overview

Covers `07_chapter_switch/47_IQ4.js` — the single most common `switch` misconception: many developers assume `switch` coerces types like `==` does. It doesn't — it always compares with `===`.

---

## 1. Reference Code

```javascript
let status = 0;
console.log(typeof status); // "number"

switch (status) {
    case false:
        console.log("false matched");
        break;
    case 0:
        console.log("0 matched");
        break;
}
// status = 0 -> "0 matched"  ("false matched" NEVER prints)
```

---

## 2. Why `case false` Doesn't Match `status = 0`

`0 == false` is `true` (loose equality coerces the boolean to a number). But `switch` never uses `==` — the spec defines `switch`'s case-matching algorithm as the **Strict Equality Comparison** (the same algorithm `===` uses). So the engine checks `status === false`, which is `0 === false` → `false` (different types, no coercion), and moves on to `case 0`, where `status === 0` → `true`.

```javascript
console.log(0 == false);   // true  — loose equality WOULD match
console.log(0 === false);  // false — switch uses THIS algorithm
```

---

## 3. Practical Implication

If a value's type is uncertain (e.g. it came from `prompt()`, `readline`, or an untyped API response — see [[48_Browser_Prompt_Function_IQ]] / [[49_Node_Readline_Input_IQ]], which all yield **strings**), a `switch` on that raw value will never match a numeric `case` unless it's explicitly converted first (`Number(input)`), because `"5" === 5` is `false`.

---

## Summary

**Key Takeaway:** `switch` matches `case` values using the same algorithm as `===`, never `==` — no type coercion happens. `case false` will never match a switch value of `0`, and a `case 5` will never match the string `"5"`. This is a frequent source of silently-do-nothing bugs when switching on user input or API data without normalizing its type first.

**Related notes:** [[46_Switch_Duplicate_Case_Values_IQ]], [[45_Switch_True_Pattern_IQ]], [[48_Browser_Prompt_Function_IQ]]
