import express from 'express'
import productRouter from './product.router.js';



const router = express.Router();

router.use('/product', productRouter);


export default router