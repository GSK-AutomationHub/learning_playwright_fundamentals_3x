import { test, expect, Locator } from '@playwright/test';

test('Verify Automating Mouse Hover', async ({ page }) => {
   await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');
   const addOnMenu = page.getByTestId('nav-add-ons');
   const wifiMenu = addOnMenu.getByRole('menuitem', { name: 'Wi-Fi' });
   const wifiOutput = page.getByTestId('hover-output');
   await addOnMenu.hover();
   await expect(wifiMenu).toBeVisible(); 
   await wifiMenu.hover();
   await wifiMenu.click();
   await wifiMenu.blur(); // drop focus from the link
   await page.mouse.move(0, 0); // drop the hover
   await expect(page.getByRole('menu', { name: 'Add-ons submenu' })).toBeHidden();
   await expect(wifiOutput).toContainText("Wi-Fi");
   

});

/*
--------------------------------------- Review Comment -------------------------------------------
 your script is fine; the page keeps the menu open on purpose. 
 Its CSS shows the submenu on .nav-item:hover and also on .nav-item:focus-within. 
 Clicking Wi-Fi gives that link keyboard focus, so the menu stays open even after page.mouse.move(0, 0) 
 removes the hover. Remove the focus too:

await wifiMenu.click();
await wifiMenu.blur();         // drop focus from the link
await page.mouse.move(0, 0);   // drop the hover
await expect(page.getByRole('menu', { name: 'Add-ons submenu' })).toBeHidden();

This also corrects my earlier tip to Vanshdeep in this thread: on this page,
 moving the mouse away is not enough.


*/