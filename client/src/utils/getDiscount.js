export const getDiscount = (data, dicountRaw) => {
  let discount = parseInt(dicountRaw);
  if (data.range.length === 0) {
    return data.discount[0];
  }
  if (discount < data.range[0]) {
    return data.discount[0];
  } else if (discount > data.range[data.range.length - 1]) {
    return data.discount[data.discount.length - 1];
  } else {
    for (let i = 0; i < data.range.length; i++) {
      if (discount >= data.range[i] && discount <= data.range[i + 1]) {
        return data.discount[i + 1];
      }
    }
  }
};
