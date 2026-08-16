# 78_Copy — Shallow Copy vs. Reference (Deep Copy)

**Demonstrates:** the critical difference between copying an array and referencing it.

## Shallow Copy — Independent Array

A **shallow copy** creates a new array with the same elements, so mutating the copy doesn't affect the original.

### Multiple ways to shallow copy:

```javascript
let original = [1, 2, 3];

// Spread operator
let copy1 = [...original];

// slice() with no arguments
let copy2 = original.slice();

// Array.from()
let copy3 = Array.from(original);

// concat() with no arguments
let copy4 = original.concat();

// All are independent:
copy1.push(99);
console.log(original);  // [1, 2, 3] — unchanged
console.log(copy1);     // [1, 2, 3, 99]
```

## Reference (Deep Copy?) — NOT a Copy

⚠️ **Gotcha:** simple assignment **does not copy** — it creates another reference to the same array.

```javascript
let deep_copy_array = original;  // ← This is NOT a copy, it's a reference!

deep_copy_array.push(91);
console.log(original);           // [1, 2, 3, 91] — original ALSO changed!
console.log(deep_copy_array);    // [1, 2, 3, 91]
```

Both variables point to the same array in memory. Mutating through one mutates it for both.

---

## Shallow vs. Deep Copy

**Note:** These shallow-copy methods only copy the first level. If the array contains objects or nested arrays, the nested structures are still **references**:

```javascript
let arr = [{id: 1}, {id: 2}];
let copy = [...arr];  // shallow copy
copy[0].id = 999;
console.log(arr[0].id); // 999 — the shared object was mutated!
```

For deeply nested structures, you'd need recursive copying or `JSON.parse(JSON.stringify())` (with caveats).

---

## Key Takeaway

Assignment (`let b = a`) creates a reference; shallow-copy methods (`...`, `slice()`, `concat()`, `Array.from()`) create independent arrays. For arrays of primitives, shallow copy is usually sufficient.
