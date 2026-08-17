# 10_Literal — JavaScript Number Literals in Different Bases

**File:** `04_chapter_Literal/10_Literal.js`

## Overview

JavaScript allows writing numbers in multiple bases (decimal, hexadecimal, octal) and exponential notation. All are stored as the same "number" type (IEEE 754 double-precision). Understanding these formats is essential for working with colors (hex), file permissions (octal), and scientific calculations (exponential notation).

---

## Main Concept

JavaScript literals can represent the same numeric value in different notations: decimal (base 10), hexadecimal (base 16), octal (base 8), and exponential. All evaluate to the same underlying number type.

### Code Example

```javascript
// Decimal (Base 10) - standard
let count = 42;
let negative = -100;
let zero = 0;

// Hexadecimal (Base 16) - starts with 0x or 0X
let h = 0xFF;              // 255 in decimal
console.log(typeof h);     // "number"
let color_hex = 0xFF0000;  // Red in RGB (16711680 decimal)
let purple = 0x8B00FF;     // Hex notation

// Octal (Base 8) - starts with 0o or 0O
let octal = 0o77;  // 63 in decimal
let permission = 0o755;  // File permissions (493 decimal)

// Exponential notation (scientific)
let million = 1e6;    // 1 * 10^6 = 1,000,000
let tiny = 1.5e-4;    // 1.5 * 10^-4 = 0.00015
let huge = 2E10;      // 2 * 10^10 = 20,000,000,000

// All same type when logged
console.log(0xFF === 255);     // true
console.log(0o77 === 63);      // true
console.log(1e6 === 1000000);  // true
```

### Key Points

- **Hexadecimal (0x prefix):** Base 16, uses digits 0-9 and letters A-F (case-insensitive)
  ```javascript
  let hex1 = 0xFF;      // 255
  let hex2 = 0xff;      // 255 (case-insensitive)
  let color = 0x00FF00; // Green (RGB)
  let max = 0xFFFFFFFF; // Large hex value
  ```

- **Octal (0o prefix):** Base 8, uses digits 0-7 only
  ```javascript
  let octal1 = 0o10;  // 8 in decimal
  let octal2 = 0o77;  // 63 in decimal
  let perms = 0o755;  // File permissions (rwxr-xr-x)
  ```

- **Exponential notation:** For very large or very small numbers
  ```javascript
  let big = 1e3;     // 1000
  let huge = 1e10;   // 10,000,000,000
  let tiny = 1e-3;   // 0.001
  let micro = 1e-6;  // 0.000001
  ```

- **All convert to same underlying decimal:** JavaScript stores all as numbers (IEEE 754 format)
  ```javascript
  0xFF === 255       // true (hex and decimal same)
  0o77 === 63        // true (octal and decimal same)
  1e6 === 1000000    // true (exponential and decimal same)
  typeof 0xFF        // "number" (same type as 255)
  ```

- **Negative values work with all formats:**
  ```javascript
  let negHex = -0xFF;     // -255
  let negOctal = -0o77;   // -63
  let negExp = -1e6;      // -1,000,000
  ```

---

## Common Mistakes

- **Mistake 1: Confusing hex with decimal in color codes**
  ```javascript
  // WRONG - confusing which is which
  let color = 16711680;  // What color is this?
  
  // RIGHT - use hex for colors
  let color = 0xFF0000;  // Red (clearly)
  let green = 0x00FF00;  // Green (clearly)
  let blue = 0x0000FF;   // Blue (clearly)
  ```

- **Mistake 2: Using 0 prefix for octal (deprecated)**
  ```javascript
  // WRONG - old octal (confusing with leading zero)
  let old = 077;  // Used to mean octal in old JS
  
  // RIGHT - use 0o prefix
  let octal = 0o77;  // 63 (clear intent)
  ```

- **Mistake 3: Invalid digits in base notation**
  ```javascript
  // WRONG - 8 not valid in octal (0-7 only)
  let invalid = 0o88;  // SyntaxError!
  
  // WRONG - G not valid in hex (0-F only)
  let invalid = 0xGG;  // SyntaxError!
  
  // RIGHT - only valid digits per base
  let octal = 0o77;   // Valid (0-7)
  let hex = 0xFF;     // Valid (0-F)
  ```

