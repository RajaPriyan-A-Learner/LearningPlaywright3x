# JavaScript Quirks & Known "Bugs" — Master Reference

A consolidated list of every historical bug, spec quirk, and surprising behavior demonstrated across the chapters covered so far (`01_chapter_javascript` → `05_chapter_Operator`) and their accompanying `IQ_Notes`. Each entry links back to the detailed note where it's explained in full.

Most of these aren't "bugs" a browser will ever fix — they're either baked into the ECMAScript spec for backward compatibility, or emergent behavior from how JS resolves types, scope, and equality. Knowing *why* each one happens (not just that it happens) is what interviewers actually test for.

---

## 1. Type System Quirks

### 1.1 `typeof null === "object"`

The single most famous bug in JavaScript. `null` is a **primitive**, not an object — but `typeof null` has returned `"object"` since JS's first release in 1995, due to a bug in the original implementation (values were type-tagged by a low bit pattern, and `null` accidentally shared the object tag). It has never been fixed because doing so would break an unknown amount of existing code on the web.

```javascript
console.log(typeof null); // "object"  ❌ misleading — null is NOT an object
```

**Correct way to check for `null`:** always use `value === null`, never `typeof value === "object"`.

→ [[08_Null_vs_Undefined]], [[07_Literals_and_Numbers_IQ]]

### 1.2 `typeof NaN === "number"`

`NaN` ("Not a Number") is, ironically, of type `"number"`. It represents an invalid numeric result, not the absence of the `number` type.

```javascript
console.log(0 / 0);          // NaN
console.log(typeof NaN);     // "number"
```

→ [[07_Literals_and_Numbers_IQ]]

### 1.3 `typeof undefined === "undefined"` but `undefined` isn't a literal

`undefined` is the automatic value JS assigns to a declared-but-unassigned variable — there is no `undefined` token you're "writing" the way you write `null`. Contrast with `null`, which is a genuine literal the developer types deliberately.

```javascript
let userName;                 // no value written at all
console.log(userName);        // undefined  (JS supplied this automatically)
console.log(typeof userName); // "undefined"
```

→ [[08_Null_vs_Undefined]]

### 1.4 `typeof BigInt` is its own type: `"bigint"`

Unlike every other number in JS (which is `"number"`, regardless of base — decimal, hex, octal, binary, or float), a `BigInt` literal (`123n`) reports a completely distinct `typeof`.

```javascript
let big = 123456789012345678901234567890n;
console.log(typeof big); // "bigint" — not "number"
```

→ [[07_Literals_and_Numbers_IQ]]

### 1.5 `array` and `NaN` are not real "types"

Despite being commonly listed alongside `string`/`number`/`boolean`, neither is a distinct JS type:
- An array is just an `object` (`typeof [] === "object"`).
- `NaN` is just a special value of type `"number"`.

→ [[13_Operators_IQ]], [[07_Literals_and_Numbers_IQ]]

---

## 2. Equality & Coercion Quirks

### 2.1 `==` is not transitive

```javascript
console.log("" == 0);     // true   → "" coerced to Number → 0
console.log("0" == 0);    // true   → "0" coerced to Number → 0
console.log("" == "0");   // false  → both strings, no coercion between two strings
```

Basic algebra says if `A == B` and `B == C`, then `A == C`. Loose equality breaks this: `"" == 0` and `"0" == 0` are both `true`, yet `"" == "0"` is `false`. This single example is one of the strongest arguments for defaulting to `===`.

→ [[13_Operators_IQ]]

### 2.2 `null == undefined` is `true`, but `null === undefined` is `false`

```javascript
console.log(null == undefined);   // true  — special-cased: null and undefined loosely equal ONLY each other (and themselves)
console.log(null === undefined);  // false — different types
```

→ [[08_Null_vs_Undefined]], [[13_Operators_IQ]]

### 2.3 `null >= 0` is `true`, but `null == 0` is `false` — the sharpest gotcha in the list

```javascript
console.log(null == 0);             // false
console.log(null >= 0);             // true   ← relational operators coerce null differently than == does!
console.log(null > 0);              // false
console.log(null == 0 || null > 0); // false … even though null >= 0 is true 🤯
```

