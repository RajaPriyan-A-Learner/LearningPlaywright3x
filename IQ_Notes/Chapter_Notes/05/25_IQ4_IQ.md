# 25_IQ4 — Ternary Operators with Template Literals & SLA Checking

**File:** `05_chapter_Operator/25_IQ4.js`

## Overview

This file combines ternary operators with template literals to create informative status messages, demonstrating a practical pattern for performance monitoring and SLA (Service Level Agreement) checking. The combination allows embedded conditional logic within interpolated strings, making status reporting concise and readable.

---

## Main Concept

Combining ternary operators with template literals allows embedding conditional logic directly in string interpolation. The ternary determines a status message or value that's then inserted into the template literal, enabling concise conditional string building without concatenation.

### Code Example

```javascript
// SLA checking with ternary in template literal
let responseTime = 850;  // ms
let sla = 1000;          // ms
let slaStatus = responseTime <= sla ? "Within SLA ✅" : "SLA breached ❌";
console.log(`Response: ${responseTime}ms — ${slaStatus}`);  // "Response: 850ms — Within SLA ✅"

// Inline ternary in template literal
let statusCode = 200;
let status = `Status: ${statusCode === 200 ? "Success ✅" : "Failed ❌"}`;

// Ternary expression directly in template literal
let responseTime2 = 1500;
let message = `Response took ${responseTime2}ms: ${responseTime2 <= sla ? "Fast" : "Slow"}`;

// Numeric condition with template literal
let requestCount = 5;
let quota = 10;
let quotaStatus = `Requests used: ${requestCount}/${quota} ${requestCount >= quota ? "⚠️ LIMIT REACHED" : "✅ Within quota"}`;
```

### Key Points

- **Template literals accept ternary expressions**: The `${}` syntax can contain any JavaScript expression, including ternary operators.
- **Combines readability with functionality**: Template literals with embedded ternaries are more readable than string concatenation with inline conditions.
- **No extra variables needed**: Ternary inside template literal avoids intermediate variables for status messages.
- **Supports complex conditions**: Can use logical operators in ternary condition: `${(a && b) ? "yes" : "no"}`.
- **Performance monitoring is a common pattern**: SLA checks, quota status, and timeout messages frequently use this pattern.

---

## Common Mistakes

**Mistake 1: Breaking readability with complex ternaries in templates**
```javascript
// Wrong: too complex inside template literal
let msg = `Status: ${status === 200 ? "Success" : status === 404 ? "Not Found" : "Error"}`;

// Right: extract to variable or function
let statusMessage = status === 200 ? "Success" : status === 404 ? "Not Found" : "Error";
let msg = `Status: ${statusMessage}`;
```

**Mistake 2: Forgetting to evaluate the ternary expression**
```javascript
// Wrong: ternary not in ${}
let msg = `Status: responseTime <= sla ? "Fast" : "Slow"`; // Outputs literal string

// Right: ternary must be in ${}
let msg = `Status: ${responseTime <= sla ? "Fast" : "Slow"}`;
```

**Mistake 3: Inconsistent return types from ternary branches**
```javascript
// Wrong: mixing types in template literal
let msg = `Time: ${responseTime <= sla ? "Fast" : 0}ms`; // "Fast" or "0"

// Right: keep consistent types
let msg = `Time: ${responseTime <= sla ? "Fast" : "Slow"}`;
```

**Mistake 4: Missing parentheses for complex conditions**
```javascript
// Wrong: operator precedence can bite
let msg = `Status: ${a && b ? "yes" : "no"}`; // Might not do what you think

// Right: use parentheses for clarity
let msg = `Status: ${(a && b) ? "yes" : "no"}`;
```

---

## Interview-Ready Definitions

1. **Template Literal Interpolation**: The `${}` syntax in template literals that allows embedding JavaScript expressions, including ternary operators.

2. **Conditional String Building**: Using ternary operators within template literals to conditionally insert values into strings without concatenation.

3. **SLA Checking**: Monitoring whether response times or other metrics meet Service Level Agreement targets, often using ternary operators for status determination.

