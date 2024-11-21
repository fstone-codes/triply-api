import "dotenv/config";
import cors from "cors";
import express from "express";
const app = express();

import tripsRoutes from "./routes/trips.js";
import itinerariesRoutes from "./routes/itineraries.js";
import listsRoutes from "./routes/lists.js";
import listItemsRoutes from "./routes/listItems.js";

const { DB_PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/api/trips", tripsRoutes);
app.use("/api/itineraries", itinerariesRoutes);
app.use("/api/lists", listsRoutes);
app.use("/api/listItems", listItemsRoutes);

app.get("/", (req, res) => {
    res.send("👋 Hello from server");
});

app.listen(DB_PORT, () => {
    console.log(`Running at http://localhost:${DB_PORT}`);
});
