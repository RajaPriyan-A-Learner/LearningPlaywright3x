# 16_Comparison_Operator — JavaScript Comparison & Equality Operators

**File:** `05_chapter_Operator/16_Comparison_Operator.js`

## Overview

Comparison operators (`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`) evaluate relationships between values and always return a boolean. The distinction between loose (`==`) and strict (`===`) equality is critical—loose equality performs type coercion, while strict equality requires both value and type to match. This distinction is one of the most frequent sources of bugs in JavaScript and a common interview topic.

---

## Main Concept

Comparison operators compare two operands and return a boolean (true or false). The relational operators (`>`, `<`, `>=`, `<=`) compare numeric values. Equality operators come in two forms: loose equality (`==`, `!=`) which coerces types before comparison, and strict equality (`===`, `!==`) which returns false if types differ. Always prefer strict equality in modern JavaScript.

### Code Example

```javascript
// Loose vs strict equality
console.log(5 == "5");    // true (loose: coerces "5" to 5)
console.log(5 === "5");   // false (strict: different types)

// Negation operators
console.log(5 != "5");    // false (loose: 5 == "5" is true, so != is false)
console.log(5 !== "5");   // true (strict: different types)
console.log(5 !== 5);     // false (same value and type)

// Relational operators
console.log(3 > 4);       // false
console.log(3 < 4);       // true
console.log(4 >= 4);      // true (4 > 4 OR 4 == 4)
console.log(4 <= 4);      // true

// Strict equality with values
console.log(5 === 5);     // true
console.log("hello" === "hello"); // true
console.log(true === 1);  // false (different types)

// Type checking before comparison
console.log(typeof 5 === "number");    // true
console.log(typeof "5" === "string");  // true
```

### Key Points

- **Loose equality coerces types**: `5 == "5"` is true because "5" is coerced to 5. Avoid `==` unless you specifically need type coercion.
- **Strict equality is type-safe**: `5 === "5"` is false because the types differ. Use `===` as the default for comparisons.
- **Inequality operators mirror equality**: `!=` is the negation of `==`, and `!==` is the negation of `===`. Both return the opposite boolean.
- **Relational operators work with types**: `>`, `<`, `>=`, `<=` coerce types to numbers for comparison (e.g., `"10" > "9"` is false because strings are compared lexicographically, not numerically).
- **Comparison chains don't work as expected**: `a < b < c` is not the same as `a < b && b < c`. It evaluates left-to-right: `(a < b) < c`, comparing the boolean result to c.

---

## Common Mistakes

**Mistake 1: Using loose equality in conditionals**
```javascript
// Wrong: loose equality causes unexpected behavior
if (user.age == 18) { } // Could match "18" (string), null (coerces), etc.

// Right: use strict equality
if (user.age === 18) { } // Only matches the number 18
```

**Mistake 2: Confusing `!=` and `!==`**
```javascript
// Wrong: loose inequality is unpredictable
if (value != 0) { } // Coerces, could match "0" (string)

// Right: use strict inequality
if (value !== 0) { } // Only matches non-zero numbers
```

**Mistake 3: Relational operators with strings**
```javascript
// Wrong: thinking "10" > "9" is true (numerically)
console.log("10" > "9");  // false (lexicographic: "1" < "9")

// Right: convert to numbers if numeric comparison is intended
console.log(Number("10") > Number("9")); // true
```

**Mistake 4: Chaining comparisons**
```javascript
// Wrong: thinking a < b < c checks if a < b < c
let a = 5, b = 10, c = 3;
console.log(a < b < c);   // true (not what you think!)
// Evaluates as: (5 < 10) < 3 → true < 3 → 1 < 3 → true

// Right: use && to chain conditions
console.log(a < b && b < c); // false (correct)
```

---

## Interview-Ready Definitions

1. **Comparison Operator**: An operator that compares two operands and returns a boolean. Includes equality (`==`, `===`), inequality (`!=`, `!==`), and relational (`>`, `<`, `>=`, `<=`).

2. **Loose Equality**: The `==` operator that performs type coercion before comparison. If operands have different types, JavaScript converts one or both to a common type (usually number), then compares.

3. **Strict Equality**: The `===` operator that compares both value and type without coercion. Returns false immediately if types differ, regardless of value.

