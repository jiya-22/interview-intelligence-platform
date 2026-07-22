const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        logo: {
            type: String,
            default: ""
        },

        website: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        industry: {
            type: String,
            default: ""
        },

        isHiring: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Company", companySchema);