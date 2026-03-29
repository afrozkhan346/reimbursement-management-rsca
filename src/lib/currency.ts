// Currency conversion using permitted APIs ONLY
// 1. https://restcountries.com/v3.1/all?fields=name,currencies
// 2. https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}

interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Server-side cache for exchange rates
const rateCache: Record<string, { rates: Record<string, number>; timestamp: number }> = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function fetchExchangeRates(baseCurrency: string): Promise<Record<string, number>> {
  const now = Date.now();
  const cached = rateCache[baseCurrency];

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.rates;
  }

  const res = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
    { next: { revalidate: 600 } } // Next.js cache for 10 min
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rates: ${res.statusText}`);
  }

  const data: ExchangeRateResponse = await res.json();
  rateCache[baseCurrency] = { rates: data.rates, timestamp: now };
  return data.rates;
}

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return amount;

  const rates = await fetchExchangeRates(fromCurrency);
  const rate = rates[toCurrency];

  if (!rate) {
    throw new Error(`No exchange rate found for ${fromCurrency} -> ${toCurrency}`);
  }

  return Math.round(amount * rate * 100) / 100;
}

// Fetch all available currencies from restcountries.com
interface CountryCurrency {
  name: { common: string };
  cca2?: string;
  currencies: Record<string, { name: string; symbol: string }>;
}

export interface CountryCurrencyOption {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}

let currencyListCache: { code: string; name: string; symbol: string }[] | null = null;
let countryCurrencyCache: CountryCurrencyOption[] | null = null;

export async function getAvailableCurrencies(): Promise<
  { code: string; name: string; symbol: string }[]
> {
  if (currencyListCache) return currencyListCache;

  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,currencies",
      { next: { revalidate: 86400 } } // cache 24h
    );
    const data: CountryCurrency[] = await res.json();

    const map = new Map<string, { name: string; symbol: string }>();
    for (const country of data) {
      if (country.currencies) {
        for (const [code, info] of Object.entries(country.currencies)) {
          if (!map.has(code)) {
            map.set(code, { name: info.name, symbol: info.symbol });
          }
        }
      }
    }

    currencyListCache = Array.from(map.entries())
      .map(([code, info]) => ({ code, ...info }))
      .sort((a, b) => a.code.localeCompare(b.code));

    return currencyListCache;
  } catch {
    // Fallback
    return [
      { code: "USD", name: "US Dollar", symbol: "$" },
      { code: "EUR", name: "Euro", symbol: "€" },
      { code: "GBP", name: "British Pound", symbol: "£" },
      { code: "INR", name: "Indian Rupee", symbol: "₹" },
      { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    ];
  }
}

export async function getCountryCurrencyOptions(): Promise<CountryCurrencyOption[]> {
  if (countryCurrencyCache) return countryCurrencyCache;

  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,currencies",
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch countries: ${res.statusText}`);
    }

    const data: CountryCurrency[] = await res.json();

    countryCurrencyCache = data
      .flatMap((country) => {
        if (!country.currencies || !country.cca2 || !country.name?.common) {
          return [];
        }

        return Object.entries(country.currencies).map(([currencyCode, currencyInfo]) => ({
          countryCode: country.cca2 as string,
          countryName: country.name.common,
          currencyCode,
          currencyName: currencyInfo.name ?? currencyCode,
          currencySymbol: currencyInfo.symbol ?? currencyCode,
        }));
      })
      .sort((a, b) => a.countryName.localeCompare(b.countryName));

    return countryCurrencyCache;
  } catch {
    return [
      {
        countryCode: "US",
        countryName: "United States",
        currencyCode: "USD",
        currencyName: "US Dollar",
        currencySymbol: "$",
      },
      {
        countryCode: "IN",
        countryName: "India",
        currencyCode: "INR",
        currencyName: "Indian Rupee",
        currencySymbol: "₹",
      },
      {
        countryCode: "GB",
        countryName: "United Kingdom",
        currencyCode: "GBP",
        currencyName: "British Pound",
        currencySymbol: "£",
      },
      {
        countryCode: "DE",
        countryName: "Germany",
        currencyCode: "EUR",
        currencyName: "Euro",
        currencySymbol: "€",
      },
    ];
  }
}
