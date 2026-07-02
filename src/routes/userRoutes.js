const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUser");

const {
    getUsers,
    getUserById,
    getUserStats,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers
} = require("../controllers/userController");

router.get("/", getUsers);

router.get("/stats", getUserStats); 

router.post("/", validateUser, createUser);

router.put("/:id", updateUser);

// Specific route first
router.delete("/delete-all", deleteAllUsers);

// Generic route after
router.delete("/:id", deleteUser);

router.get("/:id", getUserById);


module.exports = router;