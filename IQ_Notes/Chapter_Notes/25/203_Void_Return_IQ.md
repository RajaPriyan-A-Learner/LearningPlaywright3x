# 203 — Void Return in Logging and Action Helpers

**File:** `25_chapter_TypeScript/203.ts`

## Overview
This file reinforces the **`void` Return Type** in TypeScript through an isolated logging helper: `function sayHello(msg: string): void`. It highlights best practices for typing side-effect-only procedures, distinguishing `void` from value-returning functions.

---

## Main Concept

A function that executes an operation (such as logging, sending an event, or modifying external state) without computing a return value should be explicitly annotated with `: void`.

### Why Explicit `: void` Matters
While TypeScript can infer `: void`, explicitly writing it:
1. **Communicates Architectural Intent:** Any developer reading the signature knows immediately that the function performs an action rather than a computation.
2. **Prevents Unintended Returns:** If someone later adds `return msg;` to the function body, TypeScript immediately flags a compiler error because returning a value violates the `: void` declaration.

### Code Example

```typescript
function sayHello(msg: string): void {
    console.log(msg);
}

sayHello("Test execution started");

// ❌ TypeScript enforces that void results are not captured:
// const data: string = sayHello("ping"); 
// Error: Type 'void' is not assignable to type 'string'
```

### Key Points
- **Action Procedures:** Test framework actions such as clicking buttons, clearing cookies, or writing logs naturally return `void` (or `Promise<void>`).
- **Void in Callbacks:** A callback typed as `() => void` can actually return a value, but TypeScript tells the caller to ignore that value, avoiding type errors when passing functions that happen to return things.
- **Underlying Value:** At JavaScript runtime, the function returns `undefined`.

---

## Common Mistakes
- **Confusing `void` and `never`:** `void` completes normally but returns nothing; `never` never completes at all (e.g., infinite loop or throws exception).
- **Trying to return a value from a `void` function:** Writing `return 42;` in a function annotated with `: void` is a compiler error.

---

## Summary
**Key Takeaway:** The `: void` annotation designates functions dedicated purely to side-effects and actions, safeguarding code from unintentional value returns.
