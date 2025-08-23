import express from 'express';
import {createStockController, showAllStocksController} from '../controller/stockController.js';
import {adminOnly,authMiddleware} from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/createStock',adminOnly, createStockController);
router.get('/showAllStocks',authMiddleware, showAllStocksController);

export default router;