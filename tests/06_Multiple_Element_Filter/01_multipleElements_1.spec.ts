import {test, expect, Locator} from '@playwright/test'

test("Verify printing inner text for all right tile links", async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    const rightTileLinksTexts :string[] = await page.locator('a.list-group-item').allInnerTexts();
    console.log(rightTileLinksTexts.length);
    for (const linkText of rightTileLinksTexts){
        console.log(linkText);
    }

});


test("Verify printing href attribute for all right tile links", async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    const rightTileLinks :Locator[] = await page.locator('a.list-group-item').all();
    console.log(rightTileLinks.length);
    for (const rightTileLink of rightTileLinks){
        console.log(await rightTileLink.getAttribute('href'));
    }

});


test("Verifying clicking 'My Account' link from right tile links", async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    const rightTileLinks :Locator[] = await page.locator('a.list-group-item').all();
    for (const rightTileLink of rightTileLinks){
        if(await rightTileLink.innerText() === 'My Account'){
            rightTileLink.click();
            break;
        }
    }
    
    // Directly target the specific link using Playwright's filter
    // await page.locator('a.list-group-item').filter({ hasText: 'My Account' }).click();
    await expect(page).toHaveURL('https://app.thetestingacademy.com/playwright/multiple_element_filter#my-account')
});