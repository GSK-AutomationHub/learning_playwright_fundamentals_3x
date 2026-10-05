import { test, expect, Locator } from '@playwright/test';

test('Verify appliTool Transactions', async ({ page }) => {

    // Login to appliTool App
    await page.goto('https://demo.applitools.com/');
    const userNameInput = page.getByPlaceholder('Enter your username');
    const passwordInput = page.getByPlaceholder('Enter your password');
    const signButton = page.getByRole('link', { name: 'Sign in' });
    await userNameInput.fill('Admin');
    await passwordInput.fill('Password@123');
    await signButton.click();

    // Navigate to the appliTool Transactions page
    await expect(page).toHaveURL('https://demo.applitools.com/app.html');

    // Extract transaction records from the table
    const transactions = page.locator('table tbody tr');
    const rawSpentAmt = await transactions.locator('.text-danger').allInnerTexts();
    const rawEaredAmt = await transactions.locator('.text-success').allInnerTexts();
    console.log(rawSpentAmt)
    console.log(rawEaredAmt)

    // Clean the Raw Txn Data
    let cleanedSpentAmt = rawSpentAmt.map(amt =>
        Number(amt.replace(/[-+,USD\s]/g, ''))
        //Number(parseFloat(amt.replace(/[-+,USD\s]/g, '')).toFixed(2))
    )

    let cleanedEarnedAmt = (rawEaredAmt.map(amt =>
         Number(amt.replace(/[-+,USD\s]/g, '')))
        //Number(parseFloat(amt.replace(/[-+,USD\s]/g, '')).toFixed(2))))
    )
    console.log(cleanedSpentAmt)
    console.log(cleanedEarnedAmt)


    //Process the Clean Txn Data for Calculation
    let totalSpentAmt = cleanedSpentAmt.reduce((sum, amt) => sum + amt, 0)
    let totalEarnedAmt = cleanedEarnedAmt.reduce((sum, amt) => sum + amt, 0)
    let totalBalanceAmt = Number((totalEarnedAmt - totalSpentAmt).toFixed(2));

    console.log(`The total spent amount is: ${totalSpentAmt}`)
    console.log(`The total earned amount is: ${totalEarnedAmt}`)
    console.log(`The total balance amount is: ${totalBalanceAmt}`)
    expect(totalBalanceAmt).toBeCloseTo(1996.22)

});