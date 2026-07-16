import { test } from '../fixtures/baseTest';

test('Uklanjanje proizvoda iz korpe', async ({ loginPage, productPage, cartPage }) => {

    await test.step('1. Korak: Logovanje na aplikaciju', async () => {
        await loginPage.navigate();
        await loginPage.login(process.env.DB_USERNAME!, process.env.DB_PASSWORD!);
    });

    await test.step('2. Korak: Dodavanje laptopa u korpu', async () => {
        await productPage.selectSonyLaptop();
        await productPage.addProductToCart();
    });

    await test.step('3. Korak: Otvaranje korpe i brisanje artikla', async () => {
        await cartPage.openCart();
        await cartPage.deleteProductFromCart();
    });

    await test.step('4. Korak: Bezbedan Logout', async () => {
        await loginPage.logout();
    });

});
