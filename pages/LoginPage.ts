import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeUserText: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = page.getByRole('link', { name: 'Log in', exact: false });
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in', exact: false });
    this.welcomeUserText = page.locator('#nameofuser');
    this.logoutLink = page.getByRole('link', { name: 'Log out', exact: false });
  }

  async navigate() {
    await this.navigateTo('https://demoblaze.com');
  }

  async login(username: string, password: string) {
    await this.loginLink.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.welcomeUserText).toHaveText(`Welcome ${username}`);
  }

  async logout() {
    await this.reloadPage(); // Osvežavanje da očistimo bagovite modale
    await this.logoutLink.click();
    await expect(this.welcomeUserText).toBeHidden();
    await expect(this.loginLink).toBeVisible();
  }
  async loginWithInvalidCredentials(username: string, password: string, expectedAlertMessage: string) {
    await this.loginLink.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    // Osluškujemo browser alert pre nego što kliknemo na login dugme
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.loginButton.click();

    // Čekamo da se pojavi dialog i proveravamo njegovu poruku
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe(expectedAlertMessage);
    await dialog.accept(); // Zatvaramo alert klikom na OK

    // Proveravamo da je modal za login i dalje otvoren (da nismo ulogovani)
    await expect(this.loginButton).toBeVisible();
  }

}
