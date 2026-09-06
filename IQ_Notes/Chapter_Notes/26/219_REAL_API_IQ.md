# 219 — HTTP Method Enums and Request Dispatching

**File:** `26_chapter_Abstractions/02_chapter_ENUM/219_REAL_API.ts`

## Overview
This file demonstrates **HTTP Method Enumeration** via an `HTTPMethod` enum (`Geto = "GET"`, `posto = "POST"`, `puto = "PUT"`, `deleto = "DELETE"`). It models a generic `sendRequest` helper that validates the HTTP verb at compile time, eliminating invalid or misspelled HTTP methods in automated REST client wrappers.

---

## Main Concept

RESTful API testing relies on standard HTTP verbs (GET, POST, PUT, DELETE, PATCH). Passing raw strings to HTTP client libraries frequently leads to case-sensitivity errors (e.g., lowercase `"get"` instead of uppercase `"GET"`).

### HTTPMethod Enum
```typescript
enum HTTPMethod {
    Geto = "GET",
    posto = "POST",
    puto = "PUT",
    deleto = "DELETE"
}
```

### Code Example

```typescript
enum HTTPMethod {
    Geto = "GET",
    posto = "POST",
    puto = "PUT",
    deleto = "DELETE"
}

function sendRequest(method: HTTPMethod, endpoint: string): void {
    console.log(method + " " + endpoint + " → 200 OK");
}

sendRequest(HTTPMethod.Geto, "/api/users");
sendRequest(HTTPMethod.posto, "/api/users");
sendRequest(HTTPMethod.deleto, "/api/users/1");

// ❌ TypeScript Prevents Invalid Methods:
// sendRequest("FETCH", "/api/users"); // Compile error: Argument not assignable to HTTPMethod
```

### Key Points
- **HTTP Spec Compliance:** Guarantees that only valid HTTP verbs conforming to the enum are accepted by test request dispatchers.
- **Payload Restrictions:** Can be extended so that verbs like `HTTPMethod.Geto` disallow a request body, while `posto` and `puto` require one.
- **Clean Logging:** When logging test execution steps, the exact uppercase HTTP method name is guaranteed.

---

## Common Mistakes
- **Inconsistent member naming:** Naming members with mixed casing (`Geto`, `posto`, `deleto`) instead of standardized PascalCase or UPPER_CASE conventions (`Get`, `Post`, `Delete`).
- **Forgetting PATCH or HEAD:** Expanding API clients often requires adding `PATCH = "PATCH"` and `HEAD = "HEAD"` to the enum.

---

## Summary
**Key Takeaway:** The `HTTPMethod` enum enforces valid HTTP verbs across API test helpers, preventing casing and spelling errors when dispatching REST requests.
