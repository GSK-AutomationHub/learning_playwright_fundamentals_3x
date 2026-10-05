import { expect, Page } from '@playwright/test';

export async function navigateToQAProfileForm(page: Page) {
    await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page');
}

export async function FillUserNameDetails(page: Page, firstName: string, lastName: string) {
    const firstNameInput = page.getByLabel('First Name');
    const lastNameInput = page.getByLabel('Last Name');
    await firstNameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await expect(firstNameInput).toHaveValue(firstName);
    await expect(lastNameInput).toHaveValue(lastName);
}

export async function FillGenderDetails(page: Page, gender: string) {
    const maleRadioBtn = page.getByRole('radio', { name: 'Male', exact: true });
    const femaleRadioBtn = page.getByRole('radio', { name: 'Female', exact: true });
    if (gender.toLowerCase() === 'male') {
        await maleRadioBtn.check();
        await expect(maleRadioBtn).toBeChecked();
        await expect(femaleRadioBtn).not.toBeChecked();
    } else if (gender.toLowerCase() === 'female') {
        await femaleRadioBtn.check();
        await expect(femaleRadioBtn).toBeChecked();
        await expect(maleRadioBtn).not.toBeChecked();
    } else {
        throw new Error(`Invalid gender value: ${gender}. Please provide either 'Male' or 'Female'.`);
    }
}

export async function FillYearsOfExperienceDetails(page: Page, years: string) {
    const yoeDropdown = page.getByTestId('years-experience');
    await yoeDropdown.selectOption(years);
    await expect(yoeDropdown).toHaveValue(years);
}

export async function FillDateDetails(page: Page, date: string) {
    const dateInput = page.getByTestId('profile-date');
    await dateInput.fill(date);
    await expect(dateInput).toHaveValue(date);
}

export async function FillProfessionDetails(page: Page, profession: string) {
    await page.getByRole('radio', { name: profession }).check();
    const professionCheckboxes = await page.locator('input[name=profession]').all();
    for (let checkbox of professionCheckboxes) {
        if (await checkbox.isChecked()) {
            console.log(`Profession ${await checkbox.getAttribute('value')} is checked.`);
        }
    }
}

export async function FillAutomationToolsDetails(page: Page, tools: string[]) {
    for (let tool of tools) {
        await page.getByRole('checkbox', { name: tool }).check();
    }
    const automationToolCheckboxes = await page.locator('input[name=tools]').all();
    for (let checkbox of automationToolCheckboxes) {
        if (await checkbox.isChecked()) {
            console.log(`Automation tool ${await checkbox.getAttribute('value')} is checked.`);
        }
    }
}

export async function FillContinentsDetails(page: Page, continents: string[]) {
    const continentCheckboxes = await page.locator('input[name=continents]').all();
    let selectedContinents = [];
    for (let continent of continents) {
        await page.getByRole('checkbox', { name: continent }).click();
    }
    let count = 0;
    for (const checkbox of continentCheckboxes) {
        if (await checkbox.isChecked()) {
            count++;
            selectedContinents.push(await checkbox.getAttribute('value'));
        }
    }
    expect(count).toBe(continents.length);
    console.log(`Total ${count} continents are selected: ${selectedContinents.join(', ')}`);
}

export async function checkSeleniumWaitCommandDisplayed(page: Page) {
    await page.getByRole('tab', { name: 'Wait Commands' }).click();
    const waitCommandTab = page.locator('#selenium-tab-panel');
    await expect(waitCommandTab).toBeVisible();
    await expect(waitCommandTab).toContainText('Wait commands');
}

export async function saveProfile(page: Page) {
    const saveProfileBtn = page.getByRole('button', { name: 'Save profile' });
    await saveProfileBtn.click();
}

export async function assertProfileSavedSuccessfully(page: Page, expectedProfileInfo: object) {
    const successMessage = page.locator('#submission-output');
    await expect(successMessage).toBeVisible();
    console.log(await successMessage.textContent());
    const actualProfileInfo = await successMessage.innerText();
    expect(JSON.parse(actualProfileInfo)).toEqual(expectedProfileInfo);
    console.log('Profile saved successfully.');

}
