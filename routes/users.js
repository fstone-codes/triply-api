import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// route "/api/users/"
router.route("/").post(userController.addSingle);

// route "/api/users/login"
router.route("/login").post(userController.verifySingle);

export default router;
