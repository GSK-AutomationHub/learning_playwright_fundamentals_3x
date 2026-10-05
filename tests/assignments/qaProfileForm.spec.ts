import { test, expect } from '@playwright/test'
let expectedProfileInfo = {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "Male",
    "yearsExperience": "5",
    "date": "2026-05-04",
    "profession": "Automation Tester",
    "tools": [
        "UFT",
        "Selenium Webdriver"
    ],
    "continents": [
        "Asia",
        "Europe",
        "North America"
    ],
    "upload": {}
}
test('Verify Filling QA Profile Form', async ({ page }) => {

    // Navigate to QA Profile Form Page
    await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page')


    // Fill in the form fields
    const firstNameInput = page.getByLabel('First Name');
    const lastNameInput = page.getByLabel('Last Name');
    await firstNameInput.fill('John');
    await lastNameInput.fill('Doe');
    await expect(firstNameInput).toHaveValue('John');
    await expect(lastNameInput).toHaveValue('Doe');

    // Select the gender radio button
    const maleRadioBtn = page.getByRole('radio', { name: 'Male', exact: true });
    const femaleRadioBtn = page.getByRole('radio', { name: 'Female', exact: true });
    await maleRadioBtn.check();
    await expect(maleRadioBtn).toBeChecked();
    await expect(femaleRadioBtn).not.toBeChecked();

    // Select the YOE from the dropdown
    const yoeDropdown = page.getByTestId('years-experience');
    await yoeDropdown.selectOption('5');
    await expect(yoeDropdown).toHaveValue('5');

    // Enter date
    const dateInput = page.getByTestId('profile-date');
    await dateInput.fill('2026-05-04');
    await expect(dateInput).toHaveValue('2026-05-04');

    // Select Profession
    let profession = 'Automation Tester';
    await page.getByRole('radio', { name: profession }).check();
    const professionCheckboxes = await page.locator('input[name=profession]').all();
    for (let checkbox of professionCheckboxes) {
        if (await checkbox.isChecked()) {
            console.log(`Profession ${await checkbox.getAttribute('value')} is checked.`);
        }
    }

    // Select Automation tool
    let automationTools = ['UFT', 'Selenium Webdriver'];
    for (let tool of automationTools) {
        await page.getByRole('checkbox', { name: tool }).check();
    }
    const automationToolCheckboxes = await page.locator('input[name=tools]').all();
    for (let checkbox of automationToolCheckboxes) {
        if (await checkbox.isChecked()) {
            console.log(`Automation tool ${await checkbox.getAttribute('value')} is checked.`);
        }
    }

    // Select Any 3 Continent
    const continentCheckboxes = await page.locator('input[name=continents]').all();
    let continentsToBeSelected = ['Asia', 'Europe', 'North America'];
    let selectedContinents = [];

    for (let continent of continentsToBeSelected) {
        await page.getByRole('checkbox', { name: continent }).click();
    }

    let count = 0;
    for (const checkbox of continentCheckboxes) {
        if (await checkbox.isChecked()) {
            count++;
            selectedContinents.push(await checkbox.getAttribute('value'));
        }
    }
    expect(count).toBe(continentsToBeSelected.length);
    console.log(`Total ${count} continents are selected: ${selectedContinents.join(', ')}`);

    // Switch to Wait Command Tab & Assert Wait Command Displayed
    await page.getByRole('tab', { name: 'Wait Commands' }).click();
    const waitCommandTab = page.locator('#selenium-tab-panel');
    await expect(waitCommandTab).toBeVisible();
    await expect(waitCommandTab).toContainText('Wait commands');

    // Save Profile
    const saveProfileBtn = page.getByRole('button', { name: 'Save profile' });
    await saveProfileBtn.click();

    // Assert Profile Saved Successfully
    const successMessage = page.locator('#submission-output');
    await expect(successMessage).toBeVisible();
    console.log(await successMessage.textContent());
    const actualProfileInfo = await successMessage.innerText();
    expect(JSON.parse(actualProfileInfo)).toEqual(expectedProfileInfo);
    console.log('Profile saved successfully.');


});
