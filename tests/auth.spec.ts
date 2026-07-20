import { test } from '../fixtures/baseTest';
import { invalidLoginData } from '../data/testData'; 

test('Successful login with env credentials.', async ({ loginPage }) => {
  
  await test.step('1. Step: Navigate to the site', async () => {
    await loginPage.navigate();
  });

  await test.step('2. Step: User login and logout', async () => {
    const username = process.env.DB_USERNAME!;
    const password = process.env.DB_PASSWORD!;

    await loginPage.login(username, password);
    await loginPage.logout();
  });
  
});

test('Unsuccessful login with invalid credentials', async ({ loginPage }) => {

  await test.step('1. Step: Navigate to the site', async () => {
    await loginPage.navigate();
  });

  await test.step('Login attempt with invalid credentials', async () => {
  
    await loginPage.loginWithInvalidCredentials(
      invalidLoginData.username,
      invalidLoginData.password,
      invalidLoginData.expectedError
    );
  });

});
