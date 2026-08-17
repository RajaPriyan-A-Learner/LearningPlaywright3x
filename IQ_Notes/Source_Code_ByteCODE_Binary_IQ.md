# Source Code vs Bytecode vs Binary Code

## Breakdown Table

| | Source Code | Bytecode | Binary Code |
|---|---|---|---|
| Readable by humans? | Yes | No (semi-structured) | No |
| Runs on | Nothing directly (needs compiler/interpreter) | A VM/interpreter | CPU directly |
| Portable? | Yes (as text) | Yes (same bytecode, any OS with the matching VM) | No (tied to CPU architecture) |
| Example file | `.js`, `.c`, `.py` | `.class` (Java), V8 internal bytecode | `.exe`, `.out`, `.bin` |
| Produced by | You, the programmer | A compiler front-end | A compiler back-end / JIT |
| Executed by | N/A | VM (JVM, V8's Ignition, CPython's ceval) | CPU |

## Example Walkthrough

**File:** `hello.js`
```javascript
console.log("Hello World");
```

1. **Source code** — the text above. Human-readable, edited in a text editor, means nothing to the CPU on its own.

2. **Bytecode** — V8 (Chrome/Node's JS engine) parses the file and compiles it into intermediate instructions for its internal VM (Ignition):
   ```
   LdaConstant [0]      // load "Hello World" string
   Star r0
   LdaGlobal [console]
   CallProperty [log], r0
   ```
   You never write this — it's generated invisibly when the file runs. It's portable: the same bytecode format works on any machine running V8, regardless of CPU.

3. **Binary code** — for a compiled language like C, the equivalent step produces raw machine instructions tied to one CPU architecture:
   ```c
   #include <stdio.h>
   int main() { printf("Hello World"); return 0; }
   ```
   `gcc hello.c -o hello` → opened in a hex editor:
   ```
   4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 ...
   ```
   This runs directly on the CPU — no interpreter needed.

   JS blurs this line: V8 also compiles "hot" bytecode paths into real machine code at runtime (via TurboFan) for speed — see [[Compilation_vs_Interpretation_vs_JIT_IQ]].

## Pipeline Diagram

```
 hello.js (source code)
      │
      │  parse + compile
      ▼
 V8 bytecode (Ignition)
      │
      │  interpret directly ──────────► output: "Hello World"
      │
      │  OR: hot path detected
      ▼
 machine code (TurboFan JIT)
      │
      ▼
 CPU executes directly ─────────────► output: "Hello World"
```

```
 hello.c (source code)
      │
      │  gcc compile (front-end + back-end)
      ▼
 binary / machine code (hello.exe)
      │
      ▼
 CPU executes directly ─────────────► output: "Hello World"
```

## TL;DR

- **Source code** = what you write, human-readable, useless to a CPU alone.
- **Bytecode** = an in-between format a VM interprets; portable across CPUs, not portable across VMs.
- **Binary code** = raw CPU instructions, fastest, but locked to one architecture.
- JavaScript passes through all three: source → bytecode (Ignition) → machine code (TurboFan) for hot paths — automatically, with no manual compile step from you.
