# 281_Expect_TC1 — Generic Synchronous Assertions & Primitives

**File:** `29_Playwright/e2e_tests/17_Expect_Assertions/281_Expect_TC1.spec.ts`

## Overview
This specification reviews the fundamental synchronous assertion primitives provided by Playwright's bundled `expect` library (based on Jest/Expect). It covers primitive value checks (`toBe`), boolean assertions (`toBeFalsy`, `toBeTruthy`), null validation (`toBeNull`), numerical comparisons (`toBeGreaterThan`), and deep structural equality for arrays and objects (`toEqual`).

---

## Main Concept
Playwright's `expect` library supports two distinct types of assertions:
1. **Synchronous Generic Assertions:** Used to assert on static JavaScript in-memory data (numbers, strings, booleans, objects, arrays). These do NOT return a Promise, do NOT retry, and execute immediately:
   `expect(value).toBe(3);`
   `expect(object).toEqual({ role: 'admin' });`
2. **Asynchronous Web-First Assertions:** Used on Locators and Pages. These return a Promise, require `await`, and retry automatically until they pass or time out:
   `await expect(locator).toBeVisible();`

Understanding when to use synchronous assertions versus asynchronous web-first assertions is a critical concept in Playwright.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll');
   });

   test('Expect', async ({ page }) => {
      expect(1 + 2).toBe(3);
      let ac = false;
      expect(ac).toBeFalsy();
      expect(true).toBeTruthy();
      expect(null).toBeNull();
      expect(34).toBeGreaterThan(11);
      expect([1, 2, 3]).toEqual([1, 2, 3]);
      expect({ role: 'admin' }).toEqual({ role: 'admin' });
      expect({ age: 20, role: 'admin' }).toEqual({ role: 'admin', age: 20 });
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `281_Expect_TC1.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-8`: Sets up the test suite and opens the target page in `beforeEach`.
*   `Line 9-10`: `expect(1 + 2).toBe(3)`: Tests exact equality of primitive numbers using `toBe` (which uses JavaScript's `Object.is`).
*   `Line 11-13`: `toBeFalsy()` and `toBeTruthy()`: Tests truthy/falsy evaluation of boolean variables without requiring strict `=== true` comparison.
*   `Line 14`: `toBeNull()`: Verifies that a reference strictly equals `null`.
*   `Line 15`: `toBeGreaterThan(11)`: Verifies numeric order.
*   `Line 16`: `expect([1, 2, 3]).toEqual([1, 2, 3])`: Deep comparison of arrays. Using `toBe` here would fail because array references differ in memory.
*   `Line 17-18`: `toEqual({ ... })`: Deep recursive comparison of object properties. Notice in Line 18 that property order does not affect equality—`{ age: 20, role: 'admin' }` equals `{ role: 'admin', age: 20 }`.

**Why this approach was chosen:**
The coder chose these examples to illustrate core JavaScript unit-testing assertions available within Playwright for validating in-memory test data, API response payloads, and calculated variables.

**Alternative Effective Ways:**
For stricter assertions on booleans, prefer `toBe(false)` over `toBeFalsy()`, because `toBeFalsy()` passes on `0`, `""`, `null`, `undefined`, and `NaN`, which can mask unexpected types. For partial object comparisons where only a subset of properties needs to be validated, use `toMatchObject`:
```typescript
expect(userResponse).toMatchObject({ role: 'admin' }); // ignores extra fields like createdAt, id
```
For strict structural checks that also require matching prototypes and undefined property absence, use `toStrictEqual`:
```typescript
expect(actual).toStrictEqual(expected);
```

---

### Key Points
- `toBe` checks primitive value equality via `Object.is` (or referential identity for objects).
- `toEqual` recursively checks deep value equality across all keys and array elements.
- Generic synchronous assertions do NOT use `await` and do NOT retry.

---

## Common Mistakes
- Using `toBe` to compare objects or arrays (e.g. `expect({a: 1}).toBe({a: 1})`), which fails because they occupy different memory addresses.
- Using `await` on synchronous assertions (e.g. `await expect(x).toBe(3)`), which is unnecessary and indicates a conceptual misunderstanding.
- Using synchronous assertions on DOM states instead of web-first assertions (e.g., `expect(await locator.isVisible()).toBe(true)` instead of `await expect(locator).toBeVisible()`).

---

## Summary
**Key Takeaway:** Synchronous assertions (`toBe`, `toEqual`, `toBeNull`) are designed for in-memory JavaScript data, whereas DOM elements require asynchronous, retrying web-first assertions.
