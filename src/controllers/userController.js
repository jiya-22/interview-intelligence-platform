let users = [];
let currentId = 1;

const getUsers = (req, res) => {
    res.json(users);
};

const createUser = (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and Email are required"
        });
    }

    const newUser = {
        id: currentId,
        ...req.body
    };

    users.push(newUser);

    currentId++;

    res.status(201).json({
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