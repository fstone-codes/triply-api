import express from "express";
import * as listItemController from "../controllers/listItemController.js";

const router = express.Router();

// route "/api/lists/:listId/items/"
router.route("/").post(listItemController.addOne);

// route "/api/lists/:listId/items/"
// router.route("/").get(listItemController.getAll);

// route "/api/lists/:listId/items/:itemId"
// router.route("/:listId").get(listItemController.getSingle);

// route "/api/lists/:listId/items/:itemId"
// router.route("/:listId").patch(listItemController.updateSingle);

// route "/api/lists/:listId/items/:itemId"
// router.route("/:listId").delete(listItemController.deleteSingle);

export default router;
