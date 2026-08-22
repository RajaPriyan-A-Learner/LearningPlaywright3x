# 156_IQ — Event Loop Execution Order: The A-B-D-C Puzzle

**File:** `18_chapter_Async_Await/156_IQ.js`

## Overview
This file is a classic interview question disguised as a simple program. It explores the **Event Loop execution order** — specifically, what happens when synchronous code, an async function, and a microtask (`await`) are mixed together. Understanding the output sequence is a definitive test of async mastery.

## Main Concept
JavaScript runs on a single-threaded event loop. Code runs in distinct "phases": the **synchronous (call stack)** phase runs first and to completion, then the **microtask queue** (which includes resolved Promise callbacks and `await` continuations) is drained, and only then does the **macro-task queue** run. An `await Promise.resolve()` does NOT block the main thread — it schedules the code *after* the `await` as a microtask, which runs after the current synchronous script finishes.

### Code Example

```javascript
console.log("A");           // 1. Sync: runs immediately

async function test() {
    console.log("B");       // 2. Sync: runs when test() is called
    await Promise.resolve(); // <-- Suspends here, schedules rest as a microtask
    console.log("C");       // 4. Microtask: runs AFTER all sync code is done
}

test();                     // Calls test(), "B" runs sync, then suspends at await

console.log("D");           // 3. Sync: runs because test() is now suspended

// Final Output Order: A → B → D → C
```

### Key Points
- **A** prints first because it is the first synchronous statement.
- **B** prints second because calling `test()` synchronously executes the function body up to the first `await`.
- **D** prints third because after `test()` suspends at `await`, control returns to the main script, which continues synchronously.
- **C** prints last because `await Promise.resolve()` schedules the continuation (`console.log("C")`) as a **microtask**, which only runs after the entire synchronous call stack is empty.

---

## Common Mistakes
- **Thinking the output is A → B → C → D:** This is the most common wrong answer. It incorrectly assumes `await` is a blocking call that makes JavaScript wait in place. It does NOT — it suspends the *async function*, not the whole program.
- **Thinking the output is A → D → B → C:** This is also wrong. The body of `test()` before the `await` keyword IS synchronous. It runs the moment `test()` is called.

---

## Summary
**Key Takeaway:** `await` does NOT freeze the program. It suspends the current `async` function, returns control to the caller, and schedules the code after the `await` as a microtask. The output `A → B → D → C` proves that JavaScript's event loop gives priority to the synchronous call stack first, then drains all microtasks, before doing anything else.
