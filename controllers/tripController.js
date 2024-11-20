import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/trips"
export const addOne = async (req, res) => {
    try {
        // validate body contents
        // ensure no empty inputs for trip name + destination
        if (!req.body.trip_name || !req.body.destination) {
            return res.status(400).json({
                error: "Please provide the name and destination for the trip in the request body",
            });
        }

        // ensure no empty inputs for trip start + end date
        if (!req.body.start_date || !req.body.end_date) {
            return res.status(400).json({
                error: "Please provide the start and end dates for the trip in the request body",
            });
        }

        // ensure valid trip start + end date format
        // ensure start date is the same or before the end date
        function dateFormat(date) {
            const datePattern = /^\d{4}-?(0[1-9]|1[0-2])-?(0[1-9]|[12]\d|3[01])$/;
            return datePattern.test(date);
        }

        if (
            !dateFormat(req.body.start_date) ||
            !dateFormat(req.body.end_date) ||
            req.body.start_date > req.body.end_date
        ) {
            return res.status(400).json({
                error: "Please provide valid start and end dates for the trip in the request body",
            });
        }

        // ensure no spaces at the beginning of text inputs
        req.body.trip_name = req.body.trip_name.trim();
        req.body.destination = req.body.destination.trim();

        // filter the "users" table to the first user/row with the "user_id" from the post request body
        const checkUser = await knex("users").where({ id: req.body.user_id }).first();

        // ensure new trip's user exists in "users" table
        if (!checkUser) {
            return res.status(404).json({
                error: `User id ${req.body.user_id} not found`,
            });
        }

        // insert request body into database ("trips" table)
        const tripFound = await knex("trips").insert(req.body);

        // store newly incremented item/row id (primary key) in a variable
        const tripData = tripFound[0];

        // store entire new table row in a variable
        // destructure object from array
        const [createdTrip] = await knex("trips").where({
            id: tripData,
        });

        // send response status and body
        res.status(201).json(createdTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create trip" });
    }
};

// GET api "/api/trips"
export const getAll = async (req, res) => {
    try {
        const { userId } = req.query;

        // ensure "userId" query parameter exists
        if (!userId) {
            return res.status(400).json({
                error: `Please provide a userId as a query parameter`,
            });
        }

        // filter the "users" table to the first user/row with the "userId" from the query parameter
        const checkUser = await knex("users").where({ id: userId }).first();

        // ensure new trip's user exists in "users" table
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
export const getSingleTrip = async (req, res) => {
    try {
        const { tripId } = req.params;

        const tripFound = await knex("trips").where({ id: tripId });

        // ensure new trip's user exists in "users" table
        if (!tripFound) {
            return res.status(404).json({
                error: `Trip id ${tripId} not found`,
            });
        }
        const tripData = tripFound[0];

        res.status(200).json(tripData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve trip" });
    }
};

// PATCH api "/api/trips/:tripId"
export const updateOne = async (req, res) => {
    try {
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
export const deleteOne = async (req, res) => {
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
