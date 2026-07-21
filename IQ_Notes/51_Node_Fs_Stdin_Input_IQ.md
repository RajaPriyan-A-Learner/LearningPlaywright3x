# `fs.readFileSync(0, "utf8")` — Reading Raw stdin Synchronously

## Overview

Covers `08_chapter_UserInputs/51_Fs.js` — the lowest-level of the four input approaches in this chapter, using Node's `fs` module to read file descriptor `0` (stdin) directly, blocking until EOF rather than until Enter.

---

## 1. Reference Code

```javascript
console.log("Enter the number!");
const data = require('fs').readFileSync(0, 'utf8');
console.log("Hi", data);

// In the terminal:
// Type 15
// Press Enter
// Press Ctrl+D
```

---

## 2. `0` Is a File Descriptor, Not a Filename

`fs.readFileSync` normally takes a file path. Passing the integer `0` instead tells it to read from file descriptor 0, which every process inherits as **standard input** — so this reads whatever is piped or typed into the terminal, treating the terminal exactly like a file. This works because Unix-style file descriptors (0 = stdin, 1 = stdout, 2 = stderr) are a POSIX convention Node exposes directly, not a JS language feature.

---

## 3. It Blocks Until EOF, Not Until Enter

Unlike `readline` (resolves on Enter/newline) or `prompt-sync` (same), `readFileSync(0, ...)` keeps reading until it hits an **end-of-file** signal, not a newline. In an interactive terminal that means: type the value, press Enter, then send EOF manually (`Ctrl+D` on macOS/Linux, `Ctrl+Z` then Enter on Windows) before the call returns. For non-interactive/scripted use, EOF is sent automatically once a piped stream is exhausted:

```bash
printf '15\n' | node 51_Fs.js
```

This makes it well suited for scripting/CI pipelines (no manual EOF needed) but awkward for a human typing directly into the terminal, unlike the other three approaches in this chapter.

---

## Summary

**Key Takeaway:** `fs.readFileSync(0, "utf8")` reads stdin as if it were a file, blocking until EOF (not until Enter) — great for piped/non-interactive input, but requires an explicit `Ctrl+D`/`Ctrl+Z` when a human is typing directly into the terminal.

**Related notes:** [[48_Browser_Prompt_Function_IQ]], [[49_Node_Readline_Input_IQ]], [[50_Node_Prompt_Sync_Input_IQ]]
