# 107_Closure — Basic Closure

**File:** `12_chapter_function_Closure/107_Closure.js`

## Overview
This file illustrates the most fundamental form of a closure: returning a function that retains access to variables declared in its parent function's scope.

## Main Concept
When an inner function is returned from an outer function, the inner function carries with it the lexical environment (the variables in scope) of the outer function. This combination of the function and its lexical environment is called a closure.

### Code Example

```javascript
function startBrowser() {
    let name = "edge"; // Local variable in outer function

    function installBrowser() {
        console.log(name); // Retains access to 'name'
        let fail = true;
        if (fail) {
            console.log('Failed!');
        }
    }

    return installBrowser; // Return the function, don't execute it
}

const runTc = startBrowser(); // runTc is now the installBrowser function
runTc(); // Executes installBrowser, which successfully logs "edge"
```

### Key Points
- `startBrowser` finishes executing when it returns `installBrowser`.
- Normally, local variables like `name` would be destroyed after execution. However, because `installBrowser` references it, a closure is formed, keeping `name` alive in memory.

---

## Common Mistakes
- **Executing instead of returning:** Writing `return installBrowser();` instead of `return installBrowser;`. The former executes the function immediately and returns its result; the latter returns the function definition itself to be called later.

---

## Summary
**Key Takeaway:** A closure occurs when a returned inner function retains access to its parent function's variables long after the parent function has completed execution.
