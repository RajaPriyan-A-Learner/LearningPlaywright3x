# Operators in JavaScript

Covers the files in `05_chapter_Operator/`:
`13_DataType.js`, `14_Assignment_Operator.js`, `15_Arithmetic_Operator.js`, `16_Comparison_Operator.js`, `17_Logical_Operator.js`, `18_Confusing_Comparison.js`, `18_Confusing_Comparison_P2.js`, `20_Question.js`

---

## 1. Data Types Recap

JavaScript has 7 primitive types + 1 non-primitive (reference) type:

| Category | Types |
|---|---|
| **Primitive** | `string`, `number`, `boolean`, `bigint`, `undefined`, `null`, `symbol` |
| **Non-primitive** | `object` (includes arrays, functions, etc.) |

```javascript
// string, number, boolean, bigInt, undefined, null, Symbol
// array, NaN
```

> `array` is not a separate type — it's an `object`. `NaN` is not a separate type either — it's a special value of type `"number"`. See [[Literals_and_Numbers_IQ]] for a full breakdown of `NaN`, `Infinity`, and `BigInt`.

---

## 2. Assignment Operators

The plain `=` assigns a value. The **compound assignment operators** are shorthand for "operate on myself, then reassign."

```javascript
let x = 10;
x = "Rajjaprriyan";   // reassigning is legal with `let` — and JS lets the type change too
console.log(x);       // "Rajjaprriyan"
```

| Operator | Meaning | Equivalent to |
|---|---|---|
| `=` | Assign | `x = value` |
| `+=` | Add and assign | `x = x + value` |
| `-=` | Subtract and assign | `x = x - value` |
| `*=` | Multiply and assign | `x = x * value` |
| `/=` | Divide and assign | `x = x / value` |
| `%=` | Modulus and assign | `x = x % value` |
| `**=` | Exponent and assign | `x = x ** value` |

```javascript
let x1 = 10;
x1 += 5;   // x1 = x1 + 5  →  15
x1 -= 3;   // x1 = x1 - 3  →  12

let x = 12;
x *= 2;    // x = x * 2  →  24
x /= 4;    // x = x / 4  →  6
x %= 4;    // x = x % 4  →  2
```

> Note: with `let`/`var`, reassigning to a **different type** (number → string) is legal in JavaScript because it's dynamically typed. This is different from `const`, which forbids reassignment entirely (though the *contents* of an object/array bound by `const` can still change).

---

## 3. Arithmetic Operators

```javascript
let a = 10;
let b = 3;

let sum = a + b;   // 13
let sub = a - b;   // 7
let mul = a * b;   // 30
let div = a / b;   // 3.3333333333333335
```

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `10 + 3` | `13` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 3` | `3.333...` |
| `%` | Modulus (remainder) | `13 % 7` | `6` |
| `**` | Exponentiation | `2 ** 3` | `8` |

### Modulus (`%`) — Remainder, Not Percentage

```javascript
console.log(a % b);     // 10 % 3 = 1
console.log(13 % 7);    // 6
console.log(101 % 2);   // 1  (odd)
console.log(100 % 2);   // 0  (even)

// Classic even/odd check:
// n % 2 === 1  → odd
// n % 2 === 0  → even
```

### Exponentiation (`**`)

```javascript
console.log(2 ** 3);   // 2^3 = 8
console.log(a ** b);   // 10^3 = 1000
```

---

## 4. Comparison Operators

Comparison operators **always evaluate to a boolean** (`true`/`false`).

| Operator | Name | Checks |
|---|---|---|
| `==` | Loose equality | Value only (allows type coercion) |
| `===` | Strict equality | Value **and** type |
| `!=` | Loose inequality | Opposite of `==` |
| `!==` | Strict inequality | Opposite of `===` |
| `>` `<` `>=` `<=` | Relational | Numeric/lexicographic ordering |

```javascript
console.log(3 > 4);    // false
console.log(3 < 4);    // true
console.log(4 >= 4);   // true

console.log(5 == "5");   // true  — loose: coerces "5" to 5 before comparing
console.log(5 === "5");  // false — strict: number vs string, different types

console.log(5 != "5");   // false — loose: values are equal after coercion
console.log(5 !== "5");  // true  — strict: types differ, so "not equal"