**Why:** `==` has a special spec rule that makes `null` loosely equal only to `undefined`/`null` — never to a number. But relational operators (`>`, `<`, `>=`, `<=`) don't use that special rule; they convert `null` via `Number(null)`, which is `0`. So `null >= 0` silently becomes `0 >= 0` (`true`), while `null == 0` stays `false`. Two different coercion algorithms, applied to the same operand, producing seemingly contradictory results.

→ [[13_Operators_IQ]], [[08_Null_vs_Undefined]]

### 2.4 `NaN` is the only value in JS that is not equal to itself

```javascript
console.log(NaN === NaN);        // false  — the only self-inequality in the language
console.log(NaN == NaN);         // false  — even loose equality can't save it
console.log(Number.isNaN(NaN));  // true   — the only reliable way to test for NaN
```

This follows the IEEE 754 spec (which JS's number type implements) — `NaN` is defined to compare unequal to everything, including itself, so that any computation that produces `NaN` can never be silently mistaken for a valid, comparable number.

→ [[07_Literals_and_Numbers_IQ]]

### 2.5 `5 != "5"` vs `5 !== "5"`

```javascript
console.log(5 != "5");   // false — loosely equal (coerced), so "not loosely equal" is false
console.log(5 !== "5");  // true  — different types, so "not strictly equal" is true
```

Same underlying `==` vs `===` coercion distinction, just phrased as inequality.

→ [[13_Operators_IQ]]

---

## 3. Scoping & Hoisting Bugs

### 3.1 `var` in a loop shares ONE binding — classic closure bug

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3 — all three callbacks share the same `i`, which is 3 by the time they run
```

`var` is function-scoped, not block-scoped — there's only one `i` for the entire loop. Every closure captures the *same* variable, and by the time the callbacks fire (after the loop has finished), `i` has already reached its final value.

### 3.2 `let` in a loop creates a NEW binding per iteration — the fix

```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}
// Output: 0, 1, 2 — each iteration gets its own fresh `i`
```

This is the single biggest practical reason `let` replaced `var` as the loop-counter default in modern JS.

→ [[Let_Keyword_and_Loops_IQ]]

### 3.3 Temporal Dead Zone (TDZ) — `let`/`const` are hoisted but unusable before declaration

```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;
```

Unlike `var` (hoisted **and** initialized to `undefined`), `let`/`const` are hoisted but left in an inaccessible "temporal dead zone" until the line that declares them actually executes. Accessing them early throws instead of silently returning `undefined` — a deliberate design to surface bugs `var` used to hide.

→ [[Let_Keyword_and_Loops_IQ]]

### 3.4 An empty `for` condition loops forever

```javascript
for (let i = 0; ; i++) {   // condition slot left empty
    console.log(i);
}
// runs forever — an omitted condition is treated as always truthy
```

The three `for(...)` clauses are all optional. Leaving out the middle (condition) clause doesn't mean "never loop" — it means "there's nothing to ever evaluate to false," so the loop runs until something external kills it (stack/memory exhaustion, or the process is stopped).

→ [[Let_Keyword_and_Loops_IQ]]

### 3.5 Re-declaring `let` in the same scope throws; `var` allows it silently

```javascript
let a = 9;
let a = 10; // SyntaxError: Identifier 'a' has already been declared

