module.exports = function (temp, product) {
  let output = temp.replace(/{%productname%}/g, product.productName);
  output = output.replace(/{%images%}/g, product.image);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%from%}/g, product.from);
  output = output.replace(/{%nutrient%}/g, product.nutrients);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%id%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%notorganic%}/g, "not-organic");
  }
  return output;
};
