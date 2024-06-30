import { Request, Response } from 'express';
import { addItemToCart, updateCartItem, removeItemFromCart, getCartItems, clearCart } from '../services/cartService';
import { v4 as uuidv4 } from 'uuid';

// Add an item to the cart
export const addItemToCartController = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    const cartId = uuidv4();  // Generate a unique ID for the cart item

    try {
        await addItemToCart(userId, productId, quantity);
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Update an item in the cart
export const updateCartItemController = async (req: Request, res: Response) => {
    const { cartId, userId, productId, quantity } = req.body;

    try {
        await updateCartItem(cartId, userId, productId, quantity);
        res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Remove an item from the cart
export const removeItemFromCartController = async (req: Request, res: Response) => {
    const { cartId, userId, productId } = req.body;

    try {
        await removeItemFromCart(cartId, userId, productId);
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get all items in the cart
export const getCartItemsController = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const cartItems = await getCartItems(userId);
        res.status(200).json(cartItems);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Clear the cart
export const clearCartController = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await clearCart(userId);
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
