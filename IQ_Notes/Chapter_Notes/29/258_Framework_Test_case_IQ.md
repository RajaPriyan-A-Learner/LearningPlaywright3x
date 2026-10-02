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

### Code Breakdown: `258_Framework_Test_case.spec.ts`

**Line-by-line Explanation:**
*   `Line 6`: Declares a `FrameLocator` named `mainFrame` using the name attribute `[name="main"]`.
*   `Line 7-8`: Targets an `h2` heading inside that frame and prints its text.
*   `Line 11-12`: Extracts all `<frame>` tags on the entire page using `.all()` and logs the total count.
*   `Line 14-17`: Loops through each frame object to extract and print its `name` and `src` attributes.
*   `Line 20-21`: Creates a second `FrameLocator` for `[name="side"]` and clicks a link completely isolated inside that side frame.

**Why this approach was chosen:**
The coder chose this approach to demonstrate handling legacy HTML `<frameset>` and `<frame>` tags (which behave similarly to `<iframe>`). By using `.all()` to find all frame nodes, they can audit the page structure. By explicitly declaring separate `FrameLocator` variables (`mainFrame`, `sideFrame`), they keep actions clearly scoped to their respective contexts without getting confused about which DOM is active.

**Alternative Effective Way:**
Using `//frame` XPath is slightly outdated.
An alternative effective way to count all frames using modern CSS is:
```typescript
const allFrames = await page.locator('frame, iframe').all();
```
Additionally, `Locator.all()` does not automatically wait for frames to load. If frames are injected dynamically by JavaScript, an effective way is to wait for them first:
```typescript
await page.locator('frame').first().waitFor();
const allFrames = await page.locator('frame').all();
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
