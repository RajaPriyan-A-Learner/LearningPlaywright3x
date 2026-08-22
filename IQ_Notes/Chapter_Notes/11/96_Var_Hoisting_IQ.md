# 96_Var_Hoisting — Deep Dive into Var Hoisting

**File:** `11_chapter_Function/96_Var_Hoisting.js`

## Overview
This file provides a clear, step-by-step example of how `var` hoisting operates behind the scenes, separating the declaration phase from the execution phase.

## Main Concept
When the JavaScript engine compiles the code, it lifts all `var` declarations to the top of their enclosing scope and assigns them an initial value of `undefined`. When the code actually executes line-by-line, the assignment evaluates and overwrites that `undefined`.

### Code Example

```javascript
console.log(greeting); 
var greeting = "Hello!";
console.log(greeting); 

// Behind the scenes (Mental Model):
// var greeting = undefined;  <-- hoisted during compilation
// console.log(greeting);     <-- prints undefined
// greeting = "Hello!";       <-- execution reaches assignment
// console.log(greeting);     <-- prints "Hello!"
```

### Key Points
- You can reference a `var` variable before its declaration line.
- This behavior rarely provides an architectural advantage and often leads to confusing bugs where a variable holds `undefined` rather than throwing an error.

---

## Common Mistakes
- **Assuming undefined means undeclared:** If you see `undefined` logged, the variable *is* declared (it was hoisted). If it wasn't declared at all, JS would throw a `ReferenceError: greeting is not defined`.

---

## Summary
**Key Takeaway:** The compilation phase hoists `var` declarations and assigns them `undefined`, leaving the actual data assignment to the execution phase.
