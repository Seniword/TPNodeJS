import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import accountController from "../controllers/account.js";
import {accountCreated, login} from "../controllers/login.js";
import dashboardController from "../controllers/dashboard.js";

import authMiddleware from "../middleware/authMiddleware.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

router.get("/", HomeController);

router.post("/verifLogin", authMiddleware, accountController)

router.get("/login", accountCreated)
router.post("/loginPost", login)

router.get("/dashboard", loginMiddleware, dashboardController)

export default router;