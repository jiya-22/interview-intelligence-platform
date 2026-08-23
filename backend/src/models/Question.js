const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true
        },

        companies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company"
            }
        ],

        platform: {
            type: String,
            enum: [
                "LeetCode",
                "GeeksforGeeks",
                "InterviewBit",
                "CodeStudio"
            ],
            required: true
        },

        topic: {
            type: String,
            default: ""
        },

        link: {
            type: String,
            required: true
        },

        frequency: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Low"
        },

        yearAsked: {
            type: Number,
            default: null
        },

        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Question", questionSchema);