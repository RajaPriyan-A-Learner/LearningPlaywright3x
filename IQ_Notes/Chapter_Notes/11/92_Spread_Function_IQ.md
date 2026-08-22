# 92_Spread_Function — Spread Operator in Functions

**File:** `11_chapter_Function/92_Spread_Function.js`

## Overview
This file demonstrates the usage of the spread operator (`...`) when passing arguments to a function, allowing an iterable (like an array) to be expanded into individual arguments.

## Main Concept
The spread operator allows you to unpack elements from an array directly into function arguments. It is incredibly useful when a function accepts multiple discrete parameters, but your data is stored in an array.

### Code Example

```javascript
function add(a, b, c) {
    return a + b + c;
}
let num = [1, 2, 3, 5];
// The spread operator unpacks the first 3 elements into a, b, c
console.log(add(...num)); 

function hasError(...codes) {
    return codes.some(c => c >= 400);
}
let responseCodes = [200, 201, 404];
hasError(...responseCodes);
```

### Key Points
- In the `add` function call, `...num` expands to `1, 2, 3`. The fourth element `5` is ignored since `add` only takes 3 parameters.
- When used in the function signature `hasError(...codes)`, it's called the **Rest Parameter**, which collects multiple arguments into an array.

---

## Common Mistakes
- **Passing an array directly without spread:** Calling `add(num)` would assign the whole array to `a`, leaving `b` and `c` as `undefined`, resulting in incorrect string concatenation or `NaN`.
- **Mixing up Spread and Rest:** Spread *unpacks* an array into arguments during a function call. Rest *packs* arguments into an array in a function definition.

---

## Summary
**Key Takeaway:** The spread operator (`...`) elegantly unpacks array elements into distinct function arguments, bridging the gap between array data and multi-parameter functions.
