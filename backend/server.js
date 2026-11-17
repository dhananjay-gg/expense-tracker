import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running!"
    });
});

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    try {
        await db.query("SELECT 1");
        console.log("MySQL connected successfully");
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
    }

    console.log(`Server running on port ${PORT}`);
});