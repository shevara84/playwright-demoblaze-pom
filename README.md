# Playwright Test Automation Framework - DemoBlaze

This repository features a professional, modular Test Automation Framework developed for the e-commerce platform [DemoBlaze](https://demoblaze.com). 

The framework is built using industry-standard QA practices to ensure high stability, readability, and effortless test maintenance.

## 🚀 Key Framework Features

- **Page Object Model (POM):** Complete separation of test logic from UI elements and locators by encapsulating pages (`BasePage`, `LoginPage`, `ProductPage`, `CartPage`).
- **Custom Fixtures:** Simplified page instantiation and teardown using Playwright `fixtures`, completely freeing the test files from boilerplate `beforeEach` and `afterEach` hooks.
- **Data Isolation (Mock Data):** All static test values and expected validation messages are centralized inside a dedicated module (`data/testData.ts`).
- **Security & Environment Variables (.env):** Sensitive credentials (username and password) are hidden from the public repository and loaded securely via environment variables.
- **ESLint v10 (Flat Config):** Integrated code linter specifically configured for TypeScript and Playwright, ensuring 100% code cleanliness and adherence to best practices.
- **CI/CD Pipeline (GitHub Actions):** Automatic execution of the linter and tests on every push or pull request, integrated with **GitHub Pages** to automatically host a live link of the HTML test report.

---

## 🛠️ Automated Test Scenarios

1. **E2E Happy Purchase Flow (`tests/purchase.spec.ts`):** Successful login, navigating categories, selecting an Apple monitor, dynamic browser alert interception during the "Add to cart" action, filling out the checkout form (with Bootstrap modal stabilization), and completing a graceful logout.
2. **Cart Management (`tests/cart.spec.ts`):** Adding a laptop to the cart, navigating to the Cart page, dynamically deleting the item from the data table, and asserting that the cart table count is exactly zero.
3. **Authentication Validations (`tests/auth.spec.ts`):** 
   - Positive login using verified credentials loaded from the `.env` file, followed by a clean logout to reset the browser state.
   - Negative login simulating a non-existent user profile and verifying the correct textual native browser popup dialog (*"User does not exist."*).

---

## 💻 Prerequisites (First-Time Setup)

Before running this project locally, ensure you have the following software installed on your machine:

1. **Node.js** (LTS version recommended): [Download here](https://nodejs.org)
2. **Git**: [Download here](https://git-scm.com)
3. **Code Editor**: *Visual Studio Code (VS Code)* is highly recommended.

---

## 🏃 Step-by-Step Execution Guide

### 1. Clone the repository
Open your terminal and run the following command:
```bash
git clone https://github.com
cd playwright-demoblaze-pom
```

### 2. Install dependencies
Execute a clean installation of all required node modules defined in the `package.json` file:
```bash
npm ci
```

### 3. Install Playwright browsers
Before triggering the tests for the first time, download Playwright's isolated browser binaries (Chromium, Firefox, WebKit):
```bash
npx playwright install --with-deps
```

### 4. Set up the .env file
Create a file named `.env` in the root directory of the project and supply your test credentials:
```env
DB_USERNAME=your_test_username
DB_PASSWORD=your_test_password
```

---

## ⚙️ Available CLI Commands

The project configures pre-defined script shortcuts inside `package.json` for seamless execution:

### Running Tests
- **Execute all tests concurrently (Headless mode):**
  ```bash
  npm test
  ```
- **Execute tests with a visible browser (Headed mode):**
  ```bash
  npx playwright test --headed
  ```
- **Execute a single specific test file:**
  ```bash
  npx playwright test tests/auth.spec.ts --headed
  ```

### Opening Reports (Locally)
After the test run finishes, view the interactive HTML report locally using:
```bash
npx playwright show-report
```

### Code Quality & Formatting (Linter)
The project utilizes the modern **ESLint Flat Config** syntax to enforce elite code quality:
- **Scan code files for bugs and unused variables:**
  ```bash
  npm run lint
  ```
- **Automatically fix syntax spacing and formatting violations:**
  ```bash
  npm run lint:fix
  ```

---

## 🌐 CI/CD and Live Reports

Every single commit sent to GitHub automatically triggers a background execution inside **GitHub Actions**:
1. A clean virtual Linux environment spins up.
2. `npm run lint` executes to block code with formatting anomalies or syntax errors.
3. All Playwright tests run headlessly in parallel.
4. The generated HTML report is deployed live via the **GitHub Pages** server.

You can inspect the live interactive report, containing detailed test execution steps, execution history, and charts at:  
[**View Live Playwright Report**](https://github.io)
