export function getUserCurrency() {
  return process.env.CURRENCY || 'USD';
}
