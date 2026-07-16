import { test } from '../fixtures/baseTest';
import { invalidLoginData } from '../data/testData'; // Uvoz čistih podataka

test('Uspesan login sa kredencijalima iz env fajla', async ({ loginPage }) => {
  
  await test.step('1. Korak: Navigacija na sajt', async () => {
    await loginPage.navigate();
  });

  await test.step('2. Korak: Login korisnika i stabilan logout', async () => {
    const username = process.env.DB_USERNAME!;
    const password = process.env.DB_PASSWORD!;

    await loginPage.login(username, password);
    await loginPage.logout();
  });
  
});

test('Neuspesan login sa pogresnim kredencijalima', async ({ loginPage }) => {

  await test.step('1. Korak: Navigacija na sajt', async () => {
    await loginPage.navigate();
  });

  await test.step('2. Korak: Pokusaj logina sa nevalidnim podacima', async () => {
    // Svi stringovi su sklonjeni, vučemo ih iz testData fajla
    await loginPage.loginWithInvalidCredentials(
      invalidLoginData.username,
      invalidLoginData.password,
      invalidLoginData.expectedError
    );
  });

});
