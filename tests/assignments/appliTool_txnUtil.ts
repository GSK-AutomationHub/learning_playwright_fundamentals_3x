import { expect, Page, Locator } from '@playwright/test'

export async function extractTxnData(page: Page, transactionRcords: Locator): Promise<Object> {
    const rawSpentAmt = await transactionRcords.locator('.text-danger').allInnerTexts();
    const rawEarnedAmt = await transactionRcords.locator('.text-success').allInnerTexts();
    return { rawSpentAmt, rawEarnedAmt };
}

export async function cleanRawTxnData(page: Page, rawTxnData: Object): Promise<Object> {
    // How to deconstruct object to pass string[] for below statement to clean data
    const {rawSpentAmt, rawEarnedAmt } = rawTxnData

    let cleanedSpentAmt = rawSpentAmt.map(amt =>
        //Number(parseFloat(amt.replace(/[-+,USD\s]/g, '')).toFixed(2))
        Number(amt.replace(/[-+,USD\s]/g, ''))
    )

    let cleanedEarnedAmt = rawEarnedAmt.map(amt =>
        //Number(parseFloat(amt.replace(/[-+,USD\s]/g, '')).toFixed(2))))
        Number(amt.replace(/[-+,USD\s]/g, ''))
    )
    return { cleanedSpentAmt, cleanedEarnedAmt };
}

export async function processCleanTxnData(page: Page, cleanedTxnData: Object):Promise<Object> {
    // How to deconstruct cleanedTxnData object to pass string[] for below statement to process data
    const { cleanedSpentAmt, cleanedEarnedAmt } = cleanedTxnData;

    let totalSpentAmt = cleanedSpentAmt.reduce((sum, amt) => sum + amt, 0)
    let totalEarnedAmt = cleanedEarnedAmt.reduce((sum, amt) => sum + amt, 0)
    let totalBalanceAmt = Number((totalEarnedAmt - totalSpentAmt).toFixed(2));
    return {totalSpentAmt,totalEarnedAmt,totalBalanceAmt}

}





