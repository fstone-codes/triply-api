import express from "express";
import * as tripController from "../controllers/tripController.js";

const router = express.Router();

// route "/api/trips/"
router.route("/").post(tripController.addOne);

// route "/api/trips?userId=123"
router.route("/").get(tripController.getAll);

// route "/api/trips"
router.route("/:tripId").get(tripController.getSingle);

// route "/api/trips/:tripId"
router.route("/:tripId").patch(tripController.updateSingle);

// route "/api/trips/:tripId"
router.route("/:tripId").delete(tripController.deleteSingle);

export default router;
