const CurrencyFormat = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});
export default function CurrencyFormatter(number: number) {
  return CurrencyFormat.format(number);
}
