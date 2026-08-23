const Notification = require("../models/notification");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const getMyNotifications = async (req, res, next) => {
    try {

        const notifications = await Notification.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {

        next(error);

    }
};

const markAsRead = async (req, res, next) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid notification ID", 400)
            );
        }

        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                isRead: true
            },
            {
                new: true
            }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as read",
            data: notification
        });

    } catch (error) {

        next(error);

    }
};

const deleteNotification = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid notification ID", 400)
            );
        }

        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    getMyNotifications,
    markAsRead,
    deleteNotification
};
