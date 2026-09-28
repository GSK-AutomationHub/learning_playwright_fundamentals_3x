import { Page, expect, Locator } from '@playwright/test'

export async function loginToOrangeHRMApp(page: Page) {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const userName = page.getByPlaceholder("Username");
    const userPassword = page.getByPlaceholder("Password");
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await userName.fill('Admin');
    await userPassword.fill('admin123');
    await loginBtn.click();
    await page.waitForURL('**/dashboard/index');
    const heading = page.getByRole('heading', { name: 'Dashboard' });
    await expect(heading).toBeVisible();
    expect(heading).toHaveText('Dashboard');

}

export async function navigateToEmployeeListPage(page: Page, pimMenu: Locator) {
    await pimMenu.click();
    await page.waitForURL('**/pim/viewEmployeeList');

}

export async function createNewEmployeeRecord(page: Page, firstName: string, lastName: string, 
    employeeId: string) {
    const addBtn = page.getByRole('button', { name: 'Add' })
    await addBtn.click();
    await page.waitForURL('**/pim/addEmployee');
    const firstNameTextField = page.getByPlaceholder('First Name');
    const lastNameTextField = page.getByPlaceholder('Last Name');
    const employeeIdTextFild = page.locator('input.oxd-input').last();
    const saveBtn = page.getByRole('button', { name: 'Save' });
    await firstNameTextField.fill(firstName);
    await lastNameTextField.fill(lastName);
    await employeeIdTextFild.fill(employeeId)
    await saveBtn.click();
    page.waitForTimeout(3000)
}

export async function searchEmployeeRecord(page: Page, firstName: string, lastName: string): Promise<Locator> {
    const employeeRow = page.locator("div[role=row]").filter({ hasText: firstName }).filter({ hasText: lastName });
    const employeeNameTextField = page.getByPlaceholder("Type for hints...").first();
    const searchBtn = page.getByRole('button', { name: 'Search' });
    await employeeNameTextField.fill("");
    await employeeNameTextField.fill(firstName);
    await searchBtn.click();
    return employeeRow;

}

export async function deleteEmployeeRecord(page:Page, employeeRow:Locator) {
    const deleteBtn = employeeRow.locator("[role=cell] button").last();
    await deleteBtn.click();
    const deleteDailog = page.locator("div[role*='document']");
    if(await deleteBtn.isVisible()){
        const deleteRecordBtn = deleteDailog.getByRole('button',{name:'Yes, Delete'})
        await deleteRecordBtn.click();
    }else{
        throw new Error('Delete Record Dailog not displayed!');
        
    }
    
}