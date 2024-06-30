import express from 'express';
import {
    addItemToCartController,
    updateCartItemController,
    removeItemFromCartController,
    getCartItemsController,
    clearCartController
} from '../controllers/cartController';

const router = express.Router();

// Add an item to the cart
router.post('/add', addItemToCartController);

// Update an item in the cart
router.put('/update', updateCartItemController);

// Remove an item from the cart
router.delete('/remove', removeItemFromCartController);

// Get all items in the cart
router.get('/items/:userId', getCartItemsController);

// Clear the cart
router.delete('/clear/:userId', clearCartController);

export default router;
