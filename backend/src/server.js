
require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const companyRoutes = require("./routes/companyRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const emailRoutes = require("./routes/emailRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const app = express();

connectDB();

// Global Middleware
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(helmet());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);
app.use(logger);

// Test Route
app.get("/", (req, res) => {
    res.send("API Running");
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/interviews", interviewRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use(errorHandler);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
