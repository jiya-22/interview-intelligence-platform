const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many authentication attempts. Please try again later."
    }
});

const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many email requests. Please try again later."
    }
});

module.exports = {
    authLimiter,
    emailLimiter
};