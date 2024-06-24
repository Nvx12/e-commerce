import express from 'express'
import productRouter from './product.router.js';
import userRouter from './user.router.js';



const router = express.Router();

router.use('/product', productRouter);
router.use('/user', userRouter);


export default router