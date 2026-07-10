const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const {
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview
} = require("../controllers/interviewController");

router.post("/",auth, createInterview);

router.get("/", auth,getInterviews);

router.get("/:id",auth, getInterviewById);

router.put("/:id", auth, updateInterview);

router.delete("/:id", auth, deleteInterview);

module.exports = router;