var b = 9;
var b = 10; // no error — just silently overwrites
```

`var`'s silent re-declaration is itself a historic footgun (accidentally reusing a variable name deep in a large function); `let`/`const` throwing on it is one of the intentional bug-prevention upgrades in ES6.

→ [[Let_Keyword_and_Loops_IQ]]

---

## 4. Syntax & Identifier Quirks

### 4.1 `Function` (capital F) is a perfectly legal identifier

```javascript
let Function = "invalid"; // actually VALID
// let function = "x";    // SyntaxError — the lowercase keyword is reserved
```

JS keyword matching is exactly case-sensitive. Only the literal lowercase `function` is reserved — capitalize a single letter and it's just a normal (if confusing) identifier.

→ [[06_Identifier_Rules_Advanced_IQ]]

### 4.2 `Name` and `name` are unrelated variables

```javascript
var Name = "raja";
var name = "priyan";
console.log(Name); // "raja"
console.log(name); // "priyan"
```

Case sensitivity applies to all identifiers, not just keywords — this is also the technical reason PascalCase (classes) and camelCase (variables) can safely coexist as separate naming conventions in the same codebase.

→ [[03_Identifier_Rules_Basics_IQ]], [[04_Identifier_Naming_Conventions_IQ]]

### 4.3 Unicode letters and Unicode escapes are valid in identifiers

```javascript
let café = "Unicode letter é";       // valid
let 变量 = "Chinese characters";      // valid
let A = "Unicode escape for A";      // decodes to the letter A — valid
```

The spec defines identifier characters via Unicode `ID_Start`/`ID_Continue` categories, not plain ASCII — so non-English letters (and even escaped Unicode code points) are legal, even though virtually no real codebase uses them.

→ [[06_Identifier_Rules_Advanced_IQ]]

### 4.4 `$` and `_` behave like letters

```javascript
var $ = 10;      // valid — $ alone is a legal identifier
var _ = 10;      // valid — _ alone is a legal identifier
```

Deliberately special-cased in the spec so tools like jQuery (`$`) and lodash/private-variable conventions (`_prop`) could exist.

→ [[03_Identifier_Rules_Basics_IQ]]

### 4.5 Block comments cannot be nested

```javascript
/* outer /* inner */ still outer */
```

The comment closes at the **first** `*/` it finds. Everything after that (`still outer */`) is left as dangling, invalid code — a classic "gotcha" when someone tries to comment out a block that already contains a block comment.

→ [[05_Comments_IQ]]

### 4.6 A digit can appear anywhere in an identifier — except first

```javascript
let item1 = "ok";     // valid
// let 1stPlace = "x"; // SyntaxError — cannot start with a digit
```

→ [[03_Identifier_Rules_Basics_IQ]], [[06_Identifier_Rules_Advanced_IQ]]

---

## 5. Numeric Precision Quirks (implied by IEEE 754)

JS numbers (aside from `BigInt`) are always IEEE 754 double-precision floats — there's no separate `int` type. This is directly responsible for a well-known quirk that follows from the number literal rules in [[07_Literals_and_Numbers_IQ]]:

```javascript
console.log(0.1 + 0.2);          // 0.30000000000000004, not 0.3
console.log(0.1 + 0.2 === 0.3);  // false
```

**Why:** most decimal fractions (like `0.1`) cannot be represented *exactly* in binary floating point, the same way `1/3` can't be represented exactly in decimal. The tiny rounding error is invisible for most values but becomes visible once you compare sums directly.

**Practical fix:** compare with a tolerance (epsilon) instead of `===`:

```javascript
Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON; // true
```

This is also why `Number.MAX_SAFE_INTEGER` (2^53 - 1) exists — beyond it, integers start silently losing precision, which is the entire reason `BigInt` was added to the language.

→ [[07_Literals_and_Numbers_IQ]]

---

## 6. Operator Evaluation-Order Quirks

### 6.1 `a++` returns the OLD value, `++a` returns the NEW value

```javascript
let a = 10;
let b = a++;   // b = 10 (old value) — THEN a becomes 11
console.log(b); // 10
console.log(a); // 11

let x = 10;
let y = ++x;   // x becomes 11 FIRST — THEN y = 11
console.log(x, y); // 11 11
```

**Why it's confusing:** the variable's *side effect* (incrementing) always happens, but postfix (`a++`) hands the surrounding expression the **pre-increment** value while prefix (`++a`) hands it the **post-increment** value. This is exactly why `let b = a++; console.log(b);` prints `10`, not `11` — a common first-glance mistake.

This decoupling is also what makes `arr[i++]` a useful idiom: it reads the current index *and* advances it in a single expression.

→ [[32_Increment_Decrement_Operators_IQ]]

### 6.2 Combining `++`/`--` on the same variable multiple times in one expression

```javascript
let a = 10;
console.log(++a + a);       // 22, not 21 — the second `a` sees the already-incremented value
console.log(a);               // 11

let i = 1;
let result = i++ + ++i;      // 1 + 3 = 4  (i++ gives 1 then i=2; ++i makes i=3 then gives 3)
console.log(result, i);       // 4 3

