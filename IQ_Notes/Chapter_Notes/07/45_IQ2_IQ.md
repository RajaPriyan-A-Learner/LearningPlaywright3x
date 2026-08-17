# 45_IQ2 — Switch(true) Pattern: Range Conditions & Comparison vs If-Else

**File:** `07_chapter_switch/45_IQ2.js`

## Overview

The `switch(true)` pattern transforms conditional range checks (testScore >= 85) into switch cases by matching boolean expressions against `true`. This pattern allows switch statements to handle conditions beyond discrete value matching, bridging the gap between switch and if-else. While unconventional compared to traditional if-else chains for ranges, switch(true) provides alternative syntax and organization. Understanding both approaches—traditional switch for values, switch(true) for conditions, and if-else for everything—is essential for choosing the right tool and demonstrating control flow mastery in interviews.

---

## Main Concept

The `switch(true)` pattern works by switching on the literal boolean value `true`, then using case expressions that evaluate to boolean results. When `testScore = 85`, the case `(testScore >= 95)` evaluates to false (no match), but case `(testScore >= 85)` evaluates to true (using strict equality `true === true`), causing execution to start there. This pattern effectively converts conditions into cases, making switch statements behave like extended if-else chains. The pattern is less common than traditional if-else but offers organizational benefits for multiple ordered conditions. However, it sacrifices clarity compared to explicit if-else, so it's best used when multiple conditions benefit from switch organization (fallthrough, grouping).

### Code Example

```javascript
let testScore = 85;
switch (true) {
    case (testScore >= 95):
        console.log("Outstanding — Top performer");
        break;
    case (testScore >= 85):
        console.log("Excellent — Above expectations");
        break;
    case (testScore >= 70):
        console.log("Good — Meets expectations");
        break;
    case (testScore >= 50):
        console.log("Needs Improvement");
        break;
    default:
        console.log("Unsatisfactory — Requires training");
}
// Output: Excellent — Above expectations

// Equivalent if-else approach:
if (testScore >= 95) {
    console.log("Outstanding — Top performer");
} else if (testScore >= 85) {
    console.log("Excellent — Above expectations");
} else if (testScore >= 70) {
    console.log("Good — Meets expectations");
} else if (testScore >= 50) {
    console.log("Needs Improvement");
} else {
    console.log("Unsatisfactory — Requires training");
}
// Output: Excellent — Above expectations (same result, different syntax)
```

### Key Points

- **Switch(true) Mechanics**: The pattern switches on `true` and uses boolean expressions as cases. Each case evaluates (e.g., `testScore >= 85`), and strict equality checks if the result equals `true`.
- **Ordered Evaluation**: Like if-else, switch(true) evaluates cases top-to-bottom and stops at the first match. This makes order critical for range checks (test highest range first).
- **Less Readable Than If-Else**: While valid, switch(true) sacrifices clarity. `if (score >= 85)` is instantly understandable; `case (score >= 85)` requires mental parsing.
- **No Performance Advantage**: Modern engines optimize both equally. Choosing switch(true) over if-else is never justified by performance; use it for stylistic/organizational reasons only.
- **Useful for Complex Conditions**: When multiple conditions share logic (fallthrough), switch(true) can be more organized than nested if-else, but this is rare.

---

## Common Mistakes

**Mistake 1: Using switch(true) when if-else is clearer**
```javascript
// Wrong: switch(true) with simple conditions is less readable
let status = "active";
switch (true) {
    case (status === "active"):
        console.log("Running");
        break;
    case (status === "paused"):
        console.log("Paused");
        break;
}

// Right: use if-else for simple value checks
let status = "active";
if (status === "active") {
    console.log("Running");
} else if (status === "paused") {
    console.log("Paused");
}
// If-else is clearer for discrete values; switch(true) is overkill
```

**Mistake 2: Forgetting break and getting unintended fall-through**
```javascript
// Wrong: omitting break in switch(true)
let score = 85;
switch (true) {
    case (score >= 85):
        console.log("Pass");
        // forgot break!
    case (score >= 50):
        console.log("Conditional pass");
        break;
}
// Output: Pass, Conditional pass (wrong!)

// Right: add break to prevent cascade
let score = 85;
switch (true) {
    case (score >= 85):
        console.log("Pass");
        break;
    case (score >= 50):
        console.log("Conditional pass");
        break;
}
// Output: Pass (correct)
```

**Mistake 3: Ordering conditions incorrectly in range checks**
```javascript
// Wrong: testing lower range first means higher scores never match
let score = 95;
switch (true) {
    case (score >= 50):
        console.log("Passing"); // Matches first, even though score > 85!
        break;
    case (score >= 85):
        console.log("Excellent"); // Never reached
        break;
}
// Output: Passing (wrong!)

// Right: order from highest to lowest range
let score = 95;
switch (true) {
    case (score >= 85):
        console.log("Excellent");
        break;
    case (score >= 50):
        console.log("Passing");
        break;
}
// Output: Excellent (correct)
```

**Mistake 4: Complex expressions that evaluate unexpectedly**
```javascript
// Wrong: complex expression might not evaluate to boolean
let value = 10;
switch (true) {
    case value: // value (10) is truthy but NOT true
        console.log("Matched"); // Doesn't match because 10 !== true
        break;
}

// Right: explicit boolean expression
let value = 10;
switch (true) {
    case (value > 5):
        console.log("Matched");
        break;
}
// (value > 5) evaluates to true, so it matches
```

