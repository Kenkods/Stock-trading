import express from 'express';
import {CreateUserController, loginUserController} from '../controller/userController.js';


const router = express.Router();

router.post('/createUser', CreateUserController);

router.post('/login',loginUserController);

export default router;