const cloudinary = require("./src/config/cloudinary");

(async () => {
    try {
        const result = await cloudinary.uploader.upload(
            "./src/uploads/resumes/resume.pdf",
            {
                resource_type: "raw"
            }
        );

        console.log(result);
    } catch (err) {
        console.error(err);
    }
})();