export const getDiscount = (data, dicount) => {
  if (dicount < data.range[0]) {
    return data.dicount[0];
  } else if (dicount > data.range[data.range.length - 1]) {
    return data.dicount[data.dicount.length - 1];
  } else {
    for (let i = 0; i < data.range.length; i++) {
      if (dicount >= data.range[i] && dicount <= data.range[i + 1]) {
        return data.dicount[i + 1];
      }
    }
  }
};
