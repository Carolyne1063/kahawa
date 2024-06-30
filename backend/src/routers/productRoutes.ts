import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.post('/products/create-product', productController.createProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);

export default router;
