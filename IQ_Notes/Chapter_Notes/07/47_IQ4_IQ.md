# 47_IQ4 — Switch Strict Equality & Type Coercion Pitfalls

**File:** `07_chapter_switch/47_IQ4.js`

## Overview

Switch statements use strict equality (`===`) for case matching, not loose equality (`==`), meaning type differences prevent matches. The classic gotcha is `switch(0) { case false: }` not matching because `0 !== false` in strict comparison. Understanding how strict equality works and recognizing common type mismatches is critical for debugging switch behavior and preventing silent bugs where cases unexpectedly fail to match. This pattern frequently appears in interviews testing deep understanding of JavaScript's type system and comparison semantics.

---

## Main Concept

Switch uses strict equality (`===`) to compare the switch expression against case values. Strict equality requires both value AND type to be identical: `0 === false` is false (different types), so a switch(0) doesn't match `case false`. This differs from loose equality (`==`), which coerces types: `0 == false` is true. Switch intentionally uses strict equality to avoid the confusing behavior of loose equality coercion. Understanding this distinction is crucial because many developers assume switch (like `if` statements) might coerce types, but switch never does. This makes switch safer for type-sensitive logic but requires developers to be precise about value and type matching.

### Code Example

```javascript
let status = 0;
console.log(typeof status);  // "number"
switch (status) {
    case false:
        console.log("false matched");  // Never executes (0 !== false)
        break;
    case 0:
        console.log("0 matched");      // Executes (0 === 0)
        break;
}
// Output: number, 0 matched

// Common type mismatch examples:
let x = "5";
switch (x) {
    case 5:
        console.log("Number 5"); // Never executes ("5" !== 5)
        break;
    case "5":
        console.log("String 5"); // Executes ("5" === "5")
        break;
}
// Output: String 5

// Boolean vs Number gotcha:
let flag = 1;
switch (flag) {
    case true:
        console.log("Boolean true"); // Never executes (1 !== true)
        break;
    case 1:
        console.log("Number 1");    // Executes (1 === 1)
        break;
}
// Output: Number 1

// Null vs Undefined:
let value = null;
switch (value) {
    case undefined:
        console.log("Undefined"); // Never executes (null !== undefined)
        break;
    case null:
        console.log("Null");      // Executes (null === null)
        break;
}
// Output: Null
```

### Key Points

- **Strict Equality in Switch**: Switch uses `===` (strict equality), which requires identical value AND type. This prevents unintended type coercion matches.
- **Type Differences Prevent Matches**: `0` doesn't match `false`, `"5"` doesn't match `5`, `1` doesn't match `true`. Even if loosely equal (`==`), they're not strictly equal (`===`).
- **No Type Coercion**: Unlike `if (x == 0)` (coerces types), switch never coerces. If types differ, the case is skipped entirely.
- **Debugging Type Mismatches**: When a switch case unexpectedly fails, check if the expression and case value have matching types using `typeof`.
- **NaN Special Case**: `NaN !== NaN` (by design), so `switch(NaN) { case NaN: }` never matches. Use `Number.isNaN()` for NaN checks instead.

---

## Common Mistakes

**Mistake 1: Assuming loose equality in switch**
```javascript
// Wrong: expecting 0 to match false due to loose equality
let status = 0;
switch (status) {
    case false:
        console.log("Matched"); // Won't execute (0 !== false strictly)
        break;
}
// Output: (nothing)

// Right: understand switch uses strict equality
let status = 0;
if (status == false) {
    console.log("Loose match"); // Executes (0 == false is true)
}
// BUT in switch:
switch (status) {
    case false:
        console.log("Strict no match"); // Doesn't execute
        break;
    case 0:
        console.log("Strict match");    // Executes
        break;
}
```

**Mistake 2: String vs Number type mismatch**
```javascript
// Wrong: comparing string "5" as a number
let userInput = "5";
switch (userInput) {
    case 5:
        console.log("Number 5"); // Won't execute ("5" !== 5)
        break;
}
// Input comes from API/form as string, but developer forgets type

// Right: convert type first or check against string
let userInput = "5";
switch (parseInt(userInput)) {
    case 5:
        console.log("Number 5"); // Executes after conversion
        break;
}
// OR
switch (userInput) {
    case "5":
        console.log("String 5"); // Executes with correct type
        break;
}
```

**Mistake 3: Null vs Undefined gotcha**
```javascript
// Wrong: treating null and undefined as equivalent
let value = null;
switch (value) {
    case undefined:
        console.log("Undefined"); // Won't execute (null !== undefined)
        break;
    case null:
        console.log("Null"); // Executes
        break;
}

// Right: handle each type explicitly
let value = null;
switch (value) {
    case null:
    case undefined:
        console.log("No value"); // Executes for both
        break;
}
```

