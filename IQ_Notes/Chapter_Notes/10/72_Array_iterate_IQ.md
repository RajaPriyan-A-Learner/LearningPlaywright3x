# Array Iterate — for, for...of, forEach, entries(), for...in

## Overview

Covers `10_chapter_Arrays/72_Array_iterate.js` — comprehensive comparison of five ways to iterate over an array: classic `for` loop, `for...of`, `forEach`, `entries()`, and `for...in`. Includes an important gotcha: `for...in` on an array gives indexes (as strings), not values.

---

## 1. Reference Code

```javascript
let tests = ["login", "checkout", "search"];

for (let i = 0; i < tests.length; i++) {
    console.log(i, tests[i]);
}

console.log("----");

// for...of (cleanest for values)
for (let test of tests) {
    console.log(test) // value
}
console.log("----");

// forEach (no return value)
tests.forEach((test, index) => {
    console.log(`${index}: ${test}`);
});

// entries() — index + value
for (let [i, test] of tests.entries()) {
    console.log(i, test);
}

console.log("----");

let students = ["methis", "senthil", "ajay", "rahul"];

for (let student in students) {
    console.log(student, " -> ", students[student]); // index = in
}
```

---

## 2. Output

```
0 login
1 checkout
2 search
----
login
checkout
search
----
0: login
1: checkout
2: search
0 login
1 checkout
2 search
----
0  ->  methis
1  ->  senthil
2  ->  ajay
3  ->  rahul
```

---

## 3. Iteration Method Comparison

| Method | Gives you | Use when |
|--------|-----------|---------|
| `for (i=0; ...)` | Index + value (`arr[i]`) | Need index, or may `break`/`continue` |
| `for...of` | Value only | Just need values, cleanest syntax |
| `forEach(cb)` | Value + index (via callback) | Functional style; **cannot** use `break` |
| `for...of entries()` | Index + value (destructured) | Need both, prefer modern syntax |
| `for...in` | Keys (string indexes!) | ⚠️ Avoid on arrays — designed for objects |

---

## 4. The `for...in` Gotcha

`for...in` iterates over **enumerable property keys** — for arrays these are string indexes (`"0"`, `"1"`, `"2"`), not numbers. In the code, `student` holds `"0"`, `"1"`, etc. (string) — then `students[student]` works because JS coerces the string key. But:
- If the array has extra properties added (rare but possible), `for...in` will iterate those too.
- **Use `for...of` or `forEach` for arrays; reserve `for...in` for plain objects.**

---

## 5. `forEach` Cannot Break

```javascript
tests.forEach(t => {
    if (t === "checkout") break; // ❌ SyntaxError — can't break in forEach
});
```

Use a `for` or `for...of` loop when you need early exit.

---

## Summary

**Key Takeaway:** Prefer `for...of` for clean value iteration and `for...of entries()` when you also need the index. Never use `for...in` on arrays — it yields string keys, not numeric indexes. `forEach` is convenient but doesn't support `break`.

**Related notes:** [[63_Nested_For_Loops_IQ]], [[69_Array_REAL_IQ]], [[71_IQ_IQ]]
