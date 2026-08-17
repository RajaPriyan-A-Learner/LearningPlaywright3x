# 36_Null_Coalescing — Nullish Coalescing Operator (??) for Default Values

**File:** `05_chapter_Operator/36_Null_Coalescing.js`

## Overview

The nullish coalescing operator (`??`) returns the right operand when the left operand is null or undefined, and the left operand otherwise. Unlike the logical OR operator (`||`), which treats all falsy values (0, "", false) as trigger for the default, nullish coalescing only considers null and undefined as "missing." This distinction is critical for APIs and optional parameters where 0 or empty string might be valid values.

---

## Main Concept

The nullish coalescing operator (`??`) provides a safer way to assign default values compared to the logical OR operator (`||`). While `||` uses truthiness (treating 0, "", false as falsy), `??` only triggers on null or undefined. This prevents accidentally replacing valid falsy values with defaults.

### Code Example

```javascript
// Nullish coalescing basics
let amul = null;
let val = amul ?? "NANDANI Milk";
console.log(val);  // "NANDANI Milk" (null triggers default)

// Undefined also triggers default
let response = undefined;
let data = response ?? "{}";
console.log(data);  // "{}" (undefined triggers default)

// Non-null/undefined values are used (even if falsy)
let api_response = "Pramod";
let responsedata = api_response ?? "{}";
console.log(responsedata);  // "Pramod" (non-null, so used)

// Difference from || operator
let count = 0;
let withOr = count || 10;        // 10 (0 is falsy, || triggers)
let withCoalesce = count ?? 10;  // 0 (0 is not null/undefined, ?? doesn't trigger)

// Empty string example
let msg = "";
let withOr2 = msg || "default";    // "default" (empty string is falsy)
let withCoalesce2 = msg ?? "default"; // "" (empty string is not null/undefined)

// Chaining
let val1 = null;
let val2 = undefined;
let val3 = "fallback";
let result = val1 ?? val2 ?? val3;
console.log(result);  // "fallback"
```

### Key Points

- **`??` only checks for null/undefined**: Unlike `||` which uses truthiness, `??` specifically checks for nullish values (null or undefined).
- **Preserves falsy but valid values**: 0, empty string, false, NaN are all valid values preserved by `??`, not replaced with defaults.
- **Safe for API responses**: When APIs return 0 or empty strings as valid data, `??` is safer than `||`.
- **Chainable for multiple fallbacks**: `a ?? b ?? c ?? d` checks each until finding a non-nullish value.
- **Introduced in ES2020**: Newer operator; not available in older JavaScript environments (requires transpiling).

---

## Common Mistakes

**Mistake 1: Using `||` instead of `??` for optional parameters**
```javascript
// Wrong: replaces 0 and empty string with defaults
function setCount(count) {
  let val = count || 10;  // If count is 0, replaces with 10!
}

// Right: use ?? to preserve 0 and ""
function setCount(count) {
  let val = count ?? 10;  // If count is 0, keeps 0
}
```

**Mistake 2: Forgetting that `??` doesn't trigger on other falsy values**
```javascript
// Wrong: expecting ?? to replace false
let active = false;
let status = active ?? "inactive";
console.log(status);  // false (not "inactive"!)

// Right: if you need to replace false, use ||
let status = active || "inactive";  // "inactive"
```

**Mistake 3: Not chaining ?? for multiple fallbacks**
```javascript
// Wrong: complex nested ternary
let val = config1 ? config1 : config2 ? config2 : config3;

// Right: chain ?? for clarity
let val = config1 ?? config2 ?? config3;
```

**Mistake 4: Confusing `??` with `?.` (optional chaining)**
```javascript
// Wrong: using ?? to navigate nested properties
let val = obj ?? obj.prop;  // Doesn't access nested safely

// Right: use ?. for optional chaining
let val = obj?.prop ?? "default";  // Safe navigation then default
```

---

## Interview-Ready Definitions

1. **Nullish Coalescing Operator (`??`)**: Returns the right operand when the left operand is null or undefined; otherwise, returns the left operand.

2. **Nullish Values**: Values that trigger the right operand of `??`: null and undefined (not 0, false, or "").

3. **Falsy vs Nullish**: Falsy includes 0, "", false, null, undefined, NaN. Nullish includes only null and undefined.

4. **Default Value Pattern**: Using `??` to provide a default when a value is missing (null/undefined), preserving other values.

5. **Operator Chaining**: Using multiple `??` in sequence to check multiple fallback values until finding one that's not nullish.

---

## Tricky Interview Questions

1. **What's the result of `let amul = null; let val = amul ?? "NANDANI Milk";`?**
   - Answer: val is "NANDANI Milk". null triggers the `??` operator, returning the right operand.

2. **What's the result of `let x = 0; let y = x ?? 10;`?**
   - Answer: y is 0. 0 is not null/undefined, so `??` returns 0, not 10.

3. **Difference between `count || 10` and `count ?? 10` if count is 0?**
   - Answer: `count || 10` returns 10 (0 is falsy). `count ?? 10` returns 0 (not nullish).

4. **What's the result of `let msg = ""; let text = msg ?? "default";`?**
   - Answer: text is "" (empty string). Empty string is not null/undefined, so `??` returns "".

5. **What's the result of `let x = undefined; let y = x ?? "default";`?**
   - Answer: y is "default". undefined triggers `??`, returning the right operand.

6. **Can you chain `??` operators?**
   - Answer: Yes: `a ?? b ?? c ?? d` checks each left-to-right until finding a non-nullish value.

7. **What's the result of `null ?? undefined ?? "fallback"`?**
   - Answer: "fallback". null and undefined are both nullish, so it continues to "fallback".

8. **Is `??` the same as `|| {} with guard`?**
   - Answer: No. `||` replaces all falsy values; `??` only replaces nullish (null/undefined).

9. **What's the result of `let x = false; let y = x ?? true;`?**
   - Answer: y is false. false is not null/undefined, so `??` returns false, not true.

10. **Can you use `??` with optional chaining `?.`?**
    - Answer: Yes: `obj?.prop ?? "default"` safely accesses the property and provides a default if undefined.

11. **What's the result of `(null ?? undefined) ?? "value"`?**
    - Answer: "value". (null ?? undefined) returns undefined (null is nullish), then undefined ?? "value" returns "value".

12. **Is `??` faster than `|| {}`?**
    - Answer: Negligible difference; both are fast. Choose based on semantics: `??` for nullish, `||` for falsy.

13. **What's the result of `let x = 0; let y = x || "zero"; let z = x ?? "zero";`?**
    - Answer: y is "zero" (0 is falsy), z is 0 (not nullish). Shows the semantic difference.

14. **Can `??` be used in object shorthand?**
    - Answer: Yes: `{ count: count ?? 0 }` provides a default count if null/undefined.

15. **What's the result of `NaN ?? 42`?**
    - Answer: NaN. NaN is not null/undefined (it's a number type), so `??` returns NaN, not 42.

---

## Deep Insights & Gotchas

- **`??` is safer than `||` for APIs**: When APIs return 0 or empty strings as valid data, `??` preserves them while `||` would replace with defaults.

- **Chaining `??` is clearer than nested ternaries**: `a ?? b ?? c` is more readable than `a ? a : b ? b : c`.

- **`??` doesn't trigger on falsy non-nullish values**: This is intentional; it prevents accidentally replacing valid 0, false, or "" with defaults.

---

## Summary

**Key Takeaway:** The nullish coalescing operator (`??`) provides a default value only when the left operand is null or undefined, preserving other falsy values like 0 or empty string—use `??` instead of `||` when valid values might be falsy.
