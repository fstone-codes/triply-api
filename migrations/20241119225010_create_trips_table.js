/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("trips", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .unsigned()
            .references("users.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("trip_name", 50).notNullable();
        table.string("destination").notNullable();
        table.date("start_date").notNullable();
        table.date("end_date").notNullable();
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
    return knex.schema.dropTable("trips");
}
