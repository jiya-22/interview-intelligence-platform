const express = require("express");

const router = express.Router();

const upload = require("../config/multer");
const  auth  = require("../middleware/auth");
const { uploadResume } = require("../controllers/resumeController");

router.post(
    "/resume",
    auth,
    upload.single("resume"),
    uploadResume
);

module.exports = router;