const Bookmark = require("../models/Bookmark");
const Question = require("../models/Question");
const Notification = require("../models/notification");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const toggleBookmark = async (req, res, next) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            return next(
                new AppError("Invalid question ID", 400)
            );
        }

        const { questionId } = req.params;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        const existingBookmark = await Bookmark.findOne({
            user: req.user.id,
            question: questionId
        });

        if (existingBookmark) {

            await Bookmark.findByIdAndDelete(
                existingBookmark._id
            );

            return res.status(200).json({
                success: true,
                message: "Question removed from bookmarks"
            });
        }

        const bookmark = await Bookmark.create({
            user: req.user.id,
            question: questionId
        });

        await Notification.create({
            user: req.user.id,
            message: `You bookmarked ${question.title}`,
            type: "bookmark"
        });

        return res.status(201).json({
            success: true,
            message: "Question bookmarked successfully",
            data: bookmark
        });

    } catch (error) {

        next(error);

    }
};

const getMyBookmarks = async (req, res, next) => {
    try {

        const bookmarks = await Bookmark.find({
            user: req.user.id
        })
        .populate("question");

        return res.status(200).json({
            success: true,
            count: bookmarks.length,
            data: bookmarks
        });

    } catch (error) {

        next(error);

    }
};

const deleteBookmark = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            return next(
                new AppError("Invalid question ID", 400)
            );
        }

        const { questionId } = req.params;

        const bookmark = await Bookmark.findOneAndDelete({
            user: req.user.id,
            question: questionId
        });

        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bookmark removed successfully"
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    toggleBookmark,
    getMyBookmarks,
    deleteBookmark
};
