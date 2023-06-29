export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatCurrency(number: number | string) {
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatNumber(number: number | string) {
  return number.toLocaleString("pt-BR");
}

export function removeNonDigits(s: string) {
  return s.replace(/\D/g, "");
}
