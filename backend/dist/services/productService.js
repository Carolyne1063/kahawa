"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../sqlConfig");
const getErrorMessage = (err) => {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === 'string') {
        return err;
    }
    else {
        return 'An unknown error occurred';
    }
};
const createProduct = async (product) => {
    const productId = (0, uuid_1.v4)();
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .input('name', mssql_1.default.VarChar, product.name)
            .input('short_description', mssql_1.default.VarChar, product.short_description)
            .input('price', mssql_1.default.VarChar, product.price)
            .input('image', mssql_1.default.VarChar, product.image)
            .input('category', mssql_1.default.VarChar, product.category)
            .input('stock', mssql_1.default.VarChar, product.stock)
            .input('flavor', mssql_1.default.VarChar, product.flavor)
            .execute('CreateProduct');
    }
    catch (err) {
        throw new Error(`Error creating product: ${getErrorMessage(err)}`);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (productId, product) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .input('name', mssql_1.default.VarChar, product.name)
            .input('short_description', mssql_1.default.VarChar, product.short_description)
            .input('price', mssql_1.default.VarChar, product.price)
            .input('image', mssql_1.default.VarChar, product.image)
            .input('category', mssql_1.default.VarChar, product.category)
            .input('stock', mssql_1.default.VarChar, product.stock)
            .input('flavor', mssql_1.default.VarChar, product.flavor)
            .execute('UpdateProduct');
    }
    catch (err) {
        throw new Error(`Error updating product: ${getErrorMessage(err)}`);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (productId) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .execute('DeleteProduct');
    }
    catch (err) {
        throw new Error(`Error deleting product: ${getErrorMessage(err)}`);
    }
};
exports.deleteProduct = deleteProduct;
const getAllProducts = async () => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = await pool.request().execute('GetAllProducts');
        return result.recordset.filter(product => product.stock > 0); // Filter out products with zero stock
    }
    catch (err) {
        throw new Error(`Error fetching products: ${getErrorMessage(err)}`);
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (productId) => {
    try {
        let pool = await mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = await pool.request()
            .input('productId', mssql_1.default.VarChar, productId)
            .execute('GetProductById');
        return result.recordset[0];
    }
    catch (err) {
        throw new Error(`Error fetching product: ${getErrorMessage(err)}`);
    }
};
exports.getProductById = getProductById;
