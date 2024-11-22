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

        const rowsDeleted = await knex("lists").where({ id: listId }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: `List id ${listId} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to delete list` });
    }
};
