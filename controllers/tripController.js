import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/trips"
export const addOne = async (req, res) => {
    try {
        const { trip_name, destination, start_date, end_date } = req.body;

        if (!trip_name || !destination) {
            return res.status(400).json({
                error: "Please provide the name and destination for the trip in the request body",
            });
        }

        if (!start_date || !end_date) {
            return res.status(400).json({
                error: "Please provide the start and end dates for the trip in the request body",
            });
        }

        function dateFormat(date) {
            const datePattern = /^\d{4}-?(0[1-9]|1[0-2])-?(0[1-9]|[12]\d|3[01])$/;
            return datePattern.test(date);
        }

        if (!dateFormat(start_date) || !dateFormat(end_date) || start_date > end_date) {
            return res.status(400).json({
                error: "Please provide valid start and end dates for the trip in the request body",
            });
        }

        req.body.trip_name = trip_name.trim();
        req.body.destination = destination.trim();

        const checkUser = await knex("users").where({ id: req.body.user_id }).first();

        if (!checkUser) {
            return res.status(404).json({
                error: `User id ${req.body.user_id} not found`,
            });
        }

        const tripFound = await knex("trips").insert(req.body);

        const tripData = tripFound[0];

        const [createdTrip] = await knex("trips").where({
            id: tripData,
        });

        res.status(201).json(createdTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create trip" });
    }
};

// GET api "/api/trips?userId=123"
export const getAll = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                error: `Please provide a userId as a query parameter`,
            });
        }

        const checkUser = await knex("users").where({ id: userId }).first();

        if (!checkUser) {
            return res.status(404).json({
                error: `User with id ${userId} not found`,
            });
        }

        const trips = await knex("trips").where({ user_id: userId });

        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve trips" });
    }
};

// GET api "/api/trips/:tripId"
export const getSingle = async (req, res) => {
    try {
        const { tripId } = req.params;

        const tripFound = await knex("trips").where({ id: tripId });

        if (!tripFound) {
            return res.status(404).json({
                error: `Trip id ${tripId} not found`,
            });
        }
        const singleTrip = tripFound[0];

        res.status(200).json(singleTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve trip" });
    }
};

// PATCH api "/api/trips/:tripId"
export const updateSingle = async (req, res) => {
    try {
        /*         const { trip_name, destination, start_date, end_date } = req.body;

        if (trip_name) req.body.trip_name = trip_name.trim();
        if (destination) req.body.destination = destination.trim();

        if ((trip_name && trip_name.trim() === "") || (destination && destination.trim() === "")) {
            return res.status(400).json({
                error: "Please provide the name and destination for the trip in the request body",
            });
        }

        // if ((start_date && start_date === "") || (end_date && end_date === "")) {
        //     return res.status(400).json({
        //         error: "Please provide the start and end dates for the trip in the request body",
        //     });
        // }

        function dateFormat(date) {
            const datePattern = /^\d{4}-?(0[1-9]|1[0-2])-?(0[1-9]|[12]\d|3[01])$/;
            return datePattern.test(date);
        }

        if (
            (start_date && !dateFormat(start_date)) ||
            (end_date && !dateFormat(end_date)) ||
            (start_date && end_date && start_date > end_date)
        ) {
            return res.status(400).json({
                error: "Please provide valid start and end dates for the trip in the request body",
            });
        } */

        const { tripId } = req.params;

        const rowsUpdated = await knex("trips").where({ id: tripId }).update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: `Trip id ${tripId} not found` });
        }

        const updatedTrip = await knex("trips").where({ id: tripId }).first();

        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to modify trip` });
    }
};

// DELETE api "/api/trips/:tripId"
export const deleteSingle = async (req, res) => {
    try {
        const { tripId } = req.params;

        const rowsDeleted = await knex("trips").where({ id: tripId }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: `Trip id ${tripId} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to delete trip` });
    }
};
