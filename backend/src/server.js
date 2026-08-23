
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
const uploadRoutes = require("./routes/uploadRoutes");
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
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(logger);

// Test Route
app.get("/", (req, res) => {
    res.send("API Running");
});

// Routes
app.use("/users", userRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/companies", companyRoutes);
app.use("/questions", questionRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/email", emailRoutes);
app.use("/admin", adminRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/notifications", notificationRoutes);
app.use(errorHandler);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});