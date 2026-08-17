# Combining Multiple Increments in One Expression

## Overview

Covers `05_chapter_Operator/34_Incre_Part2.js` — a set of classic "trace the output" interview questions mixing prefix (`++a`) and postfix (`a++`) increment multiple times in a single expression. Three of the four examples in the file are commented out (left as exercises); this note works through all of them using the same left-to-right, immediate-side-effect rule from [[33_Advanced_Increment_Expression_IQ]].

---

## 1. Reference Code

```javascript
// let a = 10;
// console.log(++a + a + a++);
// console.log(a);

// let i = 1;
// let result = i++ + ++i;
// console.log(result, i);

// let a = 10;
// console.log(++a + ++a);
// console.log(a);

let a = 34;
let result = a++;
console.log(result); // 34
console.log(a);      // 35
```

---

## 2. The Live Example — `a++` Postfix, Simple Case

```javascript
let a = 34;
let result = a++; // result gets the OLD value (34); a becomes 35 afterward
console.log(result); // 34
console.log(a);      // 35
```

Same rule as [[32_Increment_Decrement_Operators_IQ]]: postfix returns the value *before* incrementing.

---

## 3. Worked Solutions for the Commented-Out Examples

### 3.1 `++a + a + a++` (starting `a = 10`)

Evaluate left to right, applying each operator's side effect the instant it's evaluated:

| Step | Operand | Side effect | Value used |
|---|---|---|---|
| 1 | `++a` | `a` becomes 11 | `11` |
| 2 | `a` | (read only) | `11` (already updated) |
| 3 | `a++` | `a` becomes 12 (after being read) | `11` (old value used) |

```
Sum = 11 + 11 + 11 = 33
Final a = 12
```

```javascript
let a = 10;
console.log(++a + a + a++); // 33
console.log(a);              // 12
```

### 3.2 `i++ + ++i` (starting `i = 1`)

| Step | Operand | Side effect | Value used |
|---|---|---|---|
| 1 | `i++` | `i` becomes 2 (after read) | `1` (old value) |
| 2 | `++i` | `i` becomes 3 (before read) | `3` (new value) |

```
result = 1 + 3 = 4
Final i = 3
```

```javascript
let i = 1;
let result = i++ + ++i;
console.log(result, i); // 4 3
```

### 3.3 `++a + ++a` (starting `a = 10`)

| Step | Operand | Side effect | Value used |
|---|---|---|---|
| 1 | `++a` | `a` becomes 11 | `11` |
| 2 | `++a` | `a` becomes 12 | `12` |

```
Sum = 11 + 12 = 23
Final a = 12
```

```javascript
let a = 10;
console.log(++a + ++a); // 23
console.log(a);          // 12
```

---

## 4. General Rule

For any expression chaining multiple `++`/`--` operators (prefix or postfix) on the *same* variable:

1. Evaluate operands **strictly left to right**.
2. Each `++x`/`--x` (prefix) mutates `x` **immediately**, and the operand's value is the **new** value.
3. Each `x++`/`x--` (postfix) captures the **current** value for the operand first, *then* mutates `x` — but that mutation is still visible to any operand evaluated *after* it.
4. Every subsequent read of the variable in the same expression sees whatever the variable currently holds at that point — not the value from the start of the statement.

**In real code, never write expressions like these** — this is purely an interview/trivia pattern. Mutating the same variable multiple times within one expression is a well-known readability and maintainability anti-pattern; production code should never rely on evaluation order this subtle.

---

## Summary

**Key Takeaway:** Chained increment/decrement operators on the same variable execute strictly left to right, with each side effect visible to every later operand in that expression — this produces results that are easy to get wrong by mental math but are fully deterministic once you trace step by step. Added to [[JavaScript_Quirks_and_Known_Bugs_IQ]] as a distinct entry from the single-increment case.

**Related notes:** [[32_Increment_Decrement_Operators_IQ]], [[33_Advanced_Increment_Expression_IQ]], [[JavaScript_Quirks_and_Known_Bugs_IQ]]
