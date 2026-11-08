/**
 * Currency formatting — no conversion, just display.
 * Supports USD, GBP, EUR, NGN, AED as required.
 */
const currencyLocales = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  NGN: 'en-NG',
  AED: 'en-AE'
}

export function formatPrice(amount, currency) {
  const locale = currencyLocales[currency] || 'en-US'
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount)
  } catch {
    return `${currency} ${Number(amount).toLocaleString()}`
  }
}

export function formatPriceCompact(amount, currency) {
  return formatPrice(amount, currency)
}

export function getCurrencySymbol(currency) {
  const map = { USD: '$', GBP: '£', EUR: '€', NGN: '₦', AED: 'AED ' }
  return map[currency] || currency + ' '
}
