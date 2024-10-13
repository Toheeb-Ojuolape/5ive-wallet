export const PROTOCOL = "1.0";

export const BRANDCOLOR = localStorage.getItem("theme-color") || "#00000";

export const DWN_API_URL =
  process.env.VUE_API_URL || "https://api-ymsap77jma-uc.a.run.app";

export const CURRENCYPAIRS = [
  {
    from: "GHS",
    to: "USDC",
  },
  {
    from: "NGN",
    to: "KES",
  },
  {
    from: "KES",
    to: "USD",
  },
  {
    from: "USD",
    to: "KES",
  },
  {
    from: "USD",
    to: "EUR",
  },
  {
    from: "EUR",
    to: "USD",
  },
  {
    from: "USD",
    to: "GBP",
  },
  {
    from: "USD",
    to: "BTC",
  },
  {
    from: "EUR",
    to: "USDC",
  },
  {
    from: "EUR",
    to: "GBP",
  },
  {
    from: "USD",
    to: "AUD",
  },
  {
    from: "USD",
    to: "MXN",
  },
];

export const CURRENCIES = [
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    country: "gh",
  },
  {
    code: "USDC",
    name: "USD Coin",
    country: "us",
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    country: "ng",
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    country: "ke",
  },
  {
    code: "USD",
    name: "United States Dollar",
    country: "us",
  },
  {
    code: "EUR",
    name: "Euro",
    country: "eu",
  },
  {
    code: "GBP",
    name: "British Pound Sterling",
    country: "gb",
  },
  {
    code: "BTC",
    name: "Bitcoin",
    country: "btc",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    country: "au",
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    country: "mx",
  },
];

export const CURRENCY = {
  code: "KES",
  name: "Kenyan Shilling",
  country: "ke"
};

export const DEFAULTCURRENCY = {
  code: "NGN",
  name: "Nigerian Naira",
  country: "ng",
};

export const DEFAULTCOUNTRY = {
  name: "Nigeria",
  code: "NG",
};

export const DEFAULTPAYIN = {
  accountNumber: "1234567890",
  routingNumber: "1234567890",
  IBAN: "1234567890",
};

export const INSTANTSWAPFEATURES = [
  "Wallet automatically selects the best offers/rates",
  "Send money 5 times faster",
  "Complete your transaction in 3 simple steps",
];

export const INSIGHTSFEATURES = [
  "A deeper understanding of your activities on 5ive",
  "Insights needed to make better financial decisions",
  "Track your progress and optimize your money moves",
];

export const SUBSCRIPTIONFEE = 1000;
