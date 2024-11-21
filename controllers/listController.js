import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/lists"
export const addSingleList = async (req, res) => {
    try {
        const { trip_id, list_name } = req.body;

        if (!trip_id) {
            return res.status(400).json({
                error: "Please provide the trip id for the list in the request body",
            });
        }

        if (!list_name) {
            return res.status(400).json({
                error: "Please provide the name for the list in the request body",
            });
        }

        req.body.list_name = list_name.trim();

        const checkTrip = await knex("trips").where({ id: trip_id }).first();

        if (!checkTrip) {
            return res.status(404).json({
                error: `Trip id ${trip_id} not found`,
            });
        }

        const listFound = await knex("lists").insert(req.body);

        const listData = listFound[0];

        const [createdList] = await knex("lists").where({
            id: listData,
        });

        res.status(201).json(createdList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create list" });
    }
};

// GET api "/api/lists"
export const getAllLists = async (req, res) => {
    try {
        const lists = await knex("lists");

        res.status(200).json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve lists" });
    }
};

// GET api "/api/lists/:tripId"
export const getSingleList = async (req, res) => {
    try {
        const { listId } = req.params;

        const listFound = await knex("lists").where({ id: listId });

        if (!listFound) {
            return res.status(404).json({
                error: `List id ${listId} not found`,
            });
        }
        const singleList = listFound[0];

        res.status(200).json(singleList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve list" });
    }
};

// PATCH api "/api/lists/:listId"

// DELETE api "/api/lists/:listId"
export const deleteSingleList = async (req, res) => {
    try {
        const { listId } = req.params;

        const rowsDeleted = await knex("itineraries").where({ id: listId }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: `List id ${listId} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to delete list` });
    }
};

// POST api "/api/lists/:listId/items"
export const addOneItem = async (req, res) => {
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
export const getAllItems = async (req, res) => {
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
