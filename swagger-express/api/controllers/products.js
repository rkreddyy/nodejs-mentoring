'use strict';

const Product = require("../../../src/db/models_mongo/products");

const getAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(products);
  });
}

const getProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product);
  });
}

const deleteProduct = (req, res) => {
  const { id: _id } = req.params;
  Product.deleteOne({ _id }, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send("Successfully deleted product.");
  });
}

const getProductReviews = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product.reviews);
  });
}

const createProduct = (req, res) => {
  const { name, price, reviews } = req.body;
  Product.create({
    name, price, reviews
  }, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product);
  })
}

module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  getProduct: getProduct,
  deleteProduct: deleteProduct,
  getProductReviews: getProductReviews
};