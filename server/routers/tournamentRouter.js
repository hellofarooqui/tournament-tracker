import express from 'express';
import {
  getAllTournaments,
  createTournament,
  getTournamentById,
  updateTournamentDetails,
  deleteTournament,
  getTournamentTeams,
  addTournamentTeam,
  getPointsTable,
  enrollIntoTournament,
  getTournamentPlayers,
  getTournamentGroups,
  addTournamentGroup,
  getTournamentGroupDetails,
  getAllFormats,
  goLiveTournament,
  getTournamentFormat,
  getTournamentDataForUpdate
} from "../controllers/tournamentController.js";
import { createTournamentGame,getTournamentGames } from '../controllers/gameController.js';
import { getToken } from '../middleware/getToken.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


//games related routes
router.post('/:tournamentId/games', createTournamentGame);
router.get('/:tournamentId/games', getTournamentGames);

//enroll into tournament
router.post('/:tournamentId/enroll', verifyToken, enrollIntoTournament);


//teams related routes
router.get('/:id/teams', getTournamentTeams);
router.post('/:id/teams', addTournamentTeam)


//groups related routes
router.get("/:id/groups", getTournamentGroups);
router.post("/:id/groups", addTournamentGroup);
router.get("/:id/groups/:groupId", getTournamentGroupDetails);


//players related routes
router.get('/:id/players', getTournamentPlayers);


//points table route
router.get("/:id/points-table", getPointsTable);


//specific tournament routes
router.get('/:id', getTournamentById);
router.get('/:id/update', getTournamentDataForUpdate);
router.put('/:id/update', updateTournamentDetails);
router.get('/:id/tournament-format', getTournamentFormat);

router.delete('/:id', deleteTournament);
router.put('/:id/go-live', verifyToken, goLiveTournament);


//get all tournaments
router.get("/", getAllTournaments);
router.post('/', verifyToken, createTournament);

//tournament formats related routes
router.get('/tournament-formats', getAllFormats);


export default router