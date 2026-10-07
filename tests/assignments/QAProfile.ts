import { Page, expect } from '@playwright/test';

export class QAProfile {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToQAProfileForm() {
        await this.page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page');
    }
    
    async fillUserNameDetails(firstName: string, lastName: string) {
        const firstNameInput = this.page.getByLabel('First name');
        const lastNameInput = this.page.getByLabel('Last name');
        
        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        
        await expect(firstNameInput).toHaveValue(firstName);
        await expect(lastNameInput).toHaveValue(lastName);
    }
    
    async fillGenderDetails(gender: string) {
        const maleRadioBtn = this.page.getByRole('radio', { name: 'Male', exact: true });
        const femaleRadioBtn = this.page.getByRole('radio', { name: 'Female', exact: true });
        
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
    
    async fillYearsOfExperienceDetails(years: string) {
        if (isNaN(Number(years))) {
            throw new Error(`Invalid years of experience value: ${years}. Please provide a numeric value.`);
        }
        const yoeDropdown = this.page.getByTestId('years-experience');
        await yoeDropdown.selectOption(years);
        await expect(yoeDropdown).toHaveValue(years);
    }
    
    async fillDateDetails(date: string) {
        const dateInput = this.page.getByTestId('profile-date');
        await dateInput.fill(date);
        await expect(dateInput).toHaveValue(date);
    }
    
    async fillProfessionDetails(profession: string) {
        await this.page.getByRole('radio', { name: profession }).check();
        const professionCheckboxes = await this.page.locator('input[name=profession]').all();
        for (let checkbox of professionCheckboxes) {
            if (await checkbox.isChecked()) {
                console.log(`Profession ${await checkbox.getAttribute('value')} is checked.`);
            }
        }
    }
    
    async fillAutomationToolsDetails(tools: string[]) {
        for (let tool of tools) {
            await this.page.getByRole('checkbox', { name: tool }).check();
        }
        const automationToolCheckboxes = await this.page.locator('input[name=tools]').all();
        for (let checkbox of automationToolCheckboxes) {
            if (await checkbox.isChecked()) {
                console.log(`Automation tool ${await checkbox.getAttribute('value')} is checked.`);
            }
        }
    }
    
    async fillContinentsDetails(continents: string[]) {
        const continentCheckboxes = await this.page.locator('input[name=continents]').all();
        let selectedContinents: string[] = [];
        
        for (let continent of continents) {
            await this.page.getByRole('checkbox', { name: continent }).click();
        }
        
        let count = 0;
        for (const checkbox of continentCheckboxes) {
            if (await checkbox.isChecked()) {
                count++;
                const val = await checkbox.getAttribute('value');
                if (val) selectedContinents.push(val);
            }
        }
        expect(count).toBe(continents.length);
        console.log(`Total ${count} continents are selected: ${selectedContinents.join(', ')}`);
    }
    
    async checkSeleniumWaitCommandDisplayed() {
        await this.page.getByRole('tab', { name: 'Wait Commands' }).click();
        const waitCommandTab = this.page.locator('#selenium-tab-panel');
        await expect(waitCommandTab).toBeVisible();
        await expect(waitCommandTab).toContainText('Wait commands');
    }
    
    async saveProfile() {
        const saveProfileBtn = this.page.getByRole('button', { name: 'Save profile' });
        await saveProfileBtn.click();
    }
    
    async assertProfileSavedSuccessfully(expectedProfileInfo: object) {
        const successMessage = this.page.locator('#submission-output');
        await expect(successMessage).toBeVisible();
        
        const actualProfileInfo = await successMessage.innerText();
        expect(JSON.parse(actualProfileInfo)).toEqual(expectedProfileInfo);
        console.log('Profile saved successfully.');
    }
}

/*

 good structure in both versions. The class version is a proper page object (page in the constructor, one method per form section), the test data lives in one object, and the final check compares the whole saved JSON with toEqual. Improvements:

fillContinentsDetails uses click(), which toggles: if a box is already checked, click() unchecks it. Use check(), as you did for the tools.

Replace the console.log loops in fillProfessionDetails and fillAutomationToolsDetails with assertions, for example await expect(this.page.getByRole('checkbox', { name: tool })).toBeChecked(). A log never fails a test.

fillGenderDetails does not need if/else branches: const radio = this.page.getByRole('radio', { name: gender, exact: true }); await radio.check(); await expect(radio).toBeChecked();

In the helper version, start function names with a lowercase letter (fillUserNameDetails, not FillUserNameDetails). Capitalised names are for classes.

Move QAProfile.ts into a pages folder, so the tests folder holds only tests.






*/