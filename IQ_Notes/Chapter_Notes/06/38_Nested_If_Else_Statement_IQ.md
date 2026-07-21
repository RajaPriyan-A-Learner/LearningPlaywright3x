# Nested `if/else` Statement

## Overview

Covers `06_chapter_Statement/38_IQ2.js` — an `if` block containing a *further* `if/else` inside it, the statement-form equivalent of the nested ternary in [[28_Nested_Ternary_Two_Level_IQ]].

---

## 1. Reference Code

```javascript
let age = 27;
if (age > 18) {
    console.log("GOA");
    if (age > 26) {
        console.log("DRINK!");
    }
    else {
        console.log("You CAN'T DRINK!");
    }
} else {
    console.log("No GOA");
}
// Output:
// "GOA"
// "DRINK!"
```

---

## 2. How Nesting Works

The inner `if/else` only runs at all if the outer `if`'s condition was true — it's a statement physically written inside the outer block:

```javascript
if (age > 18) {          // outer condition
    console.log("GOA");    // always runs if outer is true
    if (age > 26) {         // inner condition — only checked if outer was true
        console.log("DRINK!");
    } else {
        console.log("You CAN'T DRINK!");
    }
} else {
    console.log("No GOA");  // outer false branch — inner if/else never even evaluated
}
```

With `age = 27`: outer condition (`27 > 18`) is true → logs `"GOA"` → inner condition (`27 > 26`) is also true → logs `"DRINK!"`. Both messages print.

---

## 3. Comparison to the Nested-Ternary Equivalent

This is the exact same logic as [[28_Nested_Ternary_Two_Level_IQ]]'s `age > 18 ? (age > 26 ? "Drink" : "No") : false`, just written as statements instead of one expression:

```javascript
// Ternary form (expression, produces a value)
let is_pramod_enjoy = age > 18 ? (age > 26 ? "Drink" : "No") : false;

// if/else form (statement, produces no value — just runs code)
if (age > 18) {
    if (age > 26) {
        console.log("DRINK!");
    } else {
        console.log("You CAN'T DRINK!");
    }
} else {
    console.log("No GOA");
}
```

The `if/else` version scales better once each branch needs to do more than assign a single value (here, both branches also log an outer message, `"GOA"`/`"No GOA"`, which a ternary can't express as cleanly).

---

## 4. Readability Note

Nesting more than 2 levels of `if/else` (or mixing many `else if`s inside nested blocks) is a common source of hard-to-follow code — this is the "arrow anti-pattern" (code drifting rightward with indentation). Two levels, as here, is generally fine; beyond that, consider early returns or restructuring the condition logic (e.g., combining with `&&`).

---

## Summary

**Key Takeaway:** Nested `if/else` blocks let an inner condition only be evaluated once an outer condition is already true — functionally identical to a nested ternary, but suited to branches that need multiple statements rather than a single value. See [[38_If_Else_If_Ladder_Grade_Calculator_IQ]] for the "chained `else if`" alternative to nesting.

**Related notes:** [[37_If_Else_Statement_Basics_IQ]], [[28_Nested_Ternary_Two_Level_IQ]]
