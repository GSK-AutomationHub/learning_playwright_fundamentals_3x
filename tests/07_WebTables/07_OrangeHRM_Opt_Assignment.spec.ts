import {test, expect} from '@playwright/test'

test('OrangeHRM Add Search Delete Employee Test', async({page})=>{
    test.setTimeout(60000);

    // Login to OrangeHRM App
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const userName = page.getByPlaceholder("Username");
    const userPassword = page.getByPlaceholder("Password");
    const loginBtn = page.getByRole('button',{name:'Login'});
    await userName.fill('Admin');
    await userPassword.fill('admin123');
    await loginBtn.click();
    await page.waitForURL('**/dashboard/index');
    const heading = page.getByRole('heading',{name:'Dashboard'});
    await expect(heading).toBeVisible();
    expect (heading).toHaveText('Dashboard');

    // Navigate to PIM Menu
    const pimMenu = page.locator("a:has-text('PIM')");
    await pimMenu.click();
    await page.waitForURL('**/pim/viewEmployeeList');
 
    // Create New Employee
    let firstName = "wtRahul";
    let lastName = "twYadav";
    let employeeId = "wt007"
    const addBtn = page.getByRole('button',{name:'Add'})
    await addBtn.click();
    await page.waitForURL('**/pim/addEmployee');
    const firstNameTextField = page.getByPlaceholder('First Name');
    const lastNameTextField = page.getByPlaceholder('Last Name');
    const employeeIdTextFild = page.locator('input.oxd-input').last();
    const saveBtn = page.getByRole('button',{name:'Save'});
    await firstNameTextField.fill(firstName);
    await lastNameTextField.fill(lastName);
    await employeeIdTextFild.fill(employeeId)
    await saveBtn.click();
    page.waitForTimeout(3000)


    // Navigate to PIM Menu
    await pimMenu.click();
    
    // Search Newly Created Employee from Table
    const employeeRow = page.locator("div[role=row]").filter({hasText:firstName}).filter({hasText:lastName});
    const employeeName = page.getByPlaceholder("Type for hints...").first();
    const searchBtn = page.getByRole('button',{name:'Search'});
    await employeeName.fill("");
    await employeeName.fill(firstName);
    await searchBtn.click();
    await expect(employeeRow).toBeVisible();

    // Delete the same Employee
    const deleteBtn = employeeRow.locator("[role=cell] button").last();
    await deleteBtn.click();
    const deleteDailog = page.locator("div[role*='document']");
    if(await deleteBtn.isVisible()){
        const deleteRecordBtn = deleteDailog.getByRole('button',{name:'Yes, Delete'})
        await deleteRecordBtn.click();
    }else{
        throw new Error('Delete Record Dailog not displayed!');
        
    }

    // Post Delete Assertion
    await pimMenu.click();
    await employeeName.fill(firstName);
    await searchBtn.click();
    await expect(employeeRow).not.toBeVisible();
});
