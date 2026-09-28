import {test, expect} from '@playwright/test'

test('Verify Scanning Webtable for desired user country', async({page})=>{

    await page.goto('https://awesomeqa.com/webtable.html');

    // first -> find rows & columns count
    const rowCount = await page.locator("//table[@id='customers']/tbody/tr").count();
    const colCount = await page.locator("//table[@id='customers']/tbody/tr[1]/th").count();
    console.log(`Total no of rows -> ${rowCount} and Total no of columns -> ${colCount}`);
    
    // second -> create dynamic xpaths & saggrigate to use with temp literal
    // hard-coded x-path -> //table[@id='customers']/tbody/tr[5]/td[2]
    let firstPart = "//table[@id='customers']/tbody/tr[";
    let secondPart = "]/td[";
    let thirdPart = "]";
    
    // iterate thr row with nested col loop , find desired col value & its following/preceding sibling
    for (let i=2; i <= rowCount; i++){
        for (let j=1; j<= colCount; j++){
            let dynamicXpath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            console.log(dynamicXpath);
            const data = await page.locator(dynamicXpath).innerText();
            if (data.includes('Yoshi Tannamuri')){
                const userCountry = await page.locator(`${dynamicXpath}/following-sibling::td`).innerText();
                console.log(`Yoshi Tannamuri is In Country -> ${userCountry}`);
                break; // break unable to break the outer loop
            }
        }
    }
    //await page.pause();
});



test('Test Optimized with PW Locator', async ({ page }) => {
   
    await page.goto('https://awesomeqa.com/webtable.html');

    // 1. Locate the table rows (skipping the header row if necessary, or let filter find it)
    const rows = page.locator('#customers tbody tr');

    // 2. Filter the rows to find the one containing the target user
    const targetRow = rows.filter({ hasText: 'Yoshi Tannamuri' });

    // 3. From that specific row, target the country column (the last td or specific sibling)
    // Alternative cleaner approach if the country is always the 3rd column (index 2):
    const userCountryLocator = targetRow.locator('td').nth(2);

    const userCountry = await userCountryLocator.innerText();
    console.log(`Yoshi Tannamuri is In Country -> ${userCountry}`);

    // 4. Assert the result to make it a true automated test
    await expect(userCountryLocator).toContainText('Canada');

});
