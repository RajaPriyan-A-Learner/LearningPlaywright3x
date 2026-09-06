# 220 — Abstract Classes and Template Method Pattern in Test Frameworks

**File:** `26_chapter_Abstractions/03_chapter_Abstract/220_Abstract.ts`

## Overview
This file demonstrates **Abstract Classes** in TypeScript using an `abstract class BaseTest` extended by `class UITest`. It highlights how abstract classes enable the **Template Method Pattern**, combining enforced abstract method signatures (`setup()`, `execute()`, `teardown()`, `loan()`) with shared concrete methods (`loan1()`) and protected instance state (`protected testName: string`).

---

## Main Concept

An abstract class serves as a base class from which other classes may be derived. Unlike interfaces, abstract classes:
1. Cannot be instantiated directly with `new`.
2. Can contain implementation details (concrete methods, constructors, and field initialization).
3. Can define `abstract` methods that child classes **must** implement.

### Abstract Class Architecture
```typescript
abstract class BaseTest {
    protected testName: string;
    constructor(testName: string) {
        this.testName = testName;
    }

    abstract setup(): void;
    abstract execute(): void;
    abstract teardown(): void;
    abstract loan(): void;
    
    loan1(): void {
        console.log("Hi");
    }
}
```
`UITest extends BaseTest` provides concrete implementations for all four abstract methods.

### Code Example

```typescript
abstract class BaseTest {
    protected testName: string;
    constructor(testName: string) {
        this.testName = testName;
    }

    abstract setup(): void;
    abstract execute(): void;
    abstract teardown(): void;
    abstract loan(): void;
    
    loan1(): void {
        console.log("Hi");
    }
}

class UITest extends BaseTest {
    setup(): void {
        console.log("  Setup: launch browser");
    }
    execute(): void {
        console.log("  Execute: click buttons, fill forms");
    }
    teardown(): void {
        console.log("  Teardown: close browser");
    }
    loan(): void {
        console.log("  GIVE LOAN");
    }
}

const test = new UITest("User Registration Flow");
test.setup();
test.execute();
test.teardown();
test.loan1(); // Calls shared concrete method from BaseTest

// ❌ Cannot create an instance of an abstract class:
// const base = new BaseTest("Invalid"); // Compile error!
```

### Key Points
- **Abstract Class vs Interface:** An interface cannot provide shared code or constructor state; an abstract class can provide reusable concrete helper logic while mandating child specialization.
- **Template Lifecycle:** Base test runners often orchestrate execution: `run() { this.setup(); this.execute(); this.teardown(); }`.
- **Protected State:** `protected testName: string` is accessible within `BaseTest` and any derived class (`UITest`), but inaccessible to external callers.

---

## Common Mistakes
- **Attempting to instantiate an abstract class directly:** `new BaseTest(...)` triggers `Cannot create an instance of an abstract class`.
- **Forgetting to implement all abstract methods:** If `UITest` omits even one abstract method (e.g., `loan()`), TypeScript rejects the child class.

---

## Summary
**Key Takeaway:** Abstract classes combine mandatory abstract method contracts with shared concrete implementations, forming the architectural backbone for test runners and base Page Object Models.
