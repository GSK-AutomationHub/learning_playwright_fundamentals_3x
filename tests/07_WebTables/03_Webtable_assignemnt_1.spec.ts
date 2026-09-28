import {test, expect} from '@playwright/test'

test('Verify selecting desired user row of Webtable', async({page})=>{

    await page.goto('https://app.thetestingacademy.com/playwright/webtable');

    // first -> find table, table rows 
    const table = page.getByRole('table', { name: 'Employee Management System table' });
    const tableRows = table.locator('tbody tr');
    
    // filter  desired user record from table rows
    const userRecordRow = tableRows.filter({hasText:'Rohan.Mehta'})
    const userRecordRowCheckbox = userRecordRow.locator('td').first().locator('input');

    // element direct xpath vs css psduo class
    // xpath -> page.locator("//td[text()='Rohan.Mehta']/preceding-sibling::td/input")
    // css -> page.locator("tr:has(td:text('Rohan.Mehta'))").locator("td/input")

    // select user record checkbox
    await userRecordRowCheckbox.check();

    //assertion
    await expect(userRecordRowCheckbox).toBeChecked();

});


test.only('Verify selecting desired user row of Webtable using Xpath', async({page})=>{

    await page.goto('https://app.thetestingacademy.com/playwright/webtable');

    // first -> find table, table rows 
    const tableRows = page.locator("//table[starts-with(@aria-label,'Employee')]/tbody/tr");
    const rowCount = await tableRows.count();
    const tableColumns = page.locator("//thead/tr/th");
    const columnCount = await tableColumns.count();

    // hardcoded x-path for user record ...
    //table[starts-with(@aria-label,'Employee')]/tbody/tr[3]/td[2] 
    let firstPart = "//table[starts-with(@aria-label,'Employee')]/tbody/tr[";
    let secondPart = "]/td[";
    let thirdPart = "]";

    // Loop through table
    for(let i=1; i<=rowCount; i++){
        for(let j=1; j<=columnCount; j++){
            let dynamicXpath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            let userName = await page.locator(dynamicXpath).innerText();
            if(userName.includes("Rohan.Mehta")){
                const userRecordRowCheckbox = page.locator(`${dynamicXpath}/preceding-sibling::td`).locator('input');
                await userRecordRowCheckbox.check();
                await expect(userRecordRowCheckbox).toBeChecked();
                break;
            }
        }
    }
});