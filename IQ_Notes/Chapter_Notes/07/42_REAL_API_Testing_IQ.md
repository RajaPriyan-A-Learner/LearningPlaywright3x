# 42_REAL_API_Testing — Switch for HTTP Status Code Handling in API Testing

**File:** `07_chapter_switch/42_REAL_API_Testing.js`

## Overview

Switch statements are ideal for handling HTTP status codes in API testing and response validation, where discrete numeric values (200, 404, 500, etc.) require different assertions or logging. This real-world pattern demonstrates how switch elegantly maps status codes to expected behaviors, making test logic clear and maintainable. Understanding this application is essential for test automation engineers and appears frequently in coding interviews about practical API testing patterns.

---

## Main Concept

HTTP APIs return status codes (200, 201, 400, 404, 500, etc.) that indicate request outcomes. Switch statements excel at mapping these discrete codes to specific behaviors: success codes trigger validation of response data, client errors trigger error message checks, and server errors trigger retry logic or alerts. Each status code branches to unique test logic, making switch the natural choice over lengthy if-else chains. This pattern is foundational in test automation frameworks like Playwright, Cypress, and Jest-based API tests. The switch approach maintains readability as the number of handled statuses grows.

### Code Example

```javascript
let responseCode = 404;

switch (responseCode) {

    case 200:
        console.log("200 Ok");
        break;
    case 404:
        console.log("404 Not found!");
        break;
    default:
        console.log("Not status code match");

}
// Output: 404 Not found!

// Real-world API testing example:
async function validateResponse(statusCode, body) {
    switch (statusCode) {
        case 200:
        case 201:
            console.log("Success: Validating response body");
            expect(body).toHaveProperty("id");
            break;
        case 400:
            console.log("Bad Request: Checking error message");
            expect(body).toHaveProperty("error");
            break;
        case 401:
            console.log("Unauthorized: Check auth headers");
            break;
        case 404:
            console.log("Not Found: Resource doesn't exist");
            expect(body.message).toContain("not found");
            break;
        case 500:
            console.log("Server Error: Log for investigation");
            // Retry logic or alert DevOps
            break;
        default:
            throw new Error(`Unexpected status code: ${statusCode}`);
    }
}
```

### Key Points

- **Discrete Status Values**: HTTP status codes are discrete integers (200, 404, 500) perfect for switch matching, not ranges or conditions.
- **Success vs Error Handling**: Group success codes (2xx) and error codes (4xx, 5xx) separately or use fall-through for shared validation logic.
- **Default for Unexpected**: Include default case to catch status codes not explicitly handled, improving test robustness and catching unexpected API behavior.
- **Clear Test Intent**: Switch structure makes it obvious which status codes the test handles, improving test documentation and maintainability.
- **Combining Cases**: Use fall-through (case 200: case 201:) to handle multiple success codes with shared validation logic, reducing duplication.

---

## Common Mistakes

**Mistake 1: Ignoring unexpected status codes in tests**
```javascript
// Wrong: omit default, test silently passes for unexpected codes
async function testAPI() {
    const response = await fetch("/api/data");
    switch (response.status) {
        case 200:
            expect(response.body).toHaveProperty("data");
            break;
        case 404:
            expect(response.body).toHaveProperty("message");
            break;
        // What if status is 503 (service unavailable)? Test continues without failing!
    }
}

// Right: add default to fail on unexpected codes
async function testAPI() {
    const response = await fetch("/api/data");
    switch (response.status) {
        case 200:
            expect(response.body).toHaveProperty("data");
            break;
        case 404:
            expect(response.body).toHaveProperty("message");
            break;
        default:
            throw new Error(`Unexpected status code: ${response.status}`);
    }
}
```

**Mistake 2: Duplicating validation logic across status codes**
```javascript
// Wrong: duplicate success validation in multiple cases
switch (statusCode) {
    case 200:
        expect(response).toHaveProperty("id");
        expect(response).toHaveProperty("name");
        break;
    case 201:
        expect(response).toHaveProperty("id");
        expect(response).toHaveProperty("name");
        break;
}

// Right: use fall-through to share validation
switch (statusCode) {
    case 200:
    case 201:
        expect(response).toHaveProperty("id");
        expect(response).toHaveProperty("name");
        break;
}
```

**Mistake 3: Forgetting to handle status code ranges**
```javascript
// Wrong: only handling specific codes, missing 2xx range
switch (statusCode) {
    case 200:
        console.log("Success");
        break;
    // What about 201, 202, 204?
    case 400:
        console.log("Bad request");
        break;
}

// Right: handle status code families with fall-through or explicit cases
switch (Math.floor(statusCode / 100)) {
    case 2: // 200-299 success
        console.log("Success: " + statusCode);
        break;
    case 4: // 400-499 client error
        console.log("Client error: " + statusCode);
        break;
    case 5: // 500-599 server error
        console.log("Server error: " + statusCode);
        break;
}
```

