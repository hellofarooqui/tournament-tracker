import express from "express";
import { addMembersToGroup,getGroupDetails } from "../controllers/groupController.js";


const router = express.Router();

router.post("/:groupId/members", addMembersToGroup);
router.get("/:groupId", getGroupDetails);


export default router;