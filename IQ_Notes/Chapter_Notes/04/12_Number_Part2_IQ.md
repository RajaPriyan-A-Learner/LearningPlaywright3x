# 12_Number_Part2 — Numeric Separators, BigInt, Infinity, and NaN

**File:** `04_chapter_Literal/12_Number_Part2.js`

## Overview

Modern JavaScript provides three advanced numeric features: numeric separators (ES2021) for readability, BigInt for arbitrarily large integers, and special values (Infinity, -Infinity, NaN) for edge cases. Understanding these is essential for handling large datasets, precise arithmetic, and debugging unexpected numeric results.

---

## Main Concept

JavaScript numeric ecosystem includes readability aids (numeric separators), arbitrary-precision integers (BigInt), and special values (Infinity, NaN) representing results outside normal number range.

### Code Example

```javascript
// ============================================================
// NUMERIC SEPARATORS (ES2021+) - readability only
// ============================================================

let million = 1_000_000;      // 1,000,000
let billion = 1_000_000_000;  // 1,000,000,000
let binarySep = 0b1010_0001;  // 161 (161 in decimal)
let hexSep = 0xFF_FF;         // 65535

console.log("Separator 1_000_000:", million);      // 1000000
console.log("Separator 0b1010_0001:", binarySep);  // 161
console.log("Separator 0xFF_FF:", hexSep);         // 65535

// ============================================================
// BIGINT - For arbitrarily large integers
// ============================================================

// BigInt literal (n suffix)
let big = 123456789012345678901234567890n;

// BigInt from string
let big2 = BigInt("123456789012345678901234567890");

// BigInt from regular number (usually loses precision)
let bigFromNum = BigInt(42);

console.log("BigInt literal:", big);
console.log("BigInt from string:", big2);
console.log("BigInt from number:", bigFromNum);
console.log("typeof BigInt:", typeof big);  // "bigint"

// BigInt operations
let x = 100n;
let y = 50n;
console.log(x + y);      // 150n
console.log(x * y);      // 5000n
console.log(x / y);      // 2n (rounds down)

// ============================================================
// SPECIAL NUMERIC VALUES
// ============================================================

// Infinity (overflow)
console.log("Infinity:", Infinity);           // Infinity
console.log("1 / 0:", 1 / 0);                 // Infinity
console.log("-1 / 0:", -1 / 0);               // -Infinity
console.log("typeof Infinity:", typeof Infinity);  // "number"

// -Infinity
console.log("-Infinity:", -Infinity);
console.log(Math.abs(-Infinity));              // Infinity

// NaN (Not-a-Number) - invalid arithmetic
console.log("NaN:", NaN);                     // NaN
console.log("0 / 0:", 0 / 0);                 // NaN
console.log("'hello' * 2:", "hello" * 2);     // NaN
console.log("parseInt('abc'):", parseInt("abc"));  // NaN
console.log("typeof NaN:", typeof NaN);       // "number" (quirky!)

// Checking for NaN (special: NaN !== NaN)
console.log(NaN === NaN);       // false!
console.log(isNaN(NaN));        // true
console.log(Number.isNaN(NaN)); // true (safer)
console.log(Object.is(NaN, NaN));  // true (strict identity)
```

### Key Points

- **Numeric separators (ES2021):** Underscores for readability only—removed at parse time
  ```javascript
  let readable = 1_000_000;    // Same as 1000000
  let hex = 0xFF_FF_00;        // Same as 0xFFFF00
  let binary = 0b1111_0000;    // Same as 0b11110000
  // Underscores purely visual; zero performance impact
  ```

- **BigInt for arbitrary precision:** 64-bit numbers lose precision beyond 2^53. BigInt handles unlimited size.
  ```javascript
  let big = 9007199254740992n;  // Beyond Number.MAX_SAFE_INTEGER
  let result = 100n * 200n;     // 20000n (no precision loss)
  let mixed = 10n + 5;          // TypeError! Can't mix BigInt and Number
  ```

- **Infinity from division by zero:** Mathematical infinity, not an error
  ```javascript
  1 / 0             // Infinity
  -1 / 0            // -Infinity
  Math.max(...[])   // -Infinity
  Math.min(...[])   // Infinity
  ```

- **NaN ("Not-a-Number") from invalid math:** Result of undefined arithmetic
  ```javascript
  0 / 0             // NaN
  Math.sqrt(-1)     // NaN
  parseInt("xyz")   // NaN
  undefined + 5     // NaN
  ```

- **typeof NaN returns "number" (quirky):** NaN is "Not-a-Number" but typeof says "number"
  ```javascript
  typeof NaN === "number"     // true (quirk!)
  Number.isNaN(NaN)           // true (correct)
  Object.is(NaN, NaN)         // true (strict identity)
  NaN === NaN                 // false (NaN != NaN!)
  ```

---

## Common Mistakes

- **Mistake 1: Using NaN === NaN to check for NaN**
  ```javascript
  // WRONG - always false
  if (result === NaN) {  // Never true!
    console.log("NaN");
  }
  
  // RIGHT - use Number.isNaN()
  if (Number.isNaN(result)) {  // Correct
    console.log("NaN");
  }
  ```

