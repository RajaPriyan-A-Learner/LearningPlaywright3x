# 217 — Environment URL Mapping via Enums

**File:** `26_chapter_Abstractions/02_chapter_ENUM/217_Real_Enum.ts`

## Overview
This file demonstrates **Environment URL Mapping** using an `Environment` enum (`Dev`, `Staging`, `QA`, `Prod`). It illustrates how TypeScript enums centralize base endpoint URLs for test execution pipelines, eliminating hardcoded URLs and preventing accidental execution against production servers.

---

## Main Concept

Test automation frameworks execute tests across diverse deployment stages: Development, QA, Staging, and Production. Centralizing these base URLs in an enum provides a single source of truth and prevents accidental typos in domain names.

### Enum URL Mapping
```typescript
enum Environment {
    Dev = "https://dev.api.com",
    Staging = "https://staging.api.com",
    QA = "https://qa.api.com",
    Prod = "https://api.com"
}
```

### Code Example

```typescript
enum Environment {
    Dev = "https://dev.api.com",
    Staging = "https://staging.api.com",
    QA = "https://qa.api.com",
    Prod = "https://api.com"
}

console.log(Environment.QA); // "https://qa.api.com"

function getEndpoint(env: Environment, path: string): string {
    return `${env}${path}`;
}

const loginEndpoint = getEndpoint(Environment.Staging, "/auth/login");
console.log("Target Endpoint:", loginEndpoint); // "https://staging.api.com/auth/login"

// ❌ TypeScript Prevents Arbitrary Strings:
// getEndpoint("https://random-url.com", "/test"); // Error: Argument of type 'string' not assignable to 'Environment'
```

### Key Points
- **Production Safeguards:** Critical tests can inspect the active enum member: `if (activeEnv === Environment.Prod) blockDestructiveTests();`.
- **Environment Variable Binding:** Often paired with CLI flags or environment variables: `const currentEnv = Environment[process.env.TEST_ENV ?? "QA"]`.
- **Centralized Maintenance:** If the staging URL changes to a new domain, modifying the enum updates all downstream tests automatically.

---

## Common Mistakes
- **Hardcoding URLs inside individual test scripts:** Scattering raw URL strings across dozens of spec files makes environment migration painful and error-prone.
- **Missing trailing slash consistency:** Be consistent with trailing slashes across enum members to avoid double-slash or missing-slash path concatenation bugs.

---

## Summary
**Key Takeaway:** The `Environment` enum centralizes environment base URLs, providing strong typing and preventing accidental or misconfigured API endpoint calls.
