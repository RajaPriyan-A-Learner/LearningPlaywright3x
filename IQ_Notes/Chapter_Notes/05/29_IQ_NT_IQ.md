# 29_IQ_NT — Nested Ternary for HTTP Status Code Categorization

**File:** `05_chapter_Operator/29_IQ_NT.js`

## Overview

This file demonstrates using nested ternary operators to categorize HTTP status codes into semantic categories (Success, Redirect, Client Error, Server Error). This is a practical real-world pattern where status codes in specific ranges have different meanings, and nested ternaries efficiently map ranges to categories.

---

## Main Concept

HTTP status codes range from 100-599, with different ranges representing different types of responses. Using nested ternary operators, you can efficiently categorize any status code into its semantic category without explicitly checking all values.

### Code Example

```javascript
// HTTP status code categorization
let statusCode = 404;
let category =
    statusCode < 300 ? "Success" :
        statusCode < 400 ? "Redirect" :
            statusCode < 500 ? "Client Error" : "Server Error";

console.log(`Status ${statusCode}: ${category}`);  // "Status 404: Client Error"
console.log("Status :" + statusCode, category);     // "Status : 404 Client Error"

// More detailed categorization
let statusText = statusCode >= 200 && statusCode < 300 ? "OK" :
                 statusCode >= 300 && statusCode < 400 ? "Moved" :
                 statusCode >= 400 && statusCode < 500 ? "Client Error" : "Server Error";

// Using in error handling
function handleResponse(statusCode, data) {
    let result = statusCode < 300 ? `Success: ${data}` :
                 statusCode < 400 ? `Redirect: ${data}` :
                 statusCode < 500 ? `Client Error: ${data}` : `Server Error: ${data}`;
    return result;
}
```

### Key Points

- **Range checking is efficient with nested ternaries**: Each condition checks if the value is below a threshold, efficiently categorizing into ranges.
- **Status codes follow HTTP standards**: 1xx (Info), 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error).
- **Order matters**: Check from lowest range to highest; the first true condition determines the category.
- **Template literals work well with ternaries**: Combining status code and category in a message is a common pattern.
- **This pattern generalizes to any range categorization**: Temperature ranges, score grades, priority levels all use similar nested ternary logic.

---

## Common Mistakes

**Mistake 1: Checking exact values instead of ranges**
```javascript
// Wrong: would miss most status codes
let category = statusCode === 200 ? "Success" : statusCode === 404 ? "Not Found" : "Error";

// Right: check ranges
let category = statusCode < 300 ? "Success" : statusCode < 400 ? "Redirect" : "Error";
```

**Mistake 2: Wrong order in nested conditions**
```javascript
// Wrong: checking larger range first
let category = statusCode < 500 ? "Client Error" : statusCode < 300 ? "Success" : "Server Error";
// 200 would match "Client Error" (wrong!)

// Right: check from smallest to largest range
let category = statusCode < 300 ? "Success" : statusCode < 400 ? "Redirect" : statusCode < 500 ? "Client Error" : "Server Error";
```

**Mistake 3: Not handling all ranges**
```javascript
// Wrong: 1xx codes not handled
let category = statusCode < 300 ? "Success" : statusCode < 400 ? "Redirect" : "Error";

// Right: handle all HTTP ranges explicitly if needed
let category = statusCode < 200 ? "Info" : statusCode < 300 ? "Success" : statusCode < 400 ? "Redirect" : statusCode < 500 ? "Client Error" : "Server Error";
```

**Mistake 4: Using ternary when switch is clearer**
```javascript
// Wrong: nested ternary for discrete values
let msg = statusCode === 200 ? "OK" : statusCode === 201 ? "Created" : statusCode === 404 ? "Not Found" : "Error";

// Right: use switch for discrete values
switch(statusCode) {
  case 200: msg = "OK"; break;
  case 201: msg = "Created"; break;
  case 404: msg = "Not Found"; break;
  default: msg = "Error";
}
```

---

## Interview-Ready Definitions

