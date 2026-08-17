# 05_Comments — JavaScript Comments and Documentation

**File:** `03_chapter_identifier/05_Comments.js`

## Overview

Comments are text within code that JavaScript ignores during execution. They serve as documentation for other developers (and your future self). JavaScript supports two main comment styles: single-line comments (`//`) and multi-line comments (`/* */`). Additionally, JSDoc comments (`/** */`) provide structured documentation that tools can parse. Understanding when and how to write comments is critical for maintainability, though good code should minimize need for comments through clear naming.

---

## Comment Types in JavaScript

JavaScript provides multiple comment formats for different documentation needs.

### Code Example

```javascript
// This is single comment this will be ignored
// this line will be not executed

/*
 *  This is multi line
 *  Author : Raja Priyan
 *  Date : 19-Jul-2026
 */

/**
 *  This is JSDoc comment
 *  Author : Raja Priyan
 *  Date : 19-Jul-2026
 */

var g = 10; // Inline comment - use Cmd+/ or Ctrl+/ to toggle
```

### Key Points

- **Single-line comments (`//`):** Everything after `//` on that line is ignored
  ```javascript
  let x = 5;  // This is a comment
  // Entire line is comment
  let y = 10; // Don't forget to increment
  ```

- **Multi-line comments (`/* */`):** Everything between `/*` and `*/` is ignored
  ```javascript
  /*
   * This spans multiple lines
   * Everything here is ignored by JavaScript
   * Used for longer explanations or licensing
   */
  let z = 15;
  ```

- **JSDoc comments (`/** */`):** Structured documentation parsed by tools
  ```javascript
  /**
   * Calculates sum of two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  function add(a, b) {
    return a + b;
  }
  ```

- **Inline comments:** Small comments at end of code lines
  ```javascript
  let count = 0;  // Counter for iterations
  let TIMEOUT = 5000; // milliseconds
  ```

- **Block comments:** Multi-line comments for sections
  ```javascript
  /*
   * ============================================
   * User Authentication Module
   * ============================================
   */
  ```

---

## JSDoc Format (Professional)

JSDoc is an industry standard for documenting JavaScript code. Tools parse it to generate documentation and provide IDE support.

### JSDoc Tags

```javascript
/**
 * Fetches user data from server
 * 
 * @param {string} userId - The user's ID
 * @param {Object} options - Configuration options
 * @param {boolean} options.includeProfile - Include profile data
 * @returns {Promise<Object>} User data object
 * @throws {Error} If user not found
 * @deprecated Use fetchUserV2 instead
 * @author Raja Priyan
 * @version 1.0.0
 */
function getUser(userId, options = {}) {
  // implementation
}

/**
 * Configuration object
 * @typedef {Object} UserConfig
 * @property {string} username - Username for login
 * @property {string} password - User password
 * @property {boolean} rememberMe - Stay logged in
 */

/**
 * Register a new user
 * @param {UserConfig} config - User configuration
 * @returns {Promise<void>}
 */
async function registerUser(config) {
  // implementation
}
```

---

## Comment Best Practices

### Good Comments Explain WHY, Not WHAT

```javascript
// BAD - explains what (obvious from code)
let total = 0;  // Initialize total to 0
total += item.price;  // Add item price to total

// GOOD - explains why
let total = 0;  // Accumulate cart subtotal (excluding tax)
total += item.price;  // Add list price (discounts applied separately)
```

### Good Comments Document Decisions

```javascript
// Good comment - explains non-obvious decision
let retries = 3;  // Retry up to 3 times; HTTP 429 suggests server under load
// Bad comment - obvious
let name = "john";  // Set name to john
```

### Good Comments Warn About Gotchas

```javascript
// Good - warns about bug/limitation
// NOTE: This regex fails for emails with + signs (e.g., user+tag@example.com)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Good - explains cross-cutting dependency
// WARNING: Changing this constant affects pricing calculation in checkout
const TAX_RATE = 0.08;
```

---

## Common Mistakes

- **Mistake 1: Over-commenting obvious code**
  ```javascript
  // BAD - comments state obvious facts
  let x = 5;  // Set x to 5
  let y = x + 1;  // Add 1 to x and assign to y
  console.log(y);  // Print y to console
  
  // GOOD - let clear code speak for itself
  let totalAttempts = 5;
  let remainingAttempts = totalAttempts + 1;
  console.log(remainingAttempts);
  ```

- **Mistake 2: Outdated comments that contradict code**
  ```javascript
  // BAD - comment is wrong/outdated
  // Returns user age
  function getUserName(id) {  // Comment contradicts code!
    return users[id].name;
  }
  
  // GOOD - comment matches code
  // Returns user name or null if not found
  function getUserName(id) {
    return users[id]?.name || null;
  }
  ```

- **Mistake 3: Commented-out code left in repo**
  ```javascript
  // BAD - dead code clutters codebase
  // let oldVariableName = 5;
  // for (let i = 0; i < 10; i++) {
  //   console.log(oldVariableName);
  // }
  
  // GOOD - delete dead code (git history preserves it anyway)
  let currentVariableName = 5;
  ```

