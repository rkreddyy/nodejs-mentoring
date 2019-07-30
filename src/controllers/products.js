import * as products from './../data/products';
import fs from 'fs';
import path from 'path';

export const getAllProducts = (req, res) => {
    return res.json(products.default);
}

export const getProduct = (req, res) => {
    const { id } = req.params;
    const result = products.default.find(product => product.id === parseInt(id));

    return res.json(result);
}

export const getProductReviews = (req, res) => {
    const { id } = req.params;

    const reviews = products.default.find(product => product.id === parseInt(id)).reviews;
    
    return res.json(reviews);
}

export const postProduct = (req, res) => {
    const product = req.body;
    console.log(product);
    
    products.default.push(product);

    fs.writeFileSync(path.join(__dirname,'../data/','products.json'), JSON.stringify(products.default));

    res.json(product);
}