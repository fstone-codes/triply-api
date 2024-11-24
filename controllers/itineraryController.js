import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

import dayjs from "dayjs";

function validatePostPut(req, res) {
    const { trip_id, title, description, all_day, start, end } = req.body;

    if (!trip_id) {
        return res.status(400).json({
            error: "Please provide the trip id for the itinerary item in the request body",
        });
    }

    if (!title) {
        return res.status(400).json({
            error: "Please provide the title for the itinerary item in the request body",
        });
    }

    if (!start || !end) {
        return res.status(400).json({
            error: "Please provide the start and end times for the itinerary item in the request body",
        });
    }

    if (all_day !== undefined && typeof all_day !== "boolean") {
        return res.status(400).json({
            error: "Please provide a valid all day boolean value for the itinerary item in the request body",
        });
    }

    // Validate date-time format using Day.js
    function dateTimeFormat(dateTime) {
        return dayjs(dateTime).isValid();
    }

    if (all_day) {
        // For all-day events, only validate the date format
        if (!dateTimeFormat(start) || !dateTimeFormat(end)) {
            return res.status(400).json({
                error: "Please provide valid start and end dates for the itinerary item in the request body",
            });
        }
    } else {
        // Validate start and end if all_day is false
        if (!dateTimeFormat(start) || !dateTimeFormat(end) || dayjs(end).isBefore(dayjs(start))) {
            return res.status(400).json({
                error: "Please provide a valid start and end date-time for the itinerary item in the request body",
            });
        }
    }

    req.body.title = title.trim();
    if (description) req.body.description = description.trim();

    return true;
}

// POST api "/api/itineraries"
export const addSingle = async (req, res) => {
    try {
        if (!validatePostPut(req, res)) return;

        const { trip_id } = req.body;

        const checkTrip = await knex("trips").where({ id: trip_id }).first();

        if (!checkTrip) {
            return res.status(404).json({
                error: `Trip id ${trip_id} not found`,
            });
        }

        const itineraryItemFound = await knex("itineraries").insert(req.body);

        const itineraryItemData = itineraryItemFound[0];

        const [createdItineraryItem] = await knex("itineraries").where({
            id: itineraryItemData,
        });

        res.status(201).json(createdItineraryItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create itinerary item" });
    }
};

// GET api "/api/itineraries"
export const getAll = async (req, res) => {
    try {
        const itineraries = await knex("itineraries");

        res.status(200).json(itineraries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve itineraries" });
    }
};

// GET api "/api/itineraries/:itineraryId"
export const getSingle = async (req, res) => {
    try {
        const { itineraryId } = req.params;

        const itineraryFound = await knex("itineraries").where({ id: itineraryId });

        if (!itineraryFound) {
            return res.status(404).json({
                error: `Itinerary id ${itineraryId} not found`,
            });
        }
        const singleItinerary = itineraryFound[0];

        res.status(200).json(singleItinerary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to retrieve itinerary item" });
    }
};

// PUT api "/api/itineraries/:itineraryId"
export const updateSingle = async (req, res) => {
    try {
        if (!validatePostPut(req, res)) return;

        const { itineraryId } = req.params;

        const rowsUpdated = await knex("itineraries").where({ id: itineraryId }).update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: `Itinerary id ${itineraryId} not found` });
        }

        const updatedItinerary = await knex("itineraries").where({ id: itineraryId }).first();

        res.status(200).json(updatedItinerary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to modify itinerary` });
    }
};

// DELETE api "/api/itineraries/:itineraryId"
export const deleteSingle = async (req, res) => {
    try {
        const { itineraryId } = req.params;

        const rowsDeleted = await knex("itineraries").where({ id: itineraryId }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: `Itinerary item id ${itineraryId} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Unable to delete itinerary item` });
    }
};
