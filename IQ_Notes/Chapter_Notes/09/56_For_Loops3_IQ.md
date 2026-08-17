# 56_For_Loops3 — Loops with Conditionals

**File:** `09_chapter_Loops/56_For_Loops3.js`

## Overview

For loops frequently contain conditional logic inside the loop body to process iterations differently based on the current value. This pattern—iterating through a range while applying conditional checks—is ubiquitous in real-world code for filtering, selective processing, and business logic. Understanding how conditionals interact with loops is essential for algorithms, data transformation, and interview problem-solving.

---

## Main Concept

Loops provide repetition; conditionals within loops add decision logic. By combining `for` loops with `if` statements, you selectively execute code for certain iterations. This pattern enables filtering (process only matching elements), transformation (apply different operations based on value), and conditional exits (break early when a condition is met).

### Code Example

```javascript
// Loop with simple conditional
for (let somya = 0; somya < 18; somya++) {
    if (somya > 15) {
        console.log("Gift from papa, iphone this year")
    } else {
        console.log("No Gift, iphone only barbie doll")
    }
}

// Filtering: process only matching elements
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        console.log(`Even: ${i}`);  // Only print even numbers
    }
}

// Early exit: break when condition met
for (let i = 0; i < 100; i++) {
    if (i > 20) {
        console.log("Reached target, stopping early");
        break;  // Exit loop before reaching 100
    }
}

// Skip iteration: continue to next
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        continue;  // Skip i=5, go to next iteration
    }
    console.log(i);  // Prints 0,1,2,3,4,6,7,8,9 (skips 5)
}

// Nested conditionals
for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
```

### Key Points

- **Conditional Inside Loops**: `if` statements modify loop behavior iteration-by-iteration without changing loop structure itself
- **Break Statement**: Exits the entire loop immediately, useful for early termination when a condition is found
- **Continue Statement**: Skips the rest of current iteration and jumps to the next, useful for filtering
- **Nested Conditionals**: Multiple conditions can stack to handle complex logic (classic FizzBuzz pattern)
- **Performance Consideration**: Avoid expensive conditionals inside tight loops; move checks to loop condition when possible

---

## Common Mistakes

- **Using break/continue incorrectly**: `break` exits entire loop; `continue` skips to next iteration—confusing these causes logic errors
- **Overly complex conditionals**: Deeply nested `if-else` inside loops becomes hard to debug; consider extracting to functions or using switch statements

---

## Definitions

- **Loop Body**: Code executed each iteration, can contain multiple statements and conditionals
- **Break Statement**: Keyword that immediately exits the innermost loop, skipping remaining iterations
- **Continue Statement**: Keyword that skips remaining statements in current iteration and jumps to next iteration
- **Conditional Logic**: `if`, `else if`, `else` statements that execute different code based on boolean conditions
- **Selective Processing**: Applying operations only to iterations meeting specific criteria

---

## Tricky Questions & Answers

**Q1: What's the difference between `break` and `continue` in a loop?**
A: `break` exits the entire loop, stopping all iterations. `continue` skips the rest of the current iteration and moves to the next. Example: `for(i=0;i<10;i++) { if(i===5) break; }` stops at 5. `if(i===5) continue;` skips 5 and continues with 6.

**Q2: What does this loop output?**
```javascript
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i);
}
```
A: Outputs 0, 1, 3, 4 (skips 2).

**Q3: What does this loop output?**
```javascript
for (let i = 0; i < 5; i++) {
    if (i === 2) break;
    console.log(i);
}
```
A: Outputs 0, 1 (stops when i reaches 2, never prints 2, 3, 4).

**Q4: Can you use `break` or `continue` outside a loop?**
A: No. SyntaxError: `break`/`continue` statement not within an iteration statement or switch. These keywords have no meaning outside loops.

**Q5: What happens with nested loops and `break`?**
A: `break` exits only the innermost loop, not all nested loops. To exit multiple levels, use labeled breaks or restructure code.

**Q6: How would you exit multiple nested loops?**
A: Use labeled breaks: 
```javascript
outerLoop:
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if (someCondition) break outerLoop;  // Exits both loops
    }
}
```

**Q7: Is `continue` the same as skipping to the next iteration?**
A: Yes. `continue` causes the loop to skip remaining code in current iteration and jump to the next. The loop increment (i++) still happens before condition check.

**Q8: What does this output?**
```javascript
for (let i = 0; i < 3; i++) {
    if (true) continue;
    console.log(i);
}
```
A: Outputs nothing. Every iteration hits `continue`, skipping the console.log. Loop runs 3 times but prints nothing.

**Q9: Can you have multiple conditions controlling a single loop?**
A: Yes. Nest multiple `if` statements or use logical operators: `if(i > 5 && i < 10)` combines conditions. Multiple conditions inside single loop are valid.

**Q10: What's the performance impact of conditionals inside loops?**
A: Every conditional check adds CPU cycles. For tight loops (millions of iterations), conditional overhead matters. For typical loops (10-1000 iterations), negligible. Avoid expensive operations inside loop conditions.

**Q11: How would you print only prime numbers from 1 to 20?**
A: 
```javascript
for (let i = 2; i <= 20; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
        if (i % j === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) console.log(i);
}
```
Nested loop checks divisibility; prints primes only.

**Q12: What's the difference between `if (condition) break;` inside a loop and `while (!condition)`?**
A: The break version loops a fixed number of times then stops if condition met. The while version stops immediately when condition changes. Structure depends on whether you have fixed iterations or dynamic stopping.

**Q13: Can you use `else` after a `continue`?**
A: No. `continue` jumps to next iteration, so code after it doesn't execute. This is valid but pointless: `if(i===5) continue; else { ...}` because the else block never runs—the if causes a jump.

**Q14: What does `if (!condition) continue;` do?**
A: Skips the rest of the iteration if condition is false. Equivalent to wrapping loop body in `if(condition) { ... }`. It's a way to invert conditional logic.

**Q15: Why would you use a conditional inside a loop instead of adjusting the loop condition itself?**
A: Sometimes loop bounds are fixed (iterate all elements) but selective processing depends on values (process only evens). Other times, you need side effects for all iterations (count all) but output selectively. Conditionals inside provide flexibility the loop condition alone can't express.

---

## Deep Insights

- **Loop Control Flow Complexity**: Excessive `break`/`continue` inside nested loops creates spaghetti-like control flow that's hard to reason about. Refactoring into helper functions or using functional approaches (filter/map) often improves readability.

- **Labeled Break Scope**: Modern JavaScript supports labeled breaks for multi-level loop exits, but this is rarely used because it hurts readability. Better practice is restructuring loops into functions or using array methods that avoid deep nesting.

- **Compiler Optimization and Predictability**: Simple, uniform loops without conditionals optimize better via loop unrolling and JIT compilation. Loops with many conditionals prevent optimization because the engine can't predict the execution path. Knowing this helps write performance-conscious code.

---

## Summary

**Key Takeaway:** Combining conditionals with loops enables selective processing, filtering, and early termination, but excessive complexity inside loops reduces readability—balance control flow with code clarity by extracting complex logic into helper functions.
