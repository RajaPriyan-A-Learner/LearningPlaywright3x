# 258_Framework_Test_case — Named Framesets and Side Navigation

**File:** `29_Playwright/e2e_tests/09_Frame_Iframe/258_Framework_Test_case.spec.ts`

## Overview
The multi-frames demo uses a classic `<frameset>` with named frames (`main`, `side`). This spec reads the main heading, logs every `//frame` name/src, then clicks a registration link in the side frame.

---

## Main Concept
`page.frameLocator('[name="main"]')` targets a named frame the same way you target an iframe id. Listing `page.locator('//frame').all()` is inventory, not interaction: those locators are the frame *elements* in the parent, not the inner document.

Clicks that should change the main panel belong on `frameLocator('[name="side"]')`.

### Code Example

```javascript
const mainFrame = page.frameLocator('[name="main"]');
console.log(await mainFrame.locator('h2').innerText());

const allFrames = await page.locator('//frame').all();
for (const frame of allFrames) {
  console.log(await frame.getAttribute('name'), await frame.getAttribute('src'));
}

const sideFrame = page.frameLocator('[name="side"]');
await sideFrame.getByTestId('side-link-registration').click();
```

### Key Points

- Named framesets still appear in modern training apps; `name` is the stable key.
- `.all()` on `//frame` returns host-page locators (attributes only).
- `frameLocator` is how you type into the child document.

---

## Common Mistakes

- Clicking `getByTestId` on `page` when the control is inside `side`.
- Assuming `await page.frameLocator(...)` must be awaited — construction is sync; the spec’s extra `await` is unnecessary.
- Confusing `<frame>` with `<iframe>` in CSS (`iframe` will match zero nodes here).

---

## Summary
**Key Takeaway:** Inventory frames on the parent; interact through `frameLocator('[name=...]')` for each child document.
