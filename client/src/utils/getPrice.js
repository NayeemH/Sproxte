export const getPrice = (data, priceRaw) => {
  let price = parseFloat(priceRaw);
  if (data.range.length === 0) {
    return data.price[0];
  }
  if (price < data.range[0]) {
    return data.price[0];
  } else if (price > data.range[data.range.length - 1]) {
    return data.price[data.price.length - 1];
  } else {
    for (let i = 0; i < data.range.length; i++) {
      if (price >= data.range[i] && price <= data.range[i + 1]) {
        return data.price[i + 1];
      }
    }
  }
};
