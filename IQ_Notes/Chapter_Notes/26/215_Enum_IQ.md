# 215 — String Enums and Test Execution Status Modeling

**File:** `26_chapter_Abstractions/02_chapter_ENUM/215_Enum.ts`

## Overview
This file introduces **String Enums** in TypeScript through a `TestStatus` enumeration (`Pass`, `Fail`, `Skip`, `Pending`, `Blocked`). Enums (enumerations) allow developers to define a set of named constants, replacing brittle "magic strings" in test frameworks with type-safe, self-documenting status codes.

---

## Main Concept

In test automation reporting, representing outcomes with raw strings (`"PASS"`, `"fail"`, `"skipped"`) leads to typos and subtle casing bugs (`"pass"` vs `"Pass"`). A String Enum binds named identifiers to explicit string values.

### String Enum Syntax
```typescript
enum TestStatus {
    Pass = "PASS",
    Fail = "FAIL",
    Skip = "SKIP",
    Pending = "PENDING",
    Blocked = "BLOCKED"
}
```

### Code Example

```typescript
enum TestStatus {
    Pass = "PASS",
    Fail = "FAIL",
    Skip = "SKIP",
    Pending = "PENDING",
    Blocked = "BLOCKED"
}

console.log(TestStatus.Pass); // Output: "PASS"

function recordResult(testName: string, status: TestStatus): void {
    console.log(`[RESULT] ${testName} -> ${status}`);
}

recordResult("Login Flow", TestStatus.Pass);
recordResult("Payment Gateway", TestStatus.Blocked);

// ❌ TypeScript Compiler Error:
// recordResult("Checkout", "PASS"); 
// Error: Argument of type '"PASS"' is not assignable to parameter of type 'TestStatus'
```

### Key Points
- **Elimination of Magic Strings:** All status references go through `TestStatus.Pass`, preventing capitalization discrepancies.
- **Runtime Representation:** Unlike interfaces, enums exist as real JavaScript objects at runtime (compiled to an immediately-invoked function expression closure).
- **Strict Assignment:** Under TypeScript strict mode, you cannot pass a raw string `"PASS"` to a function expecting `TestStatus`; you must use `TestStatus.Pass`.

---

## Common Mistakes
- **Passing raw strings instead of the enum member:** Writing `recordResult("Test", "PASS")` fails type checking; use `TestStatus.Pass`.
- **Assuming enums compile to zero bytes:** Enums generate real JavaScript runtime objects, unlike `type` or `interface` which are erased. (To avoid runtime overhead, use `const enum`).

---

## Summary
**Key Takeaway:** String Enums provide compile-time safety and runtime clarity for fixed discrete options like test execution statuses, eliminating magic string bugs.
