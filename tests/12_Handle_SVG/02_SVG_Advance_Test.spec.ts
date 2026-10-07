import { test, expect, Locator } from '@playwright/test'

test.describe('Verify SVG Elements', () => {

    test.setTimeout(60000)

    test.describe.configure({'mode':'parallel'});

    const pageUrl = 'https://app.thetestingacademy.com/playwright/widgets/svg';

    test.beforeEach(async ({ page }) => {
        await page.goto(pageUrl);

    })

    test('Verify Shape Gallary SVGs', async ({ page }) => {
        const shapes: Locator[] = await page.locator('.shape').all();

        for (let shape of shapes) {
            let expectedShapeLabel = await shape.getAttribute('aria-label');
            await shape.click();
            console.log(`Clicked on Shape: ${expectedShapeLabel}`)
            await expect(shape).toHaveAttribute('class', 'shape is-selected')
            let shapesOutputResponse = JSON.parse(await page.locator('#shapes-output').innerText());
            let actualShapeLabel = shapesOutputResponse.ariaLabel;
            console.log(`Shape Aria Label Displayed in Output is: ${actualShapeLabel}`)
            expect(actualShapeLabel).toBe(expectedShapeLabel);
        }
        //await page.close();
    });

    test('Verify Bar Chart SVGs', async ({ page }) => {
        const bars: Locator[] = await page.locator('.bar').all();

        for (let bar of bars) {
            let expectedBarTestId = await bar.getAttribute('data-testid');
            await bar.click();
            console.log(`Clicked on Bar: ${expectedBarTestId}`)
            await expect(bar).toHaveAttribute('class', 'bar is-active')
            let barsOutputResponse = JSON.parse(await page.locator('#bars-output').innerText());
            let actualBarTestId = barsOutputResponse.testid;
            console.log(`Bar Test-id displayed in Output is: ${actualBarTestId}`)
            expect(actualBarTestId).toBe(expectedBarTestId);
        }
        //await page.close();
    });

    test('Verify Star Rating SVGs', async ({ page }) => {
        const stars: Locator[] = await page.locator('.star').all();

        for (let star of stars) {
            let StarDataValue = await star.getAttribute('data-value');
            await star.click();
            console.log(`Clicked on Star: ${await star.getAttribute('data-testid')}`)
            await expect(star).toHaveAttribute('class', 'star is-filled')
            let starRating = await page.locator('#stars-readout').innerText();
            console.log(`Star Rating displayed in Output is: ${starRating}`)
            expect(starRating).toContain(StarDataValue);
        }
        //await page.close();
    });

})