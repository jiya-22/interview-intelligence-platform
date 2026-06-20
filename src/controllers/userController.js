const User = require("../models/User");

const getUsers = async (req, res) => {

    const users = await User.find();

    res.json(users);
};

const createUser = async (req, res) => {

    const user = await User.create(req.body);

    res.json({
        message: "User Created",
        data: user
    });
};

const updateUser = async (req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
};

const deleteUser = async (req, res) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json({
        message: "User Deleted"
    });
};

const getUserById = async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};