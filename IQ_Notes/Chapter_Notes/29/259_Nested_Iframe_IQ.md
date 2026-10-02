# 259_Nested_Iframe — Chained frameLocator Depth

**File:** `29_Playwright/e2e_tests/09_Frame_Iframe/259_Nested_Iframe.spec.ts`

## Overview
SelectorsHub’s iframe scenario nests three documents: `#pact1` → `#pact2` → `#pact3`. Each input lives at a different depth, so locators must chain `frameLocator` calls.

---

## Main Concept
`page.frameLocator('#pact1').frameLocator('#pact2').frameLocator('#pact3')` is the only stable way to reach the innermost field. A locator on `page` or on `frame1` cannot see `#glaf`.

Fill each field on the frame that owns it: name on frame1, relation on frame2, tool on frame3.

### Code Example

```javascript
const frame1 = page.frameLocator('#pact1');
const frame2 = frame1.frameLocator('#pact2');
const frame3 = frame2.frameLocator('#pact3');

await frame1.locator('#inp_val').fill('Aishwarya Rai');
await frame2.locator('#jex').fill('Wife');
await frame3.locator('#glaf').fill('Playwright');
```

### Key Points

- Nesting is composition of frame locators, not CSS descendants.
- Header text on frame1 is still queried from `frame1`, not `page`.
- `waitForTimeout` and a dangling `page.keyboard` line are leftovers; drop them in real tests.

---

## Common Mistakes

- Trying `page.locator('#pact1 #glaf')` — selectors do not cross frame documents.
- Switching to `page.frame({ url })` and losing auto-wait.
- Filling all three fields on `frame1`.

---

## Summary
**Key Takeaway:** Nested iframes need chained `frameLocator` objects, one per document boundary.
