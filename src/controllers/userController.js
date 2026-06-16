let users = [];
let currentId = 1;

const getUsers = (req, res) => {
    res.json(users);
};

const createUser = (req, res) => {

    const newUser = {
        id: currentId,
        ...req.body
    };

    users.push(newUser);

    currentId++;

    res.json({
        message: "User Created",
        data: newUser
    });
};

const updateUser = (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex(user => user.id === id);

    users[index] = {
        ...users[index],
        ...req.body
    };

    res.json(users[index]);
};

const deleteUser = (req, res) => {

    const id = Number(req.params.id);

    users = users.filter(user => user.id !== id);

    res.json({
        message: "User Deleted"
    });
};

const getUserById = (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    res.json(user);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};