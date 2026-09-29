import {test, expect} from '@playwright/test'
import {customDropdownSelectOption} from  './web_select_helper.ts'

// Dropdown Handling Steps
// Locate Dropdown Element + Click()
// Locate Option Element + Click()
// Assert by dropDown.toHaveText(), dropDown.toContainText()

test("Verify custom dropdown - Programming language", async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns');
    await page.getByTestId("dropdown-language").click();
    await page.getByRole('option',{name:'Python'}).click();
    await expect(page.getByTestId("lang-trigger").locator('span')).toContainText('Python');
    await page.getByTestId("dropdown-language").click(); 
    await page.getByText('JavaScript').last().click();
    await expect(page.getByTestId("lang-trigger").locator('span')).toContainText('JavaScript');

});


test("Verify custom dropdown - Web Framework", async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns');
    await page.getByTestId("framework-trigger").click();
    await page.getByRole('option',{name:'Angular'}).click();
    await expect(page.getByTestId("framework-trigger").locator('span')).toContainText('Angular');
    await page.getByTestId("framework-trigger").click(); 
    await page.getByText('React').click();
    await expect(page.getByTestId("framework-trigger").locator('span')).toContainText('React');

});



test("Verify custom dropdown - Experience level", async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns');
    await page.getByTestId("dropdown-experience").click();
    await page.getByRole('option',{name:'Senior (7+ years)', exact: true}).click();
    await expect(page.getByTestId("experience-trigger").locator('span')).toContainText('Senior (7+ years)');
    await page.getByTestId("experience-trigger").click(); 
    await page.getByText('Principal (10+ years)').click();
    await expect(page.getByTestId("experience-trigger").locator('span')).toContainText('Principal (10+ years)');

});


test("Verify custom dropdown - Helper Function", async({page})=>{
    await customDropdownSelectOption(page,'dropdown-language','Python' )
    await expect(page.getByTestId("lang-trigger").locator('span')).toContainText('Python');
});