1. **Status Code Categorization**: Grouping HTTP status codes (1xx-5xx) into semantic categories based on their ranges.

2. **Range-Based Selection**: Using nested conditions to check if a value falls within a range and assign a category accordingly.

3. **Threshold Checking**: Comparing a value against boundary values to determine which range it belongs to.

4. **HTTP Status Ranges**: The standard HTTP status code ranges: 1xx (Info), 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error).

5. **Conditional Categorization**: Using ternary operators to assign categories based on conditions, useful for both status codes and other range-based data.

---

## Tricky Interview Questions

1. **What's the result of `statusCode < 300 ? "Success" : statusCode < 400 ? "Redirect" : "Error"` if statusCode is 404?**
   - Answer: "Error". 404 < 300 is false, 404 < 400 is false, so "Error" is returned.

2. **What if statusCode is 299?**
   - Answer: "Success". 299 < 300 is true, so "Success" is returned.

3. **What if statusCode is 300?**
   - Answer: "Redirect". 300 < 300 is false, but 300 < 400 is true, so "Redirect" is returned.

4. **Why check `statusCode < 300` instead of `statusCode >= 200 && statusCode < 300`?**
   - Answer: The nested ternary assumes all status codes are 100+. Simpler condition works if you only check positive cases. But it's less explicit; the && version clarifies the range.

5. **Can you add a specific category for 1xx status codes?**
   - Answer: Yes, add another ternary at the start: `statusCode < 200 ? "Info" : statusCode < 300 ? ...`.

6. **What's the result if statusCode is 100?**
   - Answer: With the given ternary, it would return "Success" (100 < 300). To handle 1xx correctly, add explicit check: `statusCode < 200 ? "Info" : ...`.

7. **Can you use this pattern for other range-based categorizations?**
   - Answer: Yes, temperature ranges, age groups, score grades all use the same pattern: `value < threshold ? category1 : value < nextThreshold ? category2 : ...`.

8. **Is nested ternary better than a lookup table for status codes?**
   - Answer: Depends. For continuous ranges, ternary is efficient. For discrete mappings (200 → "OK", 404 → "Not Found"), a lookup object is clearer.

9. **What if you need to log different messages for different 2xx codes?**
   - Answer: Use a more detailed lookup: `const messages = { 200: "OK", 201: "Created", ... }; let msg = messages[statusCode] || "Unknown";`.

10. **Can you use this pattern in a switch statement?**
    - Answer: Switch works better for discrete values. Ternary is better for range-based logic.

11. **What's the result if statusCode is 500?**
    - Answer: "Server Error". 500 < 300 is false, 500 < 400 is false, 500 < 500 is false, so the final branch ("Server Error") is returned.

12. **What if statusCode is 599?**
    - Answer: "Server Error". All range checks fail, so the final "Server Error" is returned.

13. **Can you use this in error handling middleware?**
    - Answer: Yes, categorizing status codes is common in logging and error handling to provide appropriate responses.

14. **Is the ternary condition `statusCode < 300` inclusive or exclusive?**
    - Answer: Exclusive of 300. `statusCode < 300` matches 100-299, not 300.

15. **How would you extend this to provide more detailed messages?**
    - Answer: Use nested ternary or helper function: `` `Status ${statusCode}: ${statusCode < 300 ? "Success ✅" : "Error ❌"}` ``.

---

## Deep Insights & Gotchas

- **Order of conditions is critical**: Check ranges from smallest to largest (or in a logical order). Reversing breaks categorization.

- **Range-based ternaries generalize well**: This pattern applies to temperature, age, scores, priority levels, and any ordered data that needs categorization.

- **Consider readability vs. conciseness**: While nested ternaries are concise, some prefer switch or if/else chains for clarity when categorizing status codes.

---

## Summary

**Key Takeaway:** Nested ternary operators efficiently categorize HTTP status codes into semantic ranges (Success, Redirect, Error) using threshold checks; this pattern generalizes to any range-based categorization.
