import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/lists"
// GET api "/api/lists/:tripId"
// PATCH api "/api/lists/:listId"
// DELETE api "/api/lists/:listId"
