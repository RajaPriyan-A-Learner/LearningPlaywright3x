# Node.js `readline` — Asynchronous User Input

## Overview

Covers `08_chapter_UserInputs/49_Node_UI.js` — the built-in, callback-based way to read a line of input from the terminal in Node.js. Unlike browser `prompt()` ([[48_Browser_Prompt_Function_IQ]]), this is **asynchronous**.

---

## 1. Reference Code

```javascript
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a number: ", (input) => {
    let num = Number(input);

    if (num % 2 === 0) {
        console.log(num + " is Even");
    } else {
        console.log(num + " is Odd");
    }

    rl.close();
});
```

---

## 2. `rl.question()` Is Callback-Based, Not Blocking

`rl.question()` does not pause execution and hand back a value the way `prompt()` does — it registers a callback that Node's event loop invokes once the user presses Enter. Any code written *after* `rl.question(...)` (outside the callback) runs immediately, **before** the user has typed anything — a classic async-ordering trap if you're used to `prompt()`'s synchronous feel.

---

## 3. Forgetting `rl.close()` Leaves the Process Hanging

`readline.createInterface({ input: process.stdin, ... })` attaches a listener to stdin, which keeps Node's event loop alive indefinitely (Node won't exit while there's an active listener on an open stream). Calling `rl.close()` inside the callback — as this file does — releases that listener so the process can exit naturally after the answer is processed. Omitting it is a common bug: the script "hangs" after printing output, never returning control to the terminal.

---

## Summary

**Key Takeaway:** `readline.question()` is asynchronous (callback-based), not blocking — code after the call runs before user input arrives — and the interface **must** be closed with `rl.close()` or the Node process never exits on its own.

**Related notes:** [[48_Browser_Prompt_Function_IQ]], [[50_Node_Prompt_Sync_Input_IQ]], [[51_Node_Fs_Stdin_Input_IQ]]
