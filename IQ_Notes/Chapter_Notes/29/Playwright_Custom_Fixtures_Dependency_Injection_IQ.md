# Playwright Custom Fixtures & Dependency Injection: The Complete `use()` Architectural Guide

**File Reference:** `IQ_Notes/Chapter_Notes/29/Playwright_Custom_Fixtures_Dependency_Injection_IQ.md`

---

## Overview

In traditional test automation frameworks (Selenium, NUnit, JUnit, Mocha), test suites rely on split lifecycle hooks (`beforeEach`/`afterEach` or `@BeforeMethod`/`@AfterMethod`) combined with shared mutable class fields. This leads to brittle state leakage, race conditions in parallel execution, and unnecessary overhead when setup runs for tests that don't need it.

Playwright eliminates this paradigm using a built-in **Dependency Injection (DI) Fixture System** powered by `test.extend<T>()` and the special **`use()`** callback function. This guide demystifies the `use` parameter, the execution lifecycle, on-demand lazy instantiation, and enterprise Page Object Model (POM) injection.

---

## Main Concept

### 1. What is the `use` Parameter?

In Playwright fixtures:
```typescript
loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
}
```

> [!IMPORTANT]
> **`use` is NOT a JavaScript keyword.** It is an asynchronous **callback function** injected by Playwright's test engine. It acts as a **"yield" or "hand-off" boundary** between fixture setup, the actual test execution, and fixture teardown.

---

### 2. The "Sandwich" Execution Lifecycle Model

Every custom fixture follows a 3-phase lifecycle structured like a sandwich around `use()`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE FIXTURE "SANDWICH"                          │
├────────────────────────────────────────────────────────────────────────┤
│ 🥪 Top Bread:   SETUP PHASE (Runs BEFORE the test starts)              │
│                 - Spin up resources, seed databases, login via API    │
│                 - Instantiate Page Objects                             │
│                                                                        │
│ 🥩 The Filling: await use(resource); ◄─── EXECUTION PAUSES HERE!       │
│                 - Injects `resource` into test function arguments      │
│                 - THE TEST BODY RUNS TO COMPLETION                     │
│                                                                        │
│ 🥪 Bottom Bread: TEARDOWN PHASE (Runs AFTER the test ends)             │
│                 - Cleanup state, clear tokens, close external handles  │
│                 - Always executes, even if the test fails or times out │
└────────────────────────────────────────────────────────────────────────┘
```

#### Step-by-Step Flow:
```typescript
customResource: async ({ page }, use) => {
    // ──► 1. SETUP: Executes BEFORE test
    console.log('1. Setting up resource...');
    const resource = await createResource();

    // ──► 2. HAND-OFF: Execution pauses here; test body runs with `resource`
    await use(resource);

    // ──► 3. TEARDOWN: Executes AFTER test completes (pass or fail)
    console.log('3. Cleaning up resource...');
    await resource.dispose();
}
```

---

### 3. How Dependency Injection (DI) Works in Playwright

Instead of manually instantiating page objects inside tests:

```typescript
// ❌ TRADITIONAL APPROACH: Manual boilerplate in every test
test('User checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    // ...
});
```

With Playwright's **declarative dependency injection**, the test simply asks for the objects it needs in its destructured argument list:

```typescript
// ✅ PLAYWRIGHT DEPENDENCY INJECTION:
test('User checkout flow', async ({ loginPage, dashboardPage, cartPage }) => {
    // All 3 page objects are already instantiated and wired to the isolated page!
    await loginPage.navigate();
    await loginPage.login('user', 'pass');
    await dashboardPage.openCart();
    await cartPage.checkout();
});
```

#### Behind the Scenes:
1. **Signature Reflection:** When Playwright loads a test, it inspects the parameter signature `{ loginPage, dashboardPage }`.
2. **Dependency Resolution Graph:** It figures out the dependency graph:
   - `loginPage` requires `{ page }`.
   - `{ page }` requires `{ context }`.
   - `{ context }` requires `{ browser }`.
3. **Lazy Instantiation (On-Demand):** Only the fixtures requested by the test are executed! If a test does *not* request `dashboardPage`, that fixture is **never executed**—saving CPU, memory, and runtime.
4. **Isolated Scope:** Each parallel test worker receives clean, independent fixture instances with zero risk of cross-test pollution.

---

### 4. Demystifying `authenticatedUser: void` & Empty `await use()`

In enterprise frameworks, you often see fixtures configured like this:

```typescript
type EnterpriseFixtures = {
    loginPage: LoginPage;
    authenticatedUser: void; // Returns nothing!
};

