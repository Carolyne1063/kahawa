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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const productService = __importStar(require("../services/productService"));
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
const createProduct = async (req, res) => {
    try {
        await productService.createProduct(req.body);
        res.status(201).send('Product created successfully');
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        await productService.updateProduct(req.params.productId, req.body);
        res.status(200).send('Product updated successfully');
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.productId);
        res.status(200).send('Product deleted successfully');
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.deleteProduct = deleteProduct;
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.getProductById = getProductById;
