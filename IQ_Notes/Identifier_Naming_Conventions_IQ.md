# JavaScript Naming Conventions

## Overview

Beyond the hard syntax rules of what makes a *legal* identifier, JavaScript developers follow **naming conventions** — community/style agreements about how identifiers *should* look depending on what they represent (a variable, a class, a constant, etc.). Conventions are not enforced by the parser; breaking them won't throw an error, but breaking them makes code harder to read and signals unfamiliarity with idiomatic JS. This note is based on `03_chapter_identifier/04_Identifier_Rules_Part02.js`.

---

## 1. Reference Code

```javascript
var name = "Raja";

var firstName = "Raja";
var This_is_a_very_long_name_variable = "Raja";
var lastName = "Priyan"; // CamelCase

// Naming Conventions (Cases)
// ============================================
// 1. camelCase (standard for JS variables and functions)
let userName = "camelCase";
let totalPrice = 99.99;
let isLoggedIn = true;

// 2. PascalCase (standard for JS classes and constructors)
let UserProfile = "PascalCase";
let ShoppingCart = "class name style";

// 3. snake_case (underscore separated)
let user_name = "snake_case";
let total_price = 49.99;
let is_logged_in = false;

// 4. SCREAMING_SNAKE_CASE (constants)
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "localhost";

// 5. Hungarian Notation (prefix with type - older style)
let strName = "string prefix";
let bActive = true;       // boolean
let nCount = 5;           // number
let arrItems = [];        // array

let strFirstName = "raja";
```

---

## 2. camelCase — Variables & Functions

The **default convention** for JS variables, function names, and object properties. First word lowercase, every subsequent word capitalized, no separators.

```javascript
let userName = "camelCase";
let totalPrice = 99.99;
let isLoggedIn = true;
```

Used because it's the convention baked into the language's own built-ins (`toString`, `getElementById`, `addEventListener`).

---

## 3. PascalCase — Classes & Constructors

Every word capitalized, including the first. Reserved by convention for **classes, constructor functions, and components** (e.g., React).

```javascript
let UserProfile = "PascalCase";
let ShoppingCart = "class name style";

function Person() { /* constructor */ }
class Animal { /* class */ }
```

**Interview tip:** PascalCase signals "this is `new`-able" — if you see `new UserProfile()`, the capital letter is what tells a reader that `UserProfile` is meant to be instantiated, not called as a plain function.

---

## 4. snake_case — Underscore Separated

Words separated by underscores, all lowercase. Rare in idiomatic JS variable naming (more common in Python, Ruby, or database column names), but you'll see it in JSON payloads from APIs (especially Python/Ruby backends) or config keys.

```javascript
let user_name = "snake_case";
let total_price = 49.99;
let is_logged_in = false;
```

---

## 5. SCREAMING_SNAKE_CASE — Constants

All uppercase, words separated by underscores. Signals a value that is **fixed and should never be reassigned** — almost always paired with `const`.

```javascript
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "localhost";
```

This is purely conventional — `const maxSize = 100` is just as valid syntactically — but SCREAMING_SNAKE_CASE lets a reader spot "this is a configuration constant" at a glance, without checking its declaration.

---

## 6. Hungarian Notation — Type-Prefixed (Legacy)

Prefixes the variable name with an abbreviation of its type (`str`, `b`/`is`, `n`, `arr`). Common in older C/C++ and pre-ES6 JavaScript codebases, largely **discouraged today** because:

- Modern editors/TypeScript show inferred types automatically.
- The prefix can go stale if the variable's type changes (`strName` reassigned to a number).

```javascript
let strName = "string prefix";
let bActive = true;       // boolean
let nCount = 5;           // number
let arrItems = [];        // array
```

---

## 7. Anti-Pattern: Overly Long / Unclear Names

```javascript
var This_is_a_very_long_name_variable = "Raja";
```

This mixes PascalCase and snake_case and is needlessly long — a naming smell. Good identifiers are **descriptive but concise** (`firstName`, not `This_is_a_very_long_name_variable`).

---

## 8. Convention Cheat Sheet

| Convention | Example | Typical Use |
|---|---|---|
| camelCase | `userName` | variables, functions, object properties |
| PascalCase | `UserProfile` | classes, constructors, React components |
| snake_case | `user_name` | API/JSON payloads, DB columns, config files |
| SCREAMING_SNAKE_CASE | `MAX_SIZE` | constants (`const`) |
| Hungarian notation | `strName`, `bActive` | legacy/pre-TypeScript codebases |

---

## Summary

**Key Takeaway:** All five styles are *syntactically* valid identifiers — JavaScript doesn't care which one you pick. What matters is **consistency and semantic signaling**: camelCase for variables/functions, PascalCase for anything `new`-able, SCREAMING_SNAKE_CASE for true constants, and snake_case reserved mostly for data coming from non-JS systems. Mixing conventions in the same name (like `This_is_a_very_long_name_variable`) is a readability smell, not a syntax error. See also [[Identifier_Rules_Basics_IQ]] for the hard rules on what makes an identifier legal in the first place.
