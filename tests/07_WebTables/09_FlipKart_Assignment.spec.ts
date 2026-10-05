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

/* PD solution

Ganesh K there is a real bug before the redundancy: on the first pass NEXT is visible, 
so the loop clicks it before reading anything. Page 1 is never read, and what you print as Page 1 is page 2. 
Read the current page first, then move:

const readPage = async (n: number) => {
  const names = await page.locator('div.RG5Slk').allInnerTexts();
  const prices = await page.locator('div.hZ3P6w.DeU9vF').allInnerTexts();
  names.forEach((name, i) => console.log(`Page ${n}: ${name} :: ${prices[i] ?? 'no price'}`));
};

for (let n = 1; n <= 5; n++) {
  await readPage(n);
  if (!(await nextBtn.isVisible())) break;
  await nextBtn.click();
  await expect(page).toHaveURL(new RegExp(`page=${n + 1}`));
}

That also removes the duplicated block. Three more things:

1. Reading names and prices as two separate lists and pairing them by index breaks the moment 
one product has no price, because every later pair shifts. Read each product card and take the 
name and price from inside it.

2. Class names like RG5Slk change whenever Flipkart deploys. Anchor on something stable, such as 
the product card or the price text, rather than generated classes.

3. networkidle rarely settles on a site like Flipkart. Wait for something you expect, like the 
page number in the URL, and cap the pages as above, because a real site has dozens of pages.
  
*/