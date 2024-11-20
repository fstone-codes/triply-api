/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("username", 25).notNullable().unique();
        table.string("email").notNullable();
        table.string("password").notNullable();
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
    return knex.schema.dropTable("users");
}
