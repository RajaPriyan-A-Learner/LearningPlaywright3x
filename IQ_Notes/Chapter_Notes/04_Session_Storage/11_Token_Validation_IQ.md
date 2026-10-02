# Validating Live vs. Expired Tokens

When using saved Session Storage (`storageState`), a common enterprise challenge is: **What happens if the saved token has expired or the server revoked it?** 

If you blindly use an expired session state, your tests will fail immediately because they will be redirected to the login page.

To solve this, enterprise frameworks use a strategy called **"Conditional Setup"** or **"Token Validation."**

There are two ways to do this, but the first one is the "Covers It All" standard.

## 1. The API Ping Method (Recommended & "Covers It All")
This is the most robust method because it doesn't just check if a token *looks* valid; it actually asks the server if it will accept it. Even if a token hasn't reached its expiration date, the server might have manually revoked it. This method covers that scenario.

**How it works:**
1. Try to load the existing `storageState`.
2. Make a fast, lightweight API call (like fetching the user profile) using that state.
3. If the server returns a `200 OK`, the token is live. **Skip login.**
4. If the server returns a `401 Unauthorized` (or the file doesn't exist), the token is dead. **Perform UI login.**

### Code Example:
Modify your `auth.setup.ts` to include this logic:

```typescript
// auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, request }) => {
  let isTokenValid = false;

  // 1. Check if the session file already exists
  if (fs.existsSync(authFile)) {
    console.log('Session file found, validating token...');
    
    // 2. Make a lightweight API call using the saved session
    // 'request' automatically uses the storageState if configured in playwright.config.ts
    const response = await request.get('https://example.com/api/v1/user/profile', {
      // Pass the existing storage state to this specific request context
      storageState: authFile, 
    });

    // 3. If we get a 200, the token is perfectly valid!
    if (response.ok()) {
      isTokenValid = true;
      console.log('Token is LIVE. Skipping UI Login.');
    } else {
      console.log('Token is EXPIRED or REVOKED. Proceeding with UI Login.');
    }
  }

  // 4. If the token is NOT valid (or file didn't exist), perform the actual login
  if (!isTokenValid) {
    await page.goto('https://example.com/login');
    await page.fill('#username', 'user1');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');
    
    await page.waitForURL(/.*dashboard/);
    
    // Save the brand new state, overwriting the expired one
    await page.context().storageState({ path: authFile });
    console.log('New token generated and saved.');
  }
});
```

---

## 2. The JWT Decode Method (Alternative)
If your application uses standard JWTs (JSON Web Tokens) stored in `localStorage` or `cookies`, you can decode the token locally to check the `exp` (expiration) timestamp.

**Pros:** It doesn't require making an extra API call.
**Cons:** If a user is forcibly logged out by an admin on the server, the local token's expiration date might still say it's valid, causing your test to fail anyway. 

Because of this flaw, **The API Ping Method** is universally preferred for enterprise automation frameworks because it represents the true source of truth (the server).
