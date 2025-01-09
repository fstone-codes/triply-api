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
        res.status(500).json({ error: "Unable to create user" });
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

        // res.sendStatus(200);

        // create a token using payload (from req body) and secret (from env variables)
        const user = { id: userRow.id };

        // const accessToken = jwt.sign(
        //     user,
        //     process.env.ACCESS_TOKEN_SECRET,
        //     (error, token) => {
        //         if (error) {
        //             return req.sendStatus(403);
        //         }
        //         res.json({ token, userRow });
        //     }
        // );

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1w",
        });

        res.json({
            message: "Successful login!",
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create user" });
    }
};

// POST api "/api/users/token"
export const verifyToken = async (req, res) => {
    try {
        const refreshToken = req.body.token;

        if (!refreshToken) {
            return res.status(401).json({
                error: `Refresh unsuccessful`,
            });
        }
    } catch (error) {}
};

function authenticateToken(req, res, next) {
    // store data from authorization header
    const authHeader = req.headers["authorization"];
    // store the tken portion of authorization header only (from "Bearer TOKEN" header)
    const token = authHeader && authHeader.split(" ")[1];

    // check if a token has been sent
    if (!token) {
        return res.status(403).send({ error: "No token provided" });
    }

    // verify token by decoding token fropm authorization header with JWT
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }

        // set user on our request and proceed to next function / move forward from the middleware
        req.user = user;
        next();
    });
}
