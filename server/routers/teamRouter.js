import express from 'express';

const router = express.Router();
import { getAllTeams, createTeam, getTeamById, updateTeam, deleteTeam } from '../controllers/teamController.js';

router.get('/', getAllTeams);