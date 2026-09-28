import { chromium } from 'playwright'
import dotenv from "dotenv";

dotenv.config();
const VWO_USER = process.env.VWO_USER;
const VWO_PASS = process.env.VWO_PASS;

export async function saveSession() {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://app.wingify.com/#/login');
    const emailTextField = page.locator('#login-username');
    const passwordTextField = page.locator("#login-password");
    const signInBtn = page.locator('#js-login-btn');

    await emailTextField.fill(VWO_USER);
    await passwordTextField.fill(VWO_PASS);
    await signInBtn.click();
    await page.waitForURL(/#\/(dashboard)/, { timeout: 30000 });
  
    await context.storageState({path:'./VWO_User_Session.json'});
    console.log("Session saved to user-session.json ✅");
    await browser.close();
}

saveSession();