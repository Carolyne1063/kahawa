import express from 'express';
import {
    addItemToCartController,
    updateCartItemController,
    removeItemFromCartController,
    getCartItemsController,
    clearCartController
} from '../controllers/cartController';

const router = express.Router();


router.post('/add', addItemToCartController);
router.put('/update', updateCartItemController);
router.delete('/remove', removeItemFromCartController);
router.get('/items/:userId', getCartItemsController);
router.delete('/clear/:userId', clearCartController);

export default router;
