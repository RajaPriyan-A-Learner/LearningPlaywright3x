# 302_Heavy_POM — Proving Locators Are Lazy (Cost & Prototype Benchmarks)

**File:** `29_Playwright/e2e_tests/20_Page_Object_Model/302_Heavy_POM.spec.ts`

## Overview

This spec is a **performance benchmark and conceptual proof**: it constructs a `HeavyPage` object containing 100 locators and 110 methods, measures how long the constructor takes, and asserts that building 100 locators takes less than 100 milliseconds. The test makes one concrete and often misunderstood claim about Playwright visible: **locators are lazy — they record a selector, not a DOM query.** Only `click()`, `fill()`, or `expect()` actually touch the browser.

---

## Main Concept

Developers sometimes worry that a large POM class with many locators is slow. This test disproves that concern empirically. Two key JavaScript runtime facts are demonstrated:

1. **Locators are cheap to build** — `page.locator(...)` records a selector string. No network round-trip, no DOM query. 100 locators = microseconds.
2. **Methods live on the prototype** — JavaScript class methods are declared once on `HeavyPage.prototype` and shared by every instance. Creating a second `HeavyPage` instance adds 100 new locator *instances* but zero new method copies.

### Code Example

```typescript
import { test, expect } from '@playwright/test';
import { HeavyPage } from './pages/HeavyPage';
import { LoginPage } from './pages/LoginPage';

test('a 100-locator page object costs nothing to build', async ({ page }) => {
    const start = Date.now();
    const heavy = new HeavyPage(page);
    const buildMs = Date.now() - start;

    // Methods are on the prototype: shared by every instance
    const methods = Object.getOwnPropertyNames(HeavyPage.prototype)
        .filter(m => m !== 'constructor');

    console.log(`built ${heavy.allLocators().length} locators in ${buildMs}ms`);
    console.log(`${methods.length} methods on the prototype, shared by all instances`);

    expect(heavy.allLocators()).toHaveLength(100);
    expect(methods.length).toBeGreaterThanOrEqual(110);
    expect(buildMs).toBeLessThan(100);

    // A second instance re-creates the 100 locators but adds no methods
    const another = new HeavyPage(page);
    expect(Object.getOwnPropertyNames(HeavyPage.prototype).length)
        .toBe(methods.length + 1);   // +1 for constructor
    expect(another.allLocators()).toHaveLength(100);

    // Only acting on a locator reaches the DOM
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'tta_secret');

    await expect(heavy.title).toHaveText('Products');
    expect(await heavy.isTitleVisible()).toBe(true);
    expect(heavy.getUrl()).toContain('inventory');
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

**Line-by-line Explanation:**

- `Lines 1–3`: Imports `HeavyPage` (100 locators / 110 methods) and `LoginPage` (real navigation needed at the end to actually query the DOM).
- `Lines 6–8`: `Date.now()` is used as a wall-clock timer around the constructor call. `buildMs` captures elapsed milliseconds. This is deliberately simple — no `performance.now()` — because millisecond precision is sufficient for a sanity check.
- `Lines 11–13`: `Object.getOwnPropertyNames(HeavyPage.prototype)` retrieves all methods declared on the class. Filtering out `'constructor'` gives the count of real action methods. This line runs at the JavaScript VM level — no browser involvement.
- `Lines 15–16`: `console.log` statements produce visible output in the Playwright terminal. Students can run `npx playwright test 302` and see measured numbers, not just green ticks.
- `Line 18`: `expect(heavy.allLocators()).toHaveLength(100)` — `allLocators()` returns an array of all 100 `readonly` locator properties collected by the method. The test asserts the class has exactly the locators it claims to.
- `Line 19`: `toBeGreaterThanOrEqual(110)` — flexible lower bound because future maintenance might add methods without breaking this test.
- `Line 20`: `toBeLessThan(100)` — the core performance assertion. This will pass on any reasonable machine because building 100 lazy locators is essentially 100 string assignments.
- `Lines 23–26`: A second `new HeavyPage(page)` instance is created. `Object.getOwnPropertyNames(HeavyPage.prototype).length` is checked again — it must be identical (methods.length + 1 for constructor). Proves prototype methods are not duplicated per instance.
- `Lines 29–31`: Finally, a real login is performed to land on the inventory page. Only now does any locator interaction actually query the browser DOM.
- `Lines 33–35`: `heavy.title`, `heavy.isTitleVisible()`, and `heavy.getUrl()` are all called against the now-live page. These three lines prove the locators built in step one are fully functional — they were just waiting to be used.

**Why this approach was chosen:**

The coder chose an empirical benchmark over a conceptual explanation because the concern — *"large POMs are slow"* — is a runtime concern that documentation cannot fully dispel. Showing a number (`built 100 locators in 0ms`) is more convincing than explaining laziness abstractly. Using `Object.getOwnPropertyNames` rather than manual counting makes the prototype assertion reliable and self-updating.

The test also doubles as a regression guard: if someone accidentally changes a locator to eagerly query the DOM (e.g., `await page.$('#foo')`), the `buildMs < 100` assertion would catch it.

**Alternative Effective Way:**

For real production suites, use `performance.now()` instead of `Date.now()` for sub-millisecond precision:

```typescript
const start = performance.now();
const heavy = new HeavyPage(page);
const buildMs = performance.now() - start;
expect(buildMs).toBeLessThan(10); // even stricter — locators are microseconds
```

Also consider using `test.info().annotations` to attach benchmark results directly to the HTML report:

```typescript
test.info().annotations.push({ type: 'perf', description: `Built in ${buildMs}ms` });
```

---

## Common Mistakes

- **Using `await page.$()` inside a POM constructor** — this makes construction async and slow; it also creates a snapshot locator that goes stale. Always use `page.locator()` (sync, lazy).
- **Treating `buildMs > 0` as a problem** — some machines may report `1ms` due to JS engine JIT warm-up; the threshold should be generous (100ms) not strict (0ms).
- **Confusing prototype methods with instance properties** — methods on the class are shared; `readonly` locator properties declared with `this.X = ...` in the constructor are per-instance.
- **Not calling `allLocators()`** — if the helper method is missing, the length assertion has no array to check. Ensure `HeavyPage` implements `allLocators(): Locator[]`.

---

## Summary

**Key Takeaway:** Playwright locators are **lazy selector records**, not DOM queries. Building a POM with 100 locators costs microseconds and zero browser round-trips. JavaScript class methods live on the prototype — no matter how many instances you create, method memory scales with `O(1)` not `O(n)`. Large page objects are architecturally safe and encouraged.
