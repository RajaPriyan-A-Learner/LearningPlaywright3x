# Number_Switch — Practice Notes

## Overview

Covers `JS_Practise/HackerRank/Number_Switch.js` — a HackerRank-style `switch` exercise that reads a number from stdin (same `fs.readFileSync(0, "utf8")` technique as [[51_Node_Fs_Stdin_Input_IQ]] and [[Marks_Grade_system_IQ]]) and prints its English word for 1–9, or a fallback message for anything else.

## Source

```javascript
console.log("Enter the number!");
const input = require('fs').readFileSync(0, 'utf8');
processData(input);

function processData(input) {
    var num = Number(input);
    var NUMBER_TEST = num;
    switch(num) {
        case 1: console.log("ONE"); break;
        case 2: console.log("TWO"); break;
        case 3: console.log("THREE"); break;
        case 4: console.log("FOUR"); break;
        case 5: console.log("FIVE"); break;
        case 6: console.log("SIX"); break;
        case 7: console.log("SEVEN"); break;
        case 8: console.log("EIGHT"); break;
        case 9: console.log("NINE"); break;
        default: console.log("PLEASE TRY AGAIN");
    }
}
```

---

## Notes

**Hoisting again:** just like [[Marks_Grade_system_IQ]], `processData(input)` is called before its `function processData(...)` declaration — safe because function declarations are hoisted in full, body included.

**Switch uses strict equality:** `switch(num)` compares each `case` value to `num` with `===` (see [[47_Switch_Strict_Equality_IQ]]). This matters for the `default` fallback: if stdin is non-numeric, `Number(input)` produces `NaN`, and `NaN === NaN` is `false` even against itself — so a `NaN` input can never match any `case`, no matter what, and always falls through to `default`, printing `"PLEASE TRY AGAIN"`. Same reasoning applies to any number outside `1`–`9` (e.g. `0`, `10`, `-3`): no case matches, so it falls to `default` too.

**Dead variable:** `NUMBER_TEST` is assigned but never read anywhere in the function — likely leftover HackerRank boilerplate (the `//Head Ends Here` comment marking where the real logic starts), not a functional part of the exercise.

---

## Summary

**Key Takeaway:** A straightforward number→word `switch` ladder; the only non-obvious behavior is that `switch`'s strict-equality matching means both invalid/non-numeric input (`NaN`) and out-of-range numbers land on the exact same `default` case, with no way to tell them apart from the output alone.

**Related notes:** [[Marks_Grade_system_IQ]], [[51_Node_Fs_Stdin_Input_IQ]], [[47_Switch_Strict_Equality_IQ]], [[39_Switch_Statement_Basics_IQ]]
