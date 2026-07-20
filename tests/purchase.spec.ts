import { test } from '../fixtures/baseTest';
import { validPurchaseData } from '../data/testData'; // Uvoz podataka

test('E2E Happy Flow - Purchase Apple Monitor', async ({ loginPage, productPage, cartPage }) => {
  
  await test.step('1. Step: Successful user login', async () => {
    await loginPage.navigate();
    await loginPage.login(process.env.DB_USERNAME!, process.env.DB_PASSWORD!);
  });

  await test.step('2. Step: Navigation, verification and adding monitor to cart', async () => {
    await productPage.selectAppleMonitor();
    await productPage.verifyProductDetails();
    await productPage.addProductToCart();
  });

  await test.step('3. Step: Open cart and fill order form', async () => {
    await cartPage.openCart();
    // Prosleđujemo objekat direktno iz data fajla
    await cartPage.fillOrderForm(validPurchaseData); 
  });

  await test.step('4. Step: Confirmation of purchase and stable logout', async () => {
    await cartPage.completePurchase();
    await loginPage.logout();
  });
  
});
