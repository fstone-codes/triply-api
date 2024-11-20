/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("users").insert([
        {
            id: "1",
            first_name: "Tiffany",
            last_name: "Oiler",
            username: "t_oiler",
            email: "t.oiler@ooo.com",
            password: "$2a$10$GLIBUYvIQX.N/nz.VpRMIeqzuJyfkTK78Vfv/3dlZaSzlo6YxD/uy",
        },
        {
            id: "2",
            first_name: "Finn",
            last_name: "Mertens",
            username: "finn_the_human",
            email: "finn.mertens@ooo.com",
            password: "$2a$10$XkOS/z4jYtPCH.oGtmVXue9ygYxMgwupZ6BJEJ5DsoAE/YdpjNqoK",
        },
        {
            id: "3",
            first_name: "Marceline",
            last_name: "Abadeer",
            username: "marcy_vampqueen",
            email: "marceline.abadeer@ooo.com",
            password: "$2a$10$fhFDmMMn04oAaB22KcUO9OafIqCXPtiXd7ctKeroCDeeJ9ga20LTm",
        },
    ]);
}
