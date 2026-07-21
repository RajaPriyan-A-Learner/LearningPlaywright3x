# `prompt-sync` — Synchronous User Input in Node.js

## Overview

Covers `08_chapter_UserInputs/50_Prompt.js` — a third-party npm package (`prompt-sync`) that gives Node.js the same synchronous, "pause and wait for input" feel as browser `prompt()` ([[48_Browser_Prompt_Function_IQ]]), unlike the callback-based `readline` in [[49_Node_Readline_Input_IQ]].

---

## 1. Reference Code

```javascript
const prompt = require("prompt-sync")();
let num = Number(prompt("Enter a number: "));
if (num % 2 === 0) {
    console.log(num + " is Even");
} else {
    console.log(num + " is Odd");
}
```

---

## 2. Why This Needs a Package At All

Node.js has no built-in synchronous terminal-input function — `readline` is deliberately async because Node's I/O model is non-blocking by design. `prompt-sync` works around this using a native binding that genuinely blocks the JS thread until the user presses Enter, giving code the linear, top-to-bottom readability of browser `prompt()` without callbacks. The trade-off: it must be installed (`npm install prompt-sync`) and isn't part of core Node, so it adds a dependency other approaches ([[49_Node_Readline_Input_IQ]], [[51_Node_Fs_Stdin_Input_IQ]]) don't need.

---

## 3. Same Return-Type Rule as `prompt()`

`prompt(...)` from this package also always returns a **string**, exactly like the browser version — `Number(prompt(...))` is required for numeric comparisons to behave correctly, same reasoning as [[48_Browser_Prompt_Function_IQ]].

---

## Summary

**Key Takeaway:** `prompt-sync` trades a dependency for synchronous input in Node, avoiding the callback-based flow `readline` requires — useful for quick scripts/exercises where linear top-to-bottom code matters more than non-blocking I/O. It still returns a string, so numeric input still needs explicit `Number()` conversion.

**Related notes:** [[48_Browser_Prompt_Function_IQ]], [[49_Node_Readline_Input_IQ]], [[51_Node_Fs_Stdin_Input_IQ]]
