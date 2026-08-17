# 61_Do_while — The Do-While Loop

**File:** `09_chapter_Loops/61_Do_while.js`

## Overview

The `do...while` loop executes its body at least once before testing the condition, unlike while loops that check condition before first execution. This distinction is critical for scenarios where you must perform an operation before deciding whether to repeat it—like reading user input, attempting an operation, or generating initial data. Do-while loops are less common than for/while but essential for certain patterns like menu loops and guaranteed-execution scenarios.

---

## Main Concept

A `do...while` loop is a tail-tested loop: it runs the body first, then evaluates the condition. If true, it repeats; if false, it exits. This structure guarantees at least one execution regardless of initial condition state, making it ideal for scenarios where the initial operation is mandatory.

### Code Example

```javascript
// Basic do-while: executes at least once
let retry = 0;
do {
    console.log("Execute a Code!");
    console.log("RETRYing.......", retry);
    retry++;
} while (retry < 3);
// Outputs: "Execute a Code!", "RETRYing.......0", then 2 more times (0,1,2)

// Guaranteed execution: do-while runs even if condition is false initially
let value = 10;
do {
    console.log(value);  // RUNS ONCE even though 10 > 10 is false
    value++;
} while (value > 10);

// Menu loop: user must make a choice
let choice = "";
do {
    console.log("Choose: (A) Option A, (B) Option B, (C) Exit");
    // choice = getUserInput();  // Normally reads from user
    choice = "C";  // Simplified
} while (choice !== "C");

// Retry operation: must try at least once
let attempts = 0;
do {
    console.log(`Attempting operation (attempt ${attempts})`);
    // if (tryOperation()) { console.log("Success!"); break; }
    attempts++;
} while (attempts < 5);

// Data validation: must get valid input
let inputValid = false;
do {
    // const input = prompt("Enter a number:");
    // inputValid = !isNaN(input);  // Normally validates input
    inputValid = true;  // Simplified
} while (!inputValid);

// Compare: while vs do-while with impossible condition
console.log("While loop with false condition:");
let n = 10;
while (n > 20) {
    console.log(n);  // NEVER EXECUTES
}

console.log("Do-while with false condition:");
let m = 10;
do {
    console.log(m);  // EXECUTES ONCE despite false condition
} while (m > 20);
```

### Key Points

- **Body Executes First**: Loop body runs before condition is checked; guarantees at least one execution
- **Tail-Tested Loop**: Condition is evaluated after body, opposite of while (head-tested) and for loops
- **Semicolon Required**: `do { ... } while(condition);` requires semicolon after condition—easy to forget
- **Ideal for Menus**: Menu loops often use do-while because menu must display at least once before asking to exit
- **Validation Scenarios**: When initial operation is mandatory and repetition depends on result, do-while is natural

---

## Common Mistakes

- **Forgetting Semicolon**: `while(condition)` without semicolon causes SyntaxError; do-while requires terminal semicolon
- **Infinite Loop**: Easy to create infinite do-while if condition never becomes false; must ensure termination logic

---

## Definitions

- **Do-While Loop**: Loop structure that executes body at least once, then repeats based on condition
- **Tail-Tested Loop**: Loop that checks condition after body execution
- **Guaranteed Execution**: Loop body always runs minimum once, useful for mandatory operations
- **Termination Condition**: Boolean expression checked after each iteration to determine if loop repeats
- **Body-First Semantics**: Loop body code takes priority; condition determines repetition, not initial execution

---

## Tricky Questions & Answers

**Q1: What's the key difference between while and do-while?**
A: While checks condition first (may not run); do-while runs body first (always runs at least once). If condition is initially false, while skips entirely while do-while executes once.

**Q2: When would you use do-while instead of while?**
A: Use do-while when operation must execute at least once before evaluating repeat condition. Menu loops, initial attempt patterns, and data validation often use do-while.

**Q3: What's the output of this?**
```javascript
let x = 10;
do {
    console.log(x);
    x++;
} while (x > 20);
```
A: Outputs 10 once. Condition x>20 is false, but body runs first.

**Q4: What's the output of this while loop with same logic?**
```javascript
let x = 10;
while (x > 20) {
    console.log(x);
    x++;
}
```
A: Outputs nothing. While checks condition first; x>20 is false, so body never runs.

**Q5: Can do-while be converted to while?**
A: Yes, but requires duplicating body: `{ body; } while(condition) { body; }` awkward. Better to use do-while.

**Q6: Can while be converted to do-while?**
A: Yes: `do { body; } while(condition)` works if you want guaranteed execution, but changes logic if condition is initially false.

**Q7: What does a do-while loop with `while(true)` do?**
A: Infinite loop. Body executes indefinitely; requires explicit `break` to exit.

**Q8: Is the semicolon after `while(condition)` required?**
A: Yes. `do { ... } while(condition);` requires semicolon. Missing semicolon causes SyntaxError.

**Q9: What happens with this menu loop?**
```javascript
let choice = "";
do {
    console.log("Menu: (A)dd, (B)ack");
    // choice = readUserInput();
} while (choice !== "B");
```
A: Menu displays at least once, then loops until choice is "B". Do-while guarantees menu display even if condition is initially false.

**Q10: Can you use break in do-while?**
A: Yes. `break` exits the loop immediately; `continue` jumps to condition check.

**Q11: What's the output of this?**
```javascript
let i = 0;
do {
    if (i === 2) continue;
    console.log(i);
    i++;
} while (i < 5);
```
A: Outputs 0, 1, 3, 4 (skips 2). Continue jumps to condition check; increment still happens before next iteration.

**Q12: Why is do-while rarely used compared to for/while?**
A: Most iteration scenarios have known bounds (for loops) or check conditions before starting (while loops). Do-while's "run first, ask later" is less common but essential for specific patterns.

**Q13: How would you implement a game loop using do-while?**
A: 
```javascript
let gameRunning = true;
do {
    update();
    render();
    // gameRunning = checkWinCondition();  // Check if player won
} while (gameRunning);
```

**Q14: What distinguishes do-while from while at interview level?**
A: Understanding when guaranteed execution is needed (menu input, validation) shows thinking beyond just "loops iterate." It reveals whether candidate grasps condition timing's impact on problem solution.

**Q15: Can you nest do-while loops?**
A: Yes. Nested do-while loops work like any nested loops. `break` exits innermost loop only.

---

## Deep Insights

- **Retry with Guaranteed Attempt**: Do-while perfectly expresses "try operation, then check if retry needed." This mirrors real-world retry logic where you don't check feasibility before trying.

- **Semicolon Significance**: The required semicolon after `while(condition)` in do-while is syntactically necessary to distinguish it from a regular while statement. Forgetting it is a common bug in do-while code.

- **Tail-Tested Loop Rarity**: Do-while is tail-tested; while and for are head-tested. Most programming thinking defaults to head-testing (check before doing). Do-while requires perspective shift, which is why interview questions about do-while test deeper understanding.

---

## Summary

**Key Takeaway:** Do-while loops execute body at least once before testing condition, making them ideal for menu loops, mandatory initial attempts, and validation scenarios where the operation must happen before deciding to repeat.
