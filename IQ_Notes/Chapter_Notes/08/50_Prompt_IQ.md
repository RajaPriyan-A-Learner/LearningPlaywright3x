# 50_Prompt — `prompt-sync` Module for Synchronous Input

**File:** `08_chapter_UserInputs/50_Prompt.js`

## Overview

Introduces the `prompt-sync` npm package, a third-party module that provides synchronous, blocking user input in Node.js environments. Unlike the built-in `readline` module which is asynchronous, `prompt-sync` mimics the browser's `prompt()` function by blocking execution until the user provides input. The API is simple: `require("prompt-sync")()` returns a function that can be called like `prompt("Enter text: ")`, returning a string immediately. While convenient for learning and simple scripts, `prompt-sync` is inappropriate for production servers because it blocks the Node.js event loop, preventing other operations from running during input.

---

## Main Concept

The `prompt-sync` package wraps Node.js's synchronous file descriptor I/O to provide a synchronous `prompt()` function that works similarly to the browser's `prompt()`. It blocks the entire process until input is received, then returns the input string immediately. This synchronous behavior contrasts sharply with `readline`, which is asynchronous and callback-based. The trade-off is simplicity (easier for beginners) versus performance (blocks other operations). Installation requires `npm install prompt-sync`, after which `const prompt = require("prompt-sync")()` initializes the function.

### Code Example

```javascript
const prompt = require("prompt-sync")();
let num = Number(prompt("Enter a number: "));
if (num % 2 === 0) {
    console.log(num + " is Even");
} else {
    console.log(num + " is Odd");
}
```

This snippet uses `prompt-sync` to collect input, convert it to a number, and check if it's even or odd. The key difference from browser `prompt()` is that this code runs in Node.js; from a user perspective, the behavior is nearly identical.

### Key Points

- **Synchronous and blocking:** Code execution pauses at the `prompt()` call and resumes only after the user provides input and presses Enter. This is simpler for beginners but blocks the entire process.
- **Returns a string immediately:** Unlike `readline`'s callback-based approach, `prompt-sync()` returns the input string directly, making it feel like browser `prompt()`.
- **Requires npm installation:** `npm install prompt-sync` must be run before use. This adds a dependency to a project, unlike built-in `readline`.
- **No `rl.close()` needed:** Unlike `readline`, `prompt-sync` does not require cleanup. There is no interface object to manage; the function is stateless between calls.
- **Blocks the event loop:** During input, the entire Node.js event loop is frozen. Timers, I/O operations, and other asynchronous tasks cannot run. This is why it is inappropriate for production servers.

---

## Common Mistakes

- **Using `prompt-sync` in production servers:** This is the most serious mistake. Blocking the event loop in a server means all users hang while one user is typing. A single slow user or unresponsive input can bring down the entire service.
- **Assuming `prompt-sync` is built-in:** Beginners sometimes try to use `prompt-sync` without installing it, forgetting that it's a third-party package. Always run `npm install prompt-sync` first.
- **Not handling the return value:** Because `prompt-sync` returns immediately, beginners sometimes forget that it's still a string. `let num = prompt("Enter: "); console.log(num + 5)` produces string concatenation, not addition. Always convert explicitly.

---

## Definitions

1. **Blocking I/O:** Operations that pause program execution until they complete. `prompt-sync` uses blocking I/O to read from stdin, freezing the entire process.

2. **Event Loop:** Node.js's mechanism for managing asynchronous operations. Tasks like timers, I/O, and callbacks are queued and processed. Blocking calls freeze the event loop, preventing other tasks from running.

3. **Synchronous Function:** A function that completes and returns immediately, blocking other code until it finishes. `prompt-sync()` is synchronous, unlike `readline` which is asynchronous.

4. **Third-party Module/Package:** Code published to npm and installed as a dependency. `prompt-sync` is a third-party module, as opposed to Node.js's built-in `readline`.

5. **REPL (Read-Eval-Print Loop):** An interactive environment where code is entered, executed, and results displayed. Node.js's built-in REPL is one environment where blocking input is acceptable.

