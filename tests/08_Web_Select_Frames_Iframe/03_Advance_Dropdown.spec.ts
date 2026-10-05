import {test, expect} from '@playwright/test'

test("Verify advance dropdown -> Single — Searchable -> Select Option", async({page})=>{
    
    await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes');
    const singleSearchDropdown = page.locator('[data-testid=rs-single]');
    await singleSearchDropdown.click();
    const singleSerachOptions = singleSearchDropdown.locator("[role=option]");
    await singleSerachOptions.filter({hasText:'Playwright'}).click();
    await expect(singleSearchDropdown).toHaveAttribute('data-value','Playwright');
    await page.waitForTimeout(200);
    await singleSearchDropdown.getByRole('button',{name:'Clear value'}).click();

});

test("Verify advance dropdown -> Single — Searchable -> Auto Suggestion", async({page})=>{
   
    await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes');
    const singleSearchDropdown = page.locator('[data-testid=rs-single]');
    await singleSearchDropdown.click();
    await page.getByTestId('rs-single-input').pressSequentially('selenium',{delay:500});
    await expect(page.getByTestId('rs-single-menu')).toContainText('Selenium');
    await singleSearchDropdown.getByRole('option',{name:'Selenium'}).click()
    await expect(singleSearchDropdown).toHaveAttribute('data-value','Selenium');
    await page.waitForTimeout(200);
    await singleSearchDropdown.getByRole('button',{name:'Clear value'}).click();

});


test("Verify advance dropdown -> Multiple — Searchable -> Select Option", async({page})=>{
    
    await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes');
    const multiSearchDropdown = page.locator('#rs-multi');
    await multiSearchDropdown.click();
    const multiSerachOptions = multiSearchDropdown.locator("[role=option]");

    // Select Multiple Options
    let toBeSelectedOptions = ["Pytest","Mocha","Cucumber"];
    for(let option of toBeSelectedOptions){
        await multiSerachOptions.filter({hasText:option}).click();
    }

    await page.keyboard.press('Escape');

    // Assertion  getByRole('option',{name:/Pytest|Mocha|Cucumber/})
    let selectedOptions = await page.locator('.tta-rs__multi-value').all();
    
    console.log(`Selected Options :${selectedOptions.forEach(async (ele, i) => console.log(`Index: ${i}, Value: ${await ele.getAttribute('data-value')}`))}`);
    console.log(`Selected Options Count :${selectedOptions.length}`);

    for(const [i, element] of selectedOptions.entries()){
        await expect(element).toHaveAttribute('data-value',toBeSelectedOptions[i]);
        console.log(`Assertion Passed for ${toBeSelectedOptions[i]}`);
        
    }

    // Clean-up  
    // let removeSelectedOptionBtns = await multiSearchDropdown.getByRole('button',{name:'Remove'}).all();
    // for(const btn of removeSelectedOptionBtns){
    //     await btn.click();  
    // }

    const removeButtons = multiSearchDropdown.getByRole('button', { name: 'Remove' });
    for (let left = toBeSelectedOptions.length; left > 0; left--) {
    await removeButtons.first().click();
    await expect(removeButtons).toHaveCount(left - 1);
    }

    await page.keyboard.press('Escape');

});



test("Verify advance dropdown ->  Creatable multi — type and Enter -> Select Option", async({page})=>{
    
    await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes');
    const multiSearchDropdown = page.locator('#rs-creatable');
    await multiSearchDropdown.click();
    //const multiSerachOptions = multiSearchDropdown.locator("[role=option]");

    // Select Multiple Options
    let toBeEnteredOptions = ["Smoke","Sanity","UAT"];
    for(let option of toBeEnteredOptions){
        await page.locator("[data-testid=rs-creatable-input]").fill(option);
        await page.keyboard.press('Enter');
    }

    // Assertion  
    let selectedOptions = await multiSearchDropdown.getByRole('option',{name:/Smoke|Sanity|UAT/}).all();
    for(const [i, element] of selectedOptions.entries()){
        await expect(element).toHaveAttribute('data-value',toBeEnteredOptions[i]);
        console.log(`Assertion Passed for ${toBeEnteredOptions[i]}`);
        
    }

    const removeButtons = multiSearchDropdown.getByRole('button', { name: 'Remove' });
    for (let left = toBeEnteredOptions.length; left > 0; left--) {
    await removeButtons.first().click();
    await expect(removeButtons).toHaveCount(left - 1);
    }

    await page.keyboard.press('Escape');

});


test("Verify advance dropdown ->  Grouped — categorised options -> Select Option", async({page})=>{
    
    await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes');
    const GroupedSearchDropdown = page.locator('#rs-grouped');
    await GroupedSearchDropdown.click();
    const groupOptions = await GroupedSearchDropdown.getByRole('option').all();
    let optionToBeSelected = ["AWS","Fastly","On-prem"];
   
   // Select Grouped Options
    for(const option of groupOptions){
        if(optionToBeSelected.includes(await option.innerText())){
            await option.click();
            GroupedSearchDropdown.click()
            //await expect(page.locator('.tta-rs__single-value')).toContainText(await option.innerText());
        }
    }

});


test("Verify advance dropdown ->  Async — fetched on type -> Select Option", async({page})=>{
    
    await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes');
    const AsyncSearchDropdown = page.locator('#rs-async');
    await AsyncSearchDropdown.click();
    let optionToBeSelected = ["Pun","Mum","Del"];
   
   // Select Grouped Options
    for(const text of optionToBeSelected){
        await page.locator("[data-testid=rs-async-input]").pressSequentially(text,{delay:500});
        await expect(page.getByTestId('rs-async-menu')).toContainText(text);
        await AsyncSearchDropdown.getByRole('option',{name:text}).click();
        await AsyncSearchDropdown.click();
    }

});

