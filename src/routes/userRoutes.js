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
    loginUser,
    deleteAllUsers,
    refreshAccessToken
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const authorize = require("../middleware/authorize");

router.get("/", getUsers);

router.get("/stats", getUserStats); 

router.post("/", validateUser, createUser);

router.post("/login", loginUser);

router.post("/refresh", refreshAccessToken);

router.put("/:id", updateUser);

// Specific route first
router.delete("/delete-all", deleteAllUsers);

// Generic route after
router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteUser
);

router.get("/:id", getUserById);


module.exports = router;