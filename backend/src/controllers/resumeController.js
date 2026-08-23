const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const uploadResume = async (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume."
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "resumes",
    resource_type: "raw"
});

fs.unlink(req.file.path, (err) => {
    if (err) {
        console.log("Failed to delete local file:", err.message);
    }
});

        const existingResume = await Resume.findOne({
            user: req.user.id
        });

        if (existingResume) {

            if (existingResume.publicId) {
    await cloudinary.uploader.destroy(existingResume.publicId, {
        resource_type: "raw"
    });
}

            const resume = await Resume.findOneAndUpdate(
                { user: req.user.id },
                {
                    resumeUrl: result.secure_url,
        publicId: result.public_id,
        fileName: req.file.originalname
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            return res.status(200).json({
                success: true,
                message: "Resume Updated",
                data: resume
            });

        }

        const resume = await Resume.create({
    user: req.user.id,
    resumeUrl: result.secure_url,
    publicId: result.public_id,
    fileName: req.file.originalname
});

        return res.status(201).json({
            success: true,
            message: "Resume Uploaded",
            data: resume
        });

    } catch (error) {

        next(error);

    }
};

const getMyResume = async (req, res, next) => {

    try {

        const resume = await Resume.findOne({ user: req.user.id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume fetched successfully",
            data: resume
        });

    } catch (error) {

        next(error);

    }
};

const downloadResume = async (req, res, next) => {
    try {

        const resume = await Resume.findOne({
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        if (!resume.resumeUrl) {
            return res.status(404).json({
                success: false,
                message: "Resume file not available"
            });
        }

        return res.redirect(resume.resumeUrl);

    } catch (error) {

        next(error);

    }
};

const deleteResume = async (req, res, next) => {

    try {

        const resume = await Resume.findOneAndDelete({
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully"
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    uploadResume,
    getMyResume,
    downloadResume,
    deleteResume
};