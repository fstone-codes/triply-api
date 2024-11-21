import express from "express";
import * as listController from "../controllers/listController.js";
import * as listItemController from "../controllers/listItemController.js";

const router = express.Router();

// route "/api/lists/"
router.route("/").post(listController.addSingleList);

// route "/api/lists/"
router.route("/").get(listController.getAllLists);

// route "/api/lists"
router.route("/:listId").get(listController.getSingleList);

// route "/api/lists/:listId"
// router.route("/:listId").patch(listController.updateSingle);

// route "/api/lists/:listId"
router.route("/:listId").delete(listController.deleteSingleList);

// ====================

// route "/api/lists/:listId/items/"
router.route("/:listId/items").post(listItemController.addOne);

// route "/api/lists/:listId/items/"
// router.route("/").get(listItemController.getAll);

// route "/api/lists/:listId/items/:itemId"
// router.route("/:listId").get(listItemController.getSingle);

// route "/api/lists/:listId/items/:itemId"
// router.route("/:listId").patch(listItemController.updateSingle);

// route "/api/lists/:listId/items/:itemId"
// router.route("/:listId").delete(listItemController.deleteSingle);

export default router;
