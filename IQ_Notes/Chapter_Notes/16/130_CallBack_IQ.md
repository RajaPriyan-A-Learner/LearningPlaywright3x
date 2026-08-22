# 130_CallBack — Introduction to Callbacks

**File:** `16_chapter_Callback/130_CallBack.js`

## Overview
This file introduces the fundamental concept of Callbacks in JavaScript, showing how functions can be passed as arguments to other functions and executed later.

## Main Concept
A callback function is simply a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. In JavaScript, functions are "first-class citizens," meaning they can be assigned to variables and passed around just like strings or numbers.

### Code Example

```javascript
// A function that accepts a callback function as an argument
function placeOrder(item, callback){
    console.log("Order Placed for: " + item);
    callback(); // Executing the callback function
}

// Method 1: Passing a named function
function print() {
    console.log("Done with the order");
}
placeOrder("Burger", print);

// Method 2: Passing an anonymous function directly
placeOrder("Pizza", function(){
    console.log("Order is ready!, pick it up!");
});

// Method 3: Passing an Arrow function
placeOrder("Fries", () => {
    console.log("Arrow Fn, I am also a function without name!");
});
```

### Key Points
- You pass the function *definition* (`print`), not the function *execution* (`print()`). If you use parentheses when passing it, the function will execute immediately instead of waiting to be called back.
- Playwright uses callbacks extensively in its `test()` blocks: `test('name', async ({page}) => { ... })`.

---

## Common Mistakes
- **Invoking the callback during assignment:** Doing `placeOrder("Burger", print())` instead of `placeOrder("Burger", print)`. `print()` will execute immediately and pass its return value (`undefined`) to `placeOrder`, causing an error when `placeOrder` tries to execute `callback()`.

---

## Summary
**Key Takeaway:** Callbacks are functions passed as arguments to other functions. You can pass named functions, anonymous functions, or arrow functions. They form the backbone of testing frameworks like Playwright.
