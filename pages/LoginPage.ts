import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeLink: Locator;

  constructor(page: Page) {
    super(page); 
    
    // ignoreCase: true sprečava pad testa zbog velikih/malih slova
    this.loginLink = page.getByRole('link', { name: 'Log in', exact: false });
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in', exact: false });
    this.welcomeLink = page.getByRole('link', { name: 'Welcome', exact: false });
  }

  async navigate() {
    await this.navigateTo('https://www.demoblaze.com/index.html');
  }

  async login(username: string, password: string) {
    await this.loginLink.click();
    await this.usernameInput.fill(username);
    // Pazite na veliko S u 'Shevara23' pošto ste u skripti promenili na veliko S
    await this.passwordInput.fill(password); 
    await this.loginButton.click();
  }

  async verifyLoggedIn() {
    await expect(this.welcomeLink).toBeVisible();
  }
}
