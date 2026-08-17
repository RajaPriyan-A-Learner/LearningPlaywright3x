# 04_Identifier_Rules_Part02 — JavaScript Naming Conventions and Best Practices

**File:** `03_chapter_identifier/04_Identifier_Rules_Part02.js`

## Overview

While JavaScript's syntax rules allow many identifier patterns, the JavaScript community follows specific naming conventions to improve code readability and communicate intent. This file demonstrates the major naming styles used in JavaScript: camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, and Hungarian Notation. Choosing the right convention makes code self-documenting and easier to maintain across teams.

---

## Naming Conventions — Style Guide

JavaScript community conventions distinguish between different types of identifiers. Following these makes code intentions clear without comments.

### Code Example

```javascript
// Variables and functions — camelCase
let userName = "camelCase";
let totalPrice = 99.99;
let isLoggedIn = true;
function getUserInfo() { return "camelCase"; }

// Classes and constructors — PascalCase
let UserProfile = "PascalCase";
let ShoppingCart = "class style";
function Person() { return "constructor"; }

// Module-level constants — SCREAMING_SNAKE_CASE
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "localhost";

// Private/internal variables — leading underscore
let _privateData = "internal";
let __internalOnly = "convention";

// Unused variable — single underscore
let _ = unusedValue();
```

### Key Points

- **camelCase:** Variables, functions, methods
  ```javascript
  let firstName = "Raja";          // variable
  let totalAmount = 99.99;         // variable
  let isActive = true;             // boolean variable
  function getUserName() { }       // function
  const obj = { getName() {} };    // method
  ```

- **PascalCase:** Classes, constructors, components
  ```javascript
  class UserProfile { }            // ES6 class
  function Person() { }            // constructor function
  const UserCard = () => { };      // React component
  ```

- **SCREAMING_SNAKE_CASE:** Constants (immutable values)
  ```javascript
  const MAX_SIZE = 100;
  const API_KEY = "secret123";
  const DATABASE_URL = "http://localhost";
  const DEFAULT_TIMEOUT = 5000;
  ```

- **snake_case:** Rare in JavaScript (Python style), sometimes in legacy code
  ```javascript
  let user_name = "value";    // Not recommended in modern JS
  let total_price = 49.99;    // Prefer camelCase instead
  ```

- **UPPER_SNAKE_CASE:** Environment variables, rarely used
  ```javascript
  const NODE_ENV = process.env.NODE_ENV;
  const FIREBASE_KEY = process.env.FIREBASE_KEY;
  ```

---

## Convention Comparison Table

| Convention | Use Case | Example | Modern Usage |
|-----------|----------|---------|--------------|
| **camelCase** | Variables, functions, methods | `userName`, `getTotalPrice()` | ✅ Standard |
| **PascalCase** | Classes, constructors, components | `UserProfile`, `Person()` | ✅ Standard |
| **SCREAMING_SNAKE_CASE** | Constants | `MAX_SIZE`, `API_KEY` | ✅ Standard |
| **snake_case** | Variables (rare) | `user_name` | ❌ Avoid in JS |
| **Hungarian Notation** | Type prefix | `strName`, `bActive` | ❌ Outdated |

---

## Hungarian Notation (Historical)

Older style prefixing variables with type indicators:

```javascript
// Old Hungarian Notation (NOT recommended)
let strName = "string";      // str = string
let bActive = true;          // b = boolean
let nCount = 5;              // n = number
let arrItems = [];           // arr = array
let objUser = {name: ""};    // obj = object
let fnCallback = () => {};   // fn = function
```

**Why avoid:**
- TypeScript now provides type information
- IDE autocomplete shows types
- Makes refactoring harder (if string becomes number, variable name wrong)
- Less readable (extra prefix noise)
- Not JavaScript convention

---

## Common Mistakes

- **Mistake 1: Mixing conventions in same codebase**
  ```javascript
  // BAD - inconsistent
  let userName = "john";       // camelCase
  let user_age = 25;           // snake_case
  let UserAddress = "123 St";  // PascalCase (should be camelCase)
  
  // GOOD - consistent
  let userName = "john";
  let userAge = 25;
  let userAddress = "123 St";
  ```

- **Mistake 2: Using Hungarian Notation in modern code**
  ```javascript
  // BAD - outdated
  let strUserName = "john";
  let nUserAge = 25;
  let arrUsers = [];
  
  // GOOD - modern
  let userName = "john";
  let userAge = 25;
  let users = [];
  ```

- **Mistake 3: Non-boolean names for boolean variables**
  ```javascript
  // BAD - unclear
  let user = false;
  let data = true;
  let status = false;
  
  // GOOD - clear boolean intent
  let isLoggedIn = false;
  let hasPermission = true;
  let isActive = false;
  ```

- **Mistake 4: Using PascalCase for non-class variables**
  ```javascript
  // BAD - suggests it's a class
  let User = userData();      // Should be variable
  let ApiResponse = fetch();  // Should be variable
  
  // GOOD
  let user = userData();
  let apiResponse = fetch();
  ```

