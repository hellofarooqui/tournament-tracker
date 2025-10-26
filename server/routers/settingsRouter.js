import express from "express";
import { addTournamentFormat, getTournamentFormats } from "../controllers/settingsController.js";

const router = express.Router();

router.post('/tournament-formats', addTournamentFormat);
router.get('/tournament-formats', getTournamentFormats);


export default router;