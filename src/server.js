require("dotenv").config();

const connectDB = require("./config/db");

const logger = require("./middleware/logger");

const express = require("express");

const userRoutes = require("./routes/userRoutes");

const interviewRoutes = require("./routes/interviewRoutes");

const companyRoutes = require("./routes/companyRoutes");

const app = express();

const cookieParser = require("cookie-parser");

connectDB();

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use(logger);

app.use("/users", userRoutes);

app.use("/api/interviews", interviewRoutes);

app.use("/companies", companyRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});