import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/lists/:listId/items"
export const addOne = async (req, res) => {
    try {
        /*         const { item, description, status, category } = req.body;

        // if (!list_id) {
        //     return res.status(400).json({
        //         error: "Please provide the list id for the list item in the request body",
        //     });
        // }

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
        if (description) req.body.description = description.trim(); */

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
export const getAll = async (req, res) => {
    try {
        const lists = await knex("lists");

        res.status(200).json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve lists" });
    }
};

// GET api "/api/lists/:listId/items/:itemId"

// PATCH api "/api/lists/:listId/items/:itemId"

// DELETE api "/api/lists/:listId/items/:itemId"
