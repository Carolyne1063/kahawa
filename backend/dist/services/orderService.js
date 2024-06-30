"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getAllOrders = exports.deleteOrder = exports.updateOrder = exports.createOrder = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../sqlConfig");
const createOrder = async (userId, productId, quantity) => {
    const orderId = (0, uuid_1.v4)();
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Fetch product details
        const productResult = await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .query('SELECT price, flavor, name FROM products WHERE productId = @productId');
        const { price, flavor, name } = productResult.recordset[0];
        // Fetch user details
        const userResult = await pool.request()
            .input('userId', mssql_1.default.VarChar, userId)
            .query('SELECT address, phoneNumber, email FROM users WHERE userId = @userId');
        const { address, phoneNumber, email } = userResult.recordset[0];
        await pool.request()
            .input('orderId', mssql_1.default.VarChar, orderId)
            .input('userId', mssql_1.default.VarChar, userId)
            .input('productId', mssql_1.default.VarChar, productId)
            .input('quantity', mssql_1.default.VarChar, quantity)
            .input('price', mssql_1.default.VarChar, (parseFloat(price) * parseFloat(quantity)).toFixed(2)) // Convert price to string format
            .input('flavor', mssql_1.default.VarChar, flavor)
            .input('name', mssql_1.default.VarChar, name)
            .input('address', mssql_1.default.VarChar, address) // Include address
            .input('phoneNumber', mssql_1.default.VarChar, phoneNumber) // Include phone number
            .input('email', mssql_1.default.VarChar, email) // Include email
            .execute('CreateOrder');
    }
    catch (err) {
        throw new Error(`Error creating order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.createOrder = createOrder;
const updateOrder = async (orderId, quantity) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Fetch product details
        const productResult = await pool.request()
            .input('orderId', mssql_1.default.VarChar, orderId)
            .query('SELECT productId FROM orders WHERE orderId = @orderId');
        const productId = productResult.recordset[0].productId;
        const productDetailResult = await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .query('SELECT price, flavor, name FROM products WHERE productId = @productId');
        const { price, flavor, name } = productDetailResult.recordset[0];
        await pool.request()
            .input('orderId', mssql_1.default.VarChar, orderId)
            .input('quantity', mssql_1.default.VarChar, quantity)
            .input('price', mssql_1.default.VarChar, (parseFloat(price) * parseFloat(quantity)).toFixed(2)) // Convert price to string format
            .input('flavor', mssql_1.default.VarChar, flavor)
            .input('name', mssql_1.default.VarChar, name)
            .execute('UpdateOrder');
    }
    catch (err) {
        throw new Error(`Error updating order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (orderId) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        await pool.request()
            .input('orderId', mssql_1.default.VarChar, orderId)
            .execute('DeleteOrder');
    }
    catch (err) {
        throw new Error(`Error deleting order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.deleteOrder = deleteOrder;
const getAllOrders = async () => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = await pool.request().execute('GetAllOrders');
        return result.recordset;
    }
    catch (err) {
        throw new Error(`Error fetching orders: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (orderId) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = await pool.request()
            .input('orderId', mssql_1.default.VarChar, orderId)
            .execute('GetOrderById');
        return result.recordset[0];
    }
    catch (err) {
        throw new Error(`Error fetching order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.getOrderById = getOrderById;
