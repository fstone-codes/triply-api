import express from "express";
import * as tripController from "../controllers/tripController.js";

const router = express.Router();

// route "/api/trips/"
router.route("/").post(tripController.addOne);

// route "/api/trips/:userId"
router.route("/:userId").get(tripController.getAll);

export default router;
