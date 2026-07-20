import { test } from '../fixtures/baseTest';

test('Remove product from cart', async ({ loginPage, productPage, cartPage }) => {

    await test.step('1. Step: Navigate to the site', async () => {
        await loginPage.navigate();
        await loginPage.login(process.env.DB_USERNAME!, process.env.DB_PASSWORD!);
    });

    await test.step('2. Step: Add laptop to cart', async () => {
        await productPage.selectSonyLaptop();
        await productPage.addProductToCart();
    });

    await test.step('3. Step: Open cart and delete item', async () => {
        await cartPage.openCart();
        await cartPage.deleteProductFromCart();
    });

    await test.step('4. Step: Safe Logout', async () => {
        await loginPage.logout();
    });

});
