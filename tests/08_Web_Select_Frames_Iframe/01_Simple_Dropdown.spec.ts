import {test, expect} from '@playwright/test'
import {simpleDropdownSelectOption} from  './web_select_helper.ts'

// Dropdown Handling Steps
// Locate Dropdown Element + Click()
// Locate dropdown.selectOption -> by VisibleText/ Label/ Value/ Index/ (dropDown Selector, Option)
// Assert by dropDown.toHaveValue(), dropDown.toContainText()

test("Verify simple dropdown - Visible Text", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    const dropDown = page.locator('#dropdown');
    await dropDown.click();
    await dropDown.selectOption('Option 1');
    await expect(dropDown).toHaveValue('1');
    await page.keyboard.press('Escape');

});

test("Verify simple dropdown - Value", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    const dropDown = page.locator('#dropdown');
    await dropDown.click();
    await dropDown.selectOption({value: '2'});
    await expect(dropDown).toHaveValue('2');
    await page.keyboard.press('Escape');

});


test("Verify simple dropdown - Label", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    const dropDown = page.locator('#dropdown');
    await dropDown.click();
    await dropDown.selectOption({label: 'Option 1'});
    await expect(dropDown).toHaveValue('1');
    await page.keyboard.press('Escape');

});


test("Verify simple dropdown - Index", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    const dropDown = page.locator('#dropdown');
    await dropDown.click();
    await dropDown.selectOption({index: 2});
    await expect(dropDown).toHaveValue('2');
    await page.keyboard.press('Escape');

});

test("Verify simple dropdown - selectOption using Element & Option", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator('#dropdown').click();
    await page.selectOption('#dropdown', 'Option 1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
    await page.keyboard.press('Escape');

});

test("Verify simple dropdown - Helper Fuction", async({page})=>{
    await simpleDropdownSelectOption(page, 'Option 2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
    await page.keyboard.press('Escape');

});
 