# `switch` Statement Basics

## Overview

Covers `07_chapter_switch/39_switch.js` — a basic day-of-week `switch` with `break` after every case, the switch-form equivalent of the `if / else if` ladder in [[37_If_Else_Statement_Basics_IQ]].

---

## 1. Reference Code

```javascript
let day = 2;
switch (day) {
    case 1:
        console.log('Mon');
        break;
    case 2:
        console.log('Tue');
        let a = 10;
        let b = 30;
        console.log(a + b);
        break;
    case 3:
        console.log('Wed');
        break;
    // ...
    default:
        console.log("No idea which day it is");
}
// day = 2 -> "Tue", 40
```

---

## 2. `let`/`const` Inside a `case` Share ONE Block Scope

A `switch` body — unless each `case` wraps its own `{ }` — is a **single block**. Every `case` label is just a jump target inside that one block, not a scope boundary. That means `let a` and `let b` declared inside `case 2` are hoisted into the *entire switch block's* TDZ, and a sibling case is not allowed to redeclare the same identifier:

```javascript
switch (day) {
    case 1:
        let a = 1; // ok
        break;
    case 2:
        let a = 2; // ❌ SyntaxError: Identifier 'a' has already been declared
        break;
}
```

This throws at **parse time**, regardless of which branch actually runs at runtime — the whole file fails to even load. The fix is to wrap risky cases in their own block: `case 2: { let a = 2; break; }`.

---

## 3. `break` Stops Execution From Falling Into the Next Case

Once `case 2` matches, everything runs until the next `break` (or the switch's closing brace) — `break` is what makes this switch behave like the mutually-exclusive branches of an `if/else` ladder. Omitting it produces intentional or accidental fall-through — see [[40_Switch_Fallthrough_No_Break_IQ]] and [[44_Switch_Unintentional_Fallthrough_Bug_IQ]].

---

## Summary

**Key Takeaway:** A `switch` is one shared block scope, not one scope per `case` — `let`/`const` redeclared with the same name across cases is a `SyntaxError`, not a runtime issue. `break` is what gives each case if/else-like isolation.

**Related notes:** [[37_If_Else_Statement_Basics_IQ]], [[40_Switch_Fallthrough_No_Break_IQ]], [[46_Switch_Duplicate_Case_Values_IQ]]
