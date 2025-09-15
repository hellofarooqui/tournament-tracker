import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { addVote, getPollResults,createPoll,getNominations } from '../controllers/pollController.js';

const router = express.Router();

router.post('/create-poll', verifyToken ,createPoll )
router.post('/:pollId/vote', verifyToken ,addVote )
router.get('/:pollId/poll-results', verifyToken ,getPollResults )
router.get('/:pollId/get-nominations', verifyToken ,getNominations )


export default router;