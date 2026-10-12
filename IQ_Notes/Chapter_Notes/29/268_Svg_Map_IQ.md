# 268_Svg_Map — Vector Geographic Map Navigation with XPath name()

**File:** `29_Playwright/e2e_tests/12_Handle_SVG/268_Svg_Map.spec.ts`

## Overview
This specification details how to automate interactive SVG geographic maps (such as country maps divided into state/territorial path vectors). It uses XPath's `name()` XML syntax to drill into the SVG document object model, discovers state paths based on specific CSS class names, and executes a click on a target state region ("INUP" for Uttar Pradesh).

---

## Main Concept
Geographic SVG maps represent regions and borders using complex `<path>` elements governed by mathematical coordinates in the `d` attribute. When interacting with SVG paths nested deeply within complex DOM wrappers, automation engineers often encounter legacy XPath patterns that rely on the XML function `name()`:
`//*[name()='svg']//*[name()='path' and contains(@class,'sm_state')]`
Understanding this legacy pattern alongside Playwright's native CSS traversal is essential for navigating intricate SVG vector trees.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';

const SimpleMaps = "https://simplemaps.com/svg/country/in";

test.describe('SVG handling', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(SimpleMaps);
    });

    test('locate SVG root and assert visible', async ({ page }) => {
        const states = await page
            .locator(
                "//div[@id='admin1_map_inner']//*[name()='svg']//*[name()='path' and contains(@class,'sm_state')]",
            )
            .all();

        for (const state of states) {
            const classState = await state.getAttribute("class");
            console.log(classState);
            if (classState?.includes("INUP")) {
                await state.click();
            }
        }
    });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `268_Svg_Map.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-3`: Imports Playwright fixtures and declares the target URL pointing to an interactive SVG vector map of India.
*   `Line 4-8`: Declares the test suite and opens the map page in the `beforeEach` hook.
*   `Line 10-16`: Uses an XPath locator targeting the map container (`div[@id='admin1_map_inner']`) traversing through `*[name()='svg']` into `*[name()='path']` matching the class `sm_state`, collecting all matched state path elements using `.all()`.
*   `Line 20-26`: Loops through every vector state path, reads its `class` attribute, and checks if it contains the state code identifier `"INUP"`. If matched, triggers a click on that specific path.

**Why this approach was chosen:**
The coder chose the `//*[name()='svg']//*[name()='path']` XPath selector to illustrate how vector elements are queried using XML namespace function `name()` in legacy test frameworks (like Selenium), proving that Playwright fully supports this syntax for backwards compatibility.

**Alternative Effective Ways:**
While `*[name()='svg']` works, it is verbose and slower to evaluate compared to Playwright's native CSS engine. An alternative effective way is to write clean CSS:
```typescript
const targetState = page.locator('#admin1_map_inner svg path.sm_state.INUP');
await targetState.click();
```
Or with Playwright's attribute selector:
```typescript
await page.locator('#admin1_map_inner path[class*="INUP"]').click();
```
This single line replaces the multi-line XPath selector, removes the need to download all state paths with `.all()`, and eliminates the `for` loop by directly querying the exact state in the DOM.

---

### Key Points
- In XPath, `//*[name()='svg']` and `//*[local-name()='path']` bypass default XML namespace resolution.
- In CSS, Playwright handles SVG tags natively without any special namespace prefix.
- Direct targeting (`path[class*="INUP"]`) is vastly superior to iterating over dozens of vector nodes in a client-side loop.

---

## Common Mistakes
- Omitting `await` before `state.click()` inside loop branches, causing unhandled promise rejections.
- Using simple `//svg//path` in standard XPath engines where namespaces aren't registered, which results in zero matches.
- Iterating through 50+ vector paths on every run instead of using a specific, targeted CSS selector.

---

## Summary
**Key Takeaway:** While XML XPath `name()='path'` functions correctly in Playwright, using concise CSS selectors like `path[class*="CODE"]` directly yields cleaner, faster, and more maintainable tests.
