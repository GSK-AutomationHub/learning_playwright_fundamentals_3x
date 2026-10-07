import {test, expect, Locator} from '@playwright/test';

test.describe('Verify SVG Element', ()=>{
    const URL = 'https://www.flipkart.com/search'
    test.beforeEach(async({page})=>{
        await page.goto(URL);
    });

    test('Verify searching macmini on flipkart site using svg', async({page})=>{
        const searchBox = page.locator('input[name=q]');
        const svgSearchClickBtn = page.locator('svg').first();
        await searchBox.fill('macmini');
        await svgSearchClickBtn.click();

        page.waitForLoadState('networkidle');

        const products:Locator[] = await page.locator('.pIpigb').all();
        console.log('Total Macmini Products found are as per class:' + products.length)

        for(let product of products){
            console.log(await product.innerText())
        }

        // let productXpath = "//div[contains(@data-id,'CPU') or contains(@data-id,'ACC') or contains(@data-id,'COM') or contains(@data-id,'MP')]/div/a[2]";
        // const products2 = page.locator(productXpath);
        // const count: number = await products2.count();
        // console.log('Total Macmini Products found are as per css:' + count)
        // for (let i = 0; i < count; i++) {
        //     const title: string | null = await products2.nth(i).textContent();
        //     console.log(title);
        // }



    });


});