**Mistake 4: Not logging status code details for debugging**
```javascript
// Wrong: generic error message, hard to debug test failures
default:
    throw new Error("Request failed");

// Right: include status code and body for debugging
default:
    throw new Error(`Request failed with status ${statusCode}: ${JSON.stringify(body)}`);
```

---

## Interview-Ready Definitions

1. **HTTP Status Code Handling**: Using switch statements to branch based on response status codes (200, 404, 500, etc.), executing different validation or retry logic for each code family.

2. **Status Code Families**: Groups of status codes by meaning: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error). Switches often group these families with fall-through.

3. **Test Assertion Branching**: Conditional validation logic that checks different assertions or behaviors depending on the status code received from an API.

4. **Retry Logic**: Automatic re-attempt of failed requests based on status codes (e.g., retry on 429 rate limit or 503 service unavailable, but not on 400 bad request).

5. **API Test Coverage**: Ensuring test cases handle expected status codes and gracefully fail on unexpected codes, improving test reliability and bug detection.

---

## Tricky Interview Questions

1. **Why use switch for HTTP status codes instead of if-else?**
   - Answer: Switch is more readable for discrete values. If-else chains obscure intent with multiple conditions. Switch makes it obvious you're handling discrete statuses.

2. **Should you retry all 5xx errors the same way?**
   - Answer: No. 503 (Service Unavailable) is temporary and safe to retry. 501 (Not Implemented) is permanent. Use switch to handle each distinctly.

3. **How do you handle status codes you didn't explicitly test for?**
   - Answer: Default case should throw with details: `throw new Error(\`Unexpected status: ${statusCode}, body: ${JSON.stringify(body)}\`)`

4. **Should you use constants for status codes or magic numbers?**
   - Answer: Always use constants: `const STATUS_OK = 200;` makes code readable and easier to maintain. Magic numbers are debugging nightmares.

5. **What's the difference between testing status code 200 vs 201 (both success)?**
   - Answer: 200 (OK) is general success, 201 (Created) indicates a resource was created. Test assertions may differ: 201 might check `Location` header for resource URL.

6. **How do you test API behavior when status codes change?**
   - Answer: Each status code has a separate test case. When API behavior changes, update only the relevant case. Good test isolation prevents cascading failures.

7. **Can you use regex in switch case for status codes?**
   - Answer: No, switch uses strict equality. Use `switch(Math.floor(statusCode / 100))` to match families (2, 4, 5) or multiple explicit cases for related statuses.

8. **What happens if you test with a status code 0 (network error)?**
   - Answer: Network errors (connection refused, timeout) don't return HTTP codes. Handle them outside switch: `catch (error) { console.log("Network error: " + error); }`

9. **Should error status codes include the response body in assertions?**
   - Answer: Yes, validate both status and body. A 400 status should have an `error` or `message` field. Switch structure groups these validations.

10. **How do you handle 3xx redirect status codes in testing?**
    - Answer: Depends on test framework. Some auto-follow redirects (transparent), others return 3xx code. Use switch to check if redirects are handled: `case 301: case 302: expect(finalUrl).toBe(...)`

11. **What's the impact of switching on wrong status code in production?**
    - Answer: If switch doesn't handle a status code, default likely throws an error. This surfaces API behavior changes immediately, which is good for reliability.

12. **Should you test every status code an API can return?**
    - Answer: Test happy path (2xx), main error scenarios (400, 401, 404), and business-critical statuses. 3xx, 5xx, and edge cases get coverage but aren't priorities for unit tests.

13. **How do you mock status codes in API tests?**
    - Answer: Use mocking libraries (jest.mock, nock, msw) to return different status codes. Test each case independently to ensure switch logic handles all codes.

14. **What if the API returns a status code you forgot to handle?**
    - Answer: Default case should throw, failing the test. This forces you to explicitly handle every status code, making test assumptions clear.

15. **How do you test switch status code logic without making real API calls?**
    - Answer: Use mocked responses: `jest.mock("axios", { get: jest.fn().mockResolvedValue({ status: 404, data: {...} }) })` to test each case independently.

---

## Deep Insights & Gotchas

- **Status codes are not always what they seem**: An API might return 200 with an error message in the body (poor API design). Don't assume 200 means success—validate the response body too. Switch handles the code; assertions handle the body.

- **Retry logic shouldn't be in switch**: While switch routes to different cases, actual retry logic (exponential backoff, max attempts) should be external. Switch is for classification, not orchestration.

- **Missing default is a silent killer**: Tests passing when status codes are unexpected is dangerous. An API upgrade that changes status codes will pass tests silently, causing production issues. Always default to failure.

---

## Summary

**Key Takeaway:** Switch statements elegantly handle HTTP status code branching in API tests, mapping discrete codes to specific assertions—using fall-through for code families, explicit default handlers for robustness, and clear case organization is standard in production test automation.
