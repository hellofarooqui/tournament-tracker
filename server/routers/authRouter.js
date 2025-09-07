import express from 'express';

import { loginUser, registerUser, TokenVerification, getUserData} from './../controllers/authController.js';
import { getToken } from '../middleware/getToken.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();


router.get('/', verifyToken, getUserData)
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/verifyToken', TokenVerification)

export default router;