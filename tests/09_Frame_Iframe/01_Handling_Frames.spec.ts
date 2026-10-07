
import { test, expect } from '@playwright/test';

test('Verify Advance Custom DropDowns', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/frames/');
  const frame = page.frameLocator('#frame-one');
  const vehicleNameTextBox = frame.getByLabel('Vehicle name');
  const ownerNameTextBox = frame.getByLabel('Owner name');
  const RegistrationNumberTextBox = frame.getByLabel('Registration number');
  const vehicleTypeDopdown = frame.locator('#RESULT_RadioButton-1');
  const vehicleYearTextBox = frame.getByLabel('Year');
  const notesTextBox = frame.getByLabel('Notes');
  const submitRegistartionButton = frame.getByRole('button', { name: 'Submit registration' });
  const vehicleOtput = frame.locator('#vehicle-output');
  const resetButton = frame.getByRole('button', { name: 'Reset' });

  const expectedVehicleOutput = {
    "vehicleName": "BMW",
    "ownerName": "John Doe",
    "regNumber": "12345",
    "vehicleType": "Electric",
    "year": "2026",
    "notes": "My car details"
  }

  await vehicleNameTextBox.fill('BMW');
  await ownerNameTextBox.fill('John Doe');
  await RegistrationNumberTextBox.fill('12345');
  await vehicleTypeDopdown.click();
  await vehicleTypeDopdown.selectOption('Electric');
  await vehicleYearTextBox.fill('2026');
  await notesTextBox.fill('My car details');
  await submitRegistartionButton.click();
  let actual = JSON.parse(await vehicleOtput.innerText());
  expect(actual).toEqual(expectedVehicleOutput);
  await resetButton.click();


});