- **Mistake 4: Comments that repeat function names**
  ```javascript
  // BAD - redundant comment
  /**
   * Get user by ID
   */
  function getUserById(id) { }  // Function name already says this!
  
  // GOOD - comment adds information
  /**
   * Get user by ID from cache or server.
   * Caches result for 5 minutes to reduce API calls.
   */
  function getUserById(id) { }
  ```

- **Mistake 5: Improperly closed multi-line comments**
  ```javascript
  // BAD - unclosed comment
  /* Start of comment
  let x = 5;
  console.log(x);
  // Missing */ means everything after is commented!
  
  // GOOD
  /* Start of comment */
  let x = 5;
  console.log(x);
  ```

---

## Interview-Ready Definitions

**Comment:** Text in code ignored by JavaScript runtime. Used for explanation, documentation, and notes. Two main types: single-line (`//`) and multi-line (`/* */`).

**JSDoc:** Industry standard for documenting JavaScript code using structured comment blocks (`/** */`). Tools parse JSDoc to generate documentation and provide IDE autocomplete.

**Inline comment:** Short comment at end of code line using `//`. Best for brief clarifications without breaking code flow.

**Block comment:** Multi-line comment using `/* */`. Used for detailed explanations, licensing, or section headers.

**Dead code:** Commented-out code left in repository. Bad practice (use git history instead). Should be deleted.

---

## Tricky Interview Questions

1. **What's the difference between // and /*  */?**
   ```javascript
   // Single line comment - only current line
   /* Multi line - can span lines */
   ```
   - Answer: `//` comments rest of line only. `/* */` comments everything between delimiters, even multiple lines.

2. **Can comments be nested?**
   ```javascript
   /* Outer comment /* inner comment */ rest of outer */
   ```
   - Answer: No, JavaScript doesn't support nested `/* */` comments. Inner `*/` closes the outer comment, breaking code.

3. **Why is this bad?**
   ```javascript
   // FIXME: Old implementation, needs refactoring
   // let result = calculatePrice();
   function getPrice() { }
   ```
   - Answer: Dead commented-out code clutters repo and confuses maintainers. Use git history to recover old code, not comments.

4. **When should you use JSDoc?**
   - Answer: For public functions/APIs that others will use. Helps IDEs provide autocomplete and type hints. Unnecessary for obvious internal functions.

5. **Is this a good comment?**
   ```javascript
   let x = 5;  // Initialize x to 5
   ```
   - Answer: No, comment is obvious from code. Better comment would explain WHY: `let maxRetries = 5;  // HTTP 429 suggests retry`

6. **How do you document function parameters with JSDoc?**
   - Answer: Use `@param` tag with type and name: `@param {string} userId - The user's ID`

7. **Can JSDoc comments improve IDE support?**
   - Answer: Yes. IDEs parse JSDoc to provide autocomplete, type checking, and inline documentation hints.

8. **What's the problem with this comment?**
   ```javascript
   // Last modified: July 2026
   function calculateTotal() { }
   ```
   - Answer: Git history already tracks this. Don't use comments for version control info (wrong tool). Use git blame/log instead.

9. **Should comments explain the code or the problem?**
   - Answer: Problem/WHY, not code/WHAT. Code should be clear enough to understand WHAT. Comments explain WHY or non-obvious decisions.

10. **Is an empty comment block valid?**
    ```javascript
    /* */
    ```
    - Answer: Yes, valid. But pointless. Use only meaningful comments.

11. **Can you use HTML in JSDoc?**
    ```javascript
    /**
     * <strong>Important:</strong> Do not modify this value
     */
    ```
    - Answer: Yes, JSDoc supports HTML in descriptions. Some tools render it in documentation.

12. **What keyboard shortcut toggles comments in VS Code?**
    - Answer: Cmd+/ (Mac) or Ctrl+/ (Windows/Linux). Toggles single-line comments automatically.

---

## Deep Insights & Gotchas

- **Comments go stale fast:** Outdated comments are worse than no comments. If you refactor code, update comments too or delete them.

- **Code should document itself:** Good naming (`getUserName` not `gUN`) and clear structure reduce need for comments. Comments should augment, not replace clarity.

- **JSDoc enables type checking:** TypeScript and JSDoc type hints (`@param {string}`) provide IDE support even without TypeScript. Great for gradual migration.

- **Comments in different languages:** Mixed-language teams should use English for code comments (standard in most open-source).

- **Comment linting:** ESLint can enforce comment standards (require JSDoc for functions, ban commented-out code). Configure as needed.

---

## Summary

**Key Takeaway:** Use comments to explain WHY, not WHAT. Single-line (`//`) for brief notes, multi-line (`/* */`) for blocks, and JSDoc (`/** */`) for public API documentation. Avoid obvious comments, dead code, and outdated documentation. Let clear code speak for itself; comments should add information, not repeat it.


