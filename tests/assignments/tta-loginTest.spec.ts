import {test, expect} from '@playwright/test'

test('TTA Multiple Elment Filter Site Login Test', async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    const emailTextField = page.getByLabel('Email Address');
    const passwordTextField = page.getByLabel('Password');
    const loginButton = page.getByRole('button',{name:'Login to Practice Account'});
    await emailTextField.fill('sampetestemail@test.com');
    await passwordTextField.fill('sampletest@123');
    await loginButton.click();
    await expect(page).toHaveURL('https://app.thetestingacademy.com/playwright/multiple_element_filter?email=sampetestemail%40test.com&password=sampletest%40123#login-success');
    
});