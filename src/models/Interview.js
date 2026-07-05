const mongoose = require("mongoose");
const interviewSchema = new mongoose.Schema(
    {
        company: {
        type: String,
        required: [true, "Company name is required"],
        trim: true
    },
    role: {
    type: String,
    required: [true, "Role is required"],
    trim: true
},
difficulty: {
    type: String,
    required: [true, "Difficulty is required"],
    enum: ["Easy", "Medium", "Hard"]
},
result: {
    type: String,
    required: [true, "Result is required"],
    enum: ["Selected", "Rejected", "Pending"]
},
experience: {
    type: String,
    required: [true, "Interview experience is required"],
    trim: true,
    minlength: [20, "Experience should be at least 20 characters"]
},
interviewDate: {
    type: Date,
    required: [true, "Interview date is required"]
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Interview", interviewSchema);