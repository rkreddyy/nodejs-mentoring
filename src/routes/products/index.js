import express from 'express';
import * as products from '../../controllers/products';

const productRouter = express.Router();

productRouter.route('/')
  .get(products.getAllProducts);

productRouter.route('/')
  .post(products.createProduct);

productRouter.route('/:id')
  .get(products.getProduct);

productRouter.route('/:id/reviews')
  .get(products.getProductReviews);

export default productRouter;