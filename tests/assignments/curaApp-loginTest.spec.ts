import {test,expect} from '@playwright/test'

test('Cura App Login Test1', async({page})=>{

    await page.goto("https://katalon-demo-cura.herokuapp.com");
    const makeAppointmentBtn = page.getByRole('link',{name:'Make Appointment'});
    expect(makeAppointmentBtn.isVisible).toBeTruthy();

    await makeAppointmentBtn.click();
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');

    const userNameField = page.getByLabel('Username');
    const passWordField = page.getByLabel('Password');
    const loginBtn = page.getByRole("button",{"name":'Login'});
    await userNameField.fill('John Doe');
    await passWordField.fill('ThisIsNotAPassword');
    await loginBtn.click();

    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/#appointment');
    await expect(page.locator('div>h2')).toBeVisible();
    await expect(page.locator('div>h2')).toHaveText('Make Appointment');

});


test('Cura App Login Test2', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const pageHeading = page.getByRole('heading', { name: 'CURA Healthcare Service' }).first();
    const makeAppointmentBtn = page.getByRole('link',{name:'Make Appointment'});
    await page.goto("https://katalon-demo-cura.herokuapp.com");
    await pageHeading.waitFor();
    expect(pageHeading.isVisible).toBeTruthy();
    await makeAppointmentBtn.click();
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.locator('.lead')).toContainText('Please login to make appointment.');

    const userNameField = page.getByLabel('Username');
    const passWordField = page.getByLabel('Password');
    const loginBtn = page.getByRole("button",{"name":'Login'});
    await userNameField.fill('John Doe');
    await passWordField.fill('ThisIsNotAPassword');
    await loginBtn.click();
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/#appointment');
    await expect(page.locator('div>h2')).toBeVisible();
    await expect(page.locator('div>h2')).toHaveText('Make Appointment');

});