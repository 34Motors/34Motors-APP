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
export function getRandomIntInclusive() {
  const min = Math.ceil(1);
  const max = Math.floor(12);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function cleanObject(obj: Record<string, any>): void {
  for (const key in obj) {
    if (typeof obj[key] === "undefined" || obj[key] === "") {
      delete obj[key];
    }
  }
}
