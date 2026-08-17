# 15_Arithmetic_Operator — JavaScript Arithmetic Operators & Mathematical Operations

**File:** `05_chapter_Operator/15_Arithmetic_Operator.js`

## Overview

Arithmetic operators (`+`, `-`, `*`, `/`, `%`, `**`) perform mathematical calculations on numbers. Each operator has specific behavior with type coercion, operator precedence, and special cases (division by zero, modulus with negatives) that frequently appear in coding interviews. Understanding these nuances is crucial for writing correct calculations and debugging unexpected results.

---

## Main Concept

Arithmetic operators work with numeric operands, automatically coercing non-numeric types to numbers (except `+` with strings, which concatenates). The modulus operator `%` returns the remainder, while `**` performs exponentiation. Order of operations (PEMDAS) applies: exponentiation first, then multiplication/division, then addition/subtraction, left-to-right for same precedence.

### Code Example

```javascript
// Basic arithmetic
let a = 10;
let b = 3;

let sum = a + b;      // 13
let sub = a - b;      // 7
let mul = a * b;      // 30
let div = a / b;      // 3.3333...
let rem = a % b;      // 1 (remainder)
let pow = a ** b;     // 1000 (10^3)

console.log(sum, sub, mul, div, rem, pow);

// Modulus examples
console.log(13 % 7);  // 6
console.log(101 % 2); // 1 (odd number check)
console.log(100 % 2); // 0 (even number check)

// Exponentiation
console.log(2 ** 3);  // 8
console.log(10 ** 3); // 1000

// Type coercion in arithmetic
console.log("10" + 5);   // "105" (concatenation, not addition)
console.log("10" - 5);   // 5 (coerces to 10 - 5)
console.log("10" * 2);   // 20 (coerces "10" to 10)
console.log("10" / 2);   // 5 (coerces "10" to 10)

// Special cases
console.log(5 / 0);      // Infinity
console.log(-5 / 0);     // -Infinity
console.log(0 / 0);      // NaN
```

### Key Points

- **Addition is special**: The `+` operator concatenates strings (right operand is string → result is string); all other arithmetic operators coerce to numbers first.
- **Modulus sign follows dividend**: `10 % 3` is 1, `-10 % 3` is -1 (not 2). The modulus takes the sign of the dividend (left operand), not the divisor.
- **Exponentiation is right-associative**: `2 ** 3 ** 2` evaluates as `2 ** (3 ** 2)` = `2 ** 9` = 512, not `(2 ** 3) ** 2` = 64. Unusual compared to other operators.
- **Division by zero yields Infinity**: `5 / 0` is `Infinity`, `-5 / 0` is `-Infinity`, `0 / 0` is `NaN`. JavaScript doesn't throw errors for division by zero.
- **Modulus with floats works**: `10.5 % 3` is 1.5; modulus applies to the remainder regardless of float operands.

---

## Common Mistakes

**Mistake 1: Treating `+` like other arithmetic operators**
```javascript
// Wrong: expecting numeric addition
let result = "5" + 3;   // "53" (concatenation, not 5 + 3)
let total = result + 2; // "532" (wrong)

// Right: be explicit about type
let result = Number("5") + 3;  // 8
let total = result + 2;        // 10
```

**Mistake 2: Confusion with modulus and negative numbers**
```javascript
// Wrong: thinking -10 % 3 is 2 (like positive)
console.log(-10 % 3); // -1 (not 2, follows dividend sign)

// Right: understand modulus follows dividend
console.log(10 % 3);  // 1 (positive remainder)
console.log(-10 % 3); // -1 (negative remainder)
// To get positive remainder: (a % b + b) % b
console.log((-10 % 3 + 3) % 3); // 2
```

**Mistake 3: Misunderstanding exponentiation precedence**
```javascript
// Wrong: assuming left-to-right evaluation
let result = 2 ** 3 ** 2; // NOT (2 ** 3) ** 2 = 64

// Right: exponentiation is right-associative
let result = 2 ** 3 ** 2;  // 2 ** (3 ** 2) = 2 ** 9 = 512
// If you want left-to-right, use parentheses
let result2 = (2 ** 3) ** 2; // 64
```

**Mistake 4: Forgetting type coercion with operators other than `+`**
```javascript
// Wrong: assuming "10" - "5" throws error
let result = "10" - "5"; // 5 (both coerce to numbers)

// Right: all arithmetic operators except `+` coerce
let a = "10" * "2";    // 20 (number)
let b = "10" / "2";    // 5 (number)
let c = "10" % "3";    // 1 (number)
```

---

## Interview-Ready Definitions

1. **Arithmetic Operators**: Operators (`+`, `-`, `*`, `/`, `%`, `**`) that perform mathematical operations on numeric operands. JavaScript automatically coerces non-numeric operands to numbers (except `+` for concatenation).

2. **Modulus Operator**: The `%` operator returns the remainder after division. The sign of the result follows the sign of the dividend (left operand), not the divisor.

3. **Exponentiation**: The `**` operator raises the left operand to the power of the right operand. It's right-associative (`2 ** 3 ** 2` = 2 ** 9), unlike most operators which are left-associative.

4. **Type Coercion in Arithmetic**: Automatic conversion of non-numeric types to numbers during arithmetic operations. The `+` operator is an exception—it concatenates if either operand is a string.

