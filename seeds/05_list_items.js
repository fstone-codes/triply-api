/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("list_items").del();
    await knex("list_items").insert([
        {
            id: 1,
            list_id: 1,
            item: "Toothbrush",
            description: "Don't forget to charge your toothbrush!",
            status: 1,
            category: "Toiletries",
        },
        {
            id: 2,
            list_id: 1,
            item: "Floss",
            description: "",
            status: 3,
            category: "Toiletries",
        },
        {
            id: 3,
            list_id: 1,
            item: "Sunscreen",
            description: "SPF 50 for sunny days.",
            status: 2,
            category: "Toiletries",
        },
        {
            id: 4,
            list_id: 1,
            item: "Passport",
            description: "Check the expiration date!",
            status: 2,
            category: "Travel Essentials",
        },
        {
            id: 5,
            list_id: 1,
            item: "Charger",
            description: "Phone and laptop chargers",
            status: 3,
            category: "Electronics",
        },
        {
            id: 6,
            list_id: 1,
            item: "Sneakers",
            description: "",
            status: 3,
            category: "Clothing",
        },
        {
            id: 7,
            list_id: 1,
            item: "Heels",
            description: "",
            status: 3,
            category: "Clothing",
        },
        {
            id: 8,
            list_id: 1,
            item: "Shampoo",
            description: "Travel-size preferred",
            status: 1,
            category: "Toiletries",
        },
    ]);
}
