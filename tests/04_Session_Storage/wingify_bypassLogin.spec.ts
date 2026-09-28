import {test, expect} from '@playwright/test'
//import { saveSession } from './wingify_sessionStorage'

// test.beforeAll(async() =>{
//     await saveSession();
// });

test.use(
    {
        storageState : './VWO_User_Session.json',
        trace: 'on',
        screenshot:'on',
        video:'on'
    });



test("go directly to dashboard", async ({ page }) => {
    await page.goto("https://app.wingify.com/#/dashboard?accountId=1281673", {timeout:30000});
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loded — no login needed ✅");
    await page.waitForTimeout(1500);
});
