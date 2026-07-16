// Podaci za formu kupovine
export interface OrderDetails {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
}

export const validPurchaseData: OrderDetails = {
  name: 'petar',
  country: 'serbia',
  city: 'belgrade',
  card: '1234567',
  month: 'july',
  year: '2026'
};

// Podaci za neuspešan login
export const invalidLoginData = {
  username: 'pera',
  password: 'peric',
  expectedError: 'Wrong password.'
};
