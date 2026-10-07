import { test, expect, Locator } from '@playwright/test';


test.describe('Verify JS Alerts', () => {

    test.describe.configure({ mode: 'parallel' }); // new way to run test in Parallel or Serial
    test.setTimeout(60_000);
    let result: Locator;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        result = page.locator('#result');
    });

    test('Verify Simple JS Alert', async ({ page }) => {
        const simpleJsAlertBtn = page.getByRole('button', { name: 'Click for JS Alert' });
        page.once('dialog', async dialog => {
            console.log('JS Alert Type:' + dialog.type());
            console.log('JS Alert Msg:' + dialog.message());
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        });
        await simpleJsAlertBtn.click();
        await expect(result).toHaveText('You successfully clicked an alert');

    });

    test('Verify JS Confirm Alert', async ({ page }) => {
        const confirmJsAlertBtn = page.getByRole('button', { name: 'Click for JS Confirm' });
        page.once('dialog', async dialog => {
            console.log('JS Alert Type:' + dialog.type());
            console.log('JS Alert Msg:' + dialog.message());
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.accept();
        });
        await confirmJsAlertBtn.click();
        await expect(result).toHaveText('You clicked: Ok');

    });

    test('Verify JS Prompt Alert', async ({ page }) => {
        const promptJsAlertBtn = page.getByRole('button', { name: 'Click for JS Prompt' });
        page.once('dialog', async dialog => {
            console.log('JS Alert Type:' + dialog.type());
            console.log('JS Alert Msg:' + dialog.message());
            expect(dialog.message()).toBe('I am a JS prompt');
            expect(dialog.defaultValue()).toBe('');
            await dialog.accept('Hi from Ganesh!');
        });
        await promptJsAlertBtn.click();
        await expect(result).toHaveText('You entered: Hi from Ganesh!');

    });


});