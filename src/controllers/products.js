import db from './../db/models';

export const getAllProducts = (req, res) => {
    return db.Product.findAll()
        .then(products => {
            return res.json(products);
        })
        .catch(err => res.send(`Error: ${err}`));
}

export const getProduct = (req, res) => {
    const { id } = req.params;
    return db.Product.findOne({ where: { id } })
        .then(product => {
            return res.json(product);
        })
        .catch(err => res.send(`Error: ${err}`))
}

export const getProductReviews = (req, res) => {
    const { id } = req.params;
    return db.Product.findOne({ where: { id } })
        .then(product => {
            return res.json(product.reviews);
        })
        .catch(err => res.send(`Error: ${err}`))
}

export const createProduct = (req, res) => {
    const { name, price, reviews } = req.body;
    return db.Product.create({ name, price, reviews })
        .then(product => res.json(product))
        .catch(err => res.send(`Error: ${err}`))
}