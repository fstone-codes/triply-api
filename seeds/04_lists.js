/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("lists").del();
    await knex("lists").insert([
        {
            id: 1,
            trip_id: 1,
            list_name: "Packing",
        },
        {
            id: 2,
            trip_id: 1,
            list_name: "Trip Prep",
        },
        {
            id: 3,
            trip_id: 1,
            list_name: "Gifts",
        },
        {
            id: 4,
            trip_id: 1,
            list_name: "Groceries",
        },
        {
            id: 5,
            trip_id: 2,
            list_name: "Packing",
        },
    ]);
}
