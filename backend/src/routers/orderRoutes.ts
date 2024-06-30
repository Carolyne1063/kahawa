import { Router } from 'express';
import * as orderController from '../controllers/orderController';

const router = Router();

router.post('/orders/create-order', orderController.createOrder);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);

export default router;
