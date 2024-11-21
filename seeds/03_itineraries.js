/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("itineraries").del();
    await knex("itineraries").insert([
        {
            id: 1,
            trip_id: 1,
            title: "Day Trip to Pillow World",
            description: "Exploring the comfy depths of the Multiverse",
            date: "2025-03-05",
            start_time: "08:00:00",
            end_time: "20:00:00",
        },
        {
            id: 2,
            trip_id: 1,
            title: "Day Trip to Baby World",
            description: "",
            date: "2025-03-07",
            start_time: "09:00:00",
            end_time: "18:00:00",
        },
        {
            id: 3,
            trip_id: 1,
            title: "Exploration of Rick's Garage",
            description: "A deep dive into interdimensional gadgets and experiments.",
            date: "2025-03-09",
            start_time: "10:00:00",
            end_time: "17:00:00",
        },
        {
            id: 4,
            trip_id: 1,
            title: "Vacation on Planet Blobulus",
            description: "A relaxing getaway in a world of sentient jello creatures.",
            date: "2025-03-11",
            start_time: "12:00:00",
            end_time: "20:00:00",
        },
    ]);
}
