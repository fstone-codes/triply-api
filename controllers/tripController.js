import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/trips"
// GET api "/api/trips/:userId"
// PATCH api "/api/trips/:tripId"
// DELETE api "/api/trips/:tripId"
