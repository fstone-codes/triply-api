import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/lists/:listId/items"
export const addSingleListItem = async (req, res) => {
    try {
        const { item, description, status, category } = req.body;

        if (!item || !category) {
            return res.status(400).json({
                error: "Please provide the item and category for the list item in the request body",
            });
        }

        if (!status || status < 1 || status > 3) {
            return res.status(400).json({
                error: "Please provide the status for the list item in the request body",
            });
        }

        req.body.item = item.trim();
        if (description) req.body.description = description.trim();

        const { listId } = req.params;

        const checkList = await knex("lists").where({ id: listId }).first();

        if (!checkList) {
            return res.status(404).json({
                error: `List id ${listId} not found`,
            });
        }

        const listItemFound = await knex("list_items").insert(req.body);

        const listItemData = listItemFound[0];

        const [createdListItem] = await knex("list_items").where({
            id: listItemData,
        });

        res.status(201).json(createdListItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create list item" });
    }
};

// GET api "/api/lists/:listId/items"
export const getAllListItems = async (req, res) => {
    try {
        const { listId } = req.params;

        const listFound = await knex("lists").where({ id: listId }).first();

        if (!listFound) {
            return res.status(404).json({
                error: `List id ${listId} not found`,
            });
        }

        const listItems = await knex("list_items")
            .join("lists", "list_items.list_id", "=", "lists.id")
            .where({ list_id: listId })
            .select(
                "list_items.id",
                "list_items.list_id",
                "list_items.description",
                "list_items.status",
                "list_items.category",
                "list_items.created_at",
                "list_items.updated_at"
            );

        res.status(200).json(listItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve lists" });
    }
};

// GET api "/api/lists/:listId/items/:itemId"
export const getSingleListItem = async (req, res) => {
    try {
        const { listId, itemId } = req.params;

        const listFound = await knex("lists").where({ id: listId });

        if (!listFound) {
            return res.status(404).json({
                error: `List id ${listId} not found`,
            });
        }

        const singleListItem = await knex("list_items")
            .join("lists", "list_items.list_id", "=", "lists.id")
            .where({ "list_items.id": itemId })
            .andWhere({ "list_items.list_id": listId })
            .select(
                "list_items.id",
                "list_items.list_id",
                "list_items.description",
                "list_items.status",
                "list_items.category",
                "list_items.created_at",
                "list_items.updated_at"
            )
            .first();

        if (!singleListItem) {
            return res.status(404).json({
                error: `List item id ${itemId} not found`,
            });
        }

        res.status(200).json(singleListItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve list" });
    }
};

// PATCH api "/api/lists/:listId/items/:itemId"

// DELETE api "/api/lists/:listId/items/:itemId"
export const deleteSingleListItem = async (req, res) => {
    try {
        const { listId, itemId } = req.params;

        const listFound = await knex("lists").where({ id: listId }).first();

        if (!listFound) {
            return res.status(404).json({
                error: `List id ${listId} not found`,
            });
        }

        const rowsDeleted = await knex("list_items")
            .where({ id: itemId, list_id: listId })
            .delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: `List item id ${itemId} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to delete list item` });
    }
};
