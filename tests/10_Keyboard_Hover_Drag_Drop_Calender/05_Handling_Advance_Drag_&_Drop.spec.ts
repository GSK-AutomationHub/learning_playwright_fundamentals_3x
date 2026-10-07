import { test, expect, Locator } from '@playwright/test';


// Below code works when soure / taget element madeup of multiple layer of divs/spans etc
// To adjust UI view do below viewport config in 'use' object inside playwright.config.ts
// viewport: { width: 1920, height: 1080 }

test('Verify drag & drop on Kanban Board', async ({ page }) => {
   await page.goto('https://app.thetestingacademy.com/playwright/widgets/dnd');

   const source: Locator = page.getByTestId('card-fix-bug-42');
   const sCard = (await source.boundingBox())!; //source ele boundaries 
   const target: Locator = page.getByTestId('col-review');
   const tCard = (await target.boundingBox())!; //target ele boundaries 

   await page.mouse.move(sCard.x + sCard.width / 2, sCard.y + sCard.height / 2); 
   await page.mouse.down(); // picked box from center of source
   await page.mouse.move(tCard.x + tCard.width / 2, tCard.y + tCard.height / 2, { steps: 10 }); 
   await page.mouse.up(); // dropped box at center of target

   await expect(target).toContainText(await source.allInnerTexts())

});

