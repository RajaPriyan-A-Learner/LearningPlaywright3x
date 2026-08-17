# 11_Number — JavaScript Integer and Float Literals in Multiple Bases

**File:** `04_chapter_Literal/11_Number.js`

## Overview

JavaScript represents all numbers as the IEEE 754 double-precision 64-bit floating-point format. There is no separate int, float, or double type—all are just "number". This file demonstrates integer literals in multiple bases (decimal, binary, octal, hexadecimal) and floating-point literals with standard decimal and exponential notation. Understanding that all bases and formats store identically is critical.

---

## Main Concept

JavaScript has one numeric type: "number". Integers and floats both use IEEE 754 double-precision format. Literals can be written in decimal, binary, octal, hexadecimal, or exponential notation—all parse to the same underlying representation.

### Code Example

```javascript
// ============================================================
// INTEGER LITERALS (multiple bases, all same type)
// ============================================================

// Decimal (Base 10) - standard
let decimal = 42;
console.log("Decimal:", decimal);  // 42

// Binary (Base 2) - 0b prefix
let binary = 0b1010;  // 10 in decimal
console.log("Binary 0b1010:", binary);  // 10

// Octal (Base 8) - 0o prefix
let octal = 0o52;   // 42 in decimal
console.log("Octal 0o52:", octal);  // 42

// Hexadecimal (Base 16) - 0x prefix
let hex = 0x2A;     // 42 in decimal
console.log("Hexadecimal 0x2A:", hex);  // 42

// ============================================================
// FLOATING-POINT LITERALS
// ============================================================

// Standard decimal floats
let float1 = 3.14;
let float2 = -0.5;
let float3 = .5;    // Valid but avoid (ambiguous)
let float4 = 5.;    // Valid but avoid (ambiguous)

console.log("Float 3.14:", float1);    // 3.14
console.log("Float -0.5:", float2);    // -0.5
console.log("Float .5:", float3);      // 0.5
console.log("Float 5.:", float4);      // 5

// Exponential (scientific) notation
let exp1 = 1.5e3;   // 1.5 * 10^3 = 1500
let exp2 = 1.5e-3;  // 1.5 * 10^-3 = 0.0015
let exp3 = 2E10;    // 2 * 10^10 = 20000000000

console.log("Exponential 1.5e3:", exp1);    // 1500
console.log("Exponential 1.5e-3:", exp2);   // 0.0015
console.log("Exponential 2E10:", exp3);     // 20000000000

// All are same type
console.log(typeof decimal);  // "number"
console.log(typeof float1);   // "number"
console.log(typeof hex);      // "number"
console.log(typeof exp3);     // "number"
```

### Key Points

- **Single "number" type for all:** No int, float, double distinction like other languages
  ```javascript
  typeof 42 === "number"       // true
  typeof 3.14 === "number"     // true
  typeof 0xFF === "number"     // true
  typeof 1e6 === "number"      // true
  ```

- **Integer literals in multiple bases:**
  ```javascript
  let decimal = 42;     // Base 10
  let binary = 0b101010;  // Base 2 (32 decimal)
  let octal = 0o52;     // Base 8 (42 decimal)
  let hex = 0x2A;       // Base 16 (42 decimal)
  ```

- **Floating-point literals:** Standard decimal and exponential
  ```javascript
  let float = 3.14;           // Decimal
  let decimal = 5.;           // Valid but confusing
  let reduced = .5;           // Valid but ambiguous (avoid)
  let scientific = 1.5e3;     // 1500 (exponential)
  let tiny = 1.5e-3;          // 0.0015 (negative exponent)
  ```

- **IEEE 754 64-bit format:** All numbers stored identically regardless of notation
  ```javascript
  0xFF === 255;        // true (hex = decimal)
  0o52 === 42;         // true (octal = decimal)
  1e3 === 1000;        // true (exponential = decimal)
  ```

- **JavaScript handles conversion:** Parser converts literal to IEEE 754, stored identically
  ```javascript
  let x = 0xFF;        // Parsed as 255
  let y = 255;         // Also 255
  console.log(x === y);  // true (identical in memory)
  ```

---

## Common Mistakes

- **Mistake 1: Writing floats without decimal point clarity**
  ```javascript
  // CONFUSING - hard to read
  let x = .5;
  let y = 5.;
  
  // CLEAR - explicit decimal
  let x = 0.5;
  let y = 5.0;
  ```

- **Mistake 2: Using wrong base notation**
  ```javascript
  // WRONG - invalid binary digit
  let x = 0b102;   // SyntaxError (binary only 0-1)
  
  // WRONG - invalid octal digit
  let x = 0o88;    // SyntaxError (octal only 0-7)
  
  // WRONG - invalid hex digit
  let x = 0xGG;    // SyntaxError (hex only 0-F)
  
  // RIGHT
  let x = 0b101010;  // Binary valid
  let x = 0o52;      // Octal valid
  let x = 0x2A;      // Hex valid
  ```

