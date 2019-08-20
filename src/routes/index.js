import express from "express";
import userRouter from './users/';
import productRouter from './products/';
import authRouter from './auth';
import checkToken from '../middlewares/checkToken';
import { citiesMongo, productsMongo, usersMongo } from './mongo';

const app = express();

/** JWT Authentication */
app.use('/api/users', checkToken, userRouter);
app.use('/api/products', checkToken, productRouter);
app.use('/api/auth', authRouter);

app.use('/api/mongo/cities', citiesMongo);
app.use('/api/mongo/products', productsMongo);
app.use('/api/mongo/users', usersMongo);

app.get('*', (req, res) => res.send('Invalid Route.'));

export default app;
