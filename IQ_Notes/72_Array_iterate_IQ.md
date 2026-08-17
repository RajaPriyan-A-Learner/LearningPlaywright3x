# 72_Array_iterate — Arrays

**File:** ${jsFile.Name}

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

\\\javascript
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
\\\

### Key Points

- Point 1
- Point 2
- Point 3

---

## Common Mistakes

- Mistake 1
- Mistake 2

---

## Summary

**Key Takeaway:** Write the most important takeaway from this lesson in one sentence.