console.log(5 === 5);    // true
```

### Mental Model: `==` vs `===`

- `==` ("loose"/"lose" equality) — compares **value only**, after converting operands to a common type. Easy to misread as safe; it isn't.
- `===` ("strict" equality) — compares **value and type**. No coercion. This is the one you should reach for by default.

> **Rule of thumb:** always prefer `===`/`!==` over `==`/`!=` unless you have a specific, well-understood reason to allow type coercion (e.g. deliberately treating `null` and `undefined` as equivalent).

---

## 5. Logical Operators

| Operator | Name | Behavior |
|---|---|---|
| `&&` | Logical AND | `true` only if **both** operands are truthy |
| `\|\|` | Logical OR | `true` if **either** operand is truthy |
| `!` | Logical NOT | Inverts a boolean |

```javascript
let a = true;
let b = false;

console.log(a && b);  // false — AND Gate: both must be true
console.log(a || b);  // true  — OR Gate: at least one must be true
console.log(!a);      // false — NOT: inverts a
```

Truth table:

| A | B | `A && B` | `A \|\| B` |
|---|---|---|---|
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

---

## 6. Confusing Comparisons — `==` Gotchas

`==` performs type coercion using a specific (and sometimes surprising) algorithm. These examples show why `===` is the safer default.

### 6.1 Empty String vs `0` vs `"0"` — Transitivity Is Broken

```javascript
console.log("" == 0);       // true   → "" coerced to Number → 0
console.log("0" == 0);      // true   → "0" coerced to Number → 0
console.log("" == "0");     // false  → both strings, compared as-is (no coercion between two strings)
```

This breaks the mathematical expectation that if `A == B` and `B == C`, then `A == C`:
`"" == 0` is true, `"0" == 0` is true, but `"" == "0"` is **false**. That's `==` transitivity failing in the wild.

```javascript
// === fixes it — no coercion, so no surprises
console.log("" === 0);      // false
console.log("0" === 0);     // false
console.log("" === "0");    // false
```

### 6.2 `null` and `undefined`

```javascript
console.log(null == undefined);   // true   → special-cased rule: null and undefined are loosely equal only to each other (and themselves)
console.log(null === undefined);  // false  → different types

console.log(null == 0);           // false  → null does NOT loosely equal any number, only undefined/null
console.log(null >= 0);           // true   → relational operators coerce null to 0 (gotcha!)
console.log(null > 0);            // false

console.log(null == 0 || null > 0); // false … but null >= 0 is true! 🤯
```

**Why the last line is so confusing:** `==` and relational operators (`>`, `<`, `>=`, `<=`) use *different* coercion rules in the spec.
- `==` has a special case: `null` is only loosely equal to `undefined` (and itself) — never to `0` or any other number.
- `>=`, `>`, `<`, `<=` convert `null` to `Number(null)` which is `0` — so `null >= 0` becomes `0 >= 0`, which is `true`.

This inconsistency is one of the most cited "JavaScript is weird" examples — see [[Null_vs_Undefined]] for more on how `null` and `undefined` behave differently across contexts.

---

## 7. Quick Reference — When to Use `==` vs `===`

| Situation | Recommendation |
|---|---|
| Comparing two values of the same known type | `===` (still fine and explicit) |
| Comparing values that might be different types | `===`, then convert explicitly if needed |
| Checking for "no value" (`null` **or** `undefined`) | `value == null` is an accepted idiom (matches both) |
| Everything else | `===` — avoid `==` surprises entirely |

---

## Summary

- JavaScript has 7 primitive types plus `object`; arrays are objects, `NaN` is a `number`.
- Compound assignment operators (`+=`, `-=`, `*=`, `/=`, `%=`, `**=`) are shorthand for "operate then reassign."
- `%` gives the remainder, not a percentage — classic use: even/odd checks via `n % 2`.
- `**` is exponentiation (`2 ** 3 === 8`).
- Comparison operators always return a boolean; `===`/`!==` check type **and** value, `==`/`!=` allow coercion.
- `&&` is AND (both truthy), `||` is OR (either truthy), `!` inverts.
- `==` coercion is not transitive (`"" == 0` and `"0" == 0` are both true, but `"" == "0"` is false) and relational operators (`>=`) coerce `null` differently than `==` does (`null >= 0` is true, but `null == 0` is false) — always prefer `===` to sidestep both traps.

**Related notes:** [[Literals_and_Numbers_IQ]], [[Null_vs_Undefined]]
