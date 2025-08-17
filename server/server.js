import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

import tournamentRouter from './routers/tournamentRouter.js';
import teamRouter from './routers/teamRouter.js';
import gameRouter from './routers/gameRouter.js';




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/tournaments', tournamentRouter);
app.use('/api/teams', teamRouter);
app.use('/api/games', gameRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
