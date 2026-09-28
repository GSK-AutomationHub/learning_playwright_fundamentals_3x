import {test, Page, Locator} from '@playwright/test'

async function findRowByUserName(page:Page, name:string): Promise<Locator> {
    
    const row = page.locator("#employees-tbody tr");
    const nextBtn = page.getByTestId('next-page');
    let userRow;

    while(true){
        userRow = row.filter({hasText:name});
        if(await userRow.count()){
            return userRow;
            break;
        }
        if(await nextBtn.isDisabled()){
            throw new Error("Page not found")
        }
        await nextBtn.click();
    }
    
}

test('verify webtable pagination feature', async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');
    const name:string = 'Yuki Sato';
    const userRow = await findRowByUserName(page,name);
    const userEmail:string = await userRow.locator("td[data-col=email]").innerText();
    const userCountry:string = await userRow.locator("td[data-col=country]").innerText();
    console.log(`User ${name} belongs to ${userCountry} and have emailID ${userEmail}`);
    

});