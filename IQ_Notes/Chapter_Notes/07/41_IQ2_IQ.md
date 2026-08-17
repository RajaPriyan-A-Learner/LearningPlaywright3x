# 41_IQ2 — JavaScript Switch Best Practices & Complete Pattern

**File:** `07_chapter_switch/41_IQ2.js`

## Overview

Well-structured switch statements include break statements on every case, a default handler for unmatched values, and clear case organization for maintainability. This file demonstrates the recommended pattern for writing robust switch statements that prevent bugs, handle edge cases, and are easy to understand in code reviews. Following these patterns is critical in production code and frequently tested in interviews through code quality questions.

---

## Main Concept

The complete switch pattern combines several best practices: explicit `break` on each case (preventing fall-through), a `default` handler to catch unexpected values, and clear logical grouping of related cases. This pattern makes switch statements predictable, debuggable, and maintainable. The default case acts as a safety net, ensuring all possible inputs are handled (or at least acknowledged). Using break consistently prevents accidental cascading bugs that are difficult to diagnose. This structured approach is the standard in production code, code review checklists, and linting rules.

### Code Example

```javascript
// Well-structured switch with all breaks and default
// 0 - Sunday, 1 - Monday, 2 - Tue.....
let day = 10;
switch (day) {
    case 0:
        console.log("Sunday — Rest Day");
        break;
    case 1:
        console.log("Monday — Sprint Planning");
        break;
    case 2:
        console.log("Tuesday — Development");
        break;
    case 3:
        console.log("Wednesday — Code Review");
        break;
    case 4:
        console.log("Thursday — Testing");
        break;
    case 5:
        console.log("Friday — Deployment & Retro");
        break;
    case 6:
        console.log("Saturday — Rest Day");
        break;
    default:
        console.log("Invalid day value");
}
// Output: Invalid day value (day 10 doesn't match any case)
```

### Key Points

- **Break Every Case**: Ensure each case has `break` to prevent unintended fall-through (exception: explicit fall-through with comments).
- **Default Catches All**: Always include a `default` case to handle unexpected values, improving robustness and making assumptions explicit.
- **Logical Case Ordering**: Arrange cases by frequency or logical grouping (common cases first for readability, not performance).
- **Clear Case Labels**: Use descriptive values and comments for complex cases, making intent obvious to readers.
- **Consistent Indentation**: Maintain proper indentation for nested switch blocks and case statements, improving readability.

---

## Common Mistakes

**Mistake 1: Omitting `default` and silently ignoring unexpected values**
```javascript
// Wrong: no default case, unexpected input does nothing
let status = "unknown";
switch (status) {
    case "pending":
        console.log("Waiting");
        break;
    case "completed":
        console.log("Done");
        break;
    // What happens if status is "unknown"? Nothing!
}

// Right: add default to handle all cases
let status = "unknown";
switch (status) {
    case "pending":
        console.log("Waiting");
        break;
    case "completed":
        console.log("Done");
        break;
    default:
        console.log("Unknown status: " + status);
        throw new Error("Unexpected status value");
}
```

**Mistake 2: Inconsistent break placement and debugging nightmares**
```javascript
// Wrong: some cases have break, others don't (hard to spot bug)
let level = 2;
switch (level) {
    case 1:
        console.log("Level 1");
        break;
    case 2:
        console.log("Level 2");
        // forgot break!
    case 3:
        console.log("Level 3");
        break;
}
// Output: Level 2, Level 3 (unexpected!)

// Right: consistent break on every case
let level = 2;
switch (level) {
    case 1:
        console.log("Level 1");
        break;
    case 2:
        console.log("Level 2");
        break;
    case 3:
        console.log("Level 3");
        break;
}
// Output: Level 2 (correct)
```

**Mistake 3: Using switch for complex conditions without default**
```javascript
// Wrong: switch with missing cases and no default warning
let code = 999;
switch (code) {
    case 200:
        console.log("Success");
        break;
    case 404:
        console.log("Not Found");
        break;
    case 500:
        console.log("Server Error");
        break;
    // Code 999 is silently ignored
}

// Right: add default with explicit handling
let code = 999;
switch (code) {
    case 200:
        console.log("Success");
        break;
    case 404:
        console.log("Not Found");
        break;
    case 500:
        console.log("Server Error");
        break;
    default:
        console.log("Unknown status code: " + code);
}
```

**Mistake 4: Over-complex switch statements without refactoring**
```javascript
// Wrong: too many cases (50+ lines), hard to maintain
switch (type) {
    case "typeA": ...break;
    case "typeB": ...break;
    case "typeC": ...break;
    // ... 20+ more cases
}

// Right: extract switch to a function or object map
const handlers = {
    "typeA": () => { /* code */ },
    "typeB": () => { /* code */ },
    "typeC": () => { /* code */ },
};
const handler = handlers[type] || handlers["default"];
handler();
```

