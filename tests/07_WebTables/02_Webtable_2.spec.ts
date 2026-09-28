import {test, expect, Locator} from '@playwright/test'

test('Verify printing Webtable', async({page})=>{

    await page.goto('https://awesomeqa.com/webtable1.html');

    // first -> find rows & columns count
    const heading: string[] =  await page.locator('[summary="Sample Table"] thead tr th').allInnerTexts();
    const footer: string[]  = await page.locator('[summary="Sample Table"] tfoot tr :is(th,td)').allInnerTexts();
    const rows: Locator[] = await page.locator('[summary="Sample Table"] tbody tr').all();
    const rowCount = rows.length;
    //const cells = rows.nth(i).locator(':is(tr, td)')

    // print heading , rows and footer
    console.log(heading);

    for (let i=0; i <= rowCount-1; i++){
        console.log( await rows[i].locator(':is(td,th)').allInnerTexts());
        }

    console.log(footer)

});