---

## Tricky Interview Questions

**Q1: What is the main difference between `prompt-sync` and `readline`?**

A: `prompt-sync` is synchronous and returns input directly. `readline` is asynchronous and uses callbacks. `prompt-sync` blocks the entire Node.js event loop during input; `readline` does not. `prompt-sync` is simpler for beginners but inappropriate for production. `readline` is more complex but production-safe.

**Difficulty:** Easy

---

**Q2: What does `require("prompt-sync")()` return?**

A: A function. The first `require()` loads the module. The `()` at the end invokes the module's default export, which returns a function that can be called like `prompt()`. Example: `const prompt = require("prompt-sync")(); let name = prompt("Name: ");`

**Difficulty:** Easy

---

**Q3: Spot the bug:**

```javascript
const prompt = require("prompt-sync")();
let num = prompt("Enter: ");
console.log(num + 10);
```

A: If the user enters `5`, the output is `"510"` not `15`. `prompt-sync` returns a string. Fix: `let num = Number(prompt("Enter: ")); console.log(num + 10);`

**Difficulty:** Easy

---

**Q4: Why is `prompt-sync` not recommended for production Node.js servers?**

A: It blocks the entire event loop while waiting for input. In a server, if User A is slow to provide input via `prompt()`, all other users must wait because the server is frozen. A single unresponsive user can hang the entire application. This is why production servers use asynchronous I/O with `readline` or other async APIs.

**Difficulty:** Medium

---

**Q5: Can you use `prompt-sync` to read multiple lines of input?**

A: Yes, by calling `prompt()` multiple times. Example:

```javascript
const prompt = require("prompt-sync")();
let name = prompt("Name: ");
let age = prompt("Age: ");
let city = prompt("City: ");
console.log(`${name}, ${age}, ${city}`);
```

Each call blocks until the user provides input. This is simple but appropriate only for learning or lightweight scripts.

**Difficulty:** Easy

---

**Q6: How does `prompt-sync` interact with Node.js timers like `setTimeout`?**

A: Timers are blocked while `prompt-sync` is waiting for input. If a timer is scheduled to fire during input collection, it will not fire until the `prompt()` call returns. Example:

```javascript
setTimeout(() => console.log("Timer"), 1000);
prompt("Type slowly: "); // take more than 1 second
// Timer fires AFTER prompt returns, not after 1000ms
```

This demonstrates that blocking calls freeze the event loop entirely.

**Difficulty:** Hard

---

**Q7: Is `prompt-sync` the same as browser `prompt()`?**

A: The API is almost identical—both return a string and block execution. However, there are differences: (1) Browser `prompt()` returns `null` if the user cancels; `prompt-sync` returns an empty string or null depending on input method; (2) Browser `prompt()` displays a visual dialog; `prompt-sync` displays text in the terminal; (3) Different error handling and edge cases. For practical purposes, they are similar but not identical.

**Difficulty:** Medium

---

**Q8: Can you use `prompt-sync` with callback functions?**

A: No. `prompt-sync` is synchronous—it returns immediately with the input. There is no callback API. If you need callbacks, use `readline`. If you want to use `async/await`, wrap `prompt-sync` in a Promise (though this defeats its purpose of simplicity).

**Difficulty:** Medium

---

**Q9: What happens if the user presses Ctrl+C while `prompt-sync` is waiting for input?**

A: The process terminates. Ctrl+C sends a SIGINT signal to the Node.js process, which exits. The prompt does not capture Ctrl+C or handle it gracefully. If you need to handle interruption, use error handling or more sophisticated input libraries.

**Difficulty:** Medium

---

**Q10: How do you ensure `prompt-sync` is installed before your script runs?**

A: By adding `"prompt-sync"` to `package.json` in the `dependencies` section and running `npm install`. The script should then include `npm install` as a prerequisite. Alternatively, document the requirement in a README or installation guide.

**Difficulty:** Easy

---