export const test = base.extend<EnterpriseFixtures>({
    authenticatedUser: [async ({ page, request }, use) => {
        // Fast API Login: Seed auth tokens into browser storage
        const res = await request.post('https://api.myapp.com/v1/auth/login', {
            data: { username: process.env.TEST_USER, password: process.env.TEST_PASSWORD }
        });
        const { token } = await res.json();
        
        await page.addInitScript(t => {
            window.localStorage.setItem('auth_token', t);
        }, token);

        // ◄─── Notice: NO VALUE passed to use()!
        await use(); 
    }, { auto: true }] // ◄─── Automatically runs for ALL tests!
});
```

#### Key Insights:
1. **Why `await use()` with no arguments?**
   - The fixture's purpose is a **side-effect** (seeding auth cookies/tokens in browser localStorage via API) rather than providing an object.
   - Calling `await use()` signals to the runner: *"Side-effects and setup are complete. You can now execute the test body!"*
2. **Why `{ auto: true }`?**
   - Standard fixtures are lazy (they only run if requested in the test signature).
   - Marking a fixture as `{ auto: true }` forces Playwright to run it before **every test** in files that import this custom `test`, without requiring tests to explicitly include `{ authenticatedUser }` in their arguments.

---

### 5. Architectural Comparison: Fixtures vs. `beforeEach`/`afterEach`

| Feature | Legacy `beforeEach` / `afterEach` | Playwright `test.extend` Fixtures |
| :--- | :--- | :--- |
| **Logic Co-location** | Split across separate blocks far apart in the file | Setup, hand-off, and teardown live together in one block |
| **Execution Trigger** | Runs for *every* test in the suite indiscriminately | **Lazy & On-Demand:** Only runs if a test declares it |
| **State Sharing** | Requires shared mutable variables (`let page: Page`) | **Pure DI:** Passed directly as immutable function arguments |
| **Parallel Safety** | Fragile; shared class state causes race conditions | **100% Isolated:** Each worker has its own sandboxed fixtures |
| **Composability** | Hard to compose across multiple repositories/teams | Effortlessly shared via standard TypeScript imports/npm packages |

---

## TypeScript Implementation Example

### 1. Base Fixture Definition (`fixtures/base-fixture.ts`)
```typescript
import { test as base, expect } from '@playwright/test';

// 1. Mock Page Object Models
export class LoginPage {
    constructor(public readonly page: any) {}
    async goto() { await this.page.goto('/login'); }
    async submit(u: string, p: string) { /* ... */ }
}

export class DashboardPage {
    constructor(public readonly page: any) {}
    async getMetrics() { return 100; }
}

// 2. Define Fixture Types
type EnterpriseFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    authenticatedSession: void;
};

// 3. Extend Base Test
export const test = base.extend<EnterpriseFixtures>({
    // Test-scoped POM fixture
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await use(login);
    },

    // Test-scoped POM fixture
    dashboardPage: async ({ page }, use) => {
        const dashboard = new DashboardPage(page);
        await use(dashboard);
    },

    // Automatic API Auth Fixture
    authenticatedSession: [async ({ page, request }, use) => {
        // Fast API-based session setup
        await page.addInitScript(() => {
            window.localStorage.setItem('auth_token', 'mock_jwt_token_xyz');
        });

        // Handoff to test
        await use();

        // Optional post-test cleanup
        console.log('Test complete: Cleaning up session...');
    }, { auto: true }]
});

export { expect };
```

### 2. Test File Consuming the Custom Fixture (`e2e/dashboard.spec.ts`)
```typescript
import { test, expect } from '../fixtures/base-fixture';

// Test 1: Only needs dashboardPage. loginPage is NEVER instantiated!
test('Dashboard displays metrics for authenticated user', async ({ page, dashboardPage }) => {
    await page.goto('/dashboard');
    const count = await dashboardPage.getMetrics();
    expect(count).toBe(100);
});

// Test 2: Needs loginPage for explicit authentication verification
test('Unauthenticated user is redirected to login', async ({ loginPage }) => {
    await loginPage.goto();
    // Test runs with isolated clean context
});
```

---

## Common Mistakes

1. **Forgetting `await` on `use()`:**
   Writing `use(pageObject);` without `await` causes asynchronous setup/teardown races. Always write `await use(...)`.
2. **Putting Code After `use()` Expecting it to Run Before the Test:**
   Code placed after `await use()` runs in the **teardown phase** (after the test finishes), not during setup.
3. **Overusing `{ auto: true }`:**
   Making heavy fixtures `{ auto: true }` negates Playwright's on-demand performance benefits. Only use `{ auto: true }` for universal baseline prerequisites (like authentication, mocking specific network endpoints, or collecting custom telemetry).
4. **Mutating Global State Inside Fixtures:**
   Fixtures must remain pure relative to the test worker. Avoid mutating global variables outside the worker scope.

---

## Summary

**Key Takeaway:** In Playwright fixtures, `use()` is a lifecycle handoff callback that pauses fixture execution to run the test body with the injected resource, resuming afterward for cleanup. This on-demand dependency injection architecture replaces messy `beforeEach`/`afterEach` hooks with clean, composable, parallel-safe code.
