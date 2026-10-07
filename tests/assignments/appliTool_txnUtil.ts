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

/*
 your destructuring is right; the type is the problem. Promise&lt;Object&gt; tells TypeScript the function returns an object with no known fields, so const { rawSpentAmt } = rawTxnData fails with "Property 'rawSpentAmt' does not exist on type 'Object'". The "interface" the AI suggested is just a name for the object's shape. With a type for each step, data flows from one function to the next:

type RawTxn = { rawSpentAmt: string[]; rawEarnedAmt: string[] };
type CleanTxn = { cleanedSpentAmt: number[]; cleanedEarnedAmt: number[] };

export async function extractTxnData(rows: Locator): Promise<RawTxn> {
  const rawSpentAmt = await rows.locator('.text-danger').allInnerTexts();
  const rawEarnedAmt = await rows.locator('.text-success').allInnerTexts();
  return { rawSpentAmt, rawEarnedAmt };
}

export function cleanRawTxnData({ rawSpentAmt, rawEarnedAmt }: RawTxn): CleanTxn {
  const toNumber = (amt: string) => Number(amt.replace(/[^\d.]/g, ''));
  return { cleanedSpentAmt: rawSpentAmt.map(toNumber), cleanedEarnedAmt: rawEarnedAmt.map(toNumber) };
}

export function processCleanTxnData({ cleanedSpentAmt, cleanedEarnedAmt }: CleanTxn) {
  const sum = (list: number[]) => list.reduce((total, amt) => total + amt, 0);
  const totalSpentAmt = sum(cleanedSpentAmt);
  const totalEarnedAmt = sum(cleanedEarnedAmt);
  return { totalSpentAmt, totalEarnedAmt, totalBalanceAmt: Number((totalEarnedAmt - totalSpentAmt).toFixed(2)) };
}

In the test: const raw = await extractTxnData(rows); const clean = cleanRawTxnData(raw); const { totalBalanceAmt } = processCleanTxnData(clean);

Two more points: clean and process never touch the page, so they need no page parameter and no async. And you can destructure right in the parameter list, as above. Deleting the : Promise<Object> annotations would also work, because TypeScript then infers the shape from the return statement.






*/



