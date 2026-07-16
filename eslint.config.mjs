import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts', 'pages/**/*.ts', 'fixtures/**/*.ts', 'data/**/*.ts'],
  },
  {
    rules: {
      'no-console': 'off', // Dozvoljavamo console.log za dialog poruke
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Greška za neiskorišćene varijable
      'playwright/no-wait-for-timeout': 'off', // Isključujemo jer nam treba pauza za Bootstrap modal
      'playwright/expect-expect': 'off' // <--- DODAJ OVU LINIJU da ugasiš lažne warning-e za asertacije
    },
  }
);