4. **Type Coercion in Comparison**: Automatic type conversion during loose equality (`==`) or relational operators. Rules vary: strings coerce to numbers, booleans to numbers, null/undefined have special rules.

5. **Relational Operator**: An operator (`>`, `<`, `>=`, `<=`) that compares magnitudes. For strings, comparison is lexicographic (alphabetical order). For numbers, comparison is numeric. Mixed types coerce to numbers.

---

## Tricky Interview Questions

1. **Why is `5 == "5"` true but `5 === "5"` false?**
   - Answer: `==` coerces types, converting "5" to 5 before comparison. `===` compares without coercion, so different types always return false. This is why `===` is preferred.

2. **What does `0 == false` return?**
   - Answer: true. With `==`, false coerces to 0 (number), so they're equal. However, `0 === false` is false because types differ.

3. **What's the result of `null == undefined`?**
   - Answer: true. With `==`, null and undefined are equal to each other by specification, though not to any other value. `null === undefined` is false.

4. **Does `"10" > "9"` return true or false?**
   - Answer: false. When both operands are strings, relational operators compare lexicographically (alphabetically). "1" comes before "9", so "10" < "9" lexicographically. Convert to numbers if numeric comparison is needed.

5. **What's the result of `[] == false`?**
   - Answer: true. `[]` coerces to "" (empty string), which coerces to 0, which equals false (0). This is a surprising gotcha of loose equality.

6. **Why would `("" == 0) && ("0" == 0) && ("" == "0")` be false?**
   - Answer: The first two are true, but the last is false. "" coerces to 0, and "0" coerces to 0, but "" and "0" are both strings and compared as-is (not equal). Loose equality breaks transitivity.

7. **What does `undefined == null` return compared to `undefined === null`?**
   - Answer: `==` returns true (special rule). `===` returns false (different types). This is a unique pairing in JavaScript.

8. **Is `"100" > "20"` true or false?**
   - Answer: false. String comparison is lexicographic: "1" < "2", so "100" < "20" alphabetically. To do numeric comparison, convert: `Number("100") > Number("20")` is true.

9. **What's the result of `true == 1` and `true === 1`?**
   - Answer: `true == 1` is true (boolean coerces to 1). `true === 1` is false (different types: boolean vs number).

10. **Can you explain why `a < b < c` doesn't work as expected?**
    - Answer: It evaluates left-to-right: `(a < b) < c`. The result of `a < b` (a boolean) is then compared to c. If `a < b`, it becomes `true < c`, which coerces true to 1, then compares 1 to c. Use `&&`: `a < b && b < c`.

11. **What does `NaN == NaN` return?**
    - Answer: false. NaN is not equal to any value, including itself. Use `Number.isNaN()` or `Object.is(val, NaN)` to check for NaN.

12. **Is `false != 0` true or false?**
    - Answer: false. With `!=` (loose inequality), false coerces to 0, so 0 != 0 is false. Use `!==`: `false !== 0` is true (different types).

13. **What's the result of `"" === false`?**
    - Answer: false. Strict equality requires both value and type to match. "" is a string, false is a boolean; types differ.

14. **How does `null >= 0` differ from `null == 0`?**
    - Answer: `null >= 0` is true (null coerces to 0 for relational operators). `null == 0` is false (null only equals undefined/null with loose equality). This inconsistency is a gotcha.

15. **What's the result of `[] == [] ` and why?**
    - Answer: false. Both are arrays (objects), and object comparison uses reference equality. Even though they have the same contents, they're different objects in memory. Use `.toString()` or deep equality checks to compare contents.

---

## Deep Insights & Gotchas

- **Loose equality creates surprising chains**: The coercion rules are complex and inconsistent. `"" == 0` is true, `0 == false` is true, but `"" == false` is also true, yet `"" == "false"` is false. Never rely on `==` for complex comparisons.

- **Relational operators coerce, equality operators sometimes don't**: `null >= 0` is true, but `null == 0` is false. This asymmetry breaks intuition and is a frequent source of bugs.

- **String comparison is lexicographic, not numeric**: `"100" < "20"` is true (string order), but `100 < 20` is false (numeric order). Always be clear about the type when comparing.

---

## Summary

**Key Takeaway:** Use strict equality (`===`, `!==`) by default to avoid type coercion bugs; loose equality (`==`, `!=`) has unpredictable rules and should be avoided except in specific cases where coercion is intentional.
