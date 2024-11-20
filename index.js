import "dotenv/config";
import cors from "cors";
import tripsRoutes from "./routes/trips.js";
import express from "express";
const app = express();

const { DB_PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/api/trips", tripsRoutes);

app.get("/", (req, res) => {
    res.send("👋 Hello from server");
});

app.listen(DB_PORT, () => {
    console.log(`Running at http://localhost:${DB_PORT}`);
});
