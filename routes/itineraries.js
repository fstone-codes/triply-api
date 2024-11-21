import express from "express";
import * as itineraryController from "../controllers/itineraryController.js";

const router = express.Router();

// route "/api/itineraries/"
router.route("/").post(itineraryController.addOne);

// route "/api/itineraries/"
router.route("/").get(itineraryController.getAll);

// route "/api/itineraries/:itineraryId"
router.route("/:itineraryId").get(itineraryController.getSingle);

// route "/api/itineraries/:itineraryId"
// router.route("/:itineraryId").patch(itineraryController.updateSingle);

// route "/api/itineraries/:itineraryId"
router.route("/:itineraryId").delete(itineraryController.deleteSingle);

export default router;
