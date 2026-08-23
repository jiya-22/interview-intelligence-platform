const User = require("../models/User");
const Interview = require("../models/Interview");
const Company = require("../models/Company");

const getDashboardStats = async (req, res, next) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalInterviews =
            await Interview.countDocuments();

        const totalCompanies =
            await Company.countDocuments();

        const interviewDifficultyStats =
            await Interview.aggregate([
                {
                    $group: {
                        _id: "$overallDifficulty",
                        count: { $sum: 1 }
                    }
                }
            ]);

            const interviewResultStats = await Interview.aggregate([
    {
        $group: {
            _id: "$result",
            count: { $sum: 1 }
        }
    }
]);
 
const userRoleStats = await User.aggregate([
    {
        $group: {
            _id: "$role",
            count: { $sum: 1 }
        }
    }
]);

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalInterviews,
                totalCompanies,
                interviewDifficultyStats,
                interviewResultStats,
                userRoleStats
            }
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    getDashboardStats
};