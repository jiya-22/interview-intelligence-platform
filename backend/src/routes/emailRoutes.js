const express = require("express");

const router = express.Router();

const {
    sendTestEmail
} = require("../controllers/emailController");

router.get("/test", sendTestEmail);

module.exports = router;