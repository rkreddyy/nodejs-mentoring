import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  req.products = [
    { id: 1, name: "P1", reviews: [{ userId: 1, comments: "Wow" }, { userId: 5, comments: "Excellent" }] },
    { id: 2, name: "P2", reviews: [{ userId: 2, comments: "Wow" }, { userId: 4, comments: "Excellent" }] },
    { id: 3, name: "P3", reviews: [{ userId: 3, comments: "Wow" }, { userId: 6, comments: "Excellent" }] }
  ];
  next();
});

router.get('/', (req, res) => {
  if (req.products) {
    res.json(req.products);
  }
  else {
    res.status(404);
    res.json({ msg: "No products found" });
  }
});

router.post('/', (req, res) => {
  res.status(201);
  res.send(req.products);
});

router.get('/:id', (req, res) => {
  let product = req.products.find(product => product.id === +req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    res.json({ msg: "Product not found" });
  }
});

router.get('/:id/reviews', (req, res) => {
  let product = req.products.find(product => product.id === +req.params.id);

  if (product) {
    res.json(product.reviews);
  } else {
    res.status(404);
    res.json({ msg: "Product not found" });
  }
});

export { router };
