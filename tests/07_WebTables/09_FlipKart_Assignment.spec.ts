import {test, expect} from '@playwright/test'

test('Verify FlipKart WebApp Pagination', async({page})=>{
    await page.goto('https://www.flipkart.com/search')
    const searchTextField = page.locator('input[name=q]');
    const nextBtn = page.getByRole('link',{name:'NEXT'});
    await searchTextField.fill('DSLR Camera');
    await searchTextField.press('Enter');

    let pageCount=0;

    while(true){
        pageCount++;
        console.log(`--------------------- Page ${pageCount} Product & Price Info ---------------------`);
        let productNames=[];
        let productPrice=[];
        if(await nextBtn.isVisible()){
            await nextBtn.click();
            await page.waitForLoadState("networkidle");
            productNames = await page.locator("div.RG5Slk").allInnerTexts();
            productPrice = await page.locator("div.hZ3P6w.DeU9vF").allInnerTexts();
            for(let i=0; i<productNames.length;i++){
            console.log(`${productNames[i]} :: ${productPrice[i] || null} `);
            console.log();
            }
        }
        else{
            productNames = await page.locator("div.RG5Slk").allInnerTexts();
            productPrice = await page.locator("div.hZ3P6w.DeU9vF").allInnerTexts();
            for(let i=0; i<productNames.length;i++){
            console.log(`${productNames[i]} :: ${productPrice[i] || null} `);
            console.log();
            }
            console.log(`All ${pageCount} Pages products covered`);
            break;
            
        }
        
    }
});