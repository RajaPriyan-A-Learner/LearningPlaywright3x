# 213 — API Response Modeling with Optional Headers

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/213_Page_objects.ts`

## Overview
This file demonstrates the application of **Interfaces in API Testing** through an `APIResponse` interface. It defines a strongly-typed contract for HTTP response data, incorporating required fields (`statuscode`, `body`, `responseTime`) alongside an optional `headers?` property, standardizing REST and GraphQL testing assertions.

---

## Main Concept

API test automation involves asserting on network responses from microservices. By defining an interface for the response payload, test frameworks guarantee that response objects maintain expected telemetry fields and payload structures.

### Interface Anatomy
```typescript
interface APIResponse {
    statuscode: number;
    body: string;
    headers?: object;     // Optional: may not always be captured in lightweight tests
    responseTime: number; // In milliseconds
}
```

### Code Example

```typescript
// Interfaces used in API Testing
interface APIResponse {
    statuscode: number;
    body: string;
    headers?: object;
    responseTime: number;
}

let responseData: APIResponse = {
    statuscode: 200,
    body: "{}",
    responseTime: 200
};

console.log("Status:", responseData.statuscode);
console.log("Body:", responseData.body);

let responseData2: APIResponse = {
    statuscode: 200,
    body: "{}",
    headers: { "Content-Type": "application/json" },
    responseTime: 200
};
```

### Key Points
- **Standardized Response Assertion:** Validating that every endpoint returns an object conforming to `APIResponse` guarantees that status codes and response times are consistently recorded in test reports.
- **Performance Telemetry:** Tracking `responseTime: number` enables assertions on Service Level Agreements (SLAs), e.g., `expect(res.responseTime).toBeLessThan(500)`.
- **Generics Preparation:** In advanced API testing, `body: string` is often upgraded to a generic type `APIResponse<T>` to strongly type the deserialized JSON response.

---

## Common Mistakes
- **Using loose `object` for headers:** While `headers?: object` works for basic objects, using a typed dictionary like `headers?: Record<string, string>` or index signatures provides better type safety.
- **Casing mismatches:** Using `statuscode` vs `statusCode` or `status`. Interfaces enforce strict naming consistency across test helper utilities.

---

## Summary
**Key Takeaway:** The `APIResponse` interface models HTTP response structures with required status and telemetry metrics and optional headers, ensuring standardized assertions across API test suites.
