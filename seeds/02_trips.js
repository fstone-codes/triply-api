/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("trips").del();
    await knex("trips").insert([
        {
            id: "1",
            user_id: "1",
            trip_name: "Adventure Time",
            destination: "Multiverse",
            start_date: "2025-03-01",
            end_date: "2025-03-15",
        },
        {
            id: "2",
            user_id: "1",
            trip_name: "Tropical Getaway",
            destination: "Bikini Bottom",
            start_date: "2025-07-04",
            end_date: "2025-07-20",
        },
        {
            id: "3",
            user_id: "1",
            trip_name: "35th Birthday",
            destination: "Scranton",
            start_date: "2025-08-08",
            end_date: "2025-08-10",
        },
    ]);
}
