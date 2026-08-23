const Company = require("../models/Company");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const getCompanies = async (req, res, next) => {
    try {

        const companies = await Company.find();

        return res.status(200).json({
            success: true,
            data: companies
        });

    } catch (error) {

        next(error);

    }
};

const createCompany = async (req, res, next) => {
    try {

        const company = await Company.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: company
        });

    } catch (error) {

        if (error.code === 11000) {
            return next(
                new AppError("Company already exists", 400)
            );
        }

        next(error);

    }
};

const getCompanyById = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid company ID", 400)
            );
        }

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: company
        });

    } catch (error) {

        next(error);

    }
};

const updateCompany = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid company ID", 400)
            );
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: company
        });

    } catch (error) {

        next(error);

    }
};

const deleteCompany = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(
                new AppError("Invalid company ID", 400)
            );
        }

        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    getCompanies,
    createCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
};