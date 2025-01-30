import cron from "node-cron";
import initKnex from "knex";
import configuration from "./knexfile.js";
const knex = initKnex(configuration);

// clean DB every day
const cleaner = cron.schedule("0 0 * * *", async () => {
    try {
        const currentTime = new Date();

        // remove expired tokens from DB
        await knex("refresh_tokens")
            .where("expires_at", "<", currentTime)
            .del();

        console.log("Clean up successful!");
    } catch (error) {
        console.error("Error during clean up:", error);
    }
});

export { cleaner };
