# 226 — Combining Private and Readonly for Immutable Class State

**File:** `28_chapter_access modifiers/226_readonly.ts`

## Overview
This file demonstrates combining the **`private` and `readonly` Modifiers** in TypeScript classes through a `PlaywrightConfig` manager. It illustrates how critical framework parameters (`baseURL`, `timeout`, `retries`) are initialized once during instantiation and locked against accidental mutation or external modification.

---

## Main Concept

In enterprise test frameworks, configuration settings must be reliable and immutable throughout the execution lifecycle. Combining `private` with `readonly` achieves two critical goals:
1. **`private`:** Disallows external access from outside the class.
2. **`readonly`:** Prevents internal methods of the class from accidentally reassigning the property after constructor execution.

### Dual Protection Syntax
```typescript
class PlaywrightConfig {
    private readonly baseURL: string;
    private readonly timeout: number;
    private readonly retries: number;

    constructor(url: string, timeout: number, retries: number) {
        this.baseURL = url;
        this.timeout = timeout;
        this.retries = retries;
    }
}
```

### Code Example

```typescript
class PlaywrightConfig {
    private readonly baseURL: string;
    private readonly timeout: number;
    private readonly retries: number;

    constructor(url: string, timeout: number, retries: number) {
        this.baseURL = url;
        this.timeout = timeout;
        this.retries = retries;
    }

    showConfig(): void {
        console.log("URL: " + this.baseURL);
        console.log("Timeout: " + this.timeout + "ms");
        console.log("Retries: " + this.retries);
    }

    // ❌ Cannot reassign inside class methods either:
    // updateURL(newUrl: string): void {
    //     this.baseURL = newUrl; // Error: Cannot assign to 'baseURL' because it is a read-only property
    // }
}

let config = new PlaywrightConfig("https://staging.app.com", 30000, 2);
config.showConfig();

// ❌ TypeScript Compiler Error:
// config.baseURL = "https://other.com"; // Error: Property 'baseURL' is private and only accessible within class 'PlaywrightConfig'
```

### Key Points
- **Constructor-Only Assignment:** `readonly` properties can only be assigned within the `constructor` (or via an inline declaration initializer).
- **Parameter Properties Shorthand:** TypeScript also allows concise constructor declarations:
  ```typescript
  class Config {
      constructor(private readonly baseURL: string) {}
  }
  ```
- **Execution Stability:** Guarantees that parallel test workers cannot inadvertently overwrite global timeouts or base URLs.

---

## Common Mistakes
- **Attempting to mutate readonly properties in utility methods:** Once the constructor finishes, even methods inside the class cannot reassign `readonly` fields.
- **Relying on runtime immutability in plain JS:** `private readonly` is a compile-time check; the emitted JavaScript will not throw unless `Object.freeze(this)` is invoked.

---

## Summary
**Key Takeaway:** Combining `private readonly` creates strictly encapsulated, immutable configuration properties that cannot be mutated from either inside or outside the class after constructor initialization.
