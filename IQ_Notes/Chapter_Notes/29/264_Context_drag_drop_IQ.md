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
