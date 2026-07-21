# Compilation vs Interpretation vs JIT

## Breakdown Table

| | Compilation | Interpretation | JIT (Just-In-Time) |
|---|---|---|---|
| When translation happens | Ahead of time, before running | Line-by-line, while running | At runtime, but compiles hot code as it runs |
| Output | Standalone binary/machine code | Nothing saved — re-translated every run | Machine code cached in memory for reuse |
| Startup speed | Slow to compile, instant to run after | Instant to start, slower to execute | Fast start (interpreted first), speeds up over time |
| Runtime speed | Fastest (already machine code) | Slowest (re-parses/re-checks each run) | Starts slow, reaches near-compiled speed for hot paths |
| Needs the toolchain at runtime? | No — just run the binary | Yes — needs the interpreter present | Yes — needs the VM/engine present |
| Example | C, C++, Rust (`gcc`, `rustc`) | Classic Python (CPython bytecode loop), shell scripts | JavaScript (V8), Java (JVM), Python (PyPy) |

## Example Walkthrough

**File:** `add.js`
```javascript
function add(a, b) {
  return a + b;
}
for (let i = 0; i < 100000; i++) {
  add(i, i + 1);
}
```

1. **Pure compilation (contrast, using C):**
   ```c
   int add(int a, int b) { return a + b; }
   ```
   `gcc add.c -o add` translates the whole program to machine code *once*, before it ever runs. Running `./add` afterward does zero translation work — see [[Source_Code_ByteCODE_Binary_IQ]] for what that binary looks like.

2. **Pure interpretation:** an interpreter would read `add(a, b)` on every single one of the 100,000 loop iterations, re-parsing the same line and re-deciding what `+` means for the given types each time. Correct, but wasteful when the same function runs thousands of times.

3. **JIT (what V8 actually does with `add.js`):**
   - First few calls to `add()`: V8's interpreter (Ignition) runs the bytecode directly — no shortcuts yet.
   - V8 notices `add()` is called in a hot loop (100,000 times) with the same argument types (numbers).
   - V8's optimizing compiler (TurboFan) compiles `add()` into actual machine code specialized for "adding two numbers," and swaps it in mid-execution.
   - Remaining loop iterations call the fast machine code instead of going through the interpreter.
   - If `add()` were later called with unexpected types (e.g., strings), V8 "deoptimizes" back to the interpreter to stay correct.

## Pipeline Diagram

```
COMPILATION (C)
 source (add.c) → compile once → binary (add.exe) → CPU runs it directly
                  [slow, one-time]                    [fast, every run]

INTERPRETATION (naive)
 source → interpreter reads + executes line-by-line, every single run
          [simple, but repeats translation work forever]

JIT (JavaScript / V8)
 source (add.js)
      │ parse + compile
      ▼
 bytecode (Ignition) ──── interpret ────► runs, but slow on hot loops
      │
      │ profiler flags "add() is hot + types are stable"
      ▼
 TurboFan compiles add() → machine code
      │
      ▼
 CPU runs optimized machine code directly ────► fast for remaining iterations
      │
      │ (if types change unexpectedly)
      ▼
 deoptimize back to bytecode ────► stays correct, loses speed
```

## TL;DR

- **Compilation**: translate everything up front → fastest to run, slowest to start, output is locked to one CPU architecture.
- **Interpretation**: translate on the fly, every time → fastest to start, slowest to run, most flexible/portable.
- **JIT**: start as an interpreter, then compile only the "hot" code paths to machine code mid-run → best of both, which is why modern JS (V8), Java (JVM), and PyPy all use it instead of pure interpretation.
