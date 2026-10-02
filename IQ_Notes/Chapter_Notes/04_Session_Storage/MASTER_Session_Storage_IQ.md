# MASTER: Session Storage in Playwright (Consolidated Guide)

This master document aggregates and consolidates all concepts, configurations, and strategies for handling Session Storage across Playwright from the fundamental level to enterprise-grade implementations.

---

## 1. Core Setup Hierarchies & Strategies
Understanding where and how to apply session storage is critical. Playwright offers multiple layers of configuration:

1. **Global Level (`globalSetup`)**: 
   - Runs exactly once per test run.
   - Configured at the root of `playwright.config.ts`.
   - Usually relies on standalone scripts launching the browser manually.
2. **Project Level (Setup Projects - Recommended)**: 
   - The modern standard. Defined as a separate project (e.g., `testMatch: /.*\.setup\.ts/`).
   - Testing projects link to it via `dependencies: ['setup']`.
   - Supports Playwright tracing, fixtures, and reporting.
3. **Default Context Level**: 
   - Configured via `use: { storageState: '...' }` inside `playwright.config.ts` to apply the state automatically to all tests.
4. **File / Suite Level Override**: 
   - Configured inside a `.spec.ts` file using `test.use({ storageState: '...' })`.
   - Overrides the global or project-level state for that specific file.
5. **Inside Test Spec (Dynamic Contexts)**: 
   - Calling `browser.newContext({ storageState: '...' })` manually.
   - Perfect for multi-role testing (e.g., chat apps) where you need multiple distinct sessions in a single test block.
6. **`test.beforeAll` Constraints**: 
   - While you *can* generate state in a `beforeAll`, it is highly discouraged. In multi-worker environments, file system checks (`fs.existsSync`) create race conditions. Project setups are thread-safe.

---

## 2. Advanced Implementation Strategies

### A. Token Validation (Conditional Setup)
Blindly using a saved state is dangerous if the token expires or is revoked. Enterprise frameworks use **API Ping Validation**:
- Load the existing `storageState`.
- Use the `request` fixture to make a lightweight API call (e.g., `/api/profile`).
- If it returns `200 OK`, skip UI login.
- If it returns `401 Unauthorized`, perform UI login and overwrite the session file.

### B. Custom Fixtures for Multi-User
Instead of manually calling `browser.newContext()` in every test, you can abstract session loading into custom fixtures:
```typescript
test('Chat', async ({ adminPage, employeePage }) => {
  // adminPage and employeePage are pre-loaded with different storage states!
});
```

### C. Standalone Helpers vs. Reusable Functions
- **Standalone Helpers**: Scripts that explicitly use `chromium.launch()`. Best for CI pre-flight scripts or `globalSetup`.
- **Reusable Functions**: Helper functions that take a `page` or `request` fixture as an argument. Best used inside Setup Projects.

---

## 3. Syntax Reference — End to End
```typescript
// 1. Generate State (Project Setup)
setup('Login', async ({ page }) => {
  // ... login steps ...
  await page.context().storageState({ path: 'user.json' });
});

// 2. Consume State Globally (playwright.config.ts)
use: { storageState: 'user.json' }

// 3. Consume State per File / Suite (e.g. admin.spec.ts)
test.use({ storageState: 'admin.json' });

// 4. Consume State dynamically (Manual Context)
const context = await browser.newContext({ storageState: 'admin.json' });
```

---

## 4. Built-in Functions & Methods
- `BrowserContext.storageState({ path?: string })`: Extracts cookies/localStorage.
- `test.use({ storageState: '...' })`: Overrides fixture settings at the file/suite level.
- `Browser.newContext({ storageState: '...' })`: Creates a new context seeded with the state.

---

## 5. Deep Insights & Gotchas
- **Session Expiry**: Saving `storageState` captures tokens at that exact moment. Automated validations are required to refresh expired JWTs.
- **IndexedDB / SessionStorage**: Playwright ONLY captures Cookies and LocalStorage. It **does not** capture `sessionStorage` or IndexedDB (common in Firebase). 
- **The `projects` Array Rule**: You **cannot** put `globalSetup` inside an individual project definition. `globalSetup` is strictly root-level, while Project Dependencies (`dependencies: ['setup']`) are strictly project-level.

---

## 6. Tricky Interview Questions
**Q: How do you handle testing a chat application where User A (Admin) and User B (Employee) need to interact in the same test?**
A: Inject the raw `browser` fixture and manually spin up two contexts using `browser.newContext({ storageState: 'userA.json' })` and `browser.newContext({ storageState: 'userB.json' })`. Alternatively, build custom fixtures (`adminPage`, `employeePage`).

**Q: How do you prevent tests from failing when a saved session token expires?**
A: Implement "Token Validation" in your setup project. Before logging in via UI, make a quick API GET request using the saved state. If it returns 200, skip login; if 401, perform login and overwrite the file.

**Q: Why might a test fail when using a saved `storageState` file even though the login was successful during setup?**
A: 1. The token expired. 2. The authentication relies on `sessionStorage`/IndexedDB. 3. The `baseURL` is different between the setup and the test (cross-domain cookie rejection).

---

## 7. Quick Reference Cheat Sheet
| Requirement | Recommended Approach |
| :--- | :--- |
| Global single user | `use: { storageState: '...' }` in `playwright.config.ts` |
| Multi-role tests | Project-level dependencies (`setup` project) |
| File-specific override | `test.use({ storageState: '...' })` |
| Real-time multi-user | Custom Fixtures / Manual `browser.newContext()` |
| Expired Token Handling | API Ping via `request` fixture in Setup Project |
| Pre-flight CI Scripts | Standalone script (`chromium.launch()`) |

---

## 8. Memory Map & Visual Flowchart
```mermaid
graph TD
    A[Start Test Suite] --> B{Valid Session Exists?}
    B -->|Yes| C[API Ping Check]
    C -->|200 OK| D[Skip Login]
    C -->|401 Unauth| E[Run UI Login]
    B -->|No| E
    E --> F[context.storageState()]
    F --> G[Save to user.json]
    D --> H[Run chromium-user Project]
    G --> H
    H --> I[test.use reads user.json]
    I --> J[Test begins logged in]
```
