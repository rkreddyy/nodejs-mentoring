import Product from './../db/models_mongo/products';

export const getAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(products);
  });
}

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product);
  });
}

export const removeProduct = (req, res) => {
  const { id: _id } = req.params;
  Product.deleteOne({ _id }, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send("Successfully deleted product.");
  });
}

export const getProductReviews = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product.reviews);
  });
}

export const createProduct = (req, res) => {
  const { name, price, reviews } = req.body;
  Product.create({
    name, price, reviews
  }, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product);
  })
}