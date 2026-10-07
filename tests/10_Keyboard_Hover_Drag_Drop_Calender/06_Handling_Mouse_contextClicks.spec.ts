import { test, expect, Locator } from '@playwright/test';

test('Verify Drag and Drop in Kanban Board', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/context-menu');

    const rightClickTarget = page.locator('span.context-menu-one').first();
    const contextOutput = page.getByTestId('ctx-output');

    await rightClickTarget.click({ button: 'right' });
    const allOptions: string[] = await page
        .locator('ul.context-menu-list span:first-child')
        .allInnerTexts();
    console.log(allOptions);

    await page.locator('ul.context-menu-list').getByRole('button', { name: 'Copy'}).click();
    await expect(contextOutput).toContainText('"action": "copy"')

    await page.mouse.move(0, 0);
    await page.locator('.page-hero').click({ button: 'right' });
    await expect(page.locator('ul.context-menu-list')).toBeHidden()

});
