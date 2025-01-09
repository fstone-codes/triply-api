/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("refresh_tokens", (table) => {
        table.increments("id").primary();
        table.text("token").notNullable();
        table.integer("user_id").unsigned().notNullable();
        // where I left off
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("refresh_tokens");
}
