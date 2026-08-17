# 22_Ternary_Op — Ternary (Conditional) Operator Fundamentals

**File:** `05_chapter_Operator/22_Ternary_Op.js`

## Overview

The ternary operator (conditional operator) is JavaScript's inline replacement for if/else statements, allowing concise conditional value assignment. It evaluates a condition and returns one of two values based on the result. Understanding ternary operators is critical for writing clean, readable code and for recognizing common patterns in production code.

---

## Main Concept

The ternary operator has the syntax: `condition ? valueIfTrue : valueIfFalse`. It evaluates the condition, and if truthy, returns the second operand (value if true); if falsy, returns the third operand (value if false). The ternary operator is right-associative and can be nested for multiple conditions.

### Code Example

```javascript
// Basic ternary operator
let age = 20;
let status = age > 18 ? "adult" : "minor";
console.log("Age status:", status);  // "adult"

// Ternary in expressions
let canVote = age >= 18 ? "Yes" : "No";
console.log("Can vote?", canVote);   // "Yes"

// Ternary with complex conditions
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
console.log("Grade:", grade);        // "B"

// Ternary with function calls
function getValue() { return 42; }
let result = age > 30 ? getValue() : 0;

// Ternary for template literal (SLA example)
let responseTime = 850;
let slaStatus = responseTime <= 1000 ? "Within SLA ✅" : "SLA breached ❌";
console.log(`Response: ${responseTime}ms — ${slaStatus}`);

// Using ternary to conditionally execute
let message = condition ? "Success" : "Failure";
```

### Key Points

- **Ternary returns a value, not a statement**: Unlike if/else which are statements, the ternary operator returns a value and can be used in assignments or expressions.
- **Short-circuit evaluation applies**: If the condition is truthy, the false branch is not evaluated. If falsy, the true branch is not evaluated. This can prevent errors if one branch would error.
- **Nesting can be hard to read**: Multiple nested ternaries become difficult to understand. Consider refactoring with if/else or helper functions if nesting gets deep.
- **Ternary is right-associative**: `a ? b : c ? d : e` groups as `a ? b : (c ? d : e)`. Only the rightmost ternary can omit parentheses; others should use them for clarity.
- **Both branches must be compatible types**: While not enforced, mixing return types (string and number) can cause unexpected behavior. Be consistent about return types.

---

## Common Mistakes

**Mistake 1: Using ternary in place of if/else for side effects**
```javascript
// Wrong: ternary doesn't execute side effects clearly
age > 18 ? console.log("Adult") : console.log("Minor");

// Right: use if/else for clarity when dealing with side effects
if (age > 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

**Mistake 2: Deeply nesting ternaries**
```javascript
// Wrong: hard to read
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";

// Right: use if/else or switch for readability
let grade;
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else grade = "F";
```

**Mistake 3: Forgetting both branches must return values**
```javascript
// Wrong: one branch returns value, other returns undefined
let val = condition ? 42 : console.log("Failed"); // second branch returns undefined

// Right: both branches should return compatible values
let val = condition ? 42 : 0;
```

**Mistake 4: Using loose equality in ternary condition**
```javascript
// Wrong: loose equality can cause unexpected results
let result = value == 0 ? "Zero" : "Not zero"; // Could match "" or false

// Right: use strict equality for predictable behavior
let result = value === 0 ? "Zero" : "Not zero";
```

---

## Interview-Ready Definitions

1. **Ternary Operator**: A conditional operator with three operands (`condition ? valueIfTrue : valueIfFalse`) that returns one of two values based on a boolean condition. Also called the conditional operator.

2. **Condition**: The first operand of the ternary operator, evaluated for truthiness. If truthy, the second operand is returned; if falsy, the third is returned.

3. **Short-Circuit Evaluation**: When the ternary evaluates the condition, it only evaluates the branch that will be returned. The other branch is never executed.

4. **Right-Associative**: Ternaries associate from right to left. `a ? b : c ? d : e` groups as `a ? b : (c ? d : e)`, not `(a ? b : c) ? d : e`.

5. **Inline Conditional**: Another name for the ternary operator, emphasizing that it provides a concise way to write conditional value assignment inline with other code.

---

## Tricky Interview Questions

1. **What's the difference between `condition ? a : b` and `condition && a || b`?**
   - Answer: They're not equivalent. Ternary always evaluates a if condition is truthy. `&&` with `||` short-circuits differently: if condition is truthy but a is falsy, it returns b (not desired). Use ternary for safe conditional returns.

2. **Does the ternary operator evaluate both branches?**
   - Answer: No, it short-circuits. Only one branch is evaluated based on the condition.

3. **What's the result of `true ? "a" : "b" ? "c" : "d"`?**
   - Answer: "a". The outer ternary evaluates to "a" immediately because the condition is true; the second ternary is never evaluated.

4. **Can you nest ternary operators?**
   - Answer: Yes, but deeply nested ternaries are hard to read. Example: `a ? b : c ? d : e`.

5. **What's the result of `false ? a() : b()` if a() and b() have side effects?**
   - Answer: Only b() executes due to short-circuit evaluation. a() is never called.

6. **Does `let x = condition ? 1;` work (missing false branch)?**
   - Answer: No, syntax error. Ternary requires both branches.

7. **What's the result of `x = 5 ? 10 : 20`?**
   - Answer: x is 10. The condition `5` is truthy, so the second operand (10) is returned.

8. **Can ternary be used in object properties?**
   - Answer: Yes, within the value: `{ key: condition ? "a" : "b" }`.

9. **What type is returned if branches return different types?**
   - Answer: JavaScript coerces to a common type or returns the mixed type union. Example: `condition ? "string" : 42` returns either a string or number.

10. **Is `condition ? true : false` equivalent to just `condition`?**
    - Answer: Almost. `condition ? true : false` returns true/false based on truthiness; `condition` returns the actual value. Use `!!condition` to convert to boolean if needed.

11. **What does `0 ? "yes" : "no"` return?**
    - Answer: "no". 0 is falsy, so the false branch is returned.

12. **Can you use ternary with assignment operators like `+=`?**
    - Answer: Yes: `x += condition ? a : b;`. The ternary returns a value, which is then added to x.

13. **What's the result of `null ? a : b`?**
    - Answer: b. null is falsy, so the false branch is returned.

14. **What happens with `console.log(condition ? "yes" : "no")` vs conditional execution?**
    - Answer: The ternary evaluates and returns one value, which is then logged. Both branches are not executed; only the chosen one.

15. **Can ternary operators be used as a performance optimization?**
    - Answer: Potentially, since they short-circuit. `condition ? result : expensiveFunction()` avoids calling the expensive function if condition is truthy. But use guard clauses or logical operators for clarity.

---

## Deep Insights & Gotchas

- **Ternary can replace if/else for value assignment but not for complex logic**: The ternary shines when assigning values; it struggles with multiple statements or side effects. Use if/else for those cases.

- **Nesting ternaries creates ambiguity**: While technically valid, nested ternaries are easy to misread. Consider extracting to a function: `const getGrade = (score) => { ... }` is clearer than nested ternaries.

- **Ternary doesn't short-circuit at the top level**: If you have `condition ? functionA() : functionB()`, both functions could be called if they're evaluated before the ternary (rare but possible with eager evaluation).

---

## Summary

**Key Takeaway:** The ternary operator is a concise way to assign conditional values in expressions; use it for simple conditions and avoid deep nesting, preferring if/else or helper functions for complex logic.
