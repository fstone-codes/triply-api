import express from "express";
import * as tripController from "../controllers/tripController.js";

const router = express.Router();

// route "/api/trips/"
router.route("/").post(tripController.addOne);

// route "/api/trips/:userId"
router.route("/:userId").get(tripController.getAll);

// route "/api/trips/:tripId"
router.route("/:tripId").patch(tripController.updateOne);

// route "/api/trips/:tripId"
router.route("/:tripId").delete(tripController.deleteOne);

export default router;
