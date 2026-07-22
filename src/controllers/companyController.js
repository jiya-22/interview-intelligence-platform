const Company = require("../models/Company");

const getCompanies = async (req, res) => {
    try {

        const companies = await Company.find();

        return res.status(200).json({
            success: true,
            data: companies
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const createCompany = async (req, res) => {
    try {

        const company = await Company.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: company
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Company already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getCompanyById = async (req, res) => {
    try {

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

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateCompany = async (req, res) => {
    try {

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

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteCompany = async (req, res) => {
    try {

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

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getCompanies,
    createCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
};