import { chromium } from 'playwright';
import dotenv from "dotenv";

dotenv.config();
// Credentials live in .env (gitignored) — never hardcode them in a public repo.

export default async function saveSession() {

    const VWO_USER = process.env.VWO_USER;
    const VWO_PASS = process.env.VWO_PASS;

    // Fail fast (before opening a browser) if .env is missing or incomplete.
    if (!VWO_USER || !VWO_PASS) {
        throw new Error(
            "VWO_USER / VWO_PASS not found. Add them to 29_Playwright/.env and run this script from the 29_Playwright folder."
        );
    }

    let browser = await chromium.launch({ headless: false });
    try {
        let context = await browser.newContext();
        let page = await context.newPage();

        await page.goto("https://app.wingify.com/#/login");

        const username = page.locator("#login-username");
        const password = page.locator("#login-password");

        await username.fill(VWO_USER);
        await password.fill(VWO_PASS);

        await page.locator("#js-login-btn").click();
        await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });

        await context.storageState({ path: "./user-session.json" });
        console.log("Session saved to user-session.json ✅");
    } finally {
        // Close the browser even when login fails, so no window is left open.
        await browser.close();
    }

}
saveSession().catch((err) => {
    console.error("Failed to save session:", err);
    process.exitCode = 1;
});