---

## Interview-Ready Definitions

1. **Best Practice Switch Pattern**: A switch statement with explicit `break` on each case, a `default` handler for unexpected values, and logical case ordering—ensuring correctness, readability, and maintainability.

2. **Default Case**: A catch-all handler that executes if no case values match. It's optional syntactically but essential for robust code, making unhandled values explicit and preventing silent failures.

3. **Switch Robustness**: Designing switch statements to handle all reasonable inputs, including edge cases and unexpected values, through explicit case handling and default handlers.

4. **Case Consistency**: Ensuring all cases follow the same pattern (break placement, code structure, indentation) to prevent bugs and improve code review comprehension.

5. **Switch Readability**: Structuring switch statements with clear case labels, logical ordering, and comments that make intent obvious to readers without requiring mental execution tracing.

---

## Tricky Interview Questions

1. **Why is a `default` case important even if you think you've covered all cases?**
   - Answer: Default handles unexpected values, bugs in value generation, or future additions. Production code often receives values you didn't anticipate during development.

2. **What's the difference between `switch` with default and `switch` without default?**
   - Answer: Without default, unexpected values silently do nothing (hard to debug). With default, they're acknowledged. Missing default is a code smell indicating incomplete thinking.

3. **Should `default` always throw an error?**
   - Answer: No, depends on context. Sometimes default does sensible fallback logic. But for API status codes, unexpected values should throw or log an error to catch bugs.

4. **How would you refactor a 50-case switch statement?**
   - Answer: Use a lookup object/map: `const handlers = { case1: fn1, case2: fn2 };` then `handlers[value]?.() || defaultHandler()`. Cleaner, more scalable.

5. **Can you use `typeof` in a case value?**
   - Answer: No, `typeof` returns a string type, not evaluated as a condition. Use `case "string":` to match types, or use `switch(typeof x) { case "string": }`.

6. **What's the preferred way to handle ranges in switch?**
   - Answer: Switch can't handle ranges directly (switch(score) { case 80-90: } fails). Use `switch(true)` pattern: `case score >= 80 && score < 90:` or if-else.

7. **Why would you use `switch` instead of object lookup for simple maps?**
   - Answer: Switch is more readable for complex logic per case. Object lookup is better for simple value mapping. Choice depends on case complexity and readability.

8. **How do you make switch cases more maintainable with many values?**
   - Answer: Add comments grouping related cases, use constants for case values (not magic numbers), extract complex logic to functions, consider object maps for data-heavy switches.

9. **What happens if `default` is in the middle, not at the end?**
   - Answer: `default` executes if no cases match, regardless of position. Convention places it last for readability, but JavaScript allows it anywhere.

10. **Should you use `switch` for two conditions or if-else?**
    - Answer: Two conditions usually warrant if-else for clarity. Switch shines with 3+ discrete values. Readability matters more than micro-optimizations.

11. **How do you document fall-through intentionally in production code?**
    - Answer: Use explicit comment: `case 1: // intentional fall-through case 2:`. ESLint requires this comment when `no-fallthrough` rule is enabled.

12. **What's the performance difference between switch with 100 cases and if-else with 100 conditions?**
    - Answer: Modern engines optimize both equally. Switch can theoretically use jump tables for O(1) lookup, but real-world performance difference is negligible for most cases.

13. **Can you nest switch statements?**
    - Answer: Yes, but deeply nested switches are hard to follow. Prefer extracting inner switch to a function or use a lookup map.

14. **How do you test a function with complex switch logic?**
    - Answer: Write tests for each case value, including default. Test edge cases (boundary values), invalid inputs, and fall-through scenarios (if intentional).

15. **What's an anti-pattern in switch design?**
    - Answer: Switch with side effects in every case (mutating globals, making API calls), no default, missing breaks, overly complex case logic—all indicate a function doing too much.

---

## Deep Insights & Gotchas

- **Switch with side effects is testing hell**: When each case modifies global state or makes API calls, testing becomes combinatorially complex. Extract side effects from switch logic when possible.

- **Default is a code smell indicator**: Missing default often signals incomplete understanding of all possible values. Adding default forces you to think through edge cases.

- **Switch refactoring to objects scales better**: As switches grow beyond 10 cases, lookup objects become more maintainable. The shift from procedural (switch) to declarative (object map) improves code quality.

---

## Summary

**Key Takeaway:** Well-structured switch statements use explicit `break` on every case, include a `default` handler for robustness, and maintain consistent formatting—this pattern prevents bugs, improves debuggability, and is the standard in production code and professional code reviews.