**Mistake 4: Boolean from truthy/falsy values**
```javascript
// Wrong: assuming switch coerces truthy values to true
let count = 1;
switch (count) {
    case true:
        console.log("Boolean true"); // Won't execute (1 !== true)
        break;
}
// 1 is truthy, but 1 !== true in strict equality

// Right: compare values explicitly
let count = 1;
if (count) {
    console.log("Truthy"); // Executes
}
// OR use exact type:
switch (count) {
    case 1:
        console.log("Number 1"); // Executes
        break;
    case true:
        console.log("Boolean true"); // For actual boolean true
        break;
}
```

---

## Interview-Ready Definitions

1. **Strict Equality (`===`)**: Comparison requiring both value and type to be identical, with no type coercion. Used by switch for case matching.

2. **Loose Equality (`==`)**: Comparison that coerces types before comparing values, allowing `0 == false` to be true. NOT used in switch.

3. **Type Coercion**: Automatic conversion of one type to another during comparison. Switch avoids this by using strict equality.

4. **Type Mismatch**: When a value and case value have different types, preventing a match in strict equality comparison.

5. **Truthy vs Boolean**: Truthy values (like 1, "string", []) are not strictly equal to `true`. Only the boolean value `true` equals `true`.

---

## Tricky Interview Questions

1. **Why doesn't `switch(0) { case false: }` match?**
   - Answer: Switch uses strict equality (`===`). `0 !== false` because they're different types (number vs boolean). Loose equality (`==`) would match, but switch never uses it.

2. **What's the output of this code?**
   ```javascript
   let x = "5";
   switch (x) {
       case 5:
           console.log("number");
           break;
       case "5":
           console.log("string");
           break;
   }
   ```
   - Answer: "string". x is a string, so it matches `case "5"` (strict equality), not `case 5`.

3. **What's the difference between `switch` and `if-else` for equality checking?**
   - Answer: Switch uses strict equality (`===`). if-else can use either `==` or `===`. In `if (0 == false)` is true, but `switch(0) { case false: }` doesn't match.

4. **Why does `switch(NaN) { case NaN: }` not match?**
   - Answer: `NaN !== NaN` (by IEEE 754 standard design). Use `Number.isNaN()` outside switch, or switch(true) pattern: `case Number.isNaN(x):`.

5. **Can you use `null` and `undefined` interchangeably in switch cases?**
   - Answer: No, they're different types. `null !== undefined` (strict equality). Use case grouping if you want to handle both: `case null: case undefined: ...`

6. **What happens with `switch(true) { case 1: }`?**
   - Answer: Doesn't match because `1 !== true` (strict equality). Truthy values don't equal boolean `true`.

7. **How do you handle string/number ambiguity from user input?**
   - Answer: Convert the input type before switch: `parseInt(userInput)` for numbers, or ensure case values match input type.

8. **Why would a developer accidentally use loose equality logic in switch?**
   - Answer: From experience with `if` statements using `==`. Switch intentionally uses strict equality for safety, but developers expect coercion.

9. **Can TypeScript enforce type checking in switch cases?**
   - Answer: Yes, TypeScript's type system can flag type mismatches. `switch(status: string) { case true: }` would be a type error.

10. **What's the mental model for strict equality in switch?**
    - Answer: "Both the value AND the type must be exactly the same." If either differs, the case is skipped.

11. **How do you debug a switch case that's unexpectedly not matching?**
    - Answer: Check `typeof` for both the expression and case value. If types differ, you've found the mismatch.

12. **Is there any scenario where switch coerces types?**
    - Answer: No. Switch always uses strict equality. If coercion is needed, do it before the switch statement.

13. **What's the impact of strict equality on API responses?**
    - Answer: API responses are typically strings (JSON). If you `switch(statusCode)` and expect number 200, but received string "200", it won't match `case 200`.

14. **How do you handle mixed types in a large switch?**
    - Answer: Document case types explicitly. Use TypeScript for type safety. Consider refactoring if types are mixed (might indicate a design issue).

15. **What's the strictest type-safe approach to switch statements?**
    - Answer: Use TypeScript with explicit types, convert input types before switch, and use linters to catch type mismatches.

---

## Deep Insights & Gotchas

- **Strict equality is switch's greatest strength**: By avoiding type coercion, switch is safer and more predictable than loose equality. Bugs from unexpected coercion are prevented.

- **API responses and type mismatches are common**: APIs return JSON strings; parsing results in different types. A status code from a string HTTP request is "200" (string), not 200 (number). Developers must handle this.

- **NaN is a special case everywhere**: `NaN !== NaN` is by design (IEEE 754), not a bug. Many libraries provide `Number.isNaN()` for convenience, but it's worth understanding the reasoning.

---

## Summary

**Key Takeaway:** Switch statements use strict equality (`===`) for case matching, never coercing types—meaning `0` doesn't match `false`, `"5"` doesn't match `5`, and understanding this distinction is critical for preventing silent bugs from unexpected type mismatches in conditional logic.
