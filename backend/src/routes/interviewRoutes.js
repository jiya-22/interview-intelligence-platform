const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const {
    createInterview,
    getInterviews,
    getMyInterviews,
    getDashboardStats,
    getInterviewById,
    updateInterview,
    deleteInterview,
    upvoteInterview,
    downvoteInterview
} = require("../controllers/interviewController");

router.post("/",auth, createInterview);

router.get("/", auth,getInterviews);

router.get("/dashboard", auth, getDashboardStats);

router.get("/my", auth, getMyInterviews);

router.get("/:id",auth, getInterviewById);

router.put("/:id", auth, updateInterview);

router.delete("/:id", auth, deleteInterview);

router.post("/:id/upvote", auth, upvoteInterview);

router.post("/:id/downvote", auth, downvoteInterview);

module.exports = router;
