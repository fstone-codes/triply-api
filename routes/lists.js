import express from "express";
import * as listController from "../controllers/listController.js";

const router = express.Router();

// route "/api/lists/"
router.route("/").post(listController.addOne);

// route "/api/lists/"
router.route("/").get(listController.getAll);

// route "/api/lists"
router.route("/:listId").get(listController.getSingle);

// route "/api/lists/:listId"
// router.route("/:listId").patch(listController.updateSingle);

// route "/api/lists/:listId"
router.route("/:listId").delete(listController.deleteSingle);

export default router;
