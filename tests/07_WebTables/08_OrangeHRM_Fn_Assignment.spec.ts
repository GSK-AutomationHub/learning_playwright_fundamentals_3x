import { test, Page, expect, Locator } from '@playwright/test'
import * as helper from './webTable_Helper';


test('OrangeHRM Add Search Delete Employee Test', async ({ page }) => {
    test.setTimeout(60000);
    let firstName = "wt_Ganesh"; // use random string generator to create unique first name
    let lastName = "wt_K"; // use random string generator to create unique last name
    let employeeId = "wt_007"; // Date.now()
    let employeeRow;
    const pimMenu = page.locator("a:has-text('PIM')");

    // Login to OrangeHRM App
    await helper.loginToOrangeHRMApp(page);

    // Navigate to PIM Menu
    await helper.navigateToEmployeeListPage(page, pimMenu)

    // Create New Employee
    await helper.createNewEmployeeRecord(page, firstName, lastName, employeeId);

    // Navigate to PIM Menu
    await helper.navigateToEmployeeListPage(page, pimMenu)

    // Search Newly Created Employee Record
    employeeRow = await helper.searchEmployeeRecord(page, firstName, lastName);
    await expect(employeeRow).toBeVisible();

    // Delete the same Employee Record
    await helper.deleteEmployeeRecord(page, employeeRow);

    // Post Delete Assertion
    employeeRow = await helper.searchEmployeeRecord(page, firstName, lastName);
    await expect(employeeRow).not.toBeVisible();

});
