"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.getCartItems = exports.removeItemFromCart = exports.updateCartItem = exports.addItemToCart = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../sqlConfig");
// Add an item to the cart
const addItemToCart = async (userId, productId, quantity) => {
    const cartId = (0, uuid_1.v4)(); // Generate a unique ID for the cart item
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Fetch product details
        const productResult = await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .query('SELECT price, flavor, name FROM products WHERE productId = @productId');
        if (productResult.recordset.length === 0) {
            throw new Error('Product not found');
        }
        const { price, flavor, name } = productResult.recordset[0];
        const totalPrice = (parseFloat(price) * parseFloat(quantity)).toFixed(2); // Calculate total price
        await pool.request()
            .input('cartId', mssql_1.default.VarChar, cartId)
            .input('userId', mssql_1.default.VarChar, userId)
            .input('productId', mssql_1.default.VarChar, productId)
            .input('quantity', mssql_1.default.VarChar, quantity)
            .input('price', mssql_1.default.VarChar, totalPrice) // Use the calculated total price
            .input('flavor', mssql_1.default.VarChar, flavor)
            .input('name', mssql_1.default.VarChar, name)
            .execute('AddItemToCart');
    }
    catch (err) {
        console.error(`Error adding item to cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error adding item to cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.addItemToCart = addItemToCart;
// Update an item in the cart
const updateCartItem = async (cartId, userId, productId, quantity) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Fetch product details for recalculating the price
        const productResult = await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .query('SELECT price FROM products WHERE productId = @productId');
        if (productResult.recordset.length === 0) {
            throw new Error('Product not found');
        }
        const { price } = productResult.recordset[0];
        const totalPrice = (parseFloat(price) * parseFloat(quantity)).toFixed(2); // Calculate total price
        await pool.request()
            .input('cartId', mssql_1.default.VarChar, cartId)
            .input('userId', mssql_1.default.VarChar, userId)
            .input('productId', mssql_1.default.VarChar, productId)
            .input('quantity', mssql_1.default.VarChar, quantity)
            .input('price', mssql_1.default.VarChar, totalPrice) // Use the calculated total price
            .execute('UpdateCartItem');
    }
    catch (err) {
        console.error(`Error updating cart item: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error updating cart item: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.updateCartItem = updateCartItem;
// Remove an item from the cart
const removeItemFromCart = async (cartId, userId, productId) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        await pool.request()
            .input('cartId', mssql_1.default.VarChar, cartId)
            .input('userId', mssql_1.default.VarChar, userId)
            .input('productId', mssql_1.default.VarChar, productId)
            .execute('RemoveItemFromCart');
    }
    catch (err) {
        console.error(`Error removing item from cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error removing item from cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.removeItemFromCart = removeItemFromCart;
// Get all items in the cart
const getCartItems = async (userId) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = await pool.request()
            .input('userId', mssql_1.default.VarChar, userId)
            .execute('GetCartItems');
        return result.recordset;
    }
    catch (err) {
        console.error(`Error fetching cart items: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error fetching cart items: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.getCartItems = getCartItems;
// Clear the cart
const clearCart = async (userId) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        await pool.request()
            .input('userId', mssql_1.default.VarChar, userId)
            .execute('ClearCart');
    }
    catch (err) {
        console.error(`Error clearing cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error clearing cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
exports.clearCart = clearCart;
