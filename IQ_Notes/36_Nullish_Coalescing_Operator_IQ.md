# Nullish Coalescing Operator (`??`)

## Overview

Covers `05_chapter_Operator/36_Null_Coalescing.js` — the `??` operator (ES2020), which provides a default value **only** when the left side is `null` or `undefined`, unlike `||` which falls back on *any* falsy value.

---

## 1. Reference Code

```javascript
let amul = null;
let val = amul ?? "NANDANI Milk";
console.log(val); // "NANDANI Milk"

let api_response = null;
let responsedata = api_response ?? "{}";
console.log(responsedata); // "{}"

let api_response1 = "Pramod";
let responsedata1 = api_response1 ?? "{}";
console.log(responsedata1); // "Pramod"
```

---

## 2. How `??` Works

```
leftSide ?? fallback
```

- If `leftSide` is `null` or `undefined` → evaluates to `fallback`.
- Otherwise → evaluates to `leftSide`, **unchanged**, no matter what other falsy-ish value it might be.

```javascript
let amul = null;
let val = amul ?? "NANDANI Milk"; // amul is null -> fallback used
console.log(val); // "NANDANI Milk"

let api_response1 = "Pramod";
let responsedata1 = api_response1 ?? "{}"; // not null/undefined -> original value kept
console.log(responsedata1); // "Pramod"
```

---

## 3. `??` vs `||` — the Critical Difference

`||` falls back on **any falsy value** (`0`, `""`, `false`, `NaN`, `null`, `undefined`). `??` only falls back on **`null`/`undefined`** specifically. This matters a lot for real values like `0` or `""` that are legitimate, intentional data — not "missing" data.

```javascript
let count = 0;

let a = count || 10; // 10  <-- WRONG if 0 is a valid value! || treats 0 as falsy
let b = count ?? 10; // 0   <-- correct — 0 is not null/undefined, so it's kept

let label = "";
let c = label || "default"; // "default" <-- WRONG if "" is a valid (empty) label
let d = label ?? "default"; // ""         <-- correct — "" is kept
```

This is exactly why the file uses `??` (not `||`) for `api_response ?? "{}"` — an API response could legitimately be `0`, `false`, or `""` in some field, and you'd only want the `"{}"` fallback when the value is truly absent (`null`/`undefined`), not just falsy.

---

## 4. Relationship to `null == undefined`

`??` treats `null` and `undefined` as equivalent "nothing" — the same special pairing covered in [[08_Null_vs_Undefined]] and the `null == undefined` loose-equality rule in [[13_Operators_IQ]]. `??` is essentially the "give me a default only for these two specific non-values" operator, built directly on that pairing.

```javascript
null ?? "x";       // "x"
undefined ?? "x";  // "x"
0 ?? "x";          // 0   — not null/undefined, kept as-is
"" ?? "x";         // ""  — not null/undefined, kept as-is
false ?? "x";      // false — not null/undefined, kept as-is
```

---

## Summary

**Key Takeaway:** `??` provides a default only for `null`/`undefined`, leaving every other falsy value (`0`, `""`, `false`, `NaN`) untouched — the correct tool whenever falsy-but-valid data must survive, where `||` would incorrectly overwrite it.

**Related notes:** [[08_Null_vs_Undefined]], [[13_Operators_IQ]]
