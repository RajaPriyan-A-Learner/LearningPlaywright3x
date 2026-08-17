# 35_Decrement — Post-Decrement and Pre-Decrement Operators

**File:** `05_chapter_Operator/35_Decrement.js`

## Overview

The decrement operator (--) reduces a variable's value by 1. Like increment, it has two forms: pre-decrement (--x, decrements then returns) and post-decrement (x--, returns then decrements). Understanding the distinction is critical for avoiding off-by-one bugs and subtle logic errors in loops and expressions.

---

## Main Concept

**Decrement (--) reduces value by 1.** Two variants:
- **Pre-decrement (--x):** Decrement first, return new value
- **Post-decrement (x--):** Return current value, then decrement

### Code Example

```javascript
// POST-DECREMENT: return current, then decrement
let a = 10;
let b = a--;
console.log(b);  // 10 (returned current value)
console.log(a);  // 9  (then decremented)

// PRE-DECREMENT: decrement first, return new
let c = 10;
let d = --c;
console.log(d);  // 9  (decremented then returned)
console.log(c);  // 9

// Loop iteration countdown
let count = 5;
while (count > 0) {
  console.log(count--);  // prints: 5, 4, 3, 2, 1
}
console.log(count);  // 0

// Pre-decrement in condition
let x = 5;
if (--x > 3) {
  console.log("x decremented to", x);  // "x decremented to 4"
}
```

### Key Points

- **Post-decrement (x--):** Returns value *before* decrementing. Useful when you need the original value.
  ```javascript
  let arr = [1, 2, 3];
  let i = arr.length;
  console.log(arr[i--]);  // arr[3] (undefined), then i becomes 2
  ```

- **Pre-decrement (--x):** Decrements *then* returns new value. Slightly more efficient (no temp value needed).
  ```javascript
  let i = 5;
  console.log(--i);  // 4 (decremented first)
  ```

- **Performance difference minimal:** Modern engines optimize both. Choose based on logic clarity, not speed.

- **Decrement works only on variables:** Cannot decrement literals or expressions.
  ```javascript
  let x = 10;
  --x;      // Valid
  --(10);   // SyntaxError
  let y = (z = 5); --y;  // Valid (y is variable)
  ```

---

## Common Mistakes

- **Mistake 1: Confusing return value in post-decrement**
  ```javascript
  // WRONG - expecting decremented value
  let a = 10;
  console.log(a--);  // Prints 10, not 9!
  
  // RIGHT - use pre-decrement if you need new value
  let a = 10;
  console.log(--a);  // Prints 9
  ```

- **Mistake 2: Off-by-one in array access with post-decrement**
  ```javascript
  // WRONG - accessing wrong index
  let arr = [1, 2, 3];
  let i = 3;
  console.log(arr[i--]);  // undefined (arr[3] doesn't exist), i becomes 2
  
  // RIGHT - use pre-decrement
  let arr = [1, 2, 3];
  let i = 3;
  console.log(arr[--i]);  // 3 (arr[2]), i becomes 2
  ```

- **Mistake 3: Double decrement in condition**
  ```javascript
  // WRONG - easy to miss extra decrement
  let x = 5;
  if (--x && --x > 1) {  // x decremented twice!
    console.log(x);  // 3, not 4
  }
  
  // RIGHT - decrement separately
  let x = 5;
  x--;
  if (x > 1 && x-- > 0) {  // clear intent
    console.log(x);
  }
  ```

- **Mistake 4: Assuming decrement works on expressions**
  ```javascript
  // WRONG - can't decrement result
  let x = 10;
  (x + 5)--;  // SyntaxError - result is not variable
  
  // RIGHT - decrement the variable
  let y = x + 5;
  y--;
  ```

---

## Interview-Ready Definitions

**Decrement operator (--):** Unary operator reducing variable by 1. Two forms: post-decrement (x--, returns before decrement) and pre-decrement (--x, returns after decrement).

**Post-decrement (x--):** Returns current value, decrements variable after. Useful when original value needed before modification.

**Pre-decrement (--x):** Decrements variable, returns new value. Slightly favored in loops where new value matters immediately.

**Lvalue:** Expression that can be assigned to (variable). Decrement requires lvalue—cannot decrement literals or expressions.

---

## Tricky Interview Questions

1. **What does this print?**
   ```javascript
   let a = 5;
   console.log(a--);
   console.log(a);
   ```
   - Answer: Prints 5, then 4. Post-decrement returns before decrementing.

