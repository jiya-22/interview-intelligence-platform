const logger = (req, res, next) => {

    console.log("Middleware Executed");

    next();
};

module.exports = logger;