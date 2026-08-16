# 77_Array_Checking — Array.isArray(), every(), some()

**Demonstrates:** checking array types and validating array elements with predicates.

## Array.isArray() — The Only Reliable Way

`typeof []` returns `"object"` (arrays are objects), not a distinct `"array"` type. Use `Array.isArray()`:

```javascript
console.log(Array.isArray([1, 2, 3]));  // true
console.log(Array.isArray("a"));        // false
console.log(typeof [1, 2, 3]);          // "object" — don't use typeof!
```

## every() — ALL Elements Must Pass

Returns `true` only if **every** element satisfies the predicate.

```javascript
console.log([80, 90, 85].every(s => s >= 70));  // true — all ≥ 70
console.log([80, 60, 85].every(s => s >= 70));  // false — 60 fails
```

## some() — AT LEAST ONE Must Pass

Returns `true` if **any** element satisfies the predicate.

```javascript
console.log([80, 60, 85].some(s => s < 70));  // true — 60 < 70
console.log([80, 90, 85].some(s => s < 70));  // false — none < 70
```

---

## ⚠️ ASI Gotcha: Missing Semicolon Before Bracket

Automatic Semicolon Insertion (ASI) can misparse a missing semicolon before `[`:

```javascript
console.log([80, 90, 85].every(s => s >= 70))  // ← missing semicolon
[80, 60, 85].some(s => s < 70);
```

Without the semicolon after `every(...)`, the parser treats `[80, 60, 85]` as an **index access** on the result of `.every()`, not a new statement — causing a `TypeError` instead of calling `some()`.

**Fix:** Always end statements containing these methods with `;`.

---

## Key Takeaway

Always use `Array.isArray()` to check for arrays. Use `every()` and `some()` for convenient predicate checks. Always terminate statements with semicolons to avoid ASI misinterpreting the next line's `[` as an index.
