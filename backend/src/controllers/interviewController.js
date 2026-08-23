const Interview = require("../models/Interview");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");


    const createInterview = async (req, res, next) => {
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
        return next(
            new AppError(error.message, 400)
        );
    }

    next(error);

}

};

const getInterviews = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.max(Number(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const keyword = req.query.keyword?.trim();

        let searchQuery = {};

        if (keyword) {
            searchQuery = {
                $or: [
                    {
                        role: {
                            $regex: keyword,
                            $options: "i"
                        }
                    },
                    {
                        experience: {
                            $regex: keyword,
                            $options: "i"
                        }
                    }
                ]
            };
        }
        const result = req.query.result;
const overallDifficulty = req.query.overallDifficulty;

let filterQuery = {};

if (result) {
    filterQuery.result = result;
}

if (overallDifficulty) {
    filterQuery.overallDifficulty = overallDifficulty;
}
const finalQuery = {
    ...searchQuery,
    ...filterQuery
};

const sort = req.query.sort;
const sortBy = sort || "-createdAt";
        const totalInterviews = await Interview.countDocuments(finalQuery);

        const interviews = await Interview.find(finalQuery)
            .sort(sortBy)
            .populate("user", "name email")
            .populate("company", "companyName logo")
            .populate("questions.question", "title difficulty")
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: interviews.length,
            page,
            limit,
            totalPages: Math.ceil(totalInterviews / limit),
            totalInterviews,
            data: interviews
        });

    } catch (error) {
        next(error);
    }
};

const getInterviewById = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid interview ID", 400)
            );
        }

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

        next(error);

    }
};

const updateInterview = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid interview ID", 400)
            );
        }

        const existingInterview = await Interview.findById(req.params.id);

if (!existingInterview) {
    return res.status(404).json({
        success: false,
        message: "Interview not found"
    });
}

if (
    existingInterview.user.toString() !== req.user.id &&
    req.user.role !== "admin"
) {
    return res.status(403).json({
        success: false,
        message: "You are not authorized to update this interview."
    });
}

const interview = await Interview.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
);

return res.status(200).json({
    success: true,
    message: "Interview Updated",
    data: interview
});
    } catch (error) {

        next(error);

    }
};

const deleteInterview = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid interview ID", 400)
            );
        }

        let interview = await Interview.findById(req.params.id);

if (!interview) {
    return res.status(404).json({
        success: false,
        message: "Interview not found"
    });
}

if (
    interview.user.toString() !== req.user.id &&
    req.user.role !== "admin"
) {
    return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this interview."
    });
}

    interview = await Interview.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Interview Deleted"
        });

    } catch (error) {

        next(error);

    }
};

const upvoteInterview = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid interview ID", 400)
            );
        }

        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        // Check if already upvoted
        const alreadyUpvoted = interview.upvotes.some(
            id => id.toString() === req.user.id
        );

        // Toggle OFF
        if (alreadyUpvoted) {

            interview.upvotes.pull(req.user.id);

            await interview.save();

            return res.status(200).json({
                success: true,
                message: "Upvote removed successfully",
                upvotes: interview.upvotes.length,
                downvotes: interview.downvotes.length
            });

        }

        // Check if already downvoted
        const alreadyDownvoted = interview.downvotes.some(
            id => id.toString() === req.user.id
        );

        if (alreadyDownvoted) {
            interview.downvotes.pull(req.user.id);
        }

        // Add Upvote
        interview.upvotes.push(req.user.id);

        await interview.save();

        return res.status(200).json({
            success: true,
            message: "Interview upvoted successfully",
            upvotes: interview.upvotes.length,
            downvotes: interview.downvotes.length
        });

    } catch (error) {

        next(error);

    }
};

const downvoteInterview = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid interview ID", 400)
            );
        }

        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        // Check if already downvoted
        const alreadyDownvoted = interview.downvotes.some(
            id => id.toString() === req.user.id
        );

        // Toggle OFF
        if (alreadyDownvoted) {

            interview.downvotes.pull(req.user.id);

            await interview.save();

            return res.status(200).json({
                success: true,
                message: "Downvote removed successfully",
                upvotes: interview.upvotes.length,
                downvotes: interview.downvotes.length
            });

        }

        // Check if already upvoted
        const alreadyUpvoted = interview.upvotes.some(
            id => id.toString() === req.user.id
        );

        if (alreadyUpvoted) {
            interview.upvotes.pull(req.user.id);
        }

        // Add Downvote
        interview.downvotes.push(req.user.id);

        await interview.save();

        return res.status(200).json({
            success: true,
            message: "Interview downvoted successfully",
            upvotes: interview.upvotes.length,
            downvotes: interview.downvotes.length
        });

    } catch (error) {

        next(error);

    }
};

const getMyInterviews = async (req, res, next) => {
    try {

        const interviews = await Interview.find({
            user: req.user.id
        })
        .populate("user", "name email")
        .populate("company", "companyName logo")
        .populate("questions.question", "title difficulty")
        .sort("-createdAt");

        return res.status(200).json({
            success: true,
            count: interviews.length,
            data: interviews
        });

    } catch (error) {

        next(error);

    }
};

const getDashboardStats = async (req, res, next) => {
    try {

        const totalInterviews = await Interview.countDocuments();

        const interviewStatus = await Interview.aggregate([
            {
                $group: {
                    _id: "$result",
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        const statusCounts = {
            selected: 0,
            rejected: 0,
            pending: 0
        };

        for (const status of interviewStatus) {
            statusCounts[status._id.toLowerCase()] = status.count;
        }

        const topCompanies = await Interview.aggregate([
            {
                $group: {
                    _id: "$company",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "companyDetails"
                }
            },
            {
                $unwind: "$companyDetails"
            },
            {
                $project: {
                    _id: 0,
                    companyId: "$_id",
                    companyName: "$companyDetails.companyName",
                    logo: "$companyDetails.logo",
                    interviewCount: "$count"
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalInterviews,
                ...statusCounts,
                topCompanies
            }
        });

    } catch (error) {

        next(error);

    }
};


module.exports = {
    createInterview,
    getInterviews,
    getDashboardStats,
    getMyInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview,
    upvoteInterview,
    downvoteInterview
};