import express from 'express';
import { updateWinner } from '../controllers/gameController.js';

const router = express.Router();

// router.get('/',getAllGames);
// router.post('/', createGame);
// router.get('/:id', getGameById);
// router.put('/:id', updateGame);
router.patch('/:id', updateWinner); // For updating the winner of a game
// router.delete('/:id', deleteGame);  

export default router;