let x = 10;
console.log(++x + ++x);     // 11 + 12 = 23
console.log(x);               // 12
```

**Why it's confusing:** operands of `+` are evaluated strictly left to right, and each `++`/`--` applies its side effect *immediately* at the point it's evaluated — so any later read of the same variable in that expression sees the updated value, not the value from the start of the statement. This compounds the confusion from §6.1: it's not just "old vs new value," it's "every subsequent operand sees whatever the variable currently holds right now."

**In practice:** never write real code that mutates the same variable more than once in a single expression — this is purely an interview-trivia pattern, not something production code should rely on.

→ [[34_Increment_Multiple_Expressions_IQ]], [[33_Advanced_Increment_Expression_IQ]]

---

## 7. Engine-Level "Quirks" (Not Bugs, But Surprising)

### 7.1 JIT de-optimization when types change mid-loop

V8 compiles "hot" functions to machine code assuming stable argument types. If a function called thousands of times with numbers is suddenly called with a string, V8 has to **deoptimize** back to the interpreter to stay correct — a real (if invisible) performance cliff that pure interpretation or pure compilation wouldn't have.

```javascript
function add(a, b) { return a + b; }
for (let i = 0; i < 100000; i++) add(i, i + 1);  // optimized to machine code after enough hot calls
add("x", "y"); // unexpected type → V8 deoptimizes add() back to bytecode
```

→ [[Compilation_vs_Interpretation_vs_JIT_IQ]]

---

## 8. `switch` Statement Quirks

### 8.1 `switch` matches with `===`, never `==`

```javascript
let status = 0;
switch (status) {
    case false:
        console.log("false matched"); // never runs
        break;
    case 0:
        console.log("0 matched");     // runs
        break;
}
```

A common misconception is that `switch` coerces types the way `==` does. It doesn't — the spec defines case-matching via the Strict Equality Comparison algorithm, identical to `===`. `0 === false` is `false`, so `case false` is skipped even though `0 == false` is `true`.

→ [[47_Switch_Strict_Equality_IQ]]

### 8.2 Fall-through: a matched case runs every statement below it until `break`

```javascript
switch (2) {
    case 1: console.log("one");
    case 2: console.log("two");
    case 3: console.log("three");
    default: console.log("default");
}
// "two", "three", "default" — NOT just "two"
```

`switch` doesn't re-check later `case` conditions once it has matched — it just keeps running statements top-to-bottom until a `break` (or the closing brace). This is used deliberately for grouping (stacked empty `case` labels sharing one body) but is a frequent accidental bug when a case's own body forgets its `break`.

→ [[40_Switch_Fallthrough_No_Break_IQ]], [[43_Switch_Case_Grouping_IQ]], [[44_Switch_Unintentional_Fallthrough_Bug_IQ]]

### 8.3 Duplicate `case` values are legal — the second is silently unreachable

```javascript
switch (10) {
    case 10: console.log("first"); break;  // runs
    case 10: console.log("second"); break; // dead code, never runs
}
```

JS never checks `case` values for uniqueness; it evaluates them top-to-bottom and commits to the first `===` match. A duplicate case value is not a `SyntaxError` — it's just permanently unreachable code that only a linter (not the engine) will flag.

→ [[46_Switch_Duplicate_Case_Values_IQ]]

### 8.4 `let`/`const` inside one `case` are scoped to the WHOLE switch block

```javascript
switch (x) {
    case 1:
        let a = 1;
        break;
    case 2:
        let a = 2; // ❌ SyntaxError: 'a' has already been declared
        break;
}
```

A `switch` body is a single block unless each case wraps its own `{ }` — so `let`/`const` declared in one `case` collides with the same name declared in a sibling `case`, throwing at parse time regardless of which branch would actually execute.

→ [[39_Switch_Statement_Basics_IQ]]

---

## 9. Master Cheat Sheet

| # | Quirk | Code | Result | Category |
|---|---|---|---|---|
| 1 | `typeof null` | `typeof null` | `"object"` | Type system |
| 2 | `typeof NaN` | `typeof NaN` | `"number"` | Type system |
| 3 | `typeof BigInt` | `typeof 1n` | `"bigint"` | Type system |
| 4 | Array is not a type | `typeof []` | `"object"` | Type system |
| 5 | `==` not transitive | `"" == 0`, `"0" == 0`, `"" == "0"` | `true, true, false` | Coercion |
| 6 | `null` vs `undefined` equality | `null == undefined` / `null === undefined` | `true` / `false` | Coercion |
| 7 | `null` relational vs loose equality | `null >= 0` / `null == 0` | `true` / `false` | Coercion |
| 8 | `NaN` self-inequality | `NaN === NaN` | `false` | Coercion |
| 9 | `var` shares loop binding | `for(var i...) setTimeout(()=>log(i))` ×3 | `3, 3, 3` | Scoping |
| 10 | `let` per-iteration binding | `for(let i...) setTimeout(()=>log(i))` ×3 | `0, 1, 2` | Scoping |
| 11 | TDZ | `console.log(x); let x = 5;` | `ReferenceError` | Scoping |
| 12 | Empty `for` condition | `for(let i=0;;i++)` | infinite loop | Scoping |
| 13 | `var` re-declaration | `var b=9; var b=10;` | silently allowed | Scoping |
| 14 | `let` re-declaration | `let a=9; let a=10;` | `SyntaxError` | Scoping |
| 15 | Capitalized keyword | `let Function = "x";` | valid | Syntax |
| 16 | Case-sensitive identifiers | `var Name`, `var name` | two distinct variables | Syntax |
| 17 | Unicode identifiers | `let café = "x";` | valid | Syntax |
| 18 | Nested block comments | `/* outer /* inner */ still outer */` | breaks at first `*/` | Syntax |
| 19 | Float precision | `0.1 + 0.2 === 0.3` | `false` | Precision |
| 20 | JIT deopt on type change | hot loop, then call with mismatched types | silent perf cliff | Engine |
| 21 | Postfix vs prefix increment | `let a=10; let b=a++;` then `console.log(b)` | `10`, not `11` | Operator order |
| 22 | Chained increment in one expression | `let a=10; console.log(++a + a)` | `22`, not `21` | Operator order |
| 23 | `switch` uses `===`, not `==` | `switch(0){case false:...; case 0:...}` | `case 0` matches, `case false` doesn't | Switch |
| 24 | `switch` fall-through without `break` | `switch(2){case 1:...case 2:...case 3:...default:...}` | runs case 2, 3, default | Switch |
| 25 | Duplicate `case` values | `switch(10){case 10:...;case 10:...}` | first wins, second is dead code, no error | Switch |
| 26 | `let` redeclared across sibling `case`s | `case 1: let a=1; break; case 2: let a=2;` | `SyntaxError` (parse time) | Switch |

---

## Summary

**Key Takeaway:** Nearly every JavaScript "weirdness" traces back to one of three root causes:
1. **Historical baggage preserved for backward compatibility** (`typeof null`, `var` hoisting/re-declaration).
2. **Type coercion rules that differ by operator** (`==` vs `===` vs relational operators each having their own coercion algorithm — this is why `null == 0` and `null >= 0` disagree).
3. **IEEE 754 floating-point representation**, which JS numbers rely on for everything except `BigInt` (float precision, `NaN` self-inequality).

Defaulting to `===` over `==`, `let`/`const` over `var`, and being explicit about numeric comparisons (epsilon tolerance, `Number.isNaN`) sidesteps the majority of this list in real code.

**Source notes:** [[08_Null_vs_Undefined]], [[07_Literals_and_Numbers_IQ]], [[13_Operators_IQ]], [[Let_Keyword_and_Loops_IQ]], [[03_Identifier_Rules_Basics_IQ]], [[06_Identifier_Rules_Advanced_IQ]], [[04_Identifier_Naming_Conventions_IQ]], [[05_Comments_IQ]], [[Compilation_vs_Interpretation_vs_JIT_IQ]], [[Source_Code_ByteCODE_Binary_IQ]], [[Identifiers_and_Literals_in_JS]], [[32_Increment_Decrement_Operators_IQ]], [[31_Type_Operator_typeof_Deep_Dive_IQ]], [[33_Advanced_Increment_Expression_IQ]], [[34_Increment_Multiple_Expressions_IQ]], [[39_Switch_Statement_Basics_IQ]], [[40_Switch_Fallthrough_No_Break_IQ]], [[43_Switch_Case_Grouping_IQ]], [[44_Switch_Unintentional_Fallthrough_Bug_IQ]], [[46_Switch_Duplicate_Case_Values_IQ]], [[47_Switch_Strict_Equality_IQ]]
