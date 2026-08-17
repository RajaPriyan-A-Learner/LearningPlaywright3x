# 46_IQ3 — Switch Duplicate Case Values & Unreachable Code Detection

**File:** `07_chapter_switch/46_IQ3.js`

## Overview

Duplicate case values in switch statements create unreachable code—once a case is matched, subsequent cases with the same value are never executed. Understanding why duplicate cases are problematic and how to detect them is essential for writing correct switch logic and passing code review. This scenario tests whether developers understand switch execution flow and can identify common refactoring mistakes. Linters automatically flag duplicate cases as errors, making this a critical pattern to recognize in both writing and reviewing code.

---

## Main Concept

JavaScript allows duplicate case values syntactically (no compile-time error), but the second and subsequent duplicates become dead code—unreachable because the first matching case captures execution. When `x = 10` matches the first `case 10:`, execution begins there. The second `case 10:` is never reached because if `x === 10`, the first case already matched. This violates the DRY principle and indicates a logic error or copy-paste mistake. Modern linters (ESLint) detect and warn about duplicate cases. Understanding this pattern is critical for code quality, as duplicate cases often result from refactoring errors where code is accidentally duplicated but values aren't renamed.

### Code Example

```javascript
let x = 10;
switch (x) {
    case 10:
        let b1 = 1;
        console.log(b1);  // Outputs: 1
        break;
    case 10:
        let b2 = 2;
        console.log(b2);  // Never executes (unreachable)
        break;
    default:
        console.log("d"); // Never executes (x === 10 matched first)
}
// Output: 1

// Corrected version with different cases:
let x = 10;
switch (x) {
    case 10:
        let b1 = 1;
        console.log(b1);  // Outputs: 1
        break;
    case 20:
        let b2 = 2;
        console.log(b2);  // Executes if x === 20
        break;
    default:
        console.log("d"); // Executes if x matches no cases
}
// Output: 1

// Or use the same case for both values (intentional grouping):
let x = 10;
switch (x) {
    case 10:
    case 20:
        console.log("x is 10 or 20");
        break;
    default:
        console.log("other");
}
// Output: x is 10 or 20
```

### Key Points

- **First Match Wins**: The first case matching the switch expression captures execution; subsequent cases with the same value are unreachable.
- **Dead Code**: Duplicate case values create unreachable code, wasting space and confusing maintainers about intent. Linters flag this as an error.
- **Copy-Paste Mistakes**: Duplicate cases often result from copy-pasting a case block and forgetting to update the case value—a common refactoring error.
- **Intentional Grouping vs Duplication**: Multiple cases before a single code block (case 10: case 20: code) is intentional grouping; duplicate cases with separate code are mistakes.
- **Linting Detection**: ESLint's `no-duplicate-case` rule automatically detects and warns about duplicate cases, preventing these bugs from reaching code review.

---

## Common Mistakes

**Mistake 1: Accidentally duplicating a case value while refactoring**
```javascript
// Wrong: copy-paste mistake, both cases are 200
switch (statusCode) {
    case 200:
        console.log("Success");
        handleSuccess();
        break;
    case 200:  // Oops, should be 201
        console.log("Created");
        handleCreated();
        break;  // Never executes
}

// Right: use different values or group intentionally
switch (statusCode) {
    case 200:
    case 201:
        console.log("Success/Created");
        handleSuccess();
        break;
    case 404:
        console.log("Not found");
        handleNotFound();
        break;
}
```

**Mistake 2: Not recognizing duplicate cases during code review**
```javascript
// Wrong: reviewer misses that second case is unreachable
switch (userRole) {
    case "admin":
        grantFullAccess();
        break;
    case "admin":  // Unreachable, missed in review
        grantPartialAccess();  // Never runs
        break;
    case "user":
        grantBasicAccess();
        break;
}

// Right: use linter to catch duplicates automatically
// ESLint no-duplicate-case would flag this before review
```

**Mistake 3: Thinking duplicate cases with different variable names work**
```javascript
// Wrong: different variable names don't make duplicate cases valid
switch (type) {
    case 1:
        let result = "first";
        console.log(result);
        break;
    case 1:
        let result = "second";  // SyntaxError + unreachable
        console.log(result);
        break;
}

// Right: use different case values
switch (type) {
    case 1:
        let result1 = "first";
        console.log(result1);
        break;
    case 2:
        let result2 = "second";
        console.log(result2);
        break;
}
```

