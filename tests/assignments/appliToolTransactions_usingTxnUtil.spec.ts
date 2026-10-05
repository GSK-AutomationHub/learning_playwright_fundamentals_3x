import { test, expect, Locator } from '@playwright/test';
import * as txnUtil from './appliTool_txnUtil'

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
    const transactionsRecords: Locator = page.locator('table tbody tr');
    let rawaTxnData = await txnUtil.extractTxnData(page, transactionsRecords);

    // Clean the Raw Txn Data
    let cleanedTxnData = await txnUtil.cleanRawTxnData(page, rawaTxnData);

    //Process the Clean Txn Data for Calculation
    let processedTxnData = await txnUtil.processCleanTxnData(page, cleanedTxnData);

    //Print Result and Assertion
    const { totalSpentAmt, totalEarnedAmt, totalBalanceAmt } = processedTxnData;
    console.log(`The total spent amount is: ${totalSpentAmt}`)
    console.log(`The total earned amount is: ${totalEarnedAmt}`)
    console.log(`The total balance amount is: ${totalBalanceAmt}`)
    expect(totalBalanceAmt).toBeCloseTo(1996.22)

});