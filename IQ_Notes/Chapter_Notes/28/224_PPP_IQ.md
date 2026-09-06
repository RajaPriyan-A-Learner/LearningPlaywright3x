# 224 — Public, Private, and Protected Access Modifiers in TypeScript

**File:** `28_chapter_access modifiers/224_PPP.ts`

## Overview
This file demonstrates the three primary **Access Modifiers** in TypeScript: `public`, `private`, and `protected`, through an `APIClient` base class and a derived `UserAPIClient`. It illustrates how access modifiers control member visibility, protecting sensitive credentials (`apiKey`) while exposing public actions (`sendRequest`) and sharing internal helpers (`timeout`) with subclasses.

---

## Main Concept

TypeScript enhances ES6 classes with compile-time access controls:
1. **`public` (default):** Accessible from anywhere—inside the class, child classes, and external consumers (`client.baseURL`).
2. **`private`:** Accessible **only** within the declaring class (`APIClient`). Inaccessible to subclasses and external callers.
3. **`protected`:** Accessible within the declaring class and its **derived subclasses** (`UserAPIClient`), but blocked from external callers.

### Access Control Architecture
```typescript
class APIClient {
    public baseURL: string;       // Unrestricted access
    private apiKey: string;       // Only APIClient can see this
    protected timeout: number;    // APIClient and UserAPIClient can see this

    constructor(baseURL: string, apiKey: string, timeout: number) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.timeout = timeout;
    }

    private getAuthHeader(): string {
        return "Bearer " + this.apiKey;
    }

    public sendRequest(path: string): void {
        console.log("GET " + this.baseURL + path);
        console.log("Auth: " + this.getAuthHeader());
        console.log("Timeout: " + this.timeout + "ms");
    }
}
```

### Code Example

```typescript
class APIClient {
    public baseURL: string;
    private apiKey: string;
    protected timeout: number;

    constructor(baseURL: string, apiKey: string, timeout: number) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.timeout = timeout;
    }

    private getAuthHeader(): string {
        return "Bearer " + this.apiKey;
    }

    public sendRequest(path: string): void {
        console.log("GET " + this.baseURL + path);
        console.log("Auth: " + this.getAuthHeader());
        console.log("Timeout: " + this.timeout + "ms");
    }
}

class UserAPIClient extends APIClient {
    getUsers(): void {
        // ✅ Allowed: timeout is protected, baseURL is public
        console.log("Fetching users (timeout: " + this.timeout + "ms)");
        console.log("URL: " + this.baseURL + "/users");
        
        // ❌ Compiler Error: apiKey is private to APIClient
        // console.log(this.apiKey);
    }
}

let client = new APIClient("https://api.staging.com", "key_secret_123", 5000);
console.log("Base URL:", client.baseURL); // Allowed: public
client.sendRequest("/health");            // Allowed: public

// ❌ Compiler Errors on external access:
// console.log(client.apiKey);  // Error: Property 'apiKey' is private
// console.log(client.timeout); // Error: Property 'timeout' is protected
```

### Key Points
- **Compile-Time Enforcement:** TypeScript access modifiers are enforced purely during compilation. In emitted JavaScript, they become standard public fields unless JavaScript `#private` fields are used.
- **Sensitive Data Isolation:** `private apiKey` prevents test spec authors from accidentally printing or leaking credentials.
- **Subclass Reusability:** `protected timeout` allows child API clients to configure retry loops without exposing the raw timeout setting to end-test callers.

---

## Common Mistakes
- **Confusing TypeScript `private` with JavaScript `#private`:** TypeScript's `private` keyword is erased at runtime (accessible via `client["apiKey"]` in plain JS). JavaScript `#apiKey` provides true runtime encapsulation.
- **Making everything `public` by default:** Exposing internal helper methods clutters IDE autocomplete and violates encapsulation principles.

---

## Summary
**Key Takeaway:** TypeScript's `public`, `private`, and `protected` access modifiers establish clear encapsulation boundaries, isolating internal state while sharing infrastructure with subclasses.
