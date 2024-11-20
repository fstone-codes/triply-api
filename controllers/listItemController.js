import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST api "/api/lists/:listId/items"
// GET api "/api/lists/:listId/items"
// PATCH api "/api/lists/:listId/items/:itemId"
// DELETE api "/api/lists/:listId/items/:itemId"
