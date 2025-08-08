import express from 'express';
import {CreateUserController} from '../controller/userController.js';

const router = express.Router();

router.post('/createUser', CreateUserController);

export default router;