**Mistake 4: Duplicate cases in large switches going unnoticed**
```javascript
// Wrong: large switch with duplicate cases easy to miss visually
switch (code) {
    case 200: console.log("OK"); break;
    case 201: console.log("Created"); break;
    case 204: console.log("No Content"); break;
    case 200: console.log("Duplicate");  // Unreachable, easy to miss
         break;
    case 404: console.log("Not Found"); break;
    // ... many more cases
}

// Right: use linter to catch duplicates automatically
// No duplicate-case rule catches this before runtime
```

---

## Interview-Ready Definitions

1. **Duplicate Case Value**: Multiple case labels with the identical value in a switch statement, where only the first can be matched and executed.

2. **Unreachable Code**: Code that can never execute because a preceding condition (first matching case) prevents it from being reached.

3. **Dead Code Detection**: Identifying code that serves no purpose and will never execute, enabling cleanup and prevention of logic errors.

4. **First Match Precedence**: In switch, the first case matching the expression captures execution; subsequent matching cases are ignored.

5. **Copy-Paste Bug**: A common error where code (including duplicate case values) is accidentally copied without updating values or logic.

---

## Tricky Interview Questions

1. **What's the output of this switch with duplicate cases?**
   ```javascript
   let x = 10;
   switch (x) {
       case 10:
           console.log("first");
           break;
       case 10:
           console.log("second");
           break;
   }
   ```
   - Answer: "first". The second case is unreachable because the first case matches and executes.

2. **Why doesn't JavaScript throw an error for duplicate cases?**
   - Answer: JavaScript allows duplicate case values syntactically (no compile-time validation). It's a runtime logic error, not a syntax error. Linters catch this.

3. **How would you intentionally have the same logic for multiple values?**
   - Answer: Use case grouping: `case 10: case 20: { shared code } break;` instead of duplicate cases with separate code.

4. **What does ESLint's `no-duplicate-case` rule prevent?**
   - Answer: It flags any switch with multiple case labels having identical values, requiring refactoring or explicit grouping.

5. **Can duplicate cases with different code blocks ever be valid?**
   - Answer: No, only the first case executes. If two cases should have different logic, use different values (case 10: vs case 20:) or group with fall-through.

6. **How do you refactor a function with accidental duplicate cases?**
   - Answer: Identify what each case was meant to do, assign unique values, or group cases intentionally. Review why the duplication occurred (copy-paste mistake?).

7. **What if a duplicate case is in a nested switch?**
   - Answer: Each switch operates independently. Duplicate cases in nested switches are errors in both contexts and should be fixed.

8. **Can TypeScript prevent duplicate cases?**
   - Answer: TypeScript doesn't add compile-time checking for duplicate cases in switches. It relies on linting rules (same ESLint `no-duplicate-case`).

9. **How do you test to ensure duplicate cases are removed?**
   - Answer: Static analysis (linting) catches duplicates. Unit tests should verify each case value is unique and reachable.

10. **What's the impact of duplicate cases on code review?**
    - Answer: Duplicate cases are red flags indicating copy-paste mistakes or incomplete refactoring. They should always be addressed before merging.

11. **If you have 50 cases, how would you detect duplicates manually?**
    - Answer: You wouldn't. Use `grep -E 'case.*:' | sort | uniq -d` or rely on linters. Manual detection for 50 cases is error-prone.

12. **What if a duplicate case is introduced during merge conflict resolution?**
    - Answer: Common in merge conflicts. Linters should catch this before commit hooks run. Code review should identify it.

13. **Can you use an expression (not a literal) as a duplicate case?**
    - Answer: `case 10:` and `case 5 + 5:` are separate cases (expression evaluated at runtime). Not technically a duplicate, but they're semantically the same.

14. **Should duplicate cases ever be committed to production?**
    - Answer: No. Pre-commit hooks, linting, and code review should catch duplicates. If they reach production, it's a process failure.

15. **How do duplicate cases differ from shadowed variables in programming?**
    - Answer: Duplicate cases make code unreachable (control flow issue), while shadowed variables are name collisions (scope issue). Both are bugs but different categories.

---

## Deep Insights & Gotchas

- **Duplicate cases are sneaky bugs**: They don't throw errors; they silently make code unreachable. The second case appears valid syntactically, leading developers to think it works.

- **Copy-paste is the culprit**: Most duplicate cases result from copy-pasting a case block and forgetting to update the value. This is preventable with better refactoring discipline and linting.

- **Linting is essential**: Duplicate case detection is one of the easiest wins for static analysis. ESLint should be mandatory in any JavaScript project.

---

## Summary

**Key Takeaway:** Duplicate case values create unreachable code where only the first matching case executes—understanding why duplicates are problems and using linters to prevent them is critical for code quality and catching copy-paste mistakes.
