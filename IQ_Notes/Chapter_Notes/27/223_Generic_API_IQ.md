# 223 — Generic API Wrappers and Typed Envelope Patterns

**File:** `27_chapter_Generics/223_Generic_API.ts`

## Overview
This file demonstrates the **Generic API Response Envelope Pattern** in TypeScript through `wrapResponse<T>(statusCode: number, data: T)`. It shows how backend and REST API responses wrapping metadata (`statusCode`) around dynamic payload payloads (`data: T`) are modeled with complete type fidelity.

---

## Main Concept

RESTful APIs consistently package business data inside a standard envelope containing HTTP status codes, pagination info, or error messages:
```json
{
  "statusCode": 200,
  "data": { ... }
}
```
Using a generic wrapper function, the shape of `data` is dynamically parameterized while preserving the static metadata fields.

### Generic Envelope Signature
```typescript
function wrapResponse<T>(statusCode: number, data: T): { statusCode: number; data: T } {
    return { statusCode: statusCode, data: data };
}
```

### Code Example

```typescript
function wrapResponse<T>(statusCode: number, data: T): { statusCode: number; data: T } {
    return { statusCode: statusCode, data: data };
}

let userResp = wrapResponse<string>(200, "admin");
console.log(userResp); // { statusCode: 200, data: 'admin' }

let flagResp = wrapResponse<boolean>(200, true);
console.log(flagResp); // { statusCode: 200, data: true }

// Complex DTO envelope example:
interface UserDTO { id: number; username: string; }
let apiUser = wrapResponse<UserDTO>(200, { id: 1, username: "superadmin" });
console.log(`User: ${apiUser.data.username}`); // Full autocomplete on data.username!
```

### Key Points
- **Type Propagation:** The caller knows the exact type of `response.data` (`string`, `boolean`, `UserDTO`) without manual casting (`as UserDTO`).
- **Standardized Assertions:** Playwright API testing helpers can define `async function get<T>(url: string): Promise<APIEnvelope<T>>` to parse JSON into typed objects automatically.
- **Envelope Consistency:** Enforces that all service endpoints adhere to the same structural envelope contract.

---

## Common Mistakes
- **Typing `data` as `any`:** Writing `data: any` destroys autocomplete and lets downstream tests access non-existent properties on `response.data`.
- **Hardcoding responses:** Creating separate wrapper functions for every entity type (`wrapUserResponse`, `wrapOrderResponse`) leads to massive code duplication.

---

## Summary
**Key Takeaway:** The generic envelope pattern (`wrapResponse<T>`) binds dynamic entity payloads to standardized HTTP response structures, delivering end-to-end type safety for API automation.
