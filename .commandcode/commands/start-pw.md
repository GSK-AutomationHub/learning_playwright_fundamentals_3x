Create a new Playwright test file from this template:

```ts
import {test, expect} from '@playwright/test'

test('<TITLE>', async({page})=>{

    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

    // code

    await page.pause();


});
```

Arguments given: $ARGUMENTS

Decide the file path and test title as follows:
- If the first argument contains a directory separator ("/" or "\"), treat it as the full path; the remaining arguments form the test title.
- If the first argument is a bare filename ending in ".ts" (no separator), use it as the filename inside the currently selected folder (the folder of the file open in the IDE; fall back to "tests/" if unknown).
- If the first argument is not a path or filename, treat all arguments as the test title and create "newtest.spec.ts" in the currently selected folder (infer a kebab-case name from the title if possible).
- If no title is provided, use "Testcase Title".

Replace <TITLE> with the resolved title, create any missing parent directories, write the file, then reply with the path you created and a one-line confirmation.
