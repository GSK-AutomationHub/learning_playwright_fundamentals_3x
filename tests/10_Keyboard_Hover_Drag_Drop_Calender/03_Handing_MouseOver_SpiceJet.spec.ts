import { test, expect } from '@playwright/test'

test('Verify Mouse Hover Menu on SpiceJet Site', async ({ page }) => {
test.setTimeout(60_000);

  // Navigate to SpiceJet Website
  await page.goto('https://www.spicejet.com/');

  //Hover to Add-on, FlyEarly Menus
  const addOnmenu = page.getByText('Add-ons', { exact: true });
  const FlyEarlyMenu = page.getByText('FlyEarly', { exact: true });
  await addOnmenu.hover();
  await FlyEarlyMenu.hover();

  // Handling New tab opend on cick of  FlyEarly Sub-menu using Promise.all()
  const [newTab] = await Promise.all([
    page.waitForEvent('popup'),
    FlyEarlyMenu.click()
  ]);

  await newTab.waitForLoadState('domcontentloaded');

  // New tab Assertion & Closing it
  await expect(newTab).toHaveURL('https://corporate.spicejet.com/FLYEarlyProductatAirports.aspx');
  await newTab.close();

  // Handling Start-Over Popup appears intermittently on Main Page using try-catch
  try {
    const startOver = page.getByRole('button', { name: 'Start Over' });

    if (await startOver.isVisible({ timeout: 3000 })) {
      await startOver.click();
    }
  } catch {
    console.log('Start Over popup did not appear. Continuing...');
  }

  // Main Page Assertion
  expect(await page.title()).toContain('SpiceJet - Flight Booking');

  // Clean-up
  page.close();


});

/*
-------------------------------------- Review Comments ----------------------------------------
1. Geo-location popup ->browser-level popup

The “www.spicejet.com wants to know your location” popup is controlled by the browser, 
not the webpage DOM. So try-catch or a locator will not handle it.

The clean solution is to configure the permission in playwright.config.ts:

import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    permissions: ['geolocation'],

    // Add this only if your test needs a specific location
    geolocation: {
      latitude: 28.6139,
      longitude: 77.2090
    }
  }
});

If you only want to grant location permission and don't need a specific location:

use: {
  permissions: ['geolocation']
}

This prevents the browser permission popup from interfering with your test.

*/

/*
-------------------------------------- Review Comments ----------------------------------------

2. “Start Over” popup — webpage-level popup

The “Hello? Anybody there? Your session has timed out” popup is part of the webpage, 
so Playwright can interact with it.

If it appears intermittently, try-catch can be used:

try {
  const startOver = page.getByRole('button', {name: 'Start Over'});

  if (await startOver.isVisible({ timeout: 3000 })) {
    await startOver.click();
  }
} catch {
  console.log('Start Over popup did not appear. Continuing...');
}
Then continue with your test.
*/