- **Mistake 3: Confusing types across bases**
  ```javascript
  // WRONG - assumes different types
  if (0xFF !== 255) {
    console.log("Different!");  // Never runs
  }
  
  // RIGHT - understand same type
  console.log(0xFF === 255);  // true
  ```

- **Mistake 4: Precision issues with floats**
  ```javascript
  // WRONG - direct comparison risky
  if (0.1 + 0.2 === 0.3) { }  // false! (precision issue)
  
  // RIGHT - use epsilon for comparison
  const EPSILON = 1e-10;
  if (Math.abs((0.1 + 0.2) - 0.3) < EPSILON) { }  // true
  ```

---

## Interview-Ready Definitions

**IEEE 754:** International standard for floating-point arithmetic. JavaScript uses 64-bit double-precision format (52-bit mantissa, 11-bit exponent, 1-bit sign).

**Binary literal:** Number in base 2 using 0b prefix (e.g., 0b1010 = 10 decimal). Uses digits 0-1 only.

**Octal literal:** Number in base 8 using 0o prefix (e.g., 0o52 = 42 decimal). Uses digits 0-7 only.

**Hexadecimal literal:** Number in base 16 using 0x prefix (e.g., 0x2A = 42 decimal). Uses digits 0-9, A-F.

**Exponential notation:** Representing numbers as mantissa × 10^exponent (e.g., 1e6 = 1,000,000, 1.5e-3 = 0.0015).

---

## Tricky Interview Questions

1. **What type is 42, 3.14, 0xFF, and 1e6?**
   - Answer: All "number". JavaScript has single numeric type; no distinction between int/float/hex in runtime.

2. **Is 0xFF === 255?**
   - Answer: Yes, true. Same value, different notation. Parsed identically.

3. **What's 0b1010 in decimal?**
   - Answer: 10. 1×8 + 0×4 + 1×2 + 0×1 = 10.

4. **What's wrong with 0b102?**
   - Answer: SyntaxError. Binary only uses 0-1. Digit 2 invalid.

5. **What's 1e6 equal to?**
   - Answer: 1,000,000. Exponential: 1 × 10^6.

6. **Why avoid writing 0.5 as .5?**
   - Answer: Readability. .5 ambiguous (could be typo for 0.5). Always use 0.5.

7. **Is 5. valid JavaScript?**
   - Answer: Yes, valid (means 5.0). But avoid for clarity.

8. **What's the issue with 0.1 + 0.2 === 0.3?**
   - Answer: False. IEEE 754 precision issue. 0.1 + 0.2 = 0.30000000000000004. Use epsilon for float comparison.

9. **How many digits significant in JavaScript numbers?**
   - Answer: ~17 decimal digits of precision (52-bit mantissa). Beyond that: precision loss.

10. **What's the largest integer JavaScript can represent exactly?**
    - Answer: 2^53 - 1 (9,007,199,254,740,991). Beyond that: precision loss. Use BigInt for larger.

11. **Can you mix bases in same expression?**
    ```javascript
    let x = 0xFF + 0o52 + 0b1010;  // Valid?
    ```
    - Answer: Yes, valid. 255 + 42 + 10 = 307. All convert to decimal for calculation.

12. **Why is exponential notation useful?**
    - Answer: Scientific notation for very large/small numbers. 1e9 more readable than 1000000000. Standard in physics/engineering.

---

## Deep Insights & Gotchas

- **IEEE 754 quirks:** Floats can't represent all decimals exactly. 0.1 + 0.2 ≠ 0.3 due to binary representation limits.

- **Base notation purely syntactic:** Different bases have zero performance difference. 0xFF and 255 identical in bytecode/runtime.

- **Max/Min safe integers:** Number.MAX_SAFE_INTEGER = 2^53-1. Beyond that: precision loss. Use BigInt for huge integers.

- **Precision loss at extremes:** Very large numbers lose precision. 1e20 + 1 === 1e20 (addition lost to rounding).

- **Negative exponent caution:** 1e-400 = 0 (underflow). 1e400 = Infinity (overflow). Rare but possible.

---

## Summary

**Key Takeaway:** JavaScript has one "number" type using IEEE 754 64-bit format for all integers and floats. Literals support decimal, binary (0b), octal (0o), hexadecimal (0x), and exponential notation—all parse identically. Beware: floating-point precision issues (0.1 + 0.2 ≠ 0.3), max safe integer (2^53-1), and underflow/overflow at extremes.
