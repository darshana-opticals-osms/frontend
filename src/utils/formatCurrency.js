export function formatCurrency(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return 'Rs.0';
  }

  return `Rs.${amount.toLocaleString('en-US')}`;
}
