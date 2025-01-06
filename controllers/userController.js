import initKnex from "knex";
import configuration from "../knexfile.js";
import bcrypt from "bcrypt";
const knex = initKnex(configuration);

// POST api "/api/users/"
export const addSingle = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const result = await knex("users").insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const newUserId = result[0];
        const [createdUser] = await knex("users").where({ id: newUserId });

        res.status(201).json(createdUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create user" });
    }
};

// POST api "/api/users/login"
export const verifySingle = async (req, res) => {
    try {
        const userRow = await knex("users")
            .where({ email: req.body.email })
            .first();

        if (!userRow) {
            return res.status(404).json({
                error: `User email ${req.body.email} not found`,
            });
        }

        if (!(await bcrypt.compare(req.body.password, userRow.password))) {
            return res.status(400).json({
                error: `Login attempt unsuccessful`,
            });
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create user" });
    }
};
