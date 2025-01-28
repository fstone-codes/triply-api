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

// GET api "/api/users/protected"
// return session of user after authentication
// can ask with knex to query the specific user
export const verifyToken = (req, res) => {
    // check again if user exists in DB to protect development mode
    // if not, return error

    // dont send entire user object
    res.json({ message: "Protected data", user: req.user });
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
            .where({ token: payload })
            //{ token: refreshToken } this is what it should be
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

// login - create token and return token with path
// store token somewhere (e.g. localstorage on FE)
// get personalized content
// pass token from local storage
//     check first that tokens match with DB
//     if successful, have access to user
// can return user info except pass + bank info (secure/private data)

// try {
//     const userId = req.user.id;

//     //from DB
//     const user = await knex("users").where({ id: userId }).first();

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

// // here you can control which data you need
//     res.status(200).json({
//       id: user.id,
//       email: user.email,
//       name: user.name,
//     });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ error: "Failed to fetch user data" });
//   }

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

// logout
// check token with middleware
// if successful, logout

// ELIZABETH EXAMPLE
// router.post('/logout', authenticate, async (req, res, next) => {
//     try {
//         const { _id } = req.user;
//         await User.findByIdAndUpdate(_id, { token: '' });
//         res.json({message:'Logout success'})
//     }
//     catch(error) {
//         next(error);
//     }
// })

// why post!?
// just need to clear, this is why we dont use PUT or PATCH
// DELETE for entire user object

// to do:
// update GET
// remove refresh token
// simplified version to practive and get understanding

// Frameworks
// GPT Token
