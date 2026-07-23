const Question = require("../models/Question");
const Company = require("../models/Company");
const getQuestions = async (req, res) => {
    try {

        const {
            difficulty,
            topic,
            platform,
            search
        } = req.query;

        let filter = {};

        if (difficulty) {
            filter.difficulty = difficulty;
        }

        if (topic) {
            filter.topic = topic;
        }

        if (platform) {
            filter.platform = platform;
        }

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip=(page-1)*limit;
        const totalQuestions = await Question.countDocuments(filter);
                const totalPages = Math.ceil(totalQuestions / limit);    

        const questions = await Question.find(filter)
            .populate("companies", "companyName logo")
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
    success: true,
    page,
    limit,
    totalQuestions,
    totalPages,
    count: questions.length,
    data: questions
});

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const createQuestion = async (req, res) => {

    try {
        const {
    title,
    difficulty,
    companies,
    platform,
    topic,
    link,
    frequency,
    yearAsked,
    tags
} = req.body;

if (companies && companies.length > 0) {
    const companyDocs = await Company.find({
    _id: {
        $in: companies
    }
});

if (companyDocs.length !== companies.length) {
    return res.status(400).json({
    success: false,
    message: "One or more companies do not exist."
});

}

}
const question = await Question.create({
    title,
    difficulty,
    companies,
    platform,
    topic,
    link,
    frequency,
    yearAsked,
    tags
});

    return res.status(201).json({
    success: true,
    message: "Question created successfully",
    data: question
});

    } catch (error) {
         return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getQuestionById = async (req, res) => {

    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate("companies", "companyName logo");
        if (!question) {
    return res.status(404).json({
        success: false,
        message: "Question not found"
    });
}
return res.status(200).json({
    success: true,
    data: question
});



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateQuestion = async (req, res) => {

    try {
        const { id } = req.params;
        if (req.body.companies) {

    const companyDocs = await Company.find({
        _id: {
            $in: req.body.companies
        }
    });

    if (companyDocs.length !== req.body.companies.length) {
        return res.status(400).json({
            success: false,
            message: "One or more companies do not exist."
        });
    }

}
       
const question = await Question.findByIdAndUpdate(
    id,
    req.body,
    {
        new: true,
        runValidators: true
    }
);
if (!question) {
    return res.status(404).json({
        success: false,
        message: "Question not found"
    });
}
return res.status(200).json({
    success: true,
    message: "Question updated successfully",
    data: question
});
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteQuestion = async (req, res) => {

    try{
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Question deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getQuestions,
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};