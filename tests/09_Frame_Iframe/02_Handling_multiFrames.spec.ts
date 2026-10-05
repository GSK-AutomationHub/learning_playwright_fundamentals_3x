import {test, expect,Locator, FrameLocator} from '@playwright/test';

test('Verify multiple frames', async({page}) => {
    await page.goto('https://app.thetestingacademy.com/playwright/frames/multi-frames');
    await page.waitForLoadState('load');
    const allFrames:Locator[] = await page.locator("//frame").all();
    console.log('total number of frames: ' + allFrames.length);
    for(const frame of allFrames){
    console.log(`${await frame.getAttribute('name')}: ${await frame.getAttribute('src')}`);
    }
    // allFrames.forEach(async(frame) => {
    //     console.log(`${await frame.getAttribute('name')}: ${await frame.getAttribute('src')}`);
    // });

    const mainFrame = page.frameLocator('[name=main]');
    const sideFrame = page.frameLocator('[name=side]');
    const footerFrame = page.frameLocator('[name=footer]');

    const heading = mainFrame.locator('h2').innerText();
    console.log('Heading of main frame: ' + await heading);
    const registartionLink = sideFrame.getByTestId('side-link-registration');
    await registartionLink.click();
    const vehicleNameTextBox = mainFrame.locator('h1');
    console.log('Heading of main frame after clicking registration link: ' + await vehicleNameTextBox.innerText());
    const footerText = footerFrame.locator('strong').innerText();
    console.log('Heading of footer frame: ' + await footerText);

});