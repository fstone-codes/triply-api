/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("lists").del();
    await knex("lists").insert([
        { id: 1, trip_id: 1, list_name: "Packing List" },
        { id: 2, trip_id: 1, list_name: "Travel Preparation" },
        { id: 3, trip_id: 1, list_name: "Gifts and Souvenirs" },
        { id: 4, trip_id: 1, list_name: "Groceries and Essentials" },
        { id: 5, trip_id: 1, list_name: "Clothing and Accessories" },
        { id: 6, trip_id: 1, list_name: "Electronics and Gadgets" },
        { id: 7, trip_id: 1, list_name: "Documents and Tickets" },
        { id: 8, trip_id: 1, list_name: "Emergency Kit" },
        { id: 9, trip_id: 2, list_name: "Packing List" },
        { id: 10, trip_id: 2, list_name: "Itinerary" },
        { id: 11, trip_id: 2, list_name: "Groceries and Essentials" },
        { id: 12, trip_id: 2, list_name: "Travel Preparation" },
        { id: 13, trip_id: 2, list_name: "Photography Gear" },
        { id: 14, trip_id: 2, list_name: "Clothing and Accessories" },
        { id: 15, trip_id: 2, list_name: "Documents and Tickets" },
        { id: 16, trip_id: 2, list_name: "Emergency Kit" },
        { id: 17, trip_id: 3, list_name: "Packing List" },
        { id: 18, trip_id: 3, list_name: "Camping Essentials" },
        { id: 19, trip_id: 3, list_name: "Travel Preparation" },
        { id: 20, trip_id: 3, list_name: "Groceries and Essentials" },
        { id: 21, trip_id: 3, list_name: "Documents and Tickets" },
        { id: 22, trip_id: 3, list_name: "Gifts and Souvenirs" },
        { id: 23, trip_id: 3, list_name: "Clothing and Accessories" },
        { id: 24, trip_id: 3, list_name: "Photography Gear" },
        { id: 25, trip_id: 4, list_name: "Packing List" },
        { id: 26, trip_id: 4, list_name: "Itinerary" },
        { id: 27, trip_id: 4, list_name: "Groceries and Essentials" },
        { id: 28, trip_id: 4, list_name: "Travel Preparation" },
        { id: 29, trip_id: 4, list_name: "Clothing and Accessories" },
        { id: 30, trip_id: 4, list_name: "Emergency Kit" },
        { id: 31, trip_id: 4, list_name: "Photography Gear" },
        { id: 32, trip_id: 4, list_name: "Documents and Tickets" },
    ]);
}
