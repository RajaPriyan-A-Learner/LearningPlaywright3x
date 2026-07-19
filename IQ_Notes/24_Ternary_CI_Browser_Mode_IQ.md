# Ternary for Config Flags (CI Headless/Headed Mode)

## Overview

Covers `05_chapter_Operator/24_IQ3.js` — using a ternary to pick a config value from a boolean flag, the pattern behind `headless: process.env.CI ? true : false` style logic seen throughout Playwright/CI configs.

---

## 1. Reference Code

```javascript
let isCI = true;
let browserMode = isCI ? "headless" : "headed";
console.log("Launching browser in:", browserMode, "mode"); // "Launching browser in: headless mode"
```

---

## 2. The Pattern

A boolean condition (`isCI`) selects between two *string* config values, not two booleans — this is the more typical real-world use of a ternary than the boolean-returning example in [[27_Ternary_Redundant_Boolean_Antipattern_IQ]].

```javascript
let isCI = true;
let browserMode = isCI ? "headless" : "headed";
```

This mirrors a real Playwright config:

```javascript
// playwright.config.js style
export default {
  use: {
    headless: !!process.env.CI, // boolean flag directly — no ternary needed for booleans
  },
};

const browserMode = process.env.CI ? "headless" : "headed"; // string label — ternary is appropriate here
```

---

## 3. When a Ternary Is the Right Tool Here

Unlike assigning a `true`/`false` literal (redundant — see [[27_Ternary_Redundant_Boolean_Antipattern_IQ]]), this example assigns **different string values** per branch — there's no shorter equivalent than the ternary itself, since the condition and the two possible results are genuinely different types of "shape" (boolean in, string out).

---

## Summary

**Key Takeaway:** Ternaries are most useful when the branches return values that *aren't* already booleans — mapping a flag to a config label (`"headless"`/`"headed"`) is a legitimate, idiomatic use, distinct from the redundant `condition ? true : false` anti-pattern.

**Related notes:** [[22_Ternary_Operator_Basics_IQ]], [[27_Ternary_Redundant_Boolean_Antipattern_IQ]]
