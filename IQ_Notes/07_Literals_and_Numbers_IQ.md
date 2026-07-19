# Literals and Number Types in JavaScript

Covers the files in `04_chapter_Literal/`:
`07_Literal.js`, `08_null_undefined.js`, `09_NULL.js`, `10_Literal.js`, `11_Number.js`, `12_Number_Part2.js`

---

## 1. What Is a Literal?

A **literal** is a fixed value written directly into the source code — the value is not computed, it's hardcoded exactly as it appears.

```javascript
let age = "raja";       // String literal
let isStudent = true;   // Boolean literal
let pi = 3.14;           // Numeric literal
let name = 'Alice';      // String literal
let nullValue = null;    // Null literal
let undefinedValue;      // undefined (no literal written — default value)
```

### Categories of Literals in JS

| Literal Type | Example |
|---|---|
| String | `"raja"`, `'Alice'`, `` `Hi ${name}` `` |
| Numeric | `42`, `3.14`, `-100`, `0xFF`, `1e6` |
| Boolean | `true`, `false` |
| Null | `null` |
| Array | `[1, 2, 3]` |
| Object | `{ name: "John" }` |
| BigInt | `123n` |
| RegExp | `/test/i` |

> `undefined` is **not** a literal — there's no `undefined` token you type to create it. It's the automatic value JavaScript gives an uninitialized variable. `let x;` produces `undefined` without you writing anything.

### `typeof` Operator

`typeof` tells you the data type of a value at runtime.

```javascript
console.log(typeof "raja");      // "string"
console.log(typeof 3.14);        // "number"
console.log(typeof true);        // "boolean"
console.log(typeof null);        // "object"   <-- quirk, see below
console.log(typeof undefined);   // "undefined"
```

---

## 2. `null` vs `undefined`

| | `undefined` | `null` |
|---|---|---|
| Meaning | Declared but not yet assigned | Intentionally "no value" |
| Who sets it | JavaScript automatically | The developer, explicitly |
| `typeof` result | `"undefined"` | `"object"` (historical JS bug) |
| Falsy? | Yes | Yes |

```javascript
let userName;                    // declared but not assigned
console.log(userName);           // undefined
console.log(typeof userName);    // "undefined"

let profilePicture = null;       // developer explicitly says "empty"
console.log(profilePicture);     // null
console.log(typeof profilePicture); // "object"  <-- known JS quirk!
```

### Equality Comparisons

```javascript
null == undefined;   // true   (loose equality treats them as equivalent)
null === undefined;  // false  (different types, strict equality fails)
```

### The `typeof null === "object"` Quirk

This is a bug baked into JavaScript since its first implementation in 1995 and has never been fixed (fixing it would break the web). `null` is a primitive, not an object — never rely on `typeof` to detect it. Use `value === null` instead.

See [[08_Null_vs_Undefined]] for the full deep-dive with real-world examples, nullish coalescing (`??`), and optional chaining (`?.`).

---

## 3. Number Literals

In JavaScript, **all numbers are of type `"number"`** (except `BigInt`). There is no separate `int`, `float`, `double`, etc. — every number uses the IEEE 754 double-precision 64-bit binary format under the hood.

### 3.1 Integer Literals by Base

| Base | Prefix | Example | Decimal Value |
|---|---|---|---|
| Decimal (10) | none | `42` | 42 |
| Binary (2) | `0b` / `0B` | `0b1010` | 10 |
| Octal (8) | `0o` / `0O` | `0o52` | 42 |
| Hexadecimal (16) | `0x` / `0X` | `0x2A` | 42 |

```javascript
let decimal = 42;
let binary = 0b1010;   // 10
let octal = 0o52;      // 42
let hex = 0x2A;         // 42

console.log(typeof hex); // "number" — same type regardless of base
```

### 3.2 Floating-Point Literals

```javascript
let float1 = 3.14;
let float2 = -0.5;
let float3 = .5;     // valid, but avoid — hurts readability
let float4 = 5.;     // valid, but avoid — hurts readability
```

