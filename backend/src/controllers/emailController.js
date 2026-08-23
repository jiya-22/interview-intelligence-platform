const transporter = require("../config/mail");

const sendTestEmail = async (req, res, next) => {
    try {

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Interview Intelligence Platform Test",
            text: "Email service is working successfully!"
        });

        return res.status(200).json({
            success: true,
            message: "Test email sent successfully",
            messageId: info.messageId
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    sendTestEmail
};