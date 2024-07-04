"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.loginUser = exports.getUserByEmail = exports.createUser = exports.updateUser = void 0;
const sql = __importStar(require("mssql"));
const sqlConfig_1 = require("../sqlConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid"); // Import uuid library
const createUser = async (user) => {
    const userId = (0, uuid_1.v4)(); // Generate UUID for userId
    const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
    const pool = await sql.connect(sqlConfig_1.sqlConfig);
    const request = pool.request()
        .input('userId', sql.UniqueIdentifier, userId) // Use generated UUID
        .input('firstname', sql.NVarChar, user.firstname)
        .input('lastname', sql.NVarChar, user.lastname)
        .input('phoneNumber', sql.VarChar, user.phoneNumber)
        .input('address', sql.VarChar, user.address)
        .input('email', sql.NVarChar, user.email)
        .input('password', sql.NVarChar, hashedPassword)
        .input('createdAt', sql.DateTime, new Date());
    const result = await request.query('INSERT INTO users (userId, firstname, lastname, phoneNumber, address, email, password, createdAt) ' +
        'VALUES (@userId, @firstname, @lastname, @phoneNumber, @address, @email, @password, @createdAt)');
    return result;
};
exports.createUser = createUser;
const getUserByEmail = async (email) => {
    const pool = await sql.connect(sqlConfig_1.sqlConfig);
    const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM users WHERE email = @email');
    return result.recordset[0];
};
exports.getUserByEmail = getUserByEmail;
// Hardcoded admin credentials
const adminCredentials = {
    email: 'admin@example.com',
    password: 'adminpassword'
};
const loginUser = async (loginDetails) => {
    console.log('Attempting to log in:', loginDetails);
    // Check if login details match hardcoded admin credentials
    if (loginDetails.email === adminCredentials.email && loginDetails.password === adminCredentials.password) {
        console.log('Admin login successful');
        const token = jsonwebtoken_1.default.sign({ email: adminCredentials.email, role: 'admin' }, 'your_secret_key', { expiresIn: '1h' });
        return { token, role: 'admin' };
    }
    // Check if login details match any user in the database
    const user = await getUserByEmail(loginDetails.email);
    if (user) {
        console.log('User found:', user);
        if (await bcrypt_1.default.compare(loginDetails.password, user.password)) {
            console.log('User login successful');
            const token = jsonwebtoken_1.default.sign({ userId: user.userId, role: 'user' }, 'your_secret_key', { expiresIn: '1h' });
            return { token, userId: user.userId, role: 'user' };
        }
        else {
            console.log('Password mismatch');
        }
    }
    else {
        console.log('User not found in database');
    }
    console.log('Login failed: Invalid email or password');
    throw new Error('Invalid email or password');
};
exports.loginUser = loginUser;
const updateUser = async (userId, email, user) => {
    const pool = await sql.connect(sqlConfig_1.sqlConfig);
    let fieldsToUpdate = Object.keys(user)
        .filter(key => key !== 'password') // Exclude 'password' from fields to update
        .map(key => `${key} = @${key}`)
        .join(', ');
    let request = pool.request();
    let query;
    if (userId) {
        request = request.input('userId', sql.UniqueIdentifier, userId);
        query = `UPDATE users SET ${fieldsToUpdate} WHERE userId = @userId`;
    }
    else if (email) {
        request = request.input('email', sql.NVarChar, email);
        query = `UPDATE users SET ${fieldsToUpdate} WHERE email = @email`;
    }
    else {
        throw new Error('Either userId or email must be provided');
    }
    if (user.password) {
        // Hash the new password before updating
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        request.input('password', sql.NVarChar, hashedPassword);
        fieldsToUpdate += ', password = @password'; // Add password update to the query
    }
    Object.entries(user).forEach(([key, value]) => {
        if (key !== 'password') { // Do not add password field again
            request.input(key, sql.NVarChar, value);
        }
    });
    const result = await request.query(query);
    return result;
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    const pool = await sql.connect(sqlConfig_1.sqlConfig);
    const result = await pool.request()
        .input('userId', sql.UniqueIdentifier, userId)
        .query('DELETE FROM users WHERE userId = @userId');
    return result;
};
exports.deleteUser = deleteUser;
const getAllUsers = async () => {
    const pool = await sql.connect(sqlConfig_1.sqlConfig);
    const result = await pool.request().query('SELECT * FROM users');
    return result.recordset;
};
exports.getAllUsers = getAllUsers;
const getUserById = async (userId) => {
    const pool = await sql.connect(sqlConfig_1.sqlConfig);
    const result = await pool.request()
        .input('userId', sql.UniqueIdentifier, userId)
        .query('SELECT * FROM users WHERE userId = @userId');
    return result.recordset[0];
};
exports.getUserById = getUserById;