- **Mistake 5: Unclear constant names**
  ```javascript
  // BAD - too vague
  const MAX = 100;
  const KEY = "abc";
  
  // GOOD - specific
  const MAX_CONNECTIONS = 100;
  const API_KEY = "abc";
  const DATABASE_URL = "localhost";
  ```

---

## Interview-Ready Definitions

**Naming Convention:** Agreed-upon style for writing identifiers that communicates meaning and intent to other developers. JavaScript community uses specific conventions per identifier type.

**camelCase:** Naming style where first word is lowercase and subsequent words are capitalized without separators. Standard for JavaScript variables and functions.

**PascalCase:** Naming style where each word starts with uppercase and no separators. Standard for JavaScript classes and constructors.

**SCREAMING_SNAKE_CASE:** Naming style where all letters are uppercase separated by underscores. Used for constants (immutable values).

**Hungarian Notation:** Outdated practice of prefixing variables with type indicator (str, n, arr). Avoided in modern JavaScript.

**Boolean prefix convention:** Naming boolean variables with `is`, `has`, `can`, `should` prefix to clearly indicate boolean type.

---

## Tricky Interview Questions

1. **Why use camelCase for variables but PascalCase for classes?**
   - Answer: Convention signals intent to other developers. PascalCase indicates "this is constructible/class-like." Instantly recognizable without reading implementation.

2. **Should constants use PascalCase or SCREAMING_SNAKE_CASE?**
   ```javascript
   const ApiKey = "secret";      // PascalCase?
   const API_KEY = "secret";     // SCREAMING_SNAKE_CASE?
   ```
   - Answer: SCREAMING_SNAKE_CASE for true constants (compile-time values). PascalCase only if it's a class or constructor.

3. **Is Hungarian Notation used in modern JavaScript?**
   - Answer: No. Outdated practice. TypeScript provides type information. Modern IDEs show types in autocomplete. Avoid it.

4. **How do you name a boolean variable?**
   ```javascript
   let active = true;         // Unclear
   let isActive = true;       // Clear
   let canDelete = false;     // Clear
   ```
   - Answer: Use `is`, `has`, `can`, `should` prefix. Makes boolean type instantly obvious.

5. **What's wrong with this?**
   ```javascript
   let MyVariableName = "value";
   ```
   - Answer: Should be `myVariableName` (camelCase, not PascalCase). PascalCase reserved for classes/constructors.

6. **Should private variables have special naming?**
   ```javascript
   let privateData = "secret";
   let _privateData = "secret";
   ```
   - Answer: Convention uses leading underscore `_privateData` to signal "don't use from outside." No technical enforcement (use `#` for true privacy).

7. **Why is this problematic?**
   ```javascript
   let user = getUser();           // user is function?
   let getUserData = userData;     // getUserData is data?
   ```
   - Answer: Names don't match reality. First suggests variable might be function. Second suggests function. Confusing and unmaintainable.

8. **When is SCREAMING_SNAKE_CASE appropriate?**
   - Answer: Only for module-level constants that won't change. Not for const objects/arrays (which are mutable). Example: `const MAX_RETRIES = 3;` not `const USER = {};`.

9. **Is this valid JavaScript?**
   ```javascript
   let $var = 1;
   let $VAR = 2;
   let $Var = 3;
   ```
   - Answer: Yes, all valid (case-sensitive). But poor practice. Using $ without convention (jQuery/framework) is confusing.

10. **Should environment variables follow camelCase?**
    ```javascript
    const apiKey = process.env.API_KEY;
    const API_KEY = process.env.API_KEY;
    ```
    - Answer: Env vars are SCREAMING_SNAKE_CASE externally (`API_KEY`), but store in const with appropriate casing: `const apiKey = process.env.API_KEY;`

11. **What's the difference between const and capitalized naming?**
    ```javascript
    const user = { name: "john" };      // lowercase const
    const USER = { name: "john" };      // uppercase const
    ```
    - Answer: SCREAMING_SNAKE_CASE only for immutable primitives/values. Objects/arrays are mutable, so `const user = {}` even though const.

12. **Why avoid snake_case in JavaScript?**
    - Answer: Not community convention. Python uses it, JavaScript uses camelCase. Mixing standards creates confusion in polyglot teams.

---

## Deep Insights & Gotchas

- **Naming conventions don't affect functionality:** `userName` and `user_name` work identically. Conventions are purely communicative—help humans, not the engine.

- **TypeScript changes naming:** With TypeScript, some teams add type suffixes: `userResponse`, `userDto`, `userApi`. But still camelCase.

- **React component naming:** React components must be PascalCase or they won't render as components (treated as HTML tags). `<userProfile>` fails, `<UserProfile>` works.

- **Library conventions differ:** Some libraries use different conventions (e.g., React Router uses camelCase for hook names `useHistory`). Learn library standards.

- **Boolean prefixes aren't enforced:** `let active = true;` is valid but less clear than `let isActive = true;`. Linters can warn about missing prefixes.

---

## Summary

**Key Takeaway:** JavaScript conventions use camelCase for variables/functions, PascalCase for classes/constructors, and SCREAMING_SNAKE_CASE for constants. Following conventions improves code readability and communicates intent without comments. Avoid outdated Hungarian Notation and non-standard patterns like snake_case in JavaScript.


