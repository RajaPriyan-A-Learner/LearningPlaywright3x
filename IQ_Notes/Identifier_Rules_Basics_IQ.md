# JavaScript Identifier Rules — Basics

## Overview

An **identifier** is the name given to a variable, function, class, or property in JavaScript. Not every string can be used as an identifier — the language enforces specific rules about which characters are allowed and where. This note is based on `03_chapter_identifier/03_Identifier_Rules_Part01.js`.

---

## 1. Reference Code

```javascript
var a = 10;
console.log(a);

var $ = 10;
var _a = 23;
var pp = 34;

var ab123 = 23;
// var 45 = 34;
var _ = 10;

var Name = "raja";
var name = "priyan";

// var pramod dutta = "hello";
var raja_priyan = "hello";
var raja$priyan = "hello";
var rajapriyan1134 = "hello";
```

---

## 2. The Core Rule

A valid JavaScript identifier must:

- **Start with** a letter (`a-z`, `A-Z`), an underscore (`_`), or a dollar sign (`$`).
- **Continue with** letters, digits (`0-9`), underscores, or dollar signs.
- **Never start with a digit.**
- **Never contain** spaces or symbols like `-`, `@`, `#`, `!`, etc.

```javascript
var $ = 10;        // valid — $ alone is a legal identifier
var _a = 23;        // valid — starts with underscore
var _ = 10;          // valid — underscore alone is a legal identifier
var ab123 = 23;     // valid — letters followed by digits

// var 45 = 34;     // INVALID — SyntaxError: cannot start with a digit
```

---

## 3. Why `$` and `_` Are Special

Both `$` and `_` behave like letters for identifier purposes. This is a deliberate design choice in the ECMAScript spec so that:

- Libraries like jQuery could use `$` as a function name (`$("#id")`).
- Frameworks/tools use `_` for "private-by-convention" variables (`_a`) or as the lodash namespace.

```javascript
var raja$priyan = "hello";   // $ allowed in the middle
var raja_priyan = "hello";   // _ allowed in the middle
```

---

## 4. Case Sensitivity

JavaScript identifiers are **case-sensitive** — `Name` and `name` are two completely different variables.

```javascript
var Name = "raja";
var name = "priyan";

console.log(Name); // "raja"
console.log(name); // "priyan"
```

This is a common interview trap: beginners assume `Name` and `name` collide, but they don't — this is also the technical basis for why PascalCase (`Name`, class-style) and camelCase (`name`, variable-style) can coexist as separate conventions.

---

## 5. What Is NOT Allowed

| Attempt | Why it fails |
|---|---|
| `var 45 = 34;` | Starts with a digit — `SyntaxError` |
| `var pramod dutta = "hello";` | Contains a space — parsed as two tokens, `SyntaxError: Unexpected identifier` |
| `var my-name = "x";` | `-` is interpreted as the subtraction operator |
| `var my@name = "x";` | `@` is not a valid identifier character |

Spaces and most symbols break the identifier because the JS parser reads them as separate tokens or operators, not as part of a name.

---

## 6. Valid vs Invalid — Quick Reference

| Identifier | Valid? | Reason |
|---|---|---|
| `$` | ✅ | `$` alone is legal |
| `_a` | ✅ | starts with `_` |
| `_` | ✅ | `_` alone is legal |
| `ab123` | ✅ | letters then digits |
| `raja_priyan` | ✅ | `_` allowed mid-name |
| `raja$priyan` | ✅ | `$` allowed mid-name |
| `rajapriyan1134` | ✅ | letters then digits |
| `45` | ❌ | starts with a digit |
| `pramod dutta` | ❌ | contains a space |

---

## Summary

**Key Takeaway:** A JavaScript identifier must start with a letter, `$`, or `_`, and every character in it (start or middle) must be a letter, digit, `$`, or `_`. Digits can appear anywhere except the first position, and identifiers are case-sensitive, so `Name` and `name` are unrelated variables. Anything with a space or an operator-like symbol (`-`, `@`, `#`, `!`) is not a valid identifier and will throw a `SyntaxError`.