**Q11: Compare `prompt-sync` for a CLI tool versus a web server. Which is appropriate?**

A: `prompt-sync` is appropriate for CLI tools because they run one user at a time and blocking is acceptable. A CLI that prompts the user is expected to wait. In a web server, every user would block the entire server while typing, making it completely inappropriate. For servers, use `readline` or other non-blocking I/O.

**Difficulty:** Hard

---

**Q12: If you want to validate input and re-prompt on invalid data using `prompt-sync`, how would you structure the code?**

A: Use a loop:

```javascript
const prompt = require("prompt-sync")();
let num;
while (true) {
    num = Number(prompt("Enter a number: "));
    if (!Number.isNaN(num) && num > 0) {
        break;
    }
    console.log("Invalid. Try again.");
}
console.log("You entered:", num);
```

The loop calls `prompt()` repeatedly until valid input is received.

**Difficulty:** Medium

---

**Q13: What are the performance implications of using `prompt-sync` in a tight loop?**

A: Each `prompt()` call blocks the entire process. In a loop that prompts 1000 times, the process is frozen for the entire duration. This is fine for interactive CLI scripts but terrible for any time-sensitive operations. For batch input processing, read from files or pipes instead.

**Difficulty:** Hard

---

**Q14: Is `prompt-sync` available for use in the Node.js REPL?**

A: Yes, though the REPL already has its own input mechanism. You could install and use `prompt-sync` within the REPL, but it's redundant. The REPL's native prompt (the `>` sign) is designed for interactive input.

**Difficulty:** Easy

---

**Q15: If you needed to migrate code from `prompt-sync` (synchronous) to `readline` (asynchronous), what are the key changes?**

A: (1) Wrap input collection in callbacks or async functions; (2) Move dependent code inside the callback; (3) Add `rl.close()` when done; (4) Handle the asynchronous nature explicitly. Example transformation:

```javascript
// prompt-sync version
const prompt = require("prompt-sync")();
let name = prompt("Name: ");
let age = Number(prompt("Age: "));
console.log(name, age);

// readline version
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Name: ", (name) => {
    rl.question("Age: ", (age) => {
        console.log(name, Number(age));
        rl.close();
    });
});
```

Modern alternative with `readline/promises`:

```javascript
const { createInterface } = require("readline/promises");
const rl = createInterface({ input: process.stdin, output: process.stdout });

(async () => {
    const name = await rl.question("Name: ");
    const age = await rl.question("Age: ");
    console.log(name, age);
    rl.close();
})();
```

**Difficulty:** Hard

---

## Deep Insights

1. **Blocking is appropriate in specific contexts:** For CLI tools and scripts that interact with one user at a time, blocking is acceptable and even preferable for simplicity. Understanding when blocking is appropriate versus when it's catastrophic is crucial for writing correct Node.js code.

2. **The event loop is Node.js's heart:** `prompt-sync` demonstrates this by freezing it. Beginners who only use blocking I/O never encounter the event loop; understanding async models requires experiencing what happens when blocking disrupts event processing.

3. **Third-party modules extend Node.js:** `prompt-sync` is a small example of how npm packages wrap or enhance Node.js's capabilities. This teaches the importance of understanding dependencies and their trade-offs.

4. **The learning path from simple to advanced:** `prompt-sync` → `readline` (callbacks) → `readline/promises` (async/await) represents the typical progression for Node.js learners. Each step introduces more powerful and complex concurrency models.

5. **Platform differences matter:** `prompt-sync` uses low-level I/O that behaves differently on Windows, macOS, and Linux. This is why platform-specific testing and understanding is important for production code.

---

## Summary

**Key Takeaway:** `prompt-sync` is a third-party npm package that provides synchronous, blocking user input in Node.js, mimicking browser `prompt()`. It returns input immediately as a string, making it simpler than `readline` for beginners. However, it blocks the entire event loop, making it inappropriate for production servers. Use `prompt-sync` for learning and simple CLI scripts; use `readline` or `readline/promises` for production code. Always convert input from string to the appropriate type.

