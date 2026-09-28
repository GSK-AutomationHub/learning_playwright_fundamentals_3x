import { test, expect } from '@playwright/test';

test('TTA Site codgen basic test', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('pramod');
  await page.getByRole('textbox', { name: 'Password' }).fill('test123');
  await expect(page.getByRole('textbox', { name: 'Email Address' })).toHaveValue('pramod');
  await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('test123');
  await expect(page.getByRole('complementary', { name: 'Practice navigation' }).getByRole('strong')).toContainText('The Testing Academy');
  await page.waitForTimeout(1000);
});