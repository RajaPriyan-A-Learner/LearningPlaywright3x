# JavaScript Practice Notes: Hoisting and Temporal Dead Zone (TDZ)

These practice questions test your understanding of how JavaScript handles variable and function declarations behind the scenes before code execution.

---

### Practice 1: Basic Variable Hoisting
What will be the output of the following code?

```javascript
console.log(name);
var name = "Alice";
console.log(name);
```

**Answer:**
```text
undefined
"Alice"
```
*Explanation:* Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`. The assignment (`= "Alice"`) happens during execution.

---

### Practice 2: Let and Const (TDZ)
What happens when you run this code?

```javascript
console.log(age);
let age = 25;
```

**Answer:**
`ReferenceError: Cannot access 'age' before initialization`
*Explanation:* `let` and `const` declarations are hoisted, but they are NOT initialized. They remain in the Temporal Dead Zone (TDZ) from the start of the block until the line where they are declared.

---

### Practice 3: Scope and Hoisting (The IQ2 Case)
What is the output of the following code?

```javascript
let a = 10;
console.log(a);

if (true) { 
    console.log(a); 
    let a = 20;
}
```

**Answer:**
```text
10
ReferenceError: Cannot access 'a' before initialization
```
*Explanation:* The `if` block creates its own scope. Inside the block, the `let a = 20;` declaration is hoisted to the top of the block, meaning `a` is in the TDZ for that block. When `console.log(a)` runs inside the block, it tries to access the block-scoped `a` (which is in the TDZ), not the global `a`, leading to a ReferenceError.

---

### Practice 4: Function Declarations vs. Function Expressions
What will be the output?

```javascript
greet();
sayHi();

function greet() {
    console.log("Greeting!");
}

var sayHi = function() {
    console.log("Hi!");
}
```

**Answer:**
```text
"Greeting!"
TypeError: sayHi is not a function
```
*Explanation:* Function *declarations* (`function greet() {...}`) are fully hoisted, meaning you can call them before they appear in the code. However, `var sayHi` is treated like a normal variable; it is hoisted and initialized to `undefined`. When the code tries to call `undefined()`, it throws a TypeError.

---

### Practice 5: Var in Loops vs Let in Loops (SetTimeout)
What is the output of the following two loops?

**Loop 1 (var):**
```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
```

**Loop 2 (let):**
```javascript
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 100);
}
```

**Answer:**
**Loop 1 Output:** `3, 3, 3`
**Loop 2 Output:** `0, 1, 2`

*Explanation:* 
- `var` is function-scoped, so there is only one `i` shared across all loop iterations. By the time the `setTimeout` callbacks run, the loop has finished and `i` is 3.
- `let` is block-scoped. In a `for` loop, `let` creates a *new binding* (a new variable) for each iteration. Therefore, each `setTimeout` callback captures its own distinct `j` value.

---

### Key Takeaways
1. **var:** Hoisted and initialized to `undefined`. Function-scoped.
2. **let / const:** Hoisted but NOT initialized (Temporal Dead Zone). Block-scoped.
3. **Function Declarations:** Fully hoisted (can be called before definition).
4. **Function Expressions / Arrow Functions:** Hoisted according to their variable declaration (`var`, `let`, or `const`).
