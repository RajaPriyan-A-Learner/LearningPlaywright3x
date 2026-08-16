# 79_Destructing — Array Destructuring & Rest Pattern

**Demonstrates:** unpacking array elements into variables and using the rest pattern.

## Basic Destructuring

Unpack array elements into individual variables:

```javascript
let [first, second, third] = [10, 20, 30];
console.log(first);   // 10
console.log(second);  // 20
console.log(third);   // 30
```

Clean alternative to indexed access (`arr[0]`, `arr[1]`, etc.).

## Rest Pattern `...` — Collect Remaining Elements

Collect all remaining elements into a new array:

```javascript
let [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a);     // 10
console.log(b);     // 20
console.log(rest);  // [30, 40, 50] — new array!
```

**Rules:**
- Rest must come last in the pattern
- Cannot reuse variable names (each `let` declares once per scope)

## Default Values

Provide fallback values for unpacked positions that are `undefined`:

```javascript
let [x = 1, y = 2, z = 99] = [10, 20];
console.log(x, y, z);  // 10 20 99 — z got default because input had only 2 elements
```

Defaults are used **only when the slot is undefined** — not for other falsy values.

## Skipping Elements

Use empty slots to ignore elements:

```javascript
let [, , thirdOnly] = [10, 20, 30];
console.log(thirdOnly);  // 30 — skipped indices 0 and 1
```

## Swapping Variables (No Temp Variable)

Destructuring enables elegant swaps without a temporary:

```javascript
let p = 1, q = 2;
[p, q] = [q, p];  // Swap in one line
console.log(p, q); // 2 1
```

---

## Key Takeaway

Destructuring makes unpacking cleaner than indexed access. Rest patterns handle variable-length collections. Swaps become one-liners. Defaults handle missing values gracefully.
