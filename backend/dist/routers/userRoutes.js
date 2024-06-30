"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.post('/register', userControllers_1.registerUser);
router.post('/login', userControllers_1.loginUserController);
router.put('/:userId', userControllers_1.updateUserController); // Use userId in path
router.delete('/:userId', userControllers_1.deleteUserController); // Use userId in path
router.get('/', userControllers_1.getUsers);
router.get('/:userId', userControllers_1.getUser); // Use userId in path
exports.default = router;
