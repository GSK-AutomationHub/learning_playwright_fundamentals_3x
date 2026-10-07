import { test, expect, FrameLocator } from '@playwright/test';

test('Handling nested frames', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/frames/nested-iframes');
  // https://selectorshub.com/iframe-scenario/

  // Locating the nested frames (Synchronous)
  let frame1: FrameLocator = page.frameLocator('#pact1');
  let frame2: FrameLocator = frame1.frameLocator('#pact2');
  let frame3: FrameLocator = frame2.frameLocator('#pact3');

  // Interacting with elements (Asynchronous - requires await)
  await frame1.locator('#inp_value').fill('Kajol');
  await frame2.locator('#jex').fill('Mansiha');
  await frame3.locator('#glaf').fill('Katrina');
  
});
