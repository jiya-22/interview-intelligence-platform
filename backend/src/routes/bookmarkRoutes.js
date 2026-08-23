const express = require("express");

const router = express.Router();

const {
    toggleBookmark,
    getMyBookmarks,
    deleteBookmark
} = require("../controllers/BookmarkController");

const auth = require("../middleware/auth");

router.get(
    "/",
    auth,
    getMyBookmarks
);
router.post(
    "/:questionId",
    auth,
    toggleBookmark
);
router.delete(
    "/:questionId",
    auth,
    deleteBookmark
);



module.exports = router;