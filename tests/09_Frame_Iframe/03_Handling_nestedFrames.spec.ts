import { test, expect, FrameLocator } from '@playwright/test';

test('Handling nested frames at selectorshub', async ({ page }) => {
  await page.goto('https://selectorshub.com/iframe-scenario/');

  // Locating the nested frames (Synchronous)
  let frame1: FrameLocator = page.frameLocator('#pact1').first();
  let frame2: FrameLocator = frame1.frameLocator('#pact2');
  let frame3: FrameLocator = frame2.frameLocator('#pact3');

  // Interacting with elements (Asynchronous - requires await)
  await frame1.locator('#inp_value').fill('frame1_Input');
  await frame2.locator('#jex').fill('frame2_Input');
  await frame3.locator('#glaf').fill('frame3_Input');
  
});

test('Handling nested frames at TTA', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/frames/nested-iframes');

  // Locating the nested frames (Synchronous) & Interacting with elements (Asynchronous - requires await)
  let frame1: FrameLocator = page.frameLocator('iframe#pact1');
  await frame1.locator('#inp_value').fill('frame1_Input');

  let frame2: FrameLocator = frame1.frameLocator('iframe#pact2');
  await frame2.locator('#jex').fill('frame2_Input');

  let frame3: FrameLocator = frame2.frameLocator('iframe#pact3');
  await frame3.locator('#glaf').fill('frame3_Input');

 
  
});