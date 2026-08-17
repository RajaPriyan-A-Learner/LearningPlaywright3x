# 39_switch — JavaScript Switch Statement Fundamentals

**File:** `07_chapter_switch/39_switch.js`

## Overview

The switch statement is a conditional control flow mechanism that evaluates an expression once and executes different code blocks based on matching case values. Unlike if-else chains, switch provides cleaner syntax for multi-value comparisons and better performance through jump tables in optimized engines. Understanding switch basics—including case matching, break statements, and default handlers—is essential for writing maintainable conditional logic in JavaScript interviews.

---

## Main Concept

A switch statement uses strict equality (`===`) to compare an expression against multiple case values. When a match is found, execution starts at that case and continues until a `break` statement terminates the switch block. If no cases match, the optional `default` case executes. The switch statement is optimized for discrete value comparisons and is more readable than long if-else chains when checking a single expression against many values. Each case creates a "label" for jump-based execution, making switch faster than multiple conditional evaluations in compiled optimizations.

### Code Example

```javascript
let day = 2;
// 1 - mon, 2 = tue

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
    case 4:
        console.log('Thur');
        break;
    case 5:
        console.log('Fri');
        break;
    case 6:
        console.log('Sat');
        break;
    case 7:
        console.log('Sun');
        break;
    default:
        console.log("No idea which day it is");
}
// Output: Tue, 40
```

### Key Points

- **Strict Equality**: Switch uses `===` (strict equality), not `==` (loose equality). `switch(0) { case false: }` won't match because `0 !== false` under strict comparison.
- **Break is Essential**: Without `break`, execution "falls through" to the next case block (intentional in some patterns, but usually a bug). Always include `break` unless fall-through is intentional.
- **Case Labels are Hoisted**: You can declare variables in a case block, but they're function-scoped (not block-scoped). Use braces `{ }` around case contents to create block scope if needed.
- **Default is Optional**: The `default` case acts as a catch-all and executes if no cases match. It doesn't need to be last (though it's conventional to place it there).
- **Performance Edge**: Switch statements can be optimized into jump tables by JavaScript engines, making them faster than equivalent if-else chains for many discrete values.

---

## Common Mistakes

**Mistake 1: Forgetting `break` and creating accidental fall-through**
```javascript
// Wrong: outputs "Mon" and all subsequent days
let day = 1;
switch (day) {
    case 1:
        console.log('Mon');
        // Missing break!
    case 2:
        console.log('Tue');
    case 3:
        console.log('Wed');
}
// Output: Mon, Tue, Wed

// Right: add break to stop execution
let day = 1;
switch (day) {
    case 1:
        console.log('Mon');
        break;
    case 2:
        console.log('Tue');
        break;
}
// Output: Mon
```

**Mistake 2: Using loose equality instead of understanding strict equality**
```javascript
// Wrong: expecting 0 to match false
switch (0) {
    case false:
        console.log('Matched'); // Won't execute
        break;
    case 0:
        console.log('Strict match'); // This executes
        break;
}
// Output: Strict match (because 0 === 0, not 0 === false)
```

**Mistake 3: Variable redeclaration in different cases**
```javascript
// Wrong: redeclaring same variable in multiple cases
switch (x) {
    case 1:
        let value = "first";
        console.log(value);
        break;
    case 2:
        let value = "second"; // SyntaxError: Identifier 'value' has already been declared
        console.log(value);
        break;
}

// Right: use block scope with braces
switch (x) {
    case 1: {
        let value = "first";
        console.log(value);
        break;
    }
    case 2: {
        let value = "second";
        console.log(value);
        break;
    }
}
```

**Mistake 4: Expecting switch to evaluate conditions like if-else**
```javascript
// Wrong: switch doesn't evaluate conditions, only exact matches
let score = 85;
switch (score) {
    case > 80:
        console.log('Pass'); // Syntax error or wrong comparison
        break;
}

// Right: use if-else or switch(true) pattern for conditions
if (score > 80) {
    console.log('Pass');
}
```

---

## Interview-Ready Definitions

1. **Switch Statement**: A control flow construct that evaluates an expression once and executes code matching one of multiple case labels using strict equality. It's optimized for discrete value comparisons and cleaner than chained if-else statements.

2. **Break Statement**: A keyword that terminates the current switch block and resumes execution after the switch. Without `break`, execution "falls through" to the next case, continuing line-by-line even if the next case didn't match.

3. **Case Label**: A marker in a switch statement representing a value to match. When the switch expression equals the case value (using `===`), execution starts at that label and continues until `break` or the switch ends.

4. **Default Case**: An optional fallback in a switch statement that executes if no case values match the expression. Similar to an `else` in if-else chains, though `default` can appear anywhere in the switch (convention places it last).

