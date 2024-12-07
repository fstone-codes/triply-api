import "dotenv/config";
import cors from "cors";
import express from "express";
const app = express();

import tripsRoutes from "./routes/trips.js";
import itinerariesRoutes from "./routes/itineraries.js";
import listsRoutes from "./routes/lists.js";

const { PORT, CORS_ORIGIN } = process.env;

const allowedOrigins = CORS_ORIGIN?.split(",") || [];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);
app.use(express.json());

app.use("/api/trips", tripsRoutes);
app.use("/api/itineraries", itinerariesRoutes);
app.use("/api/lists", listsRoutes);

app.get("/", (req, res) => {
    res.send("👋 Hello from server");
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
