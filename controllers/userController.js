import initKnex from "knex";
import configuration from "../knexfile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const knex = initKnex(configuration);

// POST api "/api/users/"
export const register = async (req, res) => {
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
        res.status(500).json({ error: "Registration failed" });
    }
};

// POST api "/api/users/login"
export const login = async (req, res) => {
    try {
        // check if email exists in the database during login
        const userRow = await knex("users")
            .where({ email: req.body.email })
            .first();

        if (!userRow) {
            return res.status(404).json({
                error: `User email ${req.body.email} not found`,
            });
        }

        // if the email exists, check the login password matches the hashed password
        if (!(await bcrypt.compare(req.body.password, userRow.password))) {
            return res.status(401).json({
                error: "Login attempt unsuccessful",
            });
        }

        // create a token using payload (from req body) and secret (from env variables)
        const userId = userRow.id;

        const accessToken = jwt.sign(
            { id: userId },
            process.env.ACCESS_TOKEN_SECRET,
            {
                // expiresIn: "30m",
                expiresIn: "45s",
            }
        );

        const refreshToken = jwt.sign(
            { id: userId },
            process.env.REFRESH_TOKEN_SECRET,
            {
                // expiresIn: "1w",
                expiresIn: "90s",
            }
        );

        await knex("refresh_tokens").insert({
            token: refreshToken,
            user_id: userId,
        });

        res.json({
            message: "Successful login!",
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
};

// GET api "/api/users/protected/:"
export const validUser = async (req, res) => {
    try {
        // check if user exists in the database before data retrieval
        const userRow = await knex("users")
            .where({ id: req.userId.id })
            .first();

        if (!userRow) {
            return res.status(404).json({
                error: "Data retrieval failed",
            });
        }

        // return specified user data, not revealing sensitive data
        res.json({
            first_name: userRow.first_name,
            last_name: userRow.last_name,
            username: userRow.username,
            email: userRow.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Protected data, login failed" });
    }
};

// POST api "/api/users/refresh"
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token;

        if (!refreshToken) {
            return res.status(401).json({
                error: `Refresh unsuccessful`,
            });
        }

        // check if refresh token exists in database
        const tokenRow = await knex("refresh_tokens")
            .where({ token: refreshToken })
            .first();

        if (!tokenRow) {
            return res.sendStatus(403);
        }

        // verify the refresh token
        const payload = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        if (!payload) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { id: payload.id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({ accessToken: accessToken });
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: "Refresh failed" });
    }
};

// DELETE api "/api/users/delete"
export const removeToken = async (req, res) => {
    try {
        // remove the refresh token from the database to log user out
        const refreshToken = req.body.token;

        const rowsDeleted = await knex("refresh_tokens")
            .where({ token: refreshToken })
            .delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: "Token not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Logout failed" });
    }
};
