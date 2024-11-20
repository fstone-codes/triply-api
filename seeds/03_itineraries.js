/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("itineraries").del();
    await knex("itineraries").insert([
        {
            id: "1",
            trip_id: "1",
            title: "Day Trip to Pillow World",
            description: "Exploring the comfy depths of the Multiverse",
            date: "2025-03-05",
            startTime: "08:00:00",
            endTime: "20:00:00",
        },
        {
            id: "2",
            trip_id: "1",
            title: "Day Trip to Baby World",
            description: "",
            date: "2025-03-07",
            startTime: "09:00:00",
            endTime: "18:00:00",
        },
        {
            id: "3",
            trip_id: "1",
            title: "Exploration of Rick's Garage",
            description: "A deep dive into interdimensional gadgets and experiments.",
            date: "2025-03-09",
            startTime: "10:00:00",
            endTime: "17:00:00",
        },
        {
            id: "4",
            trip_id: "2",
            title: "Vacation on Planet Blobulus",
            description: "A relaxing getaway in a world of sentient jello creatures.",
            date: "2025-03-11",
            startTime: "12:00:00",
            endTime: "20:00:00",
        },
    ]);
}