- **Mistake 4: Forgetting base notation loses clarity**
  ```javascript
  // CONFUSING - what does 255 represent?
  let value = 255;  // Is this decimal, hex, octal?
  
  // CLEAR - notation shows intent
  let rgb_max = 0xFF;    // Clearly hex color value
  let perms = 0o755;     // Clearly octal permissions
  let count = 255;       // Decimal count
  ```

---

## Interview-Ready Definitions

**Hexadecimal (hex):** Base 16 number system using digits 0-9 and letters A-F. Notation: 0x prefix. Common for colors (RGB), memory addresses, bitwise operations.

**Octal:** Base 8 number system using digits 0-7 only. Notation: 0o prefix (or deprecated 0 prefix). Used for file permissions in Unix systems.

**Exponential notation:** Representing numbers as mantissa × 10^exponent. Notation: 1e6 means 1 × 10^6 = 1,000,000. Useful for very large/small numbers.

**Base conversion:** Converting number from one base to another (e.g., 0xFF = 255 decimal). All formats store identically in JavaScript (IEEE 754).

**Number literal:** Value typed directly in code. Can be decimal, hex, octal, exponential, float. All become "number" type.

---

## Tricky Interview Questions

1. **What's 0xFF in decimal?**
   - Answer: 255. In hexadecimal, F = 15, so FF = 15×16 + 15 = 255.

2. **Are these equal?**
   ```javascript
   0xFF === 255  // true or false?
   0o77 === 63   // true or false?
   ```
   - Answer: Both true. Different notations, same value. JavaScript converts all to decimal internally.

3. **What's the octal value of 0o755?**
   - Answer: 493 in decimal. 7×64 + 5×8 + 5×1 = 448 + 40 + 5 = 493. Unix file permissions.

4. **What does 1e6 represent?**
   - Answer: 1,000,000. Exponential: 1 × 10^6 = 1,000,000.

5. **Is 077 octal or something else?**
   ```javascript
   let x = 077;  // Is this octal?
   ```
   - Answer: In strict mode, SyntaxError (deprecated). In non-strict, treated as octal (63). Should use 0o77.

6. **Why use hex for colors?**
   ```javascript
   let red1 = 16711680;    // Decimal
   let red2 = 0xFF0000;    // Hex
   ```
   - Answer: Hex clearly shows RGB components: FF (red) + 00 (green) + 00 (blue). Decimal obscures structure.

7. **Can you mix notations?**
   ```javascript
   let x = 0xFF + 0o77 + 1e2;  // Valid?
   ```
   - Answer: Yes. JavaScript converts all to decimal and adds: 255 + 63 + 100 = 418.

8. **What base is 0b prefix?**
   ```javascript
   let x = 0b1010;  // Binary?
   ```
   - Answer: Yes, binary (base 2). Though not in 10_Literal.js, JavaScript supports 0b for binary.

9. **What's the result of 0xFF / 10?**
   - Answer: 25.5. 0xFF = 255, so 255 / 10 = 25.5.

10. **Can you use negative with hex notation?**
    ```javascript
    let x = -0xFF;  // Valid?
    ```
    - Answer: Yes, valid. -0xFF = -255.

11. **What's wrong with 0o88?**
    - Answer: Invalid octal digit. Octal only uses 0-7. 8 causes SyntaxError.

12. **How do you convert 0xFF back to decimal string?**
    ```javascript
    (0xFF).toString();      // Result?
    (0xFF).toString(10);    // Result?
    (255).toString(16);     // Result?
    ```
    - Answer: "255", "255", "ff". toString() with base parameter converts to that base.

---

## Deep Insights & Gotchas

- **All bases same underlying type:** JavaScript doesn't distinguish hex vs decimal storage. 0xFF and 255 are byte-for-byte identical in memory.

- **Hex colors require leading zeros:** 0xFF0000 must have zeros; can't write 0xFF red (ambiguous).

- **Octal deprecated without 0o:** Old leading-zero octal (077) is deprecated. Use 0o77 for clarity. Different in strict mode (error vs silent).

- **Exponential loses precision at extremes:** 1e308 is max, 1e-324 is min positive. Beyond these: Infinity or zero.

- **parseInt() ignores notation:** parseInt("FF") requires radix parameter: parseInt("FF", 16) = 255. Always pass radix to be safe.

---

## Summary

**Key Takeaway:** JavaScript numeric literals support decimal (standard), hexadecimal 0x (colors, bitwise), octal 0o (permissions), and exponential notation (large/small numbers). All evaluate to same "number" type. Hex best for colors/addresses, octal for permissions, exponential for scientific notation.
