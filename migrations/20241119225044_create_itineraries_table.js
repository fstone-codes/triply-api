/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("itineraries", (table) => {
        table.increments("id").primary();
        table
            .integer("trip_id")
            .unsigned()
            .references("trips.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("title", 50).notNullable();
        table.text("description");
        table.dateTime("start").notNullable();
        table.dateTime("end").notNullable();
        table.boolean("all_day").defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
            .timestamp("updated_at")
            .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("itineraries");
}
