# Browser `prompt()` — Synchronous User Input in the Browser

## Overview

Covers `08_chapter_UserInputs/48_JS.js` — the first of four user-input approaches surveyed in this chapter (see [[08_chapter_UserInputs Readme]] table). `prompt()` is a **browser-only** global; it does not exist in plain Node.js.

---

## 1. Reference Code

```javascript
let num = prompt("Enter a number:");
num = Number(num); // convert string to number

if (num % 2 === 0) {
    console.log(num + " is Even");
} else {
    console.log(num + " is Odd");
}
```

---

## 2. `prompt()` Always Returns a String (or `null`)

Whatever the user types into the dialog box, `prompt()` returns it as a **string** — even if they type `"42"`, you get the string `"42"`, not the number `42`. That's why `Number(num)` is required before the `%` (modulo) check runs — without it, `"42" % 2` still works due to numeric coercion in arithmetic operators, but relying on that instead of an explicit `Number()` conversion is fragile and non-obvious.

If the user clicks **Cancel** instead of OK, `prompt()` returns `null` — and `Number(null)` is `0`, which would silently report "Even" instead of signaling that no input was given. Production code should check for `null` explicitly.

---

## 3. Why This Only Runs in a Browser

`prompt()` is part of the `window` (browser) global object, not the JS language itself or Node's runtime. Running `48_JS.js` with `node 48_JS.js` throws `ReferenceError: prompt is not defined` — it must be pasted into a browser console or loaded via an HTML page. Compare with the three Node-only approaches: [[49_Node_Readline_Input_IQ]], [[50_Node_Prompt_Sync_Input_IQ]], [[51_Node_Fs_Stdin_Input_IQ]].

---

## Summary

**Key Takeaway:** `prompt()` is a browser-only API that always returns a `string` (or `null` on Cancel) — never a number — so numeric input always needs explicit `Number()` conversion and a `null` check before use.

**Related notes:** [[49_Node_Readline_Input_IQ]], [[50_Node_Prompt_Sync_Input_IQ]], [[51_Node_Fs_Stdin_Input_IQ]], [[47_Switch_Strict_Equality_IQ]]