5. **Operator Precedence**: Rules determining which operations execute first. Exponentiation (`**`) has highest precedence, then `*`, `/`, `%`, then `+`, `-`. Operations of equal precedence execute left-to-right (except `**`).

---

## Tricky Interview Questions

1. **What's the result of `"10" + 5 - 3`?**
   - Answer: 102. The `+` operator concatenates "10" and 5 to "105", then the `-` operator coerces "105" to 105, subtracts 3, yielding 102 (a number).

2. **Why is `10 % 3` equal to 1 but `-10 % 3` equal to -1, not 2?**
   - Answer: The modulus operator's result takes the sign of the dividend (left operand). In both cases, the remainder is 1, but -10 % 3 yields -1 to preserve the sign of -10.

3. **What's the result of `2 ** 3 ** 2` and why?**
   - Answer: 512. Exponentiation is right-associative, so it evaluates as `2 ** (3 ** 2)` = `2 ** 9` = 512. If you wanted 64, you'd use `(2 ** 3) ** 2`.

4. **What does `5 / 0` return and how does it differ from `0 / 0`?**
   - Answer: `5 / 0` returns `Infinity`. `0 / 0` returns `NaN` because zero divided by zero is mathematically undefined. JavaScript doesn't throw errors for division by zero.

5. **Why is `"5" - 2` equal to 3 (a number), but `"5" + 2` equal to "52" (a string)?**
   - Answer: The `+` operator concatenates if either operand is a string, favoring string output. The `-` operator only works with numbers, so both operands are coerced to numbers first. This inconsistency is a classic JS gotcha.

6. **What's the result of `(-10 % 3 + 3) % 3` and why would you use this?**
   - Answer: 2. This expression normalizes modulus to always return a positive remainder. It's useful in circular data structures or when you need consistent positive remainders (e.g., array index wrapping).

7. **Does `Math.max(...[1, 2, 3])` use the spread operator or does the function take arithmetic operands?**
   - Answer: It uses the spread operator (not arithmetic). `Math.max` is a function, not an operator, so it takes individual arguments. The spread `...` unpacks the array. Arithmetic operators work directly on operands.

8. **What happens with `100.5 % 10.5`?**
   - Answer: 1. Modulus works with floats; 100.5 divided by 10.5 is 9 with remainder 1.5, but the actual result is 1 (not 1.5). The remainder calculation follows `a - (Math.floor(a/b) * b)`.

9. **Is `x ** y ** z` equivalent to `Math.pow(x, Math.pow(y, z))`?**
   - Answer: Yes, because exponentiation is right-associative. `x ** y ** z` = `x ** (y ** z)` = `Math.pow(x, Math.pow(y, z))`.

10. **What's the result of `2 ** -2`?**
    - Answer: 0.25 (or 1/4). Negative exponents work as expected: `2 ** -2` = 1 / (2 ** 2) = 1/4 = 0.25.

11. **Why does `parseInt("5") + 3` differ from `"5" + 3` in behavior?**
    - Answer: `parseInt("5")` explicitly converts to a number (5), so `5 + 3` = 8. With `"5" + 3`, the `+` operator concatenates, yielding "53". Always be explicit about type conversion when arithmetic is intended.

12. **Can you use modulus with BigInt?**
    - Answer: Yes, but both operands must be BigInt. `10n % 3n` = 1n. Mixing BigInt and number throws TypeError: `10n % 3` is invalid.

13. **What's the result of `0.1 + 0.2 - 0.3`?**
    - Answer: 5.551115123125783e-17 (approximately, due to floating-point precision). This demonstrates that floating-point arithmetic has rounding errors. Compare with exact arithmetic libraries or scale to integers.

14. **Does `++` count as an arithmetic operator?**
    - Answer: No, `++` is an increment/decrement operator (separate category). It modifies a variable's value, whereas arithmetic operators produce new values without modifying operands directly.

15. **What's the difference between `**` and `Math.pow()`?**
    - Answer: Functionally equivalent, but `**` is an infix operator (more readable as `2 ** 8`), while `Math.pow(2, 8)` is a function call. `**` was added in ES2016; `Math.pow` is older. `**` is right-associative; `Math.pow` takes two arguments.

---

## Deep Insights & Gotchas

- **Addition's dual nature breaks mental models**: Unlike other binary operators, `+` decides between arithmetic and concatenation based on operand types. This makes it the source of many coercion bugs; always be explicit: `Number("5") + 3` or `5 + String(3)`.

- **Floating-point arithmetic is imprecise**: JavaScript uses IEEE 754 double precision, causing subtle errors like `0.1 + 0.2 !== 0.3`. Critical for financial calculations—scale to integers or use libraries like Decimal.js.

- **Modulus with negative numbers confuses many**: The sign follows the dividend, not the divisor. To normalize to positive remainders, use `(a % b + b) % b`. This affects circular arrays and index calculations.

---

## Summary

**Key Takeaway:** Arithmetic operators handle type coercion automatically (`+` concatenates strings, others coerce to numbers), exponentiation is right-associative, modulus follows the dividend's sign, and division by zero yields Infinity (not an error)—understanding these nuances prevents silent bugs in calculations.
