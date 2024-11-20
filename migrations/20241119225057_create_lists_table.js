/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("lists", (table) => {
        table.increments("id").primary();
        table
            .integer("trip_id")
            .unsigned()
            .references("trips.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("list_name", 50).notNullable();
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
    return knex.schema.dropTable("lists");
}
