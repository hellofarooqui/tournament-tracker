import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

import tournamentRouter from './routers/tournamentRouter.js';
import teamRouter from './routers/teamRouter.js';
import gameRouter from './routers/gameRouter.js';
import authRouter from './routers/authRouter.js';

import webpush from "web-push";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['https://tournament-tracker-ten.vercel.app','http://localhost:5173'], // Your frontend URL
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscriptions = [];

connectDB();

app.use('/api/tournaments', tournamentRouter);
app.use('/api/teams', teamRouter);
app.use('/api/games', gameRouter);
app.use('/api/auth', authRouter);

app.use('api/subscribe', (req, res) => (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
})

app.post("/api/notify", async (req, res) => {
  const { title, body } = req.body;

  const payload = JSON.stringify({ title, body });
  for (const sub of subscriptions) {
    await webpush
      .sendNotification(sub, payload)
      .catch((err) => console.error(err));
  }

  res.status(200).json({ message: "Notifications sent" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
