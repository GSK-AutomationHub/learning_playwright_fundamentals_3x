import {test, expect, Locator} from '@playwright/test';

test.describe('Verify SVG Element', ()=>{

    test.setTimeout(60000);

    test.beforeEach(async({page})=>{
        await page.goto('https://simplemaps.com/svg/country/in');

    });

    test('Verify SVG Map Element',async({page})=>{
        ////xpath  = "//div[@id='admin1_map_inner']//*[name()='svg']//*[name()='path' and contains(@class,'sm_state')]"
        const Indianstates = await page.locator('.sm_state').all();
        let cleanedSate = [];

        for(let i=0; i<Indianstates.length; i++){
            let state = await Indianstates[i].getAttribute('class');
             cleanedSate.push(state?.replace('sm_state sm_state_', ''));
        }
        
        console.log(cleanedSate);

        for(let state of Indianstates){
            const classState = await state.getAttribute('class');
            if(classState?.includes('INMH')){
                state.click();
                break;
            }

        }
 


    });


});