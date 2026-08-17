# 58_While2 — While Loop Patterns

**File:** `09_chapter_Loops/58_While2.js`

## Overview

While loops excel at counting attempts, retries, and bounded iterations with clear exit conditions. The pattern of initializing a counter, checking it against a limit in the while condition, and incrementing in the loop body is ubiquitous in real-world code for retries, polling, and attempts-limited operations. Mastering this pattern enables handling common scenarios like API retries with limits, user authentication attempts, and sensor data collection with timeouts.

---

## Main Concept

While loops with counter variables form a predictable pattern similar to for loops but with explicit manual management. This pattern is essential for situations where loop bounds are limits (max retries, max attempts) rather than simple ranges. The discipline required—initializing before the loop, testing in condition, incrementing in body—mirrors for loop structure but requires explicit code.

### Code Example

```javascript
// Basic attempt counter pattern
let attempts = 0;
while (attempts < 3) {
    console.log("Attempt", attempts);
    attempts++;  // Manually increment
}
// Outputs: "Attempt 0", "Attempt 1", "Attempt 2"

// Real-world retry pattern
let retries = 0;
const maxRetries = 3;
let success = false;

while (retries < maxRetries && !success) {
    console.log(`Retry attempt ${retries}`);
    // Simulate API call
    // if (apiCall()) success = true;
    retries++;
    if (retries >= maxRetries) {
        console.log("Max retries reached, giving up");
    }
}

// Countdown pattern
let countdown = 5;
while (countdown > 0) {
    console.log(`Time remaining: ${countdown}`);
    countdown--;
}
console.log("Liftoff!");

// Polling with limit
let pollingAttempts = 0;
const maxPolls = 10;
let dataReady = false;

while (pollingAttempts < maxPolls && !dataReady) {
    console.log(`Polling attempt ${pollingAttempts}`);
    pollingAttempts++;
    // Check data availability (simplified)
    // if (checkDataAvailable()) dataReady = true;
}

// Bounded input validation
let validInput = false;
let attempts = 0;
const maxAttempts = 3;

while (!validInput && attempts < maxAttempts) {
    // prompt user for input
    // if (isValid(input)) validInput = true;
    attempts++;
}
```

### Key Points

- **Attempt Counter Pattern**: Initialize counter before loop, check in condition, increment in body—mirrors for loop structure with explicit steps
- **Bounded Termination**: Exit is bounded by max attempts, preventing infinite loops in error scenarios where condition might otherwise persist
- **Retry Logic**: Essential for APIs, network operations, and transient failures where retrying might succeed
- **Multiple Exit Conditions**: Combine attempt limit with success condition (`attempts < max && !success`) for robust error handling
- **Clear Intent**: Loop structure clearly expresses "try up to N times" without need for complex for loop syntax

---

## Common Mistakes

- **Forgetting to Increment**: Easiest mistake is omitting `attempts++`, causing infinite loop. Must manually increment counter
- **Wrong Comparison Operator**: Using `>` instead of `<` or vice versa causes loop to run wrong number of times or not at all

---

## Definitions

- **Attempt Counter**: Variable tracking number of iterations/retries, tested against maximum limit
- **Max Attempts/Retries**: Upper bound on iteration count, preventing unbounded loops
- **Bounded Loop**: Loop that terminates after fixed maximum iterations regardless of other conditions
- **Retry Pattern**: Strategy of attempting an operation multiple times before giving up
- **Exit Condition**: Multiple conditions tested to exit loop (either success or max attempts reached)

---

## Tricky Questions & Answers

**Q1: What's the difference between `while(attempts < 3)` and `while(attempts <= 3)`?**
A: First runs attempts 0,1,2 (3 iterations). Second runs 0,1,2,3 (4 iterations). Choose based on whether you want 3 total attempts or inclusive 0-3 range.

**Q2: What happens if you initialize attempts to 1 instead of 0?**
A: `while(attempts < 3)` with init at 1 gives attempts 1,2 (2 iterations). Off-by-one error. Typically initialize counters at 0 for consistency.

