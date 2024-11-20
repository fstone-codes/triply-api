/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("list_items", (table) => {
        table.increments("id").primary();
        table
            .integer("list_id")
            .unsigned()
            .references("lists.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("item", 50).notNullable();
        table.string("description");
        table.enu("status", ["Not Started", "In Progress", "Complete"]);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.category("category").notNullable();
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
    return knex.schema.dropTable("list_items");
}
