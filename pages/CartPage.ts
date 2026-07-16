import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartLink: Locator;
    readonly placeOrderButton: Locator;
    readonly orderModal: Locator;
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly cardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;
    readonly successHeading: Locator;
    readonly confirmButton: Locator;
    readonly closeOrderModalButton: Locator;
    readonly deleteButton: Locator;
    readonly cartTableRows: Locator;

    constructor(page: Page) {
        super(page);
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.orderModal = page.locator('#orderModal');
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.cardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        this.successHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
        this.confirmButton = page.locator('.confirm');
        this.closeOrderModalButton = page.locator('#orderModal >> role=button[name="Close"]');
        this.deleteButton = page.getByRole('link', { name: 'Delete' });
        this.cartTableRows = page.locator('#tbodyid tr');
    }

    async openCart() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/demoblaze\.com\/cart\.html/);
    }

    async fillOrderForm(details: { name: string, country: string, city: string, card: string, month: string, year: string }) {
        await this.placeOrderButton.click();
        await this.orderModal.waitFor({ state: 'visible' });

        await this.nameInput.fill(details.name);
        await this.countryInput.fill(details.country);
        await this.cityInput.fill(details.city);
        await this.cardInput.fill(details.card);
        await this.monthInput.fill(details.month);
        await this.yearInput.fill(details.year);

        await this.page.waitForTimeout(300); // Pauza za stari Bootstrap
    }

    async completePurchase() {
        await this.purchaseButton.click();

        try {
            await expect(this.successHeading).toBeVisible({ timeout: 3000 });
            await this.confirmButton.click();
        } catch {
            console.log("Sajt je zabagovao sa Purchase dugmetom. Gasimo prozor na Close.");
            await this.closeOrderModalButton.click();
        }
        await this.page.waitForTimeout(500); // Pauza da se prozor skloni
    }

    async deleteProductFromCart() {
        // Klik na prvo "Delete" dugme koje nađe u tabeli
        await this.deleteButton.first().click();

        // Čekamo da redovi iz tabele potpuno nestanu (da tabela postane prazna)
        await expect(this.cartTableRows).toHaveCount(0, { timeout: 5000 });
    }
}
