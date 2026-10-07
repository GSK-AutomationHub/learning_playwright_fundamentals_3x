import { test, expect, Locator } from '@playwright/test';

test('Verify drag & drop basic case', async ({ page }) => {
   await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

   const columnA:Locator = page.locator('#column-a');
   const columnB:Locator = page.locator('#column-b');
   console.log(`------- Before Drag & Drop ------------------`);
    let columnAText = await columnA.innerText()
   console.log(`Source box heading:${await columnA.innerText()}`);
   console.log(`Target box heading:${await columnB.innerText()}`);

   await columnA.dragTo(columnB);
   console.log(`------- After Drag & Drop ------------------`);
   console.log(`Source box heading:${await columnA.innerText()}`);
   console.log(`Target box heading:${await columnB.innerText()}`);

   await expect(columnB).toHaveText(columnAText);

});

// Below code works when soure / taget element ade of multiple layer of divs/spans etc

test('Verify drag & drop advance case', async ({ page }) => {
   await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

   const source: Locator = page.locator('#column-a');
   const sBox = (await source.boundingBox())!; //source ele boundaries 
   const target: Locator = page.locator('#column-b');
   const tBox = (await target.boundingBox())!; //target ele boundaries 

   console.log(`------- Before Drag & Drop ------------------`);
   let sourceText = await source.innerText()
   console.log(`Source box heading:${await source.innerText()}`);
   console.log(`Target box heading:${await target.innerText()}`);

   await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2); // picked box from center of source
   await page.mouse.down();
   await page.mouse.move(tBox.x + tBox.width / 2, tBox.y + tBox.height / 2, { steps: 10 }); // dropped box at center of target
   await page.mouse.up();

   console.log(`------- Before Drag & Drop ------------------`);
   console.log(`Source box heading:${await source.innerText()}`);
   console.log(`Target box heading:${await target.innerText()}`);

   await expect(target).toHaveText(sourceText)

});