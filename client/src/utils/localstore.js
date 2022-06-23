export const setStore = (cart) => {
  //console.log(cart);
  const finalCart = cart.map((ct) => {
    let imgs = [];
    if (ct.images) {
      for (let i = 0; i < ct.images.length; i++) {
        if (typeof ct.images[i] === "string") {
          imgs.push(ct.images[i]);
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(ct.images[i]);
          reader.onload = () => imgs.push(reader.result);
          //   const res = await getBase64(ct.images[i]);
          //   imgs.push(res);
        }
      }
    }
    console.log({ ...ct, images: imgs });
    return { ...ct, images: imgs };
  });

  console.log(finalCart);

  localStorage.setItem("sv_cart2", JSON.stringify({ data: finalCart }));
};

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}
