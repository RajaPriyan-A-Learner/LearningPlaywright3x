# 193 — Function Type Annotations and Return Types

**File:** `24_chapter_OOPS_Interview/193.ts`

## Overview
This file introduces **Type Annotations** in TypeScript for function parameters and return types. It showcases static type safety applied to test automation utility helpers, including string endpoint builders, HTTP status code validation returning booleans, and step logger utilities returning `void`.

---

## Main Concept

In JavaScript, functions accept any argument type and return any value dynamically. TypeScript introduces explicit type contracts at compile time, guaranteeing that functions receive expected arguments and produce verified return types.

### Key Function Signatures
- `buildEndpoint(base: string, path: string): string`: Enforces two string inputs and guarantees a concatenated string output.
- `isSuccessCode(code: number): boolean`: Restricts input to numbers and returns a boolean indicating whether the status code falls in the `[200, 300)` range.
- `logTestStep(step: string): void`: Explicitly marks that the function executes side-effects (console logging) without returning any meaningful value.

### Code Example

```typescript
function buildEndpoint(base: string, path: string): string {
    return base + path;
}

function isSuccessCode(code: number): boolean {
    return code >= 200 && code < 300;
}

function logTestStep(step: string): void {
    console.log("[STEP] " + step);
}

console.log(buildEndpoint("https://api.com", "/users"));
console.log("200 is success:", isSuccessCode(200));
console.log("404 is success:", isSuccessCode(404));
logTestStep("Navigate to login page");
```

### Key Points
- **Compile-Time Verification:** Passing an incompatible argument (e.g., `isSuccessCode("200")`) triggers an immediate compiler diagnostic before code execution.
- **`void` Return:** Signifies that the caller should not expect or consume a returned value.
- **Self-Documenting Code:** Explicit parameter and return types serve as live documentation within IDEs and codebases.

---

## Common Mistakes
- **Omitting Return Type Annotations:** Relying exclusively on return type inference can inadvertently allow accidental type changes if the function body is modified.
- **Confusing `void` with `undefined`:** In TypeScript, a function returning `void` can complete without a return statement, whereas a function returning `undefined` must explicitly return `undefined`.

---

## Summary
**Key Takeaway:** Parameter and return type annotations provide compile-time safety and clear behavioral contracts for test utility functions, catching input errors before runtime execution.
