import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/trips"
export const addOne = async (req, res) => {
    // let { user_id, trip_name, destination, start_date, end_date } = req.body;

    // // validate body contents
    // // ensure no empty inputs for trip name + destination
    // if (!trip_name || !destination) {
    //     return res.status(400).json({
    //         error: "Please provide the name and destination for the trip in the request body",
    //     });
    // }

    // // ensure no empty inputs for trip start + end date
    // if (!start_date || !end_date) {
    //     return res.status(400).json({
    //         error: "Please provide the start and end dates for the trip in the request body",
    //     });
    // }

    // // ensure no spaces at the beginning of text inputs
    // trip_name = trip_name.trim();
    // destination = destination.trim();

    console.log(req.body);

    try {
        // filter the "users" table to the first user/row with the "user_id" from the post request body
        const checkUser = await knex("users").where({ id: req.body.user_id }).first();

        // ensure new trip's user exists in "users" table
        if (!checkUser) {
            return res.status(400).json({
                error: `User id ${user_id} not found`,
            });
        }

        // insert request body into database ("trips" table)
        const data = await knex("trips").insert(req.body);

        // store newly incremented item/row id (primary key) in a variable
        const newTripId = data[0];

        // store entire new table row in a variable
        const createdItem = await knex("trips").where({
            id: newTripId,
        });

        // send response status and body
        res.status(201).json(createdItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create trip" });
    }
};

// GET api "/api/trips/:userId"
export const getAll = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await knex("trips").where({ user_id: userId });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve trips" });
    }
};

// PATCH api "/api/trips/:tripId"
export const updateOne = async (req, res) => {
    try {
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to get trip by id ${req.params.tripId}` });
    }
};

// DELETE api "/api/trips/:tripId"
export const deleteOne = async (req, res) => {
    try {
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to get trip by id ${req.params.tripId}` });
    }
};
