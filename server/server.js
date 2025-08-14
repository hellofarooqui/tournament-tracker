import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

import tournamentRouter from './routers/tournamentRouter.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/tournaments', tournamentRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
