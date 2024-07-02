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
exports.getOrdersByUserId = exports.getOrderById = exports.getAllOrders = exports.deleteOrder = exports.updateOrder = exports.createOrder = void 0;
const orderService = __importStar(require("../services/orderService"));
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
const createOrder = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        await orderService.createOrder(userId, productId, quantity);
        res.status(201).send('Order created successfully');
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.createOrder = createOrder;
const updateOrder = async (req, res) => {
    try {
        const { quantity } = req.body;
        await orderService.updateOrder(req.params.orderId, quantity);
        res.status(200).send('Order updated successfully');
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.orderId);
        res.status(200).send('Order deleted successfully');
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.deleteOrder = deleteOrder;
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.getOrderById = getOrderById;
const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUserId(req.params.userId);
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
exports.getOrdersByUserId = getOrdersByUserId;
