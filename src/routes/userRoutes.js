const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUser");

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", validateUser, createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUserById);

module.exports = router;