import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    readonly monitorsCategoryLink: Locator;
    readonly appleMonitorLink: Locator;
    readonly productHeading: Locator;
    readonly productPriceHeading: Locator;
    readonly addToCartButton: Locator;
    readonly laptopsCategoryLink: Locator;
    readonly sonyLaptopLink: Locator;

    constructor(page: Page) {
        super(page);
        this.monitorsCategoryLink = page.getByRole('link', { name: 'Monitors' });
        this.appleMonitorLink = page.getByRole('link', { name: 'Apple monitor' });
        this.productHeading = page.getByRole('heading', { name: 'Apple monitor 24', exact: true });
        this.productPriceHeading = page.getByRole('heading', { name: '$400' });
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
        this.laptopsCategoryLink = page.getByRole('link', { name: 'Laptops' });
        this.sonyLaptopLink = page.getByRole('link', { name: 'Sony vaio i5' });
    }

    async selectAppleMonitor() {
        await this.monitorsCategoryLink.click();
        await this.appleMonitorLink.click();
    }

    async verifyProductDetails() {
        await expect(this.productHeading).toBeVisible();
        await expect(this.productPriceHeading).toBeVisible();
    }

    async addProductToCart() {
        await Promise.all([
            this.page.waitForEvent('dialog').then(async dialog => {
                console.log(`Korpa Dialog: ${dialog.message()}`);
                await dialog.accept();
            }),
            this.addToCartButton.click()
        ]);
    }
    async selectSonyLaptop() {
        await this.laptopsCategoryLink.click();
        await this.sonyLaptopLink.click();
    }
}
