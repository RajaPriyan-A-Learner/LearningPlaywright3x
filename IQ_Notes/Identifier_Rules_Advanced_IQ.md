# JavaScript Identifier Rules — Advanced (Unicode, Keywords, Conventions)

## Overview

This note builds on [[Identifier_Rules_Basics_IQ]] and covers the edge cases most likely to come up in an interview: reserved keywords, Unicode identifiers, Unicode escape sequences, and a consolidated view of naming conventions. Based on `03_chapter_identifier/06_Identifier_IQ.js`.

---

## 1. Reference Code

```javascript
let validName = "starts with letter";
let _private = "starts with underscore";
let $jquery = "starts with dollar sign";

let item1 = "letter then digit";
let _temp2 = "underscore then digit";
let $var123 = "dollar then digits";
let a1_b2 = "mixed letters digits underscore";

//let 1stPlace = "invalid";
//let 2ndItem = "invalid"; // SyntaxError: Invalid or unexpected token

// Keyword
// let class = "invalid";
// let const = "invalid";
//let function = "invalid";
let Function = "invalid";

let MyVar = "uppercase M";
let myvar = "lowercase v";

// Unicode letters and Unicode escape sequences are allowed
let café = "Unicode letter é";
let 变量 = "Chinese characters";
let A = "Unicode escape for A";
let _ = "Unicode escape for _";

// let my-name = "invalid";
// let my name = "invalid";      // SyntaxError: Unexpected identifier
// let my@name = "invalid";      // SyntaxError: Unexpected token '@'
// let my#name = "invalid";      // SyntaxError: Unexpected token '#'
// let my!name = "invalid";      // SyntaxError: Unexpected token '!'
```

---

## 2. Reserved Keywords Cannot Be Identifiers

JavaScript reserves certain words for the language's own syntax (`class`, `const`, `function`, `let`, `if`, `for`, `return`, etc.). These **cannot** be used as identifier names.

```javascript
// let class = "invalid";     // SyntaxError: Unexpected token 'class'
// let const = "invalid";     // SyntaxError: Missing initializer in const declaration
// let function = "invalid";  // SyntaxError: Unexpected token 'function'
```

**Case sensitivity saves the day here too:** `Function` (capital F) is *not* a reserved word — only the lowercase `function` is — so it's a perfectly legal (if confusing) identifier.

```javascript
let Function = "invalid"; // actually VALID — different from the `function` keyword
```

This is a good interview trap: it tests whether you understand that JS keywords are matched **exactly**, case-sensitively.

---

## 3. Unicode Identifiers

The ECMAScript spec defines identifiers in terms of the Unicode `ID_Start` / `ID_Continue` character categories, not just ASCII `a-z`. This means **letters from non-English alphabets are valid** in identifiers.

```javascript
let café = "Unicode letter é";      // valid — é is a Unicode letter
let 变量 = "Chinese characters";     // valid — Chinese characters are Unicode letters
```

This is rarely used in real codebases (English identifiers are the near-universal convention for maintainability across teams), but it's legal and worth knowing for trivia-style interview questions.

---

## 4. Unicode Escape Sequences in Identifiers

You can even write an identifier character as a **Unicode escape sequence** (`\uXXXX`), and the engine will decode it as if you'd typed the literal character.

```javascript
let A = "Unicode escape for A";  // A is 'A' → same as `let A = ...`
let _ = "Unicode escape for _";  // _ is '_' → same as `let _ = ...`
```

- `A` decodes to the letter `A`.
- `_` decodes to the underscore `_`.

Since these decode to *already-valid* identifier characters, `let A = ...` is functionally identical to `let A = ...`. This only works because `A` and `_` are themselves legal identifier characters — you couldn't escape your way into using a space or `@`.

---

## 5. What Still Breaks — Symbols and Whitespace

Unicode support extends to *letters*, not arbitrary symbols. These remain illegal:

```javascript
// let my-name = "invalid";   // '-' parsed as subtraction operator
// let my name = "invalid";   // space splits into two tokens — SyntaxError: Unexpected identifier
// let my@name = "invalid";   // SyntaxError: Unexpected token '@'
// let my#name = "invalid";   // SyntaxError: Unexpected token '#'
// let my!name = "invalid";   // SyntaxError: Unexpected token '!'
```

Also illegal — a digit as the very first character:

```javascript
//let 1stPlace = "invalid";   // SyntaxError: Invalid or unexpected token
//let 2ndItem = "invalid";    // SyntaxError: Invalid or unexpected token
```

---

## 6. Naming Conventions Recap

The same file also re-demonstrates the five conventional naming styles (covered in depth in [[Identifier_Naming_Conventions_IQ]]):

```javascript
// camelCase — variables & functions
let userName = "camelCase";
function getUserInfo() { return "function camelCase"; }

// PascalCase — classes & constructors
let UserProfile = "PascalCase";
function Person() { return "constructor"; }

// snake_case — underscore separated
let user_name = "snake_case";

// SCREAMING_SNAKE_CASE — constants
const MAX_SIZE = 100;
```

---

## 7. Quick Reference — Valid vs Invalid

| Identifier | Valid? | Reason |
|---|---|---|
| `validName`, `_private`, `$jquery` | ✅ | starts with letter / `_` / `$` |
| `item1`, `_temp2`, `$var123`, `a1_b2` | ✅ | digits allowed after first character |
| `Function` | ✅ | capital F ≠ reserved keyword `function` |
| `café`, `变量` | ✅ | Unicode letters allowed |
| `A`, `_` | ✅ | Unicode escapes decode to valid letters |
| `1stPlace`, `2ndItem` | ❌ | starts with a digit |
| `class`, `const`, `function` (lowercase) | ❌ | reserved keywords |
| `my-name`, `my name`, `my@name`, `my#name`, `my!name` | ❌ | illegal symbol or whitespace |

---

## Summary

**Key Takeaway:** Beyond the basic "letter/`_`/`$` then letters/digits/`_`/`$`" rule, JavaScript identifiers also permit Unicode letters (`café`, `变量`) and Unicode escape sequences (`A`) because the spec defines identifier characters in terms of Unicode categories, not plain ASCII. Reserved keywords like `function`, `class`, and `const` can never be identifiers — but keyword matching is case-sensitive, so `Function` (capitalized) is fair game. No amount of Unicode cleverness makes symbols like `-`, `@`, `#`, `!`, or whitespace legal inside an identifier.
