export const formatPrice = (price: number, discount?: number): string => {
  const discounted = discount ? price * (1 - discount / 100) : price;
  return discounted.toFixed(2);
};
