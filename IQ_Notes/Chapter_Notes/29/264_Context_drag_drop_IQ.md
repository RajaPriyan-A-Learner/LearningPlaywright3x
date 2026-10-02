# 264_Context_drag_drop — Right-Click Context Menus

**File:** `29_Playwright/e2e_tests/10_Keyboard_Hover_Drag_Drop_Calender/264_Context_drag_drop.spec.ts`

## Overview
Despite the folder name, this spec opens a custom context menu. It right-clicks `span.context-menu-one`, logs every menu label, then chooses Copy.

---

## Main Concept
`locator.click({ button: 'right' })` fires `contextmenu`. jQuery-contextMenu then renders `ul.context-menu-list`. `.allInnerTexts()` snapshots visible actions for debugging.

`getByText('Copy', { exact: true }).first()` clicks the item; `.first()` guards against duplicate “Copy” nodes in nested menus.

### Code Example

```javascript
await page.goto('https://app.thetestingacademy.com/playwright/widgets/context-menu');
await page.locator('span.context-menu-one').first().click({ button: 'right' });
const allOptions = await page.locator('ul.context-menu-list span').allInnerTexts();
await page.getByText('Copy', { exact: true }).first().click();
```

### Code Breakdown: `264_Context_drag_drop.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to a Context Menu testing widget.
*   `Line 6`: Locates the trigger element (`span.context-menu-one`) and uses `.click({ button: 'right' })` to trigger the browser's (or custom UI's) context menu.
*   `Line 8-11`: Targets the `<ul>` menu that appears, extracts all the text labels of the options into an array (`allInnerTexts()`), and logs them.
*   `Line 13`: Explicitly selects the menu option named 'Copy' by filtering for exact text and clicks it.

**Why this approach was chosen:**
The coder used `{ button: 'right' }` to simulate a right-click interaction, which fires the `contextmenu` JavaScript event. They then interact with the DOM elements that the application dynamically renders in response. This confirms that custom context menus (which are just absolutely positioned `div` or `ul` elements, not native OS menus) can be tested normally once triggered.

**Alternative Effective Way:**
The code uses `first()` extensively (`.first().click(...)`), which indicates a lack of specificity or fear of strict mode violations.
An alternative effective way is to use more robust locators that don't rely on arbitrary ordering:
```typescript
// Assuming there is only one context menu area, or targeting it specifically
const menuTrigger = page.locator('.context-menu-one', { hasText: 'Right click me' });
await menuTrigger.click({ button: 'right' });

const copyOption = page.getByRole('menuitem', { name: 'Copy', exact: true });
await copyOption.click();
```
This is more effective because it uses ARIA semantics and guarantees that the test won't accidentally click the wrong element if the DOM structure changes slightly.

### Key Points

- Right-click is `{ button: 'right' }`, not a separate `contextClick` API.
- Menu items are often not `role=menuitem`; text locators are then required.
- Native OS menus are not in the DOM and cannot be clicked this way.

---

## Common Mistakes

- Using `hover` instead of right-click.
- Clicking Copy before the list is attached; rely on the locator auto-wait or `toContainText`.
- Expecting Playwright to drive the browser’s built-in spellcheck menu.

---

## Summary
**Key Takeaway:** In-page context menus are right-click plus a locator on the opened list; OS-native menus are out of reach.
