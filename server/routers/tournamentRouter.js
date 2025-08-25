import express from 'express';
import {
  getAllTournaments,
  createTournament,
  getTournamentById,
  updateTournament,
  deleteTournament,
  getTournamentTeams,
  addTournamentTeam,
  getPointsTable,
  enrollIntoTournament
} from "../controllers/tournamentController.js";
import { createTournamentGame,getTournamentGames } from '../controllers/gameController.js';
import { getToken } from '../middleware/getToken.js';

const router = express.Router();


router.post('/', createTournament);
router.get('/:id', getTournamentById);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);

router.post('/:tournamentId/games', createTournamentGame);
router.get('/:tournamentId/games', getTournamentGames);

router.post('/:tournamentId/enroll', getToken, enrollIntoTournament);

router.get('/:id/teams', getTournamentTeams);
router.post('/:id/teams', addTournamentTeam)

router.get("/:id/points-table", getPointsTable);

router.get("/", getAllTournaments);

export default router