const getUsers = (req, res) => {
    res.send("Get All Users");
};

const createUser = (req, res) => {
    res.send("Create User");
};

module.exports = {
    getUsers,
    createUser
};