const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("API Running");
});

app.get("/users", (req, res) => {
    res.send("Get All Users");
});

app.post("/users", (req, res) => {
    res.send("Create User");
});

app.put("/users", (req, res) => {
    res.send("Update User");
});

app.delete("/users", (req, res) => {
    res.send("Delete User");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});