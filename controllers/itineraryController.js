import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/itineraries"
// GET api "/api/itineraries/:tripId"
// PATCH api "/api/itineraries/:itineraryId"
// DELETE api "/api/itineraries/:itineraryId"
