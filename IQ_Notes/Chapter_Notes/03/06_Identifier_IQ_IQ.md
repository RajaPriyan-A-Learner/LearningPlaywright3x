# 06_Identifier_IQ — Complete Identifier Rules, Keywords, and Unicode

**File:** `03_chapter_identifier/06_Identifier_IQ.js`

## Overview

This comprehensive file consolidates all JavaScript identifier rules: what characters are legal, reserved keywords that cannot be used as identifiers, Unicode support for international characters, naming conventions for different identifier types, and case sensitivity. It serves as an interview-ready reference for identifier best practices, covering both syntax rules (what JavaScript enforces) and style conventions (what the community follows).

---

## Complete Identifier Rules Summary

JavaScript identifiers follow strict syntax rules combined with community conventions. This file demonstrates all aspects comprehensively.

### Code Example

```javascript
// ============================================
// Valid Identifier Patterns
// ============================================

let validName = "starts with letter";
let _private = "starts with underscore";
let $jquery = "starts with dollar sign";

let item1 = "letter then digit";
let _temp2 = "underscore then digit";
let $var123 = "dollar then digits";
let a1_b2 = "mixed letters digits underscore";

// INVALID (causes SyntaxError)
// let 1stPlace = "invalid";      // Can't start with digit
// let 2ndItem = "invalid";       // SyntaxError: Invalid or unexpected token
// let my-name = "invalid";       // Hyphen not allowed
// let my name = "invalid";       // Spaces not allowed
// let my@name = "invalid";       // @ not allowed
// let my#name = "invalid";       // # not allowed
// let my!name = "invalid";       // ! not allowed

// ============================================
// Reserved Keywords (Can't Use as Names)
// ============================================

// INVALID - reserved keywords
// let class = "invalid";
// let const = "invalid";
// let function = "invalid";
// let return = "invalid";
// let if = "invalid";

// VALID - capitalized versions not reserved
let Function = "valid";    // F capitalized OK
let Return = "valid";      // R capitalized OK
let ClassName = "valid";   // Not 'class'

// ============================================
// Case Sensitivity (Different Variables)
// ============================================

let MyVar = "uppercase M";
let myvar = "lowercase v";
// MyVar and myvar are TWO different variables

// ============================================
// Unicode Support
// ============================================

let cafe = "Unicode letter e";      // Unicode characters allowed
let var_chinese = "Chinese characters";     // Chinese allowed
let A = "Unicode escape for A"; // A is 'A'
let _ = "Unicode escape for _"; // _ is '_'

// ============================================
// Naming Conventions by Type
// ============================================

// Variables and functions - camelCase
let userName = "camelCase";
let totalPrice = 99.99;
let isLoggedIn = true;
function getUserInfo() { return "function camelCase"; }

// Classes and constructors - PascalCase
let UserProfile = "PascalCase";
let ShoppingCart = "class name style";
function Person() { return "constructor"; }

// Constants - SCREAMING_SNAKE_CASE
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "localhost";

// Private/internal - leading underscore
let _privateData = "internal use";
let __internalOnly = "special";
```

### Key Points

- **Syntax rules (enforced by JavaScript engine):**
  - First character: letter, underscore, or dollar sign
  - Subsequent: letters, digits, underscores, dollar signs
  - No spaces, hyphens, or special characters allowed
  - Case-sensitive (Name ≠ name)

