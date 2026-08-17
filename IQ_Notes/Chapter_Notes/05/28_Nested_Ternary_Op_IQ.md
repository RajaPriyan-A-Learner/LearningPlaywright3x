# 28_Nested_Ternary_Op — Nested Ternary Operators for Multi-Condition Selection

**File:** `05_chapter_Operator/28_Nested_Ternary_Op.js`

## Overview

Nested ternary operators allow selecting between more than two values based on multiple conditions. While powerful, deeply nested ternaries become difficult to read and maintain. Understanding when to nest ternaries versus using other patterns (if/else, switch, object mapping) is critical for writing maintainable code.

---

## Main Concept

Nested ternaries use a ternary operator in one or both branches of another ternary. The syntax `a ? b : c ? d : e` groups as `a ? b : (c ? d : e)` due to right-associativity. Each level adds complexity, and more than two or three levels should prompt refactoring to clearer structures.

### Code Example

```javascript
// Basic nested ternary (two levels)
let age = 26;
let status = age > 18 ? (age > 26 ? "Older" : "Young Adult") : "Minor";
console.log(status);  // "Young Adult"

// Nested ternary for multiple age groups
let ageGroup = age < 13 ? "Child" :
               age < 18 ? "Teen" :
               age < 65 ? "Adult" : "Senior";
console.log(ageGroup);  // "Adult"

// HTTP status code categorization
let statusCode = 404;
let category = statusCode < 300 ? "Success" :
               statusCode < 400 ? "Redirect" :
               statusCode < 500 ? "Client Error" : "Server Error";
console.log(`Status ${statusCode}: ${category}`);

// Temperature-based feeling
let temp = 35;
let feel = (temp >= 40) ? "Very Hot" :
           (temp >= 30) ? "Hot" :
           (temp >= 20) ? "Warm" :
           (temp >= 10) ? "Cool" : "Cold";
console.log("Temperature:", temp, "Feel:", feel);
```

### Key Points

- **Right-associativity determines grouping**: `a ? b : c ? d : e` groups as `a ? b : (c ? d : e)`, not `(a ? b : c) ? d : e`.
- **Readability decreases with nesting depth**: Two levels are acceptable; three or more should prompt refactoring.
- **Parentheses clarify intent**: Use them to show grouping even though they're not required.
- **Temperature/score ranges are common use cases**: Categorizing continuous values into ranges often uses nested ternaries.
- **Alternatives are often clearer**: if/else chains, switch statements, or object mapping can be more readable than nested ternaries.

---

## Common Mistakes

**Mistake 1: Deeply nesting without parentheses**
```javascript
// Wrong: hard to parse
let category = age < 13 ? "Child" : age < 18 ? "Teen" : age < 65 ? "Adult" : "Senior";

// Right: add parentheses for clarity
let category = age < 13 ? "Child" :
               age < 18 ? "Teen" :
               age < 65 ? "Adult" : "Senior";
```

**Mistake 2: Over-nesting when if/else is clearer**
```javascript
// Wrong: too many levels
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";

// Right: use if/else for clarity
let grade;
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else if (score >= 60) grade = "D";
else grade = "F";
```

**Mistake 3: Forgetting associativity**
```javascript
// Wrong: expecting left-to-right, but it's right-to-left
let x = a ? b : c ? d : e;  // Groups as a ? b : (c ? d : e)

// Right: understand associativity
let x = (a ? b : c) ? d : e;  // Different grouping (if you want this)
```

**Mistake 4: Mixing conditions that don't form a clear pattern**
```javascript
// Wrong: random conditions
let val = a > 5 ? "x" : b === "test" ? "y" : c.isEmpty() ? "z" : "default";

// Right: either group by related conditions or use if/else
let val;
if (a > 5) val = "x";
else if (b === "test") val = "y";
else if (c.isEmpty()) val = "z";
else val = "default";
```

---

## Interview-Ready Definitions

1. **Nested Ternary**: A ternary operator used in one or both branches of another ternary, allowing selection between more than two values.

2. **Right-Associativity**: The grouping of ternary operators from right to left. `a ? b : c ? d : e` groups as `a ? b : (c ? d : e)`.

