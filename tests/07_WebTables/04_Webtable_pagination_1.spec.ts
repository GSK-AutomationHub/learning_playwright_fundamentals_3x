import {test, expect} from '@playwright/test'

test('verify webtable pagination feature', async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');
    const name:string = 'Yuki Sato';
    let row = page.locator("#employees-tbody tr");
    let userRow;
    const nextBtn = page.getByTestId('next-page');

    while(true){
        userRow = row.filter({hasText:name});
        if(await userRow.count()){
            break;
        }
        if(await nextBtn.isDisabled()){
            throw new Error("Page not found")
        }
        await nextBtn.click();

    }

    const userEmail:string = await userRow.locator("td[data-col=email]").innerText();
    const userCountry:string = await userRow.locator("td[data-col=country]").innerText();

    console.log(`User ${name} belongs to ${userCountry} and have emailID ${userEmail}`);
    

});