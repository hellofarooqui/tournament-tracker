import express from 'express';

import { loginUser, registerUser, verifyToken, getUserData} from './../controllers/authController.js';
import { getToken } from '../middleware/getToken.js';

const router = express.Router();


router.get('/', getToken, getUserData)
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/verifyToken', verifyToken)

export default router;