### 3.3 Exponential (Scientific) Notation

`e` (or `E`) means "times 10 to the power of".

```javascript
let exp1 = 1.5e3;    // 1.5 * 10^3   = 1500
let exp2 = 1.5e-3;   // 1.5 * 10^-3  = 0.0015
let exp3 = 2E10;     // 2   * 10^10  = 20000000000
let million = 1e6;   // 1000000
let tiny = 1.5e-4;   // 0.00015
```

### 3.4 Numeric Separators (ES2021+)

Underscores (`_`) can be inserted between digits purely for human readability — they have zero effect on the value.

```javascript
let million = 1_000_000;        // 1000000
let binarySep = 0b1010_0001;    // 161
let hexSep = 0xFF_FF;           // 65535
```

### 3.5 BigInt — For Arbitrarily Large Integers

Regular numbers lose precision above `Number.MAX_SAFE_INTEGER` (2^53 - 1). `BigInt` solves this by supporting integers of any size, marked with a trailing `n`.

```javascript
let big = 123456789012345678901234567890n;      // BigInt literal
let big2 = BigInt("123456789012345678901234567890"); // from string
let bigFromNum = BigInt(42);                      // from number

console.log(typeof big); // "bigint" — a distinct type from "number"
```

> `BigInt` and `Number` cannot be mixed directly in arithmetic (`1n + 1` throws a `TypeError`) — convert explicitly first.

### 3.6 Special Numeric Values

| Value | Meaning | `typeof` |
|---|---|---|
| `Infinity` | Result exceeds the largest representable number | `"number"` |
| `-Infinity` | Negative overflow | `"number"` |
| `NaN` | "Not a Number" — result of an invalid math operation | `"number"` |

```javascript
console.log(1 / 0);           // Infinity
console.log(-1 / 0);          // -Infinity
console.log(typeof Infinity); // "number"

console.log(0 / 0);           // NaN
console.log("hello" * 2);     // NaN
console.log(typeof NaN);      // "number"  <-- quirky! NaN is a "number" that isn't a valid number
```

`NaN` has one famous quirk of its own: it is the only value in JavaScript that is not equal to itself.

```javascript
NaN === NaN;        // false
Number.isNaN(NaN);  // true  <-- correct way to test for NaN
```

---

## 4. Quick Reference Table — All Numeric Literal Forms

| Form | Example | Notes |
|---|---|---|
| Decimal integer | `42` | Base 10 |
| Negative | `-100` | Unary minus + literal |
| Binary | `0b1010` | ES6+ |
| Octal | `0o52` | ES6+ (legacy `052` is discouraged/invalid in strict mode) |
| Hexadecimal | `0x2A` | Common for colors: `0xFF0000` |
| Float | `3.14` | Standard decimal point |
| Leading-dot float | `.5` | Valid, avoid for clarity |
| Trailing-dot float | `5.` | Valid, avoid for clarity |
| Exponential | `1.5e3`, `2E10` | Scientific notation |
| Numeric separator | `1_000_000` | Readability only, no value change |
| BigInt | `123n` | Distinct `bigint` type |

---

## Summary

- A **literal** is a value written directly in code; `null` is a literal, `undefined` is not (it's an automatic default).
- `typeof null` returns `"object"` — a decades-old JS bug, never fixed for backward compatibility. Always use `=== null` to test for it.
- JavaScript has exactly one numeric type (`number`) for everything except `BigInt` — ints, floats, hex, octal, and binary are all just different *literal syntaxes* for writing a `number`.
- `Infinity`, `-Infinity`, and `NaN` are all valid values of type `"number"`.
- Use `Number.isNaN()`, not `=== NaN`, to check for `NaN`.
- Use `BigInt` (suffix `n`) only when integers exceed `Number.MAX_SAFE_INTEGER`.

**Related notes:** [[08_Null_vs_Undefined]], [[Identifiers_and_Literals_in_JS]]
