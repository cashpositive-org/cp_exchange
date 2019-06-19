export function localeFormatAmount(amount) {
  return Number(amount).toLocaleString('en-In', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function localeFormatTime(timestamp) {
  return new Date(timestamp).toLocaleString();
}
