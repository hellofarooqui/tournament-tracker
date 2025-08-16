import express from 'express';

const router = express.Router();
import { getAllTeams,getTeamById, updateTeam, deleteTeam,addPlayerToTeam } from '../controllers/teamController.js';

const beforeAddingPlayer = (req,res,next) => {
    console.log("Req body", req.body)
    next();
}

router.post('/:teamId/players', beforeAddingPlayer, addPlayerToTeam);
router.get('/:teamId', getTeamById);

router.put('/:teamId', updateTeam);
router.delete('/:teamId', deleteTeam);

router.get('/', getAllTeams);

export default router;