3. **Conditional Chain**: A series of nested ternaries or if/else statements that select different values based on progressive conditions.

4. **Readability Threshold**: The point at which code becomes too complex to understand quickly. Deep nesting exceeds this for most developers.

5. **Refactoring Pattern**: Transforming nested ternaries into more readable structures (if/else, switch, helper functions) without changing behavior.

---

## Tricky Interview Questions

1. **What's the result of `let x = age > 18 ? (age > 26 ? "Older" : "Young Adult") : "Minor"` if age is 26?**
   - Answer: "Young Adult". age > 18 is true, so inner ternary evaluates: 26 > 26 is false, so "Young Adult" is returned.

2. **Does `a ? b : c ? d : e` group as `(a ? b : c) ? d : e` or `a ? b : (c ? d : e)`?**
   - Answer: `a ? b : (c ? d : e)` due to right-associativity. Only use parentheses if you want different grouping.

3. **What's the result of `statusCode < 300 ? "Success" : statusCode < 400 ? "Redirect" : "Error"` if statusCode is 404?**
   - Answer: "Error". 404 < 300 is false, 404 < 400 is false, so the final branch returns "Error".

4. **Can you nest ternaries three or more levels deep?**
   - Answer: Yes, but it becomes unreadable. Most teams forbid it via linters or code review.

5. **Is `a ? b ? c : d : e` the same as `a && b ? c : d ? e : e`?**
   - Answer: No, the logic is different. First nests in the true branch; second uses nested conditions.

6. **What's the result of `let temp = 35; let feel = temp >= 40 ? "Very Hot" : temp >= 30 ? "Hot" : "Warm";`?**
   - Answer: "Hot". 35 >= 40 is false, so inner ternary: 35 >= 30 is true, returns "Hot".

7. **Should you ever use nested ternaries with side effects?**
   - Answer: No. Ternaries are for returning values. If you need side effects, use if/else.

8. **Can you use object mapping instead of nested ternaries?**
   - Answer: Yes, often clearer: `{ "A": 90, "B": 80, ... }[score >= 90 ? "A" : score >= 80 ? "B" : "C"]`. But switch or if/else is usually clearer.

9. **What happens if you forget the final else in a nested ternary chain?**
   - Answer: Syntax error. All ternaries require both branches.

10. **Is `x = condition ? value : undefined` better than nested ternaries?**
    - Answer: Depends. If you're selecting between two values, ternary is fine. For ranges, nested ternaries or if/else is clearer.

11. **Can you use template literals with nested ternaries?**
    - Answer: Yes, but it gets unreadable: `` `Status: ${status < 300 ? "OK" : status < 400 ? "Redirect" : "Error"}` ``.

12. **Is a linter helpful for nested ternaries?**
    - Answer: Yes, ESLint can enforce maximum nesting depth, encouraging refactoring.

13. **What's the result of `true ? true ? "A" : "B" : "C"`?**
    - Answer: "A". Outer ternary's condition is true, so inner ternary evaluates; inner condition is true, so "A".

14. **Can you use switch statements instead of nested ternaries?**
    - Answer: Yes, switch is often clearer for multiple cases: `switch(category) { case "A": ... }`

15. **How would you refactor `age < 13 ? "Child" : age < 18 ? "Teen" : age < 65 ? "Adult" : "Senior"` to be clearer?**
    - Answer: Use if/else chain or extract to function: `function getAgeCategory(age) { if (age < 13) return "Child"; ... }`

---

## Deep Insights & Gotchas

- **Nested ternaries are tempting but dangerous**: They look elegant at first but become maintenance nightmares. Consider this a code smell.

- **Right-associativity can surprise**: Without parentheses, grouping is non-intuitive. Always add parentheses or refactor.

- **Alternatives are often clearer**: Developers read code more than they write it. If/else, switch, or helper functions invest in readability.

---

## Summary

**Key Takeaway:** Nested ternary operators allow selection between multiple values, but deeply nested ternaries reduce readability; use them only for two or three levels, and refactor to if/else, switch, or helper functions for clarity.
