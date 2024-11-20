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
        function validateDate(date) {
            const datePattern = /^\d{4}-?(0[1-9]|1[0-2])-?(0[1-9]|[12]\d|3[01])$/;
            return datePattern.test(date);
        }

        if (
            !validateDate(req.body.start_date) ||
            !validateDate(req.body.end_date) ||
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
            return res.status(400).json({
                error: `User id ${req.body.user_id} not found`,
            });
        }

        // insert request body into database ("trips" table)
        const data = await knex("trips").insert(req.body);

        // store newly incremented item/row id (primary key) in a variable
        const newTripId = data[0];

        // store entire new table row in a variable
        // destructure object from array
        const [createdTrip] = await knex("trips").where({
            id: newTripId,
        });

        // create new object without timestamps (without modifying original object)
        const { created_at, updated_at, ...filteredTrip } = createdTrip;

        // send response status and body
        res.status(201).json(filteredTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create trip" });
    }
};

// GET api "/api/trips/:userId"
export const getAll = async (req, res) => {
    const { userId } = req.params;
    try {
        // filter the "users" table to the first user/row with the "user_id" from the post request body
        const checkUser = await knex("users").where({ id: userId }).first();

        // ensure new trip's user exists in "users" table
        if (!checkUser) {
            return res.status(400).json({
                error: `User id ${userId} not found`,
            });
        }

        const data = await knex("trips").where({ user_id: userId });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve trips" });
    }
};

// PATCH api "/api/trips/:tripId"
export const updateOne = async (req, res) => {
    const { tripId } = req.params;
    try {
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to modify trip by id ${tripId}` });
    }
};

// DELETE api "/api/trips/:tripId"
export const deleteOne = async (req, res) => {
    const { tripId } = req.params;
    try {
        const rowsDeleted = await knex("trips").where({ id: tripId }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: `Trip id ${tripId} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to delete trip by id ${tripId}` });
    }
};
