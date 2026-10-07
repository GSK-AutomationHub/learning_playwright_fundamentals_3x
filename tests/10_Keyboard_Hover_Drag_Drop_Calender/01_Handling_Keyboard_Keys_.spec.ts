import { test} from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.only('Verify Keyboard Press', async({page})=>{
   await page.goto('https://www.toptal.com/developers/keycode');

   const filePath = path.join(__dirname, './Screenshots/');

   let word = 'Ganesh'
   for(let char of word){
      await page.keyboard.press(char)
      page.screenshot({path:filePath + `${char}.png`})
   }

});


test('Verify Keyboard Press Key Combinations', async ({ page }) => {
   await page.goto("https://keycode.info");

   const filePath = path.join(__dirname, './Screenshots/');

   let comboKeys = ['ArrowLeft','Shift+O','Shift']

   for(let key of comboKeys){
      if(key === 'Shift'){
         await page.keyboard.up(key);
         page.screenshot({path:filePath + `${key}Up.png`});
         await page.keyboard.down(key);
         page.screenshot({path:filePath + `${key}Down.png`});
      }else{
         await page.keyboard.press(key);
         page.screenshot({path:filePath + `${key}.png`});

      }
      
   }

});

test("Clean the Screenshot folder", async({page})=>{

   const folderPath = path.join(__dirname, './Screenshots');

  if (fs.existsSync(folderPath)) {
   //  fs.unlinkSync(filePath);
   //  console.log('File deleted successfully');
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log('Folder and all contents deleted successfully');
  }

});