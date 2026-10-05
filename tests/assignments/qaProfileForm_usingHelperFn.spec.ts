import { test, expect } from '@playwright/test'
import * as qaProfileFormHelper from './qaProfileFormHelper';

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
    await qaProfileFormHelper.navigateToQAProfileForm(page);

    // Fill in the form fields
    await qaProfileFormHelper.FillUserNameDetails(page, 
        expectedProfileInfo.firstName, expectedProfileInfo.lastName);

    // Select the gender radio button
    await qaProfileFormHelper.FillGenderDetails(page, 
        expectedProfileInfo.gender);

    // Select the YOE from the dropdown
    await qaProfileFormHelper.FillYearsOfExperienceDetails(page, 
        expectedProfileInfo.yearsExperience);

    // Enter date
    await qaProfileFormHelper.FillDateDetails(page, 
        expectedProfileInfo.date);

    // Select Profession
    await qaProfileFormHelper.FillProfessionDetails(page, 
        expectedProfileInfo.profession);

    // Select Automation tool
    await qaProfileFormHelper.FillAutomationToolsDetails(page, 
        expectedProfileInfo.tools);

    // Select Any 3 Continent
   await qaProfileFormHelper.FillContinentsDetails(page, 
        expectedProfileInfo.continents);

    // Switch to Wait Command Tab & Check Wait Command Displayed
   await qaProfileFormHelper.checkSeleniumWaitCommandDisplayed(page);

    // Save QA Profile Form
    await qaProfileFormHelper.saveProfile(page);

    // Assert Profile Saved Successfully
    await qaProfileFormHelper.assertProfileSavedSuccessfully(page, 
        expectedProfileInfo);

});
