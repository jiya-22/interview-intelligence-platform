const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUsers = async (req, res) => {
    try {

        let filter = {};

        if (req.query.name) {
            filter.name = {
                $regex: req.query.name,
                $options: "i"
            };
        }

        if (req.query.email) {
            filter.email = req.query.email;
        }

    let query = User.find(filter);

if (req.query.fields) {

    const fields = req.query.fields.split(",").join(" ");

    query = query.select(fields);

}
if (req.query.sort) {
    query = query.sort(req.query.sort);
}

const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;

const skip = (page - 1) * limit;

query = query.skip(skip).limit(limit);

const totalUsers = await User.countDocuments(filter);

const users = await query;

res.status(200).json({
    success: true,
    totalUsers,
    currentPage: page,
    totalPages: Math.ceil(totalUsers / limit),
    data: users
});

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const createUser = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Replace plain password with hashed password
        req.body.password = hashedPassword;

        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "User Created",
            data: user
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getUserStats = async (req, res) => {
    try {

        const stats = await User.aggregate([
            {
                $group: {
                    _id: "$department",

                    totalEmployees: {
                        $sum: 1
                    },

                    averageSalary: {
                        $avg: "$salary"
                    }
                }
            },

            {
                $match: {
                    averageSalary: {
                        $gt: 60000
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    department: "$_id",
                    totalEmployees: 1,
                    averageSalary: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
       

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate Access Token
        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Generate Refresh Token
        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            process.env.REFRESH_SECRET,
            {
                expiresIn: process.env.REFRESH_EXPIRES_IN
            }
        );
        
        // Save Refresh Token in Database
        user.refreshToken = refreshToken;
        await user.save();

        // Send Response
        res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

return res.status(200).json({
    success: true,
    message: "Login Successful",
    accessToken
});
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
 

const deleteAllUsers = async (req, res) => {
    try {

        await User.deleteMany({});

        res.status(200).json({
            success: true,
            message: "All users deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const refreshAccessToken = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh Token Required"
        });
    }

    try {

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid Refresh Token"
            });
        }

        // Generate NEW Access Token
        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Generate NEW Refresh Token
        const newRefreshToken = jwt.sign(
            {
                id: user._id
            },
            process.env.REFRESH_SECRET,
            {
                expiresIn: process.env.REFRESH_EXPIRES_IN
            }
        );

        // Save NEW Refresh Token
        user.refreshToken = newRefreshToken;
        await user.save();

        // Update Cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            accessToken
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Refresh Token"
        });

    }
};

const logoutUser = async (req, res) => {
    try {

        // Step 1
const refreshToken = req.cookies.refreshToken;
        // Step 2
const user = await User.findOne({ refreshToken });
//check if user exists
if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found"
    });
}
        // Step 3
user.refreshToken = null;
await user.save();
        // Step 4
res.clearCookie("refreshToken");
        // Step 5
        return res.status(200).json({
    success: true,
    message: "Logout Successful"
});

    } catch (error) {
        return res.status(500).json({
        success: false,
        message: error.message
    });

    }
};


module.exports = {
    getUsers,
    getUserById,
    getUserStats,
    createUser,
    updateUser,
    loginUser,
    deleteUser,
    deleteAllUsers,
    refreshAccessToken,
    logoutUser
};