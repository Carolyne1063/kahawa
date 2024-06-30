"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartController = exports.getCartItemsController = exports.removeItemFromCartController = exports.updateCartItemController = exports.addItemToCartController = void 0;
const cartService_1 = require("../services/cartService");
const uuid_1 = require("uuid");
// Add an item to the cart
const addItemToCartController = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const cartId = (0, uuid_1.v4)(); // Generate a unique ID for the cart item
    try {
        await (0, cartService_1.addItemToCart)(userId, productId, quantity);
        res.status(200).json({ message: 'Item added to cart successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.addItemToCartController = addItemToCartController;
// Update an item in the cart
const updateCartItemController = async (req, res) => {
    const { cartId, userId, productId, quantity } = req.body;
    try {
        await (0, cartService_1.updateCartItem)(cartId, userId, productId, quantity);
        res.status(200).json({ message: 'Cart item updated successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.updateCartItemController = updateCartItemController;
// Remove an item from the cart
const removeItemFromCartController = async (req, res) => {
    const { cartId, userId, productId } = req.body;
    try {
        await (0, cartService_1.removeItemFromCart)(cartId, userId, productId);
        res.status(200).json({ message: 'Item removed from cart successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.removeItemFromCartController = removeItemFromCartController;
// Get all items in the cart
const getCartItemsController = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await (0, cartService_1.getCartItems)(userId);
        res.status(200).json(cartItems);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.getCartItemsController = getCartItemsController;
// Clear the cart
const clearCartController = async (req, res) => {
    const { userId } = req.params;
    try {
        await (0, cartService_1.clearCart)(userId);
        res.status(200).json({ message: 'Cart cleared successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.clearCartController = clearCartController;
