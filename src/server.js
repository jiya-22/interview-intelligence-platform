const express = require("express");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/users", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