2. **Difference between --x and x--?**
   - Answer: --x (pre) decrements then returns new value. x-- (post) returns old value then decrements. Both modify x identically, but return value differs.

3. **Why prefer pre-decrement?**
   - Answer: Slightly more efficient (no temp variable needed to hold old value). But modern engines optimize both—choose based on logic clarity.

4. **What's the output?**
   ```javascript
   let i = 3;
   let arr = [1, 2, 3];
   console.log(arr[i--]);
   console.log(i);
   ```
   - Answer: undefined, then 2. arr[3] doesn't exist (out of bounds), then i becomes 2.

5. **Can you decrement a literal?**
   ```javascript
   10--;  // Valid?
   ```
   - Answer: No, SyntaxError. Decrement needs lvalue (variable), not literal.

6. **What's the loop output?**
   ```javascript
   let x = 3;
   while (x--> 0) {
     console.log(x);
   }
   ```
   - Answer: Prints 2, 1, 0. x-- returns 3, 2, 1 (all > 0), condition false when x becomes -1.

7. **Pre vs post in condition—which executes first?**
   ```javascript
   let x = 5;
   if (--x > 3) { }
   ```
   - Answer: x decrements first (to 4), then compared (4 > 3 = true).

8. **Double decrement behavior?**
   ```javascript
   let a = 10;
   let b = a----a;  // Valid?
   ```
   - Answer: Valid but confusing. Parses as a-- (post-decrement) followed by -a (negation). b = 10 - 9 = 1.

9. **Decrement in array iteration?**
   ```javascript
   let arr = ['a', 'b', 'c'];
   for (let i = arr.length - 1; i >= 0; i--) {
     console.log(arr[i]);
   }
   ```
   - Answer: Prints 'c', 'b', 'a'. Counts down from last index to 0. i-- post-decrements.

10. **What's undefined behavior here?**
    ```javascript
    let x = 5;
    console.log(--x + x--);
    ```
    - Answer: 4 + 4 = 8. --x decrements to 4 (returns 4), x-- adds 4 (returns 4 before next decrement to 3). Subtly complex order-of-operations.

11. **When is decrement NOT applied?**
    ```javascript
    let obj = {count: 10};
    obj.count--;  // Works?
    ```
    - Answer: Yes, works. Decrements object property. Same as obj.count = obj.count - 1.

12. **Post-decrement in return?**
    ```javascript
    function getAndDecrement(x) {
      return x--;  // What gets returned?
    }
    let a = 5;
    console.log(getAndDecrement(a));  // What prints?
    ```
    - Answer: Prints 5. Post-decrement returns original value. Note: a is still 5 (parameter passed by value). Variables are passed by value in JavaScript.

13. **Decrement with type coercion?**
    ```javascript
    let s = "5";
    console.log(s--);
    console.log(typeof s);
    ```
    - Answer: Prints 5, then "number". Decrement coerces string to number, and stores as number. (Different from += which often stringifies.)

14. **Multiple derecrements in expression?**
    ```javascript
    let x = 10;
    console.log(x-- - --x);
    ```
    - Answer: 10 - 8 = 2. x-- returns 10 (x becomes 9), --x decrements to 8 (returns 8), subtract: 10 - 8 = 2.

15. **Decrement undefined or null?**
    ```javascript
    let x = undefined;
    console.log(x--);
    ```
    - Answer: NaN. Decrement coerces undefined to NaN, returns NaN, x becomes NaN.

---

## Deep Insights & Gotchas

- **Post-decrement returns before modification:** Creates temporary variable (internally). Minor performance cost, but negligible in practice.

- **Pre-decrement slightly more idiomatic in loops:** while (--count) reads as "decrement, then check". But post works fine too—choose by readability.

- **Type coercion on decrement:** Strings coerce to numbers. "5"-- becomes 4 (number). Booleans coerce too: true-- becomes 0 (number).

- **Decrement doesn't work on primitives in parameters:** function f(x) { x--; } doesn't modify caller's variable (passed by value).

- **Subtle with complex expressions:** x---- can parse as x -- (post-decrement), then - (negation/subtraction). Be careful with spacing in minified code.

---

## Summary

**Key Takeaway:** Decrement (--) comes in post (x--, return before decrementing) and pre (--x, return after) forms. Both modify variable identically, but differ in return value. Post useful when original value needed; pre slightly favored for loops (clarity). Avoid complex expressions with multiple decrements—use separate statements for readability.

