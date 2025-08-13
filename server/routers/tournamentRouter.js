import express from 'express';

const router = express.Router();

router.get('/', getAllTournaments);
router.post('/', createTournament);
router.get('/:id', getTournamentById);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);