- **Mistake 2: Forgetting BigInt and Number can't mix**
  ```javascript
  // WRONG - TypeError
  let x = 10n + 5;  // TypeError: Cannot mix BigInt and Number
  
  // RIGHT - convert first
  let x = 10n + BigInt(5);   // 15n
  let y = Number(10n) + 5;   // 15
  ```

- **Mistake 3: Assuming Infinity arithmetic works predictably**
  ```javascript
  // CONFUSING
  console.log(Infinity - Infinity);  // NaN
  console.log(Infinity / Infinity);  // NaN
  console.log(Infinity + Infinity);  // Infinity
  
  // Be explicit about checking for Infinity
  if (!isFinite(result)) {  // Catches Infinity and NaN
    console.log("Abnormal value");
  }
  ```

- **Mistake 4: Using isNaN() instead of Number.isNaN()**
  ```javascript
  // WRONG - isNaN() coerces to number
  isNaN("hello");  // true (coerces string to NaN)
  
  // RIGHT - Number.isNaN() strict check
  Number.isNaN("hello");  // false (not actually NaN)
  Number.isNaN(NaN);      // true (actually NaN)
  ```

---

## Interview-Ready Definitions

**Numeric separator:** Underscore (_) used in number literals for readability (ES2021+). Removed at parse time; zero runtime cost. Example: 1_000_000 = 1000000.

**BigInt:** Primitive type for arbitrarily large integers. Literal syntax: number + n (e.g., 123n). Cannot mix with Number in arithmetic.

**Infinity:** Special number value representing mathematical infinity. Result of overflow or division by zero. typeof Infinity === "number".

**-Infinity:** Negative infinity. Result of negative overflow or -1/0.

**NaN:** "Not-a-Number" value resulting from undefined arithmetic (0/0, Math.sqrt(-1), invalid operations). typeof NaN === "number" (quirk).

---

## Tricky Interview Questions

1. **What's 1_000_000 equal to?**
   - Answer: 1,000,000. Underscores purely visual; removed at parse time. Zero performance impact.

2. **Why can't you mix BigInt and Number?**
   ```javascript
   let x = 10n + 5;  // Error or works?
   ```
   - Answer: TypeError. Different types. Must convert: 10n + BigInt(5) or Number(10n) + 5.

3. **What's 1 / 0 in JavaScript?**
   - Answer: Infinity (not an error). Mathematical infinity. typeof Infinity === "number".

4. **Is NaN === NaN true?**
   - Answer: No, false. NaN is only value not equal to itself. Use Number.isNaN() or Object.is(x, NaN).

5. **What does typeof NaN return?**
   - Answer: "number". Quirky naming: "Not-a-Number" but typeof says "number".

6. **How do you check if result is NaN?**
   ```javascript
   result === NaN    // Works?
   isNaN(result)     // Works?
   Number.isNaN(result)  // Works?
   ```
   - Answer: Only last works reliably. NaN === NaN is false. isNaN() has edge cases (coercion).

7. **What's Infinity - Infinity?**
   - Answer: NaN (undefined). Infinity - Infinity is indeterminate.

8. **Can BigInt have decimals?**
   ```javascript
   let x = 10.5n;  // Valid?
   ```
   - Answer: No, SyntaxError. BigInt only for integers. No .5n syntax.

9. **What's the max Number in JavaScript?**
   - Answer: 1.7976931348623157e+308 (close to Number.MAX_VALUE). Beyond: Infinity.

10. **Why use Number.isNaN() over isNaN()?**
    - Answer: isNaN() coerces to number first: isNaN("hello") = true (wrong). Number.isNaN("hello") = false (correct).

11. **Can you convert BigInt back to Number?**
    ```javascript
    let big = 123456789012345678901234567890n;
    let num = Number(big);  // Works? Loses precision?
    ```
    - Answer: Works but loses precision beyond 2^53. Better: keep as BigInt if possible.

12. **What numeric separator positions are valid?**
    ```javascript
    1_000_000    // Valid
    _1000000     // Invalid (starts with _)
    1000000_     // Invalid (ends with _)
    1__000000    // Invalid (double _)
    ```
    - Answer: Only between digits. Cannot start/end/double.

---

## Deep Insights & Gotchas

- **NaN is only value not equal itself:** By design (IEEE 754). NaN === NaN is false. Causes bugs if not careful.

- **Infinity arithmetic is defined:** Infinity + 5 = Infinity. Infinity / Infinity = NaN. Infinity - Infinity = NaN.

- **BigInt incompatible with Number:** No automatic coercion. Must be explicit: BigInt(x) or Number(x).

- **Numeric separators purely visual:** Removed at compile time. No performance difference 1_000_000 vs 1000000.

- **Precision loss converting BigInt to Number:** BigInt preserves exact value; Number converts but may lose precision beyond 2^53.

---

## Summary

**Key Takeaway:** Numeric separators (1_000_000) improve readability with zero cost. BigInt handles unlimited integers but can't mix with Number. Infinity results from overflow (typeof "number"). NaN from invalid math—check with Number.isNaN(), never === NaN. Understanding these edge cases prevents subtle bugs in numeric code.