---

## Interview-Ready Definitions

1. **Switch(true) Pattern**: Using `switch(true)` with boolean case expressions to replicate if-else functionality, matching boolean conditions against the literal `true` value.

2. **Condition Evaluation in Cases**: Case expressions evaluate to boolean results; strict equality (`===`) checks if the boolean equals `true`, determining if the case matches.

3. **Ordered Condition Matching**: Like if-else chains, switch(true) evaluates cases top-to-bottom and stops at the first match, making order critical for range checks.

4. **Range Checking via Switch**: Implementing range-based conditionals (score >= 85) using switch(true) instead of if-else, sacrificing clarity for organizational consistency.

5. **Truthy vs Boolean in Cases**: Case expressions must evaluate to `true` (strict equality), not just truthy values. `case value:` (where value = 10) won't match even though 10 is truthy.

---

## Tricky Interview Questions

1. **Why does `switch(true) { case (score >= 85): }` work, but `switch(score) { case >= 85: }` doesn't?**
   - Answer: Switch requires case values, not operators. switch(true) switches on true, and the case expression `(score >= 85)` evaluates to a boolean, using strict equality. case >= 85 is a syntax error.

2. **What's the output if testScore = 50?**
   ```javascript
   switch (true) {
       case (testScore >= 95):
           console.log("A");
       case (testScore >= 85):
           console.log("B");
       case (testScore >= 50):
           console.log("C");
           break;
   }
   ```
   - Answer: "C". Only case `(testScore >= 50)` evaluates to true. Previous cases are false, so they're skipped.

3. **What's the output if the first case is true but lacks `break`?**
   ```javascript
   case (testScore >= 85):
       console.log("B");
       // no break
   case (testScore >= 70):
       console.log("C");
       break;
   ```
   - Answer: Both "B" and "C" print due to fall-through, even if the second case is false. Once the first case matches, execution continues until `break`.

4. **Why would you use switch(true) instead of if-else?**
   - Answer: Rarely justified. Possible reasons: organizational consistency across a codebase, fallthrough grouping, or personal preference. Generally, if-else is clearer for conditions.

5. **What happens if no cases evaluate to true?**
   - Answer: Default case executes (if present). If no default, switch does nothing. This is the same as if-else with no matching conditions and no else.

6. **Can you use non-boolean expressions in switch(true) cases?**
   - Answer: Yes, but only values that equal `true` will match. Truthy values (like 1, "string") won't match. Use explicit boolean expressions: `case (x > 5):` not `case x:`.

7. **How does switch(true) handle complex conditions like `&&` and `||`?**
   - Answer: Case expressions evaluate fully: `case (x > 5 && y < 10):` evaluates the entire expression, then checks if true. This works identically to if-else conditionals.

8. **Is switch(true) more or less efficient than if-else?**
   - Answer: Modern engines optimize both equally. No performance difference in practice. Choice is stylistic, not performance-based.

9. **How would you refactor switch(true) with fallthrough?**
   - Answer: Fallthrough in switch(true) is rare because each case is an independent condition. If you want shared logic, extract it to a function rather than using fallthrough.

10. **Can you use switch(false) instead of switch(true)?**
    - Answer: Yes, but case expressions must then evaluate to false. Not recommended; switch(true) is convention. switch(false) confuses readers.

11. **What's the difference between switch(true) and if-else for ranges?**
    - Answer: Functionally identical for non-fallthrough cases. switch(true) is syntax; if-else is semantic. Choose if-else for clarity unless codebase convention uses switch(true).

12. **How do you combine multiple conditions in a single switch(true) case?**
    - Answer: Use `&&` (AND) or `||` (OR) operators: `case (x > 5 && y < 10):` for AND, `case (x > 5 || x < 0):` for OR. Evaluates like normal boolean expressions.

13. **What happens if you forget parentheses in case expressions?**
    - Answer: `case testScore >= 95:` is valid syntax (comparison has lower precedence than case), but it's poor style. Always use parentheses: `case (testScore >= 95):` for clarity.

14. **Can switch(true) handle ternary expressions in cases?**
    - Answer: Yes, ternary expressions return values. `case x > 5 ? true : false:` works (redundantly). Prefer explicit boolean expressions.

15. **How would you test switch(true) logic in unit tests?**
    - Answer: Test each condition independently. For score 95, test that "Outstanding" prints. For score 85, test that "Excellent" prints (not "Outstanding"). Verify ordering.

---

## Deep Insights & Gotchas

- **Switch(true) is an anti-pattern in most contexts**: While valid, it sacrifices readability for unclear organizational gains. If-else is the idiomatic way to express conditions in JavaScript. Use switch(true) only if your codebase convention or specific organizational need justifies it.

- **Order matters critically in switch(true)**: Unlike traditional switch (where case order is flexible), switch(true) with ranges requires careful ordering. Higher ranges must come first, or lower ranges will always match first.

- **Fallthrough is harder to reason about in switch(true)**: Because each case is an independent condition, intentional fallthrough becomes confusing. Avoid fallthrough in switch(true) unless absolutely necessary.

---

## Summary

**Key Takeaway:** The switch(true) pattern uses boolean case expressions to replicate if-else functionality, but sacrifices clarity for questionable organizational benefits—if-else is the idiomatic JavaScript choice for conditions, and switch(true) should be avoided unless codebase conventions or specific organizational needs justify the trade-off.
