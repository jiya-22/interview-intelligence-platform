const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email"
        ]
    },

    age: {
    type: Number,
    min: [1, "Age must be greater than 0"],
    max: [100, "Age cannot exceed 100"]
},

salary: {
    type: Number,
    min: [0, "Salary cannot be negative"]
},

department: {
    type: String,
    trim: true,
    enum: [
        "IT",
        "HR",
        "Finance",
        "Marketing",
        "Sales"
    ]
}


},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);