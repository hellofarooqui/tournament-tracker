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
} from "../controllers/tournamentController.js";

const router = express.Router();


router.post('/', createTournament);
router.get('/:id', getTournamentById);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);

router.get('/:id/teams', getTournamentTeams);
router.post('/:id/teams', addTournamentTeam)

router.get("/:id/points-table", getPointsTable);

router.get("/", getAllTournaments);

export default router