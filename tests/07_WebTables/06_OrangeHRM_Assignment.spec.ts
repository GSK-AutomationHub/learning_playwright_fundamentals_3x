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
    const addBtn = page.getByRole('button',{name:'Add'})
    await addBtn.click();
    await page.waitForURL('**/pim/addEmployee');
    const firstNameTextField = page.getByPlaceholder('First Name');
    const lastNameTextField = page.getByPlaceholder('Last Name');
    const saveBtn = page.getByRole('button',{name:'Save'});
    await firstNameTextField.fill(firstName);
    await lastNameTextField.fill(lastName);
    await saveBtn.click();
    //await page.waitForURL('**/pim/viewPersonalDetails/empNumber');

    // Navigate to PIM Menu
    await pimMenu.click();
    
    // Search Newly Created Employee from Table
    const rows = page.locator("div[role=row]");
    const nextBtn = page.locator("//i[contains(@class,'chevron-right')]/parent::button");
    let employeeRow;
    while(true){
        employeeRow = rows.filter({hasText:firstName}).filter({hasText:lastName});
        if(await employeeRow.count()){
            break;
        }
        if(await nextBtn.isVisible() && await nextBtn.isDisabled()){
            throw new Error("Employee Record Row Not Found!")
        }
        if(await nextBtn.isVisible()){
            await nextBtn.click();
        }
    }

    // Delete the same Employee
    const deleteBtn = employeeRow.locator("[role=cell] button").last();
    await deleteBtn.click();
    const deleteDailog = page.locator("div[role*='document']");
    if(await deleteBtn.isVisible()){
        const deleteRecordBtn = deleteDailog.getByRole('button',{name:'Yes, Delete'})
        await deleteRecordBtn.click();
        // const successToaster = page.locator("#oxd-toaster");
        // await successToaster.waitFor();
        // await expect(successToaster).toBeVisible();
        // await expect(successToaster.locator("p").nth(2)).toContainText("Successfully Deleted");
    }else{
        throw new Error('Delete Record Dailog not displayed!');
        
    }

    // Post Delete Assertion
    // while(true){
    //     employeeRow = rows.filter({hasText:firstName}).filter({hasText:lastName});
    //     if(await employeeRow.count()){
    //         console.log("Employee Record not got deleted, it still visible...!")
    //         break;
    //     }
    //     if(await nextBtn.isDisabled()){
    //         console.log('Employee Record got deleted successfully!');
    //     }
    //     await nextBtn.click();
    // }


});
