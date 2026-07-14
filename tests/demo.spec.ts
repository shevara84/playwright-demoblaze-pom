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

test('Uspesan login sa kredencijalima iz env fajla', async ({ loginPage }) => {
  await loginPage.navigate();
  
  // Čitanje vrednosti iz .env fajla
  const username = process.env.DB_USERNAME!;
  const password = process.env.DB_PASSWORD!;

  // Prosleđivanje promenljivih u POM metodu
  await loginPage.login(username, password);
  await loginPage.verifyLoggedIn();
});