- **Reserved keywords (can't use at all):**
  ```javascript
  // Actual reserved keywords
  class, const, function, return, if, else, for, while, do, switch, case,
  try, catch, finally, throw, new, this, super, extends, implements, interface,
  package, private, protected, public, static, await, async, yield, let, var
  ```

- **Convention rules (community standards):**
  ```javascript
  // Variables/functions: camelCase
  let userName, getTotalPrice, isActive
  
  // Classes/constructors: PascalCase
  class UserProfile, function Person()
  
  // Constants: SCREAMING_SNAKE_CASE
  const MAX_SIZE, API_KEY, DATABASE_URL
  
  // Private: leading underscore
  let _privateData, _internalMethod()
  ```

- **Unicode support (modern JavaScript):**
  ```javascript
  let cafe = "accented letters OK";
  let variable = "Japanese OK";
  let var_cn = "Chinese OK";
  let emoji_var = "some unicode OK";
  ```

- **Case sensitivity matters:**
  ```javascript
  let name = "lowercase";
  let Name = "uppercase";
  // These are TWO different variables - easy to cause bugs!
  ```

---

## Reserved Keywords (Can't Use)

### Strict Keywords (Always Reserved)
```javascript
class, const, function, return, if, else, for, while, break, continue,
do, switch, case, default, try, catch, finally, throw, new, this
```

### Contextual Keywords (Reserved in certain contexts)
```javascript
let, var, async, await, yield, static, extends, implements, interface,
package, private, protected, public, super
```

### Important Note on Capitalization
```javascript
let class = "INVALID";     // 'class' is reserved
let Class = "VALID";       // 'Class' (capitalized) not reserved
let FUNCTION = "VALID";    // 'FUNCTION' not reserved (keyword is lowercase)
let Function = "VALID";    // 'Function' not reserved (constructor exists)
```

---

## Valid vs Invalid Patterns

| Pattern | Valid? | Example | Reason |
|---------|--------|---------|--------|
| Start with letter | ✅ | `let name` | Standard rule |
| Start with `_` | ✅ | `let _private` | Convention for private |
| Start with `$` | ✅ | `let $jquery` | jQuery/framework convention |
| Start with digit | ❌ | `let 1name` | Ambiguous (could be number) |
| Contain space | ❌ | `let my name` | Breaks parsing |
| Contain hyphen | ❌ | `let my-name` | Reserved for minus operator |
| Contain special char (@,#,!) | ❌ | `let my@name` | Invalid syntax |
| Reserved keyword | ❌ | `let class` | Can't use keywords |
| Unicode letters | ✅ | `let cafe` | Modern support |
| Uppercase/lowercase differ | ✅ | `Name` vs `name` | Case-sensitive |

---

## Common Mistakes

- **Mistake 1: Using reserved keywords**
  ```javascript
  // WRONG
  let class = "student";
  let function = "getValue";
  let return = 5;
  
  // RIGHT - capitalize or rename
  let className = "student";
  let functionName = "getValue";
  let returnValue = 5;
  ```

- **Mistake 2: Confusing uppercase/lowercase**
  ```javascript
  // WRONG - creates 2 variables, likely bug
  let name = "John";
  let Name = "Jane";
  
  // RIGHT - consistent naming
  let firstName = "John";
  let lastName = "Jane";
  ```

- **Mistake 3: Starting with digits**
  ```javascript
  // WRONG
  let 1stPlace = "gold";
  let 2ndPlace = "silver";
  
  // RIGHT
  let firstPlace = "gold";
  let secondPlace = "silver";
  ```

- **Mistake 4: Using hyphens (not underscores)**
  ```javascript
  // WRONG - hyphen not allowed
  let user-name = "john";
  let total-price = 99.99;
  
  // RIGHT
  let user_name = "john";  // or userName (camelCase)
  let total_price = 99.99; // or totalPrice (camelCase)
  ```

- **Mistake 5: Unicode for unclear reasons**
  ```javascript
  // WRONG - confusing in international teams
  let username_intl = "userdata";
  let nombre_local = "name";
  
  // RIGHT - stick to ASCII
  let username = "userdata";
  let nombre = "name";
  ```

---

## Interview-Ready Definitions

**Identifier:** Name for variables, functions, classes, labels. Must follow JavaScript syntax rules and avoid reserved keywords.

**Reserved Keyword:** Word that JavaScript reserves for language features and can never be used as identifier (e.g., `class`, `function`, `return`).

**Syntax Rule:** Enforced by JavaScript parser. Breaking rule causes SyntaxError immediately.

**Convention:** Community standard that doesn't cause errors but improves code readability (e.g., camelCase for variables).

**Temporal Dead Zone (TDZ):** Period from block start to `let`/`const` declaration. Accessing variable in TDZ throws ReferenceError.

**Unicode Escape Sequence:** Represents Unicode character using escape format.

---

## Tricky Interview Questions

1. **What's wrong with this?**
   ```javascript
   let 1stPlace = "winner";
   ```
   - Answer: Can't start with digit. Must be letter, underscore, or dollar sign.

2. **Are these valid?**
   ```javascript
   let class = "invalid";
   let Class = "valid";
   let CLASS = "valid";
   ```
   - Answer: Only last two. `class` is reserved keyword (case-sensitive), but `Class` and `CLASS` not reserved.

3. **How many different variables?**
   ```javascript
   let name = "john";
   let Name = "jane";
   let NAME = "bob";
   ```
   - Answer: 3 different variables. JavaScript is case-sensitive. Bad practice to rely on this.

4. **Why can't we use hyphens?**
   ```javascript
   let my-name = "value";  // Error?
   ```
   - Answer: Hyphen is minus operator in JavaScript. Parser interprets as `let my` minus `name`, causing SyntaxError.

5. **What's the difference between these?**
   ```javascript
   let _unused = getValue();
   let unused = getValue();
   ```
   - Answer: Convention difference. Underscore `_` signals intentionally unused (common pattern). Linters won't warn about unused.

6. **Can I use Unicode?**
   ```javascript
   let cafe = "coffee";
   let variable = "variable";
   ```
   - Answer: Yes, technically valid for Unicode letters. But avoid for internationalization and team clarity. Stick to ASCII.

7. **Reserved or not?**
   ```javascript
   let function = "data";      // Reserved?
   let Function = "data";      // Reserved?
   let myFunction = "data";    // Reserved?
   ```
   - Answer: First invalid (keyword). Other two valid (not exact keyword match).

8. **What does $ mean?**
   ```javascript
   let $variable = "jquery";
   let $state = "svelte";
   let $price = "value";
   ```
   - Answer: Convention borrowed from jQuery, now used in reactive frameworks. Not special to language; just naming convention.

9. **Does case sensitivity affect functions?**
   ```javascript
   let userName = "john";
   let UserName = "jane";
   function getUserName() { }
   function getUsername() { }
   ```
   - Answer: Yes, all 4 are different identifiers. getUserName and getUsername are different functions.

10. **What's contextual keyword?**
    ```javascript
    let let = 5;        // Valid or invalid?
    let let = 5;        // Variable name 'let'
    ```
    - Answer: Invalid. `let` is always reserved (not contextual). `let`, `async`, `yield` are always reserved.

11. **How do you distinguish variables by case?**
    ```javascript
    let myVar = "lower v";
    let MyVar = "upper V";
    ```
    - Answer: Both valid but poor practice. They're different variables, confusing to maintain. Use explicit names instead.

12. **Reserved words grow with new standards?**
    - Answer: Yes. `async`, `await` added in ES2017. Future ES versions may add more. Be conservative with naming.

---

## Deep Insights & Gotchas

- **Reserved keywords are case-sensitive:** `class` reserved, but `Class` not. Capitalizing reserved keyword gives valid identifier (poor practice for clarity).

- **Identifier starts determine parsing:** JavaScript parser checks first character to determine if it's identifier or expression. `1name` looks like number, causes error.

- **Unicode in identifiers works but confuses teams:** While valid, non-ASCII identifiers create friction in international teams and reduce tooling compatibility. Avoid.

- **Underscore convention isn't enforced:** Leading underscore is pure convention. No privacy guarantees. Use `#` for actual private fields in classes.

- **Case sensitivity is silent bug source:** Wrong case doesn't error; it creates new variable. Hard to debug: `userName` vs `username` looks similar visually.

- **Reserved words grow with new standards:** `async`, `await` added in ES2017. Future ES versions may add more. Be conservative with naming.

---

## Summary

**Key Takeaway:** Identifiers must follow strict syntax rules (start with letter/underscore/dollar sign, no spaces/special chars) and avoid reserved keywords. JavaScript is case-sensitive and supports Unicode, but community conventions (camelCase for variables, PascalCase for classes, SCREAMING_SNAKE_CASE for constants) improve readability and prevent bugs. Master both syntax rules and conventions for interview-ready JavaScript.

