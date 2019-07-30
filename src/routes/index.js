import express from 'express';
import { router as userRouter } from './users';
import { router as productRouter } from './products';

const router = express.Router();

router.use('/api/users', userRouter);
router.use('/api/products', productRouter);

router.get('/*', (req, res) => {
    res.send('Invalid Route');
});

export { router };
