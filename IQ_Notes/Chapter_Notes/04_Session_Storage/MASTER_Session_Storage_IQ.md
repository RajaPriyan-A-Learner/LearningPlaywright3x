# MASTER: Session Storage in Playwright

## 1. Syntax Reference — End to End
```typescript
// 1. Generate State (usually in a setup.ts project)
const context = await browser.newContext();
const page = await context.newPage();
// ... login steps ...
await context.storageState({ path: './playwright/.auth/user.json' });

// 2. Consume State Globally (playwright.config.ts)
use: { storageState: './playwright/.auth/user.json' }

// 3. Consume State per File / Suite (e.g. admin.spec.ts)
test.use({ storageState: './playwright/.auth/admin.json' });

// 4. Consume State dynamically (custom fixture)
test('Dashboard', async ({ adminPage }) => {
  await adminPage.goto('/dashboard');
});
```

## 2. Built-in Functions & Methods
- `BrowserContext.storageState({ path?: string })`: Returns storage state (cookies and localStorage). If `path` is provided, writes it to a file.
- `test.use({ storageState: 'path/to/file.json' })`: Fixture override at the suite or file level.
- `Browser.newContext({ storageState: 'path/to/file.json' })`: Imperative context creation using a pre-saved state.

## 3. Deep Insights & Gotchas
- **Session Expiry**: Saving `storageState` captures the tokens *at that exact moment*. If the application's JWT or session cookie expires after 1 hour, the saved state file becomes useless after 1 hour. Automated setups (like Project Dependencies) are required to refresh it.
- **IndexedDB / SessionStorage**: Playwright's `storageState` ONLY captures Cookies and LocalStorage. It **does not** capture `sessionStorage` or IndexedDB. If an app relies on IndexedDB for auth (like Firebase sometimes does), `storageState` will fail.
- **Race Conditions**: Generating state inside a `beforeAll` using `fs.existsSync` is brittle in multi-worker environments. Playwright `setup` projects are the native, thread-safe solution.

## 4. Interview-Ready Definitions
**What is Playwright Session Storage?**
"Playwright Session Storage is a mechanism to extract the cookies and localStorage from an authenticated browser context and save them to a JSON file. This file can then be injected into subsequent test contexts, allowing those tests to bypass the UI login flow entirely, significantly reducing test execution time and flakiness."

## 5. Tricky Interview Questions
**Q: How do you handle testing a chat application where User A (Admin) and User B (Employee) need to interact in the same test?**
A: You cannot use the default `page` fixture because it's bound to one storage state. Instead, you inject the raw `browser` fixture and manually spin up two contexts using `browser.newContext({ storageState: 'userA.json' })` and `browser.newContext({ storageState: 'userB.json' })`. Alternatively, you can build custom fixtures (e.g., `adminPage` and `employeePage`) to abstract this context creation.

**Q: Why might a test fail when using a saved `storageState` file even though the login was successful during setup?**
A: The most common reasons are: 1. The token expired (JWTs often expire quickly). 2. The authentication relies on `sessionStorage` or IndexedDB, which Playwright doesn't capture natively in `storageState`. 3. The `baseURL` is different between the setup and the test, causing cross-domain cookie rejection.

## 6. Controversial Topics & Ongoing Debates
**API Login vs. UI Login for Setup**
- *The UI Purists*: Setup should log in via the UI to guarantee the actual user flow works before running tests.
- *The API Pragmatists (Winner)*: UI login is slow and flaky. You should hit the `/api/login` endpoint via `request.post()`, grab the token, and inject it manually into `storageState`. It reduces setup time from 5 seconds to 50 milliseconds.

## 7. Quick Reference Cheat Sheet
| Requirement | Recommended Approach |
| :--- | :--- |
| Global single user | `use: { storageState: '...' }` in `playwright.config.ts` |
| Multi-role tests | Project-level dependencies (`setup` project) |
| File-specific override | `test.use({ storageState: '...' })` |
| Real-time multi-user | Custom Fixtures / Manual `browser.newContext()` |

## 8. Memory Map & Visual Flowchart
```mermaid
graph TD
    A[Start Test Suite] --> B{Does Setup Project Exist?}
    B -->|Yes| C[Run setup.ts]
    C --> D[Perform Login]
    D --> E[context.storageState()]
    E --> F[Save to user.json]
    F --> G[Run chromium-user Project]
    G --> H[test.use reads user.json]
    H --> I[Test begins logged in]
    B -->|No| J[Run tests unauthenticated]
```

## 9. LinkedIn-Style Post
Stop wasting time logging in before every Playwright test! 🛑⏱️

If your test suite takes 10 minutes, and 5 of those minutes are just watching the browser type passwords... you need Session Storage.

By capturing `storageState` (Cookies + LocalStorage) once in a global setup, you can inject that authenticated state into all your subsequent tests. They start instantly on the dashboard! 🚀

For multi-role apps, you can even extend Playwright fixtures to inject `{ adminPage, employeePage }` directly into the same test block for seamless real-time interactions.

How does your team handle auth state in E2E tests? UI or API? Let me know! 👇
#Playwright #QA #TestAutomation #TypeScript
