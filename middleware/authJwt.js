import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authenticateToken(req, res, next) {
    // store the token portion of authorization header only (from "Bearer TOKEN" header)
    // optional chaining (?.) will ensure to proceed with code if no value assigned to object before "?.", it  will simply be undefined or null
    const token = req.headers["authorization"]?.split(" ")[1];

    // check if a token has been sent
    if (!token) {
        return res.status(403).send({ error: "No token provided" });
    }

    // verify token by decoding token from authorization header with JWT
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            if (error.name === "TokenExpiredError") {
                console.error("Expired token:", error.message);
                return res.status(401).json({ error: "Expired token" });
            } else if (error.name === "JsonWebTokenError") {
                console.error("Invalid token:", error.message);
                return res.status(401).json({ error: "Invalid token" });
            }

            console.error("Unknown error:", error.message);
            return res.status(401).json({ error: "Unauthorized" });
        }

        // set decoded user key/property on our request body and proceed to next function / move forward from the middleware
        console.log("Successful authentication");
        req.userId = user;
        next();
    });
}
