# Identifiers and Literals in JavaScript

## 1. Identifiers

An **identifier** is a name used to refer to variables, functions, classes, or any other user-defined items in JavaScript.

### Rules for Identifiers

- Must **start with**: letter (a-z, A-Z), underscore (_), or dollar sign ($)
- **Subsequent characters** can include: letters, digits (0-9), underscores, or dollar signs
- **Case-sensitive**: `name` and `Name` are different identifiers
- **Cannot be** reserved keywords (e.g., `let`, `const`, `function`, `if`, `class`, `return`, etc.)
- **Cannot contain** spaces or special characters (except _ and $)

### Valid Identifiers

```javascript
// All valid identifiers
let userName;
const _privateVar = 42;
var $price = 100;
function calculateTotal() {}
class MyClass {}
const user_name = "John";
const firstName = "Alice";
```

### Invalid Identifiers

```javascript
// All invalid - will throw errors
let 123abc;        // ❌ Cannot start with a digit
let user-name;     // ❌ Cannot contain hyphens
let if;            // ❌ 'if' is a reserved keyword
let user name;     // ❌ Cannot contain spaces
let user@name;     // ❌ Special characters not allowed (except _ and $)
```

### Reserved Keywords in JavaScript

These cannot be used as identifiers:

```
abstract  arguments  await     boolean   break     byte      case
catch     char       class     const     continue  debugger  default
delete    do         double    else      enum      eval      export
extends   false      final     finally   float     for       function
goto      if         implements import   in        instanceof int
interface let        long      native    new       null      package
private   protected  public    return    short     static    super
switch    synchronized this     throw    throws    true      try
typeof    var        void      volatile  while     with      yield
```

---

## 2. Literals

A **literal** is a fixed value written directly in code. It represents an actual data value that is hardcoded.

### Types of Literals

#### **String Literals**
```javascript
const name = "Hello";           // Double quotes
const greeting = 'World';       // Single quotes
const template = `Hi, ${name}`; // Template literal (backticks)
```

#### **Number Literals**
```javascript
const decimal = 42;             // Decimal number
const float = 3.14;             // Floating-point number
const negative = -5;            // Negative number
const hex = 0xFF;               // Hexadecimal (255 in decimal)
const binary = 0b101;           // Binary (5 in decimal)
const octal = 0o77;             // Octal (63 in decimal)
const exponential = 1e3;        // Scientific notation (1000)
```

#### **BigInt Literals**
```javascript
const large = 123n;             // BigInt literal (n suffix)
const veryLarge = 999999999999n;
```

#### **Boolean Literals**
```javascript
const isActive = true;
const isInactive = false;
```

#### **Array Literals**
```javascript
const numbers = [1, 2, 3];
const mixed = [1, "hello", true, null];
const empty = [];
```

#### **Object Literals**
```javascript
const person = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

const empty = {};
```

#### **Null Literal**
```javascript
const noValue = null;
```

#### **Undefined Literal**
```javascript
let notDefined;  // automatically undefined
const explicit = undefined;
```

#### **Regular Expression Literals**
```javascript
const pattern = /test/i;        // Case-insensitive pattern
const emailRegex = /[a-z]+@[a-z]+\.[a-z]+/;
```

---

## 3. Key Differences: Identifiers vs Literals

| Aspect | Identifier | Literal |
|--------|-----------|---------|
| **Definition** | A name/label that refers to a value | An actual fixed value in the code |
| **Purpose** | To store and reference data | To represent data directly |
| **Changes** | Can be reassigned (if var/let) | Always the same value |
| **Example** | `userName` | `"John"` |

### Practical Example

```javascript
const userId = 42;
//     ^^^^^^    ^^
//  identifier  literal (number literal)

const message = "Hello World";
//     ^^^^^^^   ^^^^^^^^^^^^^
//  identifier   literal (string literal)

function greet(name) {
//       ^^^^^  ^^^^
//   identifier identifier
  console.log("Hello, " + name);
  //                     ^^^^
  //               string literal
}
```

---

## 4. Important Notes

### Identifiers Storage
- Identifiers are stored in the **variable scope** (local, global, block scope, etc.)
- They reference values stored in memory

### Literals Evaluation
- Literals are evaluated when the code runs
- The JavaScript engine converts them into internal representations
- Same literals may or may not reference the same object depending on type

### Example: Object Literal vs Identifier
```javascript
const obj1 = { name: "John" };  // Creates new object
const obj2 = { name: "John" };  // Creates different object

console.log(obj1 === obj2);     // false - different objects
console.log(obj1.name === obj2.name);  // true - same string value
```

### Example: String Primitive vs Object
```javascript
const str1 = "hello";           // String literal
const str2 = new String("hello"); // String object

console.log(typeof str1);       // "string" (primitive)
console.log(typeof str2);       // "object"
console.log(str1 === str2);     // false
```

---

## Summary

- **Identifiers** are names you create to refer to values (variables, functions, classes)
- **Literals** are the actual fixed values written in code
- Understanding the distinction is crucial for grasping variable scope, data types, and JavaScript fundamentals
