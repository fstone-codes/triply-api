import express from "express";
import * as listController from "../controllers/listController.js";
import * as listItemController from "../controllers/listItemController.js";

const router = express.Router();

// route "/api/lists/"
router.route("/").post(listController.addSingleList);

// route "/api/lists/"
router.route("/").get(listController.getAllLists);

// route "/api/lists/:listId"
router.route("/:listId").get(listController.getSingleList);

// route "/api/lists/:listId"
router.route("/:listId").put(listController.updateSingleLink);

// route "/api/lists/:listId"
router.route("/:listId").delete(listController.deleteSingleList);

// ====================================

// route "/api/lists/:listId/items"
router.route("/:listId/items").post(listItemController.addSingleListItem);

// route "/api/lists/:listId/items"
router.route("/:listId/items").get(listItemController.getAllListItems);

// route "/api/lists/:listId/items/:itemId"
router.route("/:listId/items/:itemId").get(listItemController.getSingleListItem);

// route "/api/lists/:listId/items/:itemId"
router.route("/:listId/items/:itemId").put(listItemController.updateSingleListItem);

// route "/api/lists/:listId/items/:itemId"
router.route("/:listId/items/:itemId").delete(listItemController.deleteSingleListItem);

export default router;
