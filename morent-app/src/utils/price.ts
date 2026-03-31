export const formatPrice = (
  price: number,
  discount?: number,
  decimals: boolean = true,
): string => {
  const discounted = discount ? price * (1 - discount / 100) : price;
  return decimals ? discounted.toFixed(2) : String(Math.round(discounted));
};
