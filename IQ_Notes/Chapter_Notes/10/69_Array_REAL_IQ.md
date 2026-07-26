# Array REAL — Real-World Browser Array with pop, shift, and For Loop

## Overview

Covers `10_chapter_Arrays/69_Array_REAL.js` — a practical example combining array mutation (`pop`, `shift`) and a `for` loop to iterate the remaining elements, with a conditional check embedded inside. Models a real testing scenario: a list of browsers where one is removed before iteration.

---

## 1. Reference Code

```javascript
let browser = ['chrome', 'firefox', 'safari', 'opera', 'edge'];
console.log(browser.length);

browser.pop();
// console.log(browser);

let removed = browser.shift();
// console.log(browser);
// console.log(removed);

for (let i = 0; i < browser.length; i++) {
    console.log(browser[i]);
    if (browser[i] === "opera") {
        console.log("Opera doesn't support Automation Now!");
    }
}
```

---

## 2. Step-by-Step Trace

| Step | Operation | `browser` | `removed` |
|------|-----------|-----------|-----------|
| Start | — | `['chrome','firefox','safari','opera','edge']` | — |
| `browser.length` | prints `5` | same | — |
| `pop()` | removes `'edge'` | `['chrome','firefox','safari','opera']` | — |
| `shift()` | removes `'chrome'` | `['firefox','safari','opera']` | `'chrome'` |
| Loop | iterates 3 elements | — | — |

---

## 3. Loop Output

```
firefox
safari
opera
Opera doesn't support Automation Now!
```

The loop uses `browser.length` (now `3`) — always prefer `arr.length` over a hardcoded number so the loop adapts automatically if the array changes.

---

## 4. Return Values of pop / shift

Both `pop()` and `shift()` **return** the removed element:
- `let removed = browser.shift()` → `removed = "chrome"`.
- If you don't need the value, you can call them without capturing the return.

---

## 5. Playwright Relevance

Filtering a list of browsers before running tests — removing unsupported browsers (`pop`/`shift`) and then iterating over the remaining valid ones — mirrors real Playwright multi-browser configuration logic.

---

## Summary

**Key Takeaway:** `pop()` removes from the end, `shift()` removes from the start — both return the removed element. Always use `arr.length` in the loop condition to stay in sync with the actual array size after mutations.

**Related notes:** [[68_Array_adding_removing_IQ]], [[70_Array_searching_IQ]], [[72_Array_iterate_IQ]]
