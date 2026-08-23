const express = require("express");

const router = express.Router();

const { getDashboardStats } = require("../controllers/adminController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

router.get(
    "/dashboard",
    auth,
    authorize("admin"),
    getDashboardStats
);

module.exports = router;