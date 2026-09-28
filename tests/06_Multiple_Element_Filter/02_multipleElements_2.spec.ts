import {test, expect} from '@playwright/test'

test('sample test', async({page})=>{

    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

    // code

    await page.pause();


});