5. **Fall-Through**: Unintended (or intentional) continuation of execution from one case to the next due to missing `break` statements. Can be used as a pattern to share logic between multiple cases but is often a source of bugs.

---

## Tricky Interview Questions

1. **What's the output of this switch statement?**
   ```javascript
   let x = 1;
   switch (x) {
       case 1:
           console.log('one');
       case 2:
           console.log('two');
       case 3:
           console.log('three');
           break;
       default:
           console.log('default');
   }
   ```
   - Answer: "one", "two", "three". After matching case 1, execution continues through cases 2 and 3 until `break` is encountered. This demonstrates fall-through behavior.

2. **Why does `switch(0) { case false: }` not match?**
   - Answer: Switch uses strict equality (`===`), and `0 !== false` in strict comparison. To match, you'd need `case 0:` or use loose equality (which JavaScript doesn't support in switch).

3. **Can you declare `const` in a switch case without using braces?**
   - Answer: Yes, but all cases share function scope, so redeclaring the same `const` name in different cases causes a SyntaxError. Use braces `{ }` around each case to create block scope.

4. **What's the difference between `switch` and multiple if-else statements?**
   - Answer: Both functionally equivalent, but switch is optimized for discrete values (jump tables), making it faster for many cases. Switch requires strict equality; if-else allows conditions. Switch evaluates expression once; if-else evaluates each condition.

5. **Where should the `default` case be placed?**
   - Answer: Conventionally at the end for readability, but JavaScript allows it anywhere. It executes if no cases match, regardless of position.

6. **What happens if you omit the expression in switch?**
   - Answer: `switch()` without an argument is a syntax error. You must provide an expression to evaluate (even `switch(undefined)` is valid).

7. **Can switch work with objects or arrays?**
   - Answer: Yes, using `===` to compare references. `switch(obj1) { case obj2: }` matches only if `obj1` and `obj2` reference the same object (same memory address), not if they have equal properties.

8. **How do you handle multiple matching cases with one code block?**
   - Answer: Use fall-through: `case 1: case 2: case 3: { shared code } break;` All three cases execute the same block when matched.

9. **Does switch have block scope or function scope?**
   - Answer: Switch itself has function scope (not block scope). Variables declared with `var` in a case block are function-scoped. Use braces `{ }` to create block scope for `let`/`const`.

10. **What's a real-world use case for switch fall-through?**
    - Answer: Grouping related cases with shared logic, like weekdays sharing weekend-free logic: `case 1: case 2: case 3: case 4: case 5: { weekday logic } break; case 6: case 7: { weekend logic } break;`

11. **Can a switch expression be a function call?**
    - Answer: Yes, `switch(getDay()) { ... }` evaluates the function once and uses the return value. Side effects in the function call execute once, not per case.

12. **How does TypeScript handle switch exhaustiveness checking?**
    - Answer: With union types, TypeScript can warn if not all cases are handled. For `let x: 1 | 2 | 3;`, switch must handle cases 1, 2, 3, and have a default (or union must be exhausted).

13. **What's the performance implication of switch vs if-else with 10 conditions?**
    - Answer: Modern engines optimize both, but switch can use jump tables (O(1) lookup), while if-else is sequential (O(n) comparisons). For many cases, switch is faster; for 2-3 conditions, performance difference is negligible.

14. **Can you use `let`, `const`, and `var` interchangeably in case blocks?**
    - Answer: No. `var` is function-scoped (accessible in all cases). `let`/`const` are block-scoped but share function scope without braces (causing redeclaration errors). Use braces for `let`/`const` to isolate each case.

15. **What happens with `switch(NaN) { case NaN: }`?**
    - Answer: Doesn't match, because `NaN !== NaN` (by design). To check for NaN, use `Number.isNaN()` outside switch or `switch(true) { case Number.isNaN(x): }`.

---

## Deep Insights & Gotchas

- **Fall-through is a feature, not a bug**: Many developers avoid it, but intentional fall-through is powerful for grouping cases. Always comment fall-through to signal intention: `case 1: // intentional fall-through`. This prevents accidental break removal during refactoring.

- **Switch is not a silver bullet for conditions**: While cleaner for discrete values, switch fails for range checks or complex conditions. For `if (score > 80 && score < 90)`, you need if-else or `switch(true)` (less efficient pattern).

- **Performance myth**: Modern engines optimize both switch and if-else equally for most scenarios. Premature optimization for switch over if-else is rarely justified; choose based on readability.

---

## Summary

**Key Takeaway:** The switch statement uses strict equality to match discrete values, requires `break` to prevent fall-through to subsequent cases, and is optimized for multi-value comparisons—understanding its scope rules and fall-through behavior prevents subtle bugs in conditional logic.
