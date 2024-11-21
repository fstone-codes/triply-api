import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/itineraries"
export const addSingle = async (req, res) => {
    try {
        const { trip_id, title, description, date, start_time, end_time } = req.body;

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

        if (!date || !start_time || !end_time) {
            return res.status(400).json({
                error: "Please provide the date, start and end times for the itinerary item in the request body",
            });
        }

        function dateFormat(date) {
            const datePattern = /^\d{4}-?(0[1-9]|1[0-2])-?(0[1-9]|[12]\d|3[01])$/;
            return datePattern.test(date);
        }

        if (!dateFormat(date)) {
            return res.status(400).json({
                error: "Please provide a valid date for the itinerary item in the request body",
            });
        }

        function timeFormat(time) {
            const timePattern = /^(0\d|1\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
            return timePattern.test(time);
        }

        if (!timeFormat(start_time) || !timeFormat(end_time)) {
            return res.status(400).json({
                error: "Please provide a valid start and end time for the itinerary item in the request body",
            });
        }

        req.body.title = title.trim();
        req.body.description = description.trim();

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

// PATCH api "/api/itineraries/:itineraryId"

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
