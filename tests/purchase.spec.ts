import { test } from '../fixtures/baseTest';
import { validPurchaseData } from '../data/testData'; // Uvoz podataka

test('E2E Happy Flow - Kupovina Apple Monitora', async ({ loginPage, productPage, cartPage }) => {
  
  await test.step('1. Korak: Uspesan Login korisnika', async () => {
    await loginPage.navigate();
    await loginPage.login(process.env.DB_USERNAME!, process.env.DB_PASSWORD!);
  });

  await test.step('2. Korak: Navigacija, provera i dodavanje monitora u korpu', async () => {
    await productPage.selectAppleMonitor();
    await productPage.verifyProductDetails();
    await productPage.addProductToCart();
  });

  await test.step('3. Korak: Otvaranje korpe i popunjavanje porudžbine', async () => {
    await cartPage.openCart();
    // Prosleđujemo objekat direktno iz data fajla
    await cartPage.fillOrderForm(validPurchaseData); 
  });

  await test.step('4. Korak: Potvrda kupovine i stabilan logout', async () => {
    await cartPage.completePurchase();
    await loginPage.logout();
  });
  
});
