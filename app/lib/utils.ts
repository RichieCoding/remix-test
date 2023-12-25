export function removePriceTrailingZeros(price: string) {
  return Number(price.split(".")[1]) ? price : price.split(".")[0];
}