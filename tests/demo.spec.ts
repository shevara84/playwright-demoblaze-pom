// import{test, expect} from '@playwright/test';


// test('title', async ({page}) => {

//     await page.goto('https://www.demoblaze.com/index.html');
//     await expect(page).toHaveTitle('STORE');
//     await page.getByRole('link', { name: 'Log in' }).click();
//     await page.locator('#loginusername').fill('zoki');
//     await page.locator('#loginpassword').fill('Shevara23')
//     await page.getByRole('button', {name: 'Log in'}).click();
//     await expect(page.getByRole('link', {name: 'Welcome'})).toBeVisible();
// })

import { test } from '../fixtures/baseTest';

test('Uspesan login sa BasePage strukturom', async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login('zoki', 'Shevara23');
  await loginPage.verifyLoggedIn();

});