**Q3: What's the output of this loop?**
```javascript
let attempts = 0;
while (attempts < 3) {
    console.log("Attempt", attempts);
    attempts++;
}
```
A: Prints "Attempt 0", "Attempt 1", "Attempt 2" (3 lines total).

**Q4: How would you implement a retry loop with a success condition?**
A: 
```javascript
let attempts = 0;
let success = false;
while (attempts < 3 && !success) {
    if (tryOperation()) {
        success = true;
    }
    attempts++;
}
if (!success) console.log("Failed after 3 attempts");
```

**Q5: What does `while(++attempts < 3)` do differently than `while(attempts < 3)` with increment in body?**
A: Pre-increments attempts each iteration check. Start at 0: first check evaluates `0<3` (false, exits before running), so doesn't run at all. Manual increment in body is clearer.

**Q6: How many times does this loop run?**
```javascript
let i = 0;
while (i++ < 5) {
    console.log(i);
}
```
A: 5 times, printing 1,2,3,4,5. Post-increment returns old value (so 0<5, 1<5, 2<5, 3<5, 4<5 are true), but i is incremented, so printed values are 1-5.

**Q7: How would you create an infinite loop that breaks after 10 iterations?**
A: 
```javascript
let count = 0;
while (true) {
    console.log(count);
    count++;
    if (count >= 10) break;
}
```

**Q8: Can you use multiple conditions in the while clause?**
A: Yes: `while(attempts < 3 && !success && isRunning)` continues if all conditions are true.

**Q9: What's the difference between exit conditions in a while loop vs a for loop?**
A: For loop condition is automatic; while loop condition is manual. While loops allow more flexible exit logic (multiple conditions, complex expressions) but require explicit management.

**Q10: How would you count from 1 to 10 with a while loop?**
A: 
```javascript
let i = 1;
while (i <= 10) {
    console.log(i);
    i++;
}
```
Initialize at 1, test <=10 to include 10.

**Q11: What's a practical use case for attempt counting in interviews?**
A: Retries for API calls, database connections, file I/O operations. Example: HTTP request retries with exponential backoff, authentication attempts with lockout after max tries.

**Q12: Why would you track attempts separately instead of using a for loop?**
A: When success is independent of attempts (operation succeeds early), while loop exits early. For loop runs fixed iterations regardless of success. While loop is more efficient when success might happen before max attempts.

**Q13: Can you use `break` in an attempt counting loop?**
A: Yes. Use `break` when operation succeeds or an unexpected error occurs, exiting before max attempts.

**Q14: What's the output of this?**
```javascript
let attempts = 3;
while (attempts > 0) {
    console.log(attempts);
    attempts--;
}
```
A: Prints 3, 2, 1 (counts down from 3 to 1).

**Q15: How would you implement a polling loop that stops after 5 seconds or max 10 attempts?**
A: 
```javascript
let attempts = 0;
const maxAttempts = 10;
const startTime = Date.now();
const maxDuration = 5000;  // 5 seconds

while (attempts < maxAttempts && Date.now() - startTime < maxDuration) {
    // Attempt to get data
    attempts++;
}
console.log(`Polling done: ${attempts} attempts, ${Date.now() - startTime}ms elapsed`);
```
Combines attempt limit with time limit.

---

## Deep Insights

- **Retry Pattern Ubiquity**: Retry logic with bounded attempts is so common in production code (network timeouts, transient DB failures, rate limiting) that mastering this pattern is near-mandatory for backend/systems engineers. Exponential backoff combined with attempt limits is the industry standard.

- **Success-Early Exit Optimization**: While loops with success conditions enable early exit, avoiding unnecessary iteration. If success is likely early, this saves computation vs for loops forced to complete all iterations even after success is found.

- **Timeout Patterns**: Real retry loops combine attempt counts with time-based limits (timeout). Duration tracking prevents hanging indefinitely on slow/broken systems. Interview candidates should understand both patterns and their interaction.

---

## Summary

**Key Takeaway:** The attempt-counting while loop pattern—initializing a counter, checking against max limit, and incrementing—is fundamental for retries, polling, and bounded operations, providing clearer intent than for loops for operation-attempt scenarios.
