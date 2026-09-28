import {test, expect} from '@playwright/test'

test('verify wingify free trial login error message', async({page})=>{
    await page.goto('https://wingify.com/free-trial/');
    const businessEmailTextField = page.getByLabel('Business Email*').first();
    const consentCheckbox1 = page.locator("[id$='marketing-consent-checkbox']").first();
    const consentCheckbox2 = page.locator("[id$='gdpr-consent-checkbox']").first();
    const createFreeTrailAccountBtn = page.getByRole('button', {name:'Create a Free Trial Account'});
    await businessEmailTextField.fill('fakeBusinessEmail');
    await consentCheckbox1.check();
    await consentCheckbox2.check();
    await createFreeTrailAccountBtn.click();
    const error_msg = page.getByText('The email address you entered is incorrect.');
    await expect(error_msg).toBeVisible();
    await expect(error_msg).toContainText('email address you entered is incorrect.');

});