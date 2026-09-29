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

    // Assertion  
    let selectedOptions = await multiSearchDropdown.getByRole('option',{name:/Pytest|Mocha|Cucumber/}).all();
    for(const [i, element] of selectedOptions.entries()){
        await expect(element).toHaveAttribute('data-value',toBeSelectedOptions[i]);
        console.log(`Assertion Passed for ${toBeSelectedOptions[i]}`);
        
    }
    await page.waitForTimeout(200);

    // Clean-up  
    let removeSelectedOptionBtns = await multiSearchDropdown.getByRole('button',{name:'Remove'}).all();
    console.log(removeSelectedOptionBtns);
    for(let button of removeSelectedOptionBtns){
        await button.click();
    }

});

