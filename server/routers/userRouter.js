import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router.get("/:userId", getUserById);

export default router;