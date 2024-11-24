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
            start: "2025-03-05T08:00:00",
            end: "2025-03-05T20:00:00",
            all_day: false,
        },
        {
            id: 2,
            trip_id: 1,
            title: "Day Trip to Baby World",
            description: "",
            start: "2025-03-07T09:00:00",
            end: "2025-03-07T18:00:00",
            all_day: false,
        },
        {
            id: 3,
            trip_id: 1,
            title: "Exploration of Rick's Garage",
            description: "A deep dive into interdimensional gadgets and experiments.",
            start: "2025-03-09T10:00:00",
            end: "2025-03-09T17:00:00",
            all_day: false,
        },
        {
            id: 4,
            trip_id: 1,
            title: "Vacation on Planet Blobulus",
            description: "A relaxing getaway in a world of sentient jello creatures.",
            start: "2025-03-11T12:00:00",
            end: "2025-03-11T20:00:00",
            all_day: false,
        },
    ]);
}
