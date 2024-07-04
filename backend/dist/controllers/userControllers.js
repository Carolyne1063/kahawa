"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = exports.deleteUserController = exports.loginUserController = exports.registerUser = exports.updateUserByEmailOrId = void 0;
const userService_1 = require("../services/userService");
const uuid_1 = require("uuid");
const registerUser = async (req, res) => {
    try {
        const user = {
            userId: (0, uuid_1.v4)(),
            ...req.body
        };
        await (0, userService_1.createUser)(user);
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.registerUser = registerUser;
const loginUserController = async (req, res) => {
    try {
        const loginDetails = req.body;
        const token = await (0, userService_1.loginUser)(loginDetails);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.loginUserController = loginUserController;
const updateUserByEmailOrId = async (req, res) => {
    const { userId, email, ...user } = req.body;
    if (!userId && !email) {
        return res.status(400).json({ message: 'UserId or Email is required' });
    }
    try {
        await (0, userService_1.updateUser)(userId, email, user);
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
};
exports.updateUserByEmailOrId = updateUserByEmailOrId;
const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        await (0, userService_1.deleteUser)(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUserController = deleteUserController;
const getUsers = async (req, res) => {
    try {
        const users = await (0, userService_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await (0, userService_1.getUserById)(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUser = getUser;
function getErrorMessage(err) {
    throw new Error('Function not implemented.');
}
