# JavaScript Comments

## Overview

Comments are lines the JavaScript engine **ignores at execution time** — they exist purely for humans reading the source. JS supports two comment styles: single-line and multi-line (which also has a documentation-flavored variant, JSDoc). This note is based on `03_chapter_identifier/05_Comments.js`.

---

## 1. Reference Code

```javascript
// This is single comment this will be ignore 
// this line will be not executed

/*
 *  This is multi line
 *  Author : Raja Priyan
 *  Date : 19-Jul-2026
 */

/**
 *  This is multi line
 *  Author : Raja Priyan
 *  Date : 19-Jul-2026
 **/

var g = 10; // cmd + /, ctr + /
```

---

## 2. Single-Line Comments (`//`)

Everything from `//` to the end of the line is ignored.

```javascript
// This is single comment this will be ignore
var g = 10; // cmd + /, ctr + /   <-- inline comment after code
```

- Can appear on its own line, or trail after a statement on the same line.
- Only affects **that one line** — it does not extend to the next line, unlike multi-line comments.

---

## 3. Multi-Line Comments (`/* ... */`)

Everything between `/*` and `*/` is ignored, **regardless of how many lines it spans**.

```javascript
/*
 *  This is multi line
 *  Author : Raja Priyan
 *  Date : 19-Jul-2026
 */
```

- The leading `*` on each inner line is **not required by the language** — it's a stylistic convention that makes a comment block visually line up. Only the outer `/*` and `*/` matter to the parser.
- Multi-line comments **cannot be nested**: `/* outer /* inner */ still outer */` closes at the *first* `*/`, leaving `still outer */` as invalid/dangling code. This is a classic interview gotcha.

---

## 4. JSDoc-Style Comments (`/** ... */`)

A multi-line comment that starts with `/**` (two asterisks) instead of `/*` (one). Functionally identical to a regular block comment to the JS engine — the extra `*` is a **convention recognized by tooling** (VS Code IntelliSense, JSDoc generators, TypeScript) to render structured documentation, parameter hints, and type annotations.

```javascript
/**
 *  This is multi line
 *  Author : Raja Priyan
 *  Date : 19-Jul-2026
 **/
```

In real-world code this is typically used above functions to document parameters and return types:

```javascript
/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}
```

---

## 5. Keyboard Shortcuts

```javascript
var g = 10; // cmd + /, ctr + /
```

Most editors (VS Code included) toggle a **single-line comment** on the current line with:

- `Cmd + /` on macOS
- `Ctrl + /` on Windows/Linux

This inserts/removes `//`, not a block comment.

---

## 6. Why Comments Matter (and When Not to Use Them)

- Comments don't affect execution or performance at runtime in any meaningful way — the engine strips them during parsing.
- Good comments explain **why**, not **what** — the code itself should be readable enough to show *what* it does.
- Commented-out code (`// var pp = 34;`) is useful temporarily while experimenting, but should not be left in committed code long-term — it rots and confuses future readers.

---

## 7. Quick Reference

| Style | Syntax | Scope | Typical Use |
|---|---|---|---|
| Single-line | `// comment` | rest of the line | quick notes, disabling one line |
| Multi-line | `/* comment */` | until closing `*/`, spans lines | block explanations, headers |
| JSDoc | `/** comment */` | same as multi-line | function/class documentation, tooling hints |

---

## Summary

**Key Takeaway:** `//` comments out to the end of the current line; `/* */` comments out everything in between, however many lines it spans, but cannot be nested; `/** */` is syntactically the same as `/* */` but signals to tooling (IDEs, JSDoc, TypeScript) that it should be parsed as structured documentation.
