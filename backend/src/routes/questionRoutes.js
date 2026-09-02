const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
    getQuestions,
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
    
} = require("../controllers/questionController");

router.post("/", auth, authorize("admin"), createQuestion);

router.get("/", getQuestions);

router.get("/:id", getQuestionById);

router.put("/:id", auth, authorize("admin"), updateQuestion);

router.delete("/:id", auth, authorize("admin"), deleteQuestion);

module.exports = router;
