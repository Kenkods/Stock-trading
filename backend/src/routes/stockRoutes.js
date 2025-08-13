import express from 'express';
import {CreateStockController} from '../controller/stockController.js';
import {adminOnly} from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/createStock',adminOnly, CreateStockController);

export default router;