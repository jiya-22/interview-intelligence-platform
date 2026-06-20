require("dotenv").config();

const connectDB = require("./config/db");

const logger = require("./middleware/logger");

const express = require("express");

const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use(logger);

app.use("/users", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});