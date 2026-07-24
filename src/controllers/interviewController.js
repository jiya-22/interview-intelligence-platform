const Interview = require("../models/Interview");


    const createInterview = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const interview = await Interview.create(req.body);

        res.status(201).json({
            success: true,
            message: "Interview Created",
            data: interview
        });

    } catch (error) {

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    res.status(500).json({
        success: false,
        message: error.message
    });

}

};

const getInterviews = async (req, res) => {
    try {

        const interviews = await Interview.find()
    .populate("user", "name email")
    .populate("company", "companyName logo")
    .populate("questions.question", "title difficulty");
          res.status(200).json({
            success: true,
            data: interviews
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getInterviewById = async (req, res) => {
    try {

        const interview = await Interview.findById(req.params.id)
    .populate("user", "name email")
    .populate("company", "companyName logo")
    .populate("questions.question", "title difficulty");
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        res.status(200).json({
            success: true,
            data: interview
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateInterview = async (req, res) => {
    try {

        const interview = await Interview.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true,
                runValidators: true
             }
        );

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interview Updated",
            data: interview
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteInterview = async (req, res) => {
    try {

        const interview = await Interview.findByIdAndDelete(req.params.id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interview Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview
};