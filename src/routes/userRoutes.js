const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUser");
const upload = require("../middleware/upload");
const {
    getUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    getUserStats,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    uploadProfileImage,
    deleteAllUsers,
    refreshAccessToken,
    logoutUser
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const authorize = require("../middleware/authorize");

router.get("/",auth, getUsers);

router.get("/stats",auth, getUserStats); 

router.post("/", validateUser, createUser);

router.post("/login", loginUser);

router.get("/me", auth, getMyProfile);



router.patch(
    "/me",
    auth,
    updateMyProfile
);

router.patch(
    "/upload-profile",
    auth,
    upload.single("profileImage"),
    uploadProfileImage
);

router.patch(
    "/change-password",
    auth,
    changePassword
);
router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPassword
);

router.post("/refresh", refreshAccessToken);

router.post("/logout", logoutUser);

router.put("/:id",auth, updateUser);

// Specific route first
router.delete("/delete-all", deleteAllUsers);

// Generic route after
router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteUser
);


router.get("/:id", auth,getUserById);


module.exports = router;