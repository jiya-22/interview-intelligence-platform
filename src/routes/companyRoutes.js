const express = require("express");
const router = express.Router();

const {
    getCompanies,
    createCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// Get all companies
router.get("/", getCompanies);

// Get company by ID
router.get("/:id", getCompanyById);

// Create company (Admin only)
router.post(
    "/",
    auth,
    authorize("admin"),
    createCompany
);

// Update company (Admin only)
router.patch(
    "/:id",
    auth,
    authorize("admin"),
    updateCompany
);

// Delete company (Admin only)
router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteCompany
);

module.exports = router;
