import express from "express";
const router = express.Router();

import loginController from "../controllers/login.js";
import successController from "../controllers/success.js";
import authMiddleware from "../middleware/authentification.js";

router.get("/", loginController);

router.post("/login_successful", authMiddleware, successController);

export default router;
