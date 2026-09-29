import {expect, Page, Locator} from '@playwright/test'


export async function simpleDropdownSelectOption(page:Page, option:string) {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator('#dropdown').click();
    console.log(option);
    await page.selectOption('#dropdown', option); //`${option}`
    await page.keyboard.press('Escape');
    
}


export async function customDropdownSelectOption(page:Page, dropDown:string, option:string) {
    await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns');
    await page.getByTestId(dropDown).click(); //`${dropDown}`
    await page.getByRole('option',{name: option}).click(); //`${option}`}
     
}