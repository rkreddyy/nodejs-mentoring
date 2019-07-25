import express from "express";
import queryParser from "./middlewares/queryParser";
import cookieParser from "./middlewares/cookieParser";

const app = express();
app.use(queryParser);
app.use(cookieParser);

app.get('/', function (req, res) {
    res.send('Invalid Route');
});

app.get('/api/products', function (req, res) {
    res.json([{ id: 1, name: "P1" }, { id: 2, name: "P2" }]);
});

app.get('/api/products/:id', function (req, res) {
    res.json({ id: req.params.id, name: `P${req.params.id}` });
});

app.get('/api/products/:id/reviews', function (req, res) {
    res.json({ id: req.params.id, reviews: "Excellent Product" });
});

app.post('/api/products', function (req, res) {
    res.send([{ id: 1, name: "P1" }, { id: 2, name: "P2" }]);
});

app.get('/api/users', function (req, res) {
    res.send([{ id: 1, name: "U1" }, { id: 2, name: "U2" }]);
});

export default app;