4. **Status Message Pattern**: Using ternary operators to generate informative status strings based on conditions, with visual indicators like emojis.

5. **Inline Ternary**: Placing ternary operators directly inside template literal `${}` expressions rather than in separate variables.

---

## Tricky Interview Questions

1. **What does `"Status: ${responseTime <= sla ? "Fast" : "Slow"}"` output if responseTime is 850 and sla is 1000?**
   - Answer: "Status: Fast". The ternary evaluates to "Fast", which is then interpolated into the template.

2. **Can you nest ternaries inside template literals?**
   - Answer: Yes, but readability suffers: `${a ? b ? "x" : "y" : "z"}`. Better to extract to a function.

3. **What's the difference between using ternary in template literal vs concatenation?**
   - Answer: Template literals are more readable: `` `Status: ${a ? "yes" : "no"}` `` vs `"Status: " + (a ? "yes" : "no")`. Both work, but template literal is preferred.

4. **Does the ternary inside template literal execute eagerly or lazily?**
   - Answer: Eagerly, when the template literal is evaluated. The entire ternary expression is evaluated to get the string to interpolate.

5. **Can you use template literals for conditional messages in error handling?**
   - Answer: Yes: `` throw new Error(`Failed: ${attempt > maxAttempts ? "Max attempts exceeded" : "Please retry"}`) ``.

6. **What if the ternary branches are function calls?**
   - Answer: They execute when the template literal evaluates: `` `Result: ${condition ? funcA() : funcB()}` ``. Both functions aren't called (short-circuit).

7. **Can you use template literals in the ternary condition itself?**
   - Answer: Yes, but unusual: `` `Status: ${(`${responseTime}` <= sla) ? "Fast" : "Slow"}` ``. Better to use the number directly.

8. **What's the result of `` `Number: ${null ? 1 : 0}` ``?**
   - Answer: "Number: 0". null is falsy, so the false branch returns 0, which is interpolated as "0".

9. **Can you use multiple ternaries in one template literal?**
   - Answer: Yes: `` `A: ${condA ? "yes" : "no"}, B: ${condB ? "yes" : "no"}` ``.

10. **What does `` `${responseTime <= sla ? `✅ ${responseTime}ms` : `❌ ${responseTime}ms`}` `` output?**
    - Answer: Nested template literals are allowed: `` `✅ 850ms` `` if responseTime is 850 and within SLA.

11. **Can you use ternary for pluralization in template literals?**
    - Answer: Yes: `` `You have ${count} ${count === 1 ? "item" : "items"}` ``.

12. **Is `` `Status: ${status === 200 ? "OK" : "Error"}` `` more efficient than `"Status: " + (status === 200 ? "OK" : "Error")`?**
    - Answer: Negligible difference. Template literals are slightly more readable; performance is essentially identical.

13. **What if the ternary returns undefined?**
    - Answer: undefined is coerced to the string "undefined": `` `Value: ${true ? undefined : "value"}` `` becomes "Value: undefined".

14. **Can you use arrow functions in ternary inside template literals?**
    - Answer: Yes, but unusual: `` `Result: ${(a => a ? "yes" : "no")(condition)}` ``. Extract to a function instead.

15. **Does whitespace in ternary inside template literal matter?**
    - Answer: No, whitespace is ignored by JavaScript: `` `${condition?'yes':'no'}` `` and `` `${condition ? 'yes' : 'no'}` `` are identical.

---

## Deep Insights & Gotchas

- **Template literals with ternaries are powerful but can become unreadable**: If the ternary is complex, extract it to a variable for clarity.

- **Interpolation happens at template literal evaluation time**: The ternary is evaluated when the template literal is created, not when it's printed or used later.

- **Nested template literals work but are confusing**: `${condition ? `nested ${value}` : "simple"}` requires careful escaping and is hard to read. Extract to functions instead.

---

## Summary

**Key Takeaway:** Template literals with embedded ternary operators enable concise, readable conditional string building; keep the ternary expressions simple and extract complex logic to separate variables or functions.
