const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    uploadResume,
    getMyResume,
    downloadResume,
    deleteResume
} = require("../controllers/resumeController");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post(
    "/upload",
    auth,
    (req, res, next) => {
        upload.single("resume")(req, res, (err) => {

            if (err) {

                if (err instanceof multer.MulterError) {

                    if (err.code === "LIMIT_FILE_SIZE") {
                        return res.status(400).json({
                            success: false,
                            message: "File size cannot exceed 5 MB"
                        });
                    }

                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            next();
        });
    },
    uploadResume
);

router.get("/me", auth, getMyResume);

router.get("/download", auth, downloadResume);

router.delete("/", auth, deleteResume);

module.exports = router;