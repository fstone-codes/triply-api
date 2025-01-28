import express from "express";
import * as userController from "../controllers/userController.js";
import authenticateToken from "../middleware/authJwt.js";

const router = express.Router();

// route "/api/users/"
router.route("/").post(userController.register);

// route "/api/users/login"
router.route("/login").post(userController.login);

// route "/api/users/refresh"
router.route("/refresh").post(userController.refreshToken);

// route "/api/users/protected"
router.route("/protected").get(authenticateToken, userController.verifyToken);

// route "/api/users/delete"
router.route("/delete").delete(userController.removeToken);

export default router;
