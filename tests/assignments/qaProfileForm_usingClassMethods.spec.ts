import { test, expect } from '@playwright/test'
import {QAProfile} from './QAProfile';

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

let qaProfileFiller: QAProfile;

test.beforeEach(async ({page}) => {
    qaProfileFiller = new QAProfile(page);
});

test('Verify Filling QA Profile Form', async() => {

    // Navigate to QA Profile Form Page
    await qaProfileFiller.navigateToQAProfileForm();


    // Fill in the form fields
    await qaProfileFiller.fillUserNameDetails(
        expectedProfileInfo.firstName, expectedProfileInfo.lastName);

    // Select the gender radio button
    await qaProfileFiller.fillGenderDetails(
        expectedProfileInfo.gender);

    // Select the YOE from the dropdown
    await qaProfileFiller.fillYearsOfExperienceDetails(
        expectedProfileInfo.yearsExperience);

    // Enter date
    await qaProfileFiller.fillDateDetails(expectedProfileInfo.date);

    // Select Profession
    await qaProfileFiller.fillProfessionDetails(expectedProfileInfo.profession);

    // Select Automation tool
    await qaProfileFiller.fillAutomationToolsDetails(expectedProfileInfo.tools);

    // Select Any 3 Continent
   await qaProfileFiller.fillContinentsDetails(expectedProfileInfo.continents);

    // Switch to Wait Command Tab & Check Wait Command Displayed
   await qaProfileFiller.checkSeleniumWaitCommandDisplayed();

    // Save QA Profile Form
    await qaProfileFiller.saveProfile();

    // Assert Profile Saved Successfully
    await qaProfileFiller.assertProfileSavedSuccessfully(expectedProfileInfo);

});
