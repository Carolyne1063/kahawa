"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
// Add an item to the cart
router.post('/add', cartController_1.addItemToCartController);
// Update an item in the cart
router.put('/update', cartController_1.updateCartItemController);
// Remove an item from the cart
router.delete('/remove', cartController_1.removeItemFromCartController);
// Get all items in the cart
router.get('/items/:userId', cartController_1.getCartItemsController);
// Clear the cart
router.delete('/clear/:userId', cartController_1.clearCartController